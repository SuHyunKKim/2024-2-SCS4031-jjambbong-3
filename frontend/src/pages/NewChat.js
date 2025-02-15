import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PlacePreview from "../components/TamtamPlacePreview";
import Calendar from "../components/Calendar";
import WithWhom from "../components/WithWhom";
import Thema from "../components/Thema";
import styles from "./NewChat.module.css";
import iconSend from "../assets/icon_send.png";
import iconGptProfile from "../assets/icon_gptprofile.png";
import iconClear from "../assets/icon_clear.png";
import { v4 as uuidv4 } from "uuid";
import { getGreetingMessage } from "../api/chatApi";
import { getTravelPlan } from "../api/chatApi";
import { modifyTravelPlan } from "../api/chatApi";
import iconUserProfile from "../assets/icon_userprofile.png";
import ReactMarkdown from "react-markdown";
import GooglePlacesImageUpdater from "../api/GooglePlacesImageFetcher";

function NewChat() {
  const [places, setPlaces] = useState(() => {
    try {
      const storedPlaces = sessionStorage.getItem("places");
      return storedPlaces ? JSON.parse(storedPlaces) : {}; // 빈 객체 초기화
    } catch (error) {
      console.error("Error parsing places from sessionStorage:", error);
      return {};
    }
  });

  const isUpdatingImages = useRef(false); // 이미지 업데이트 상태 추적

  // 장소 상태 변경 감지 및 이미지 업데이트 처리
  useEffect(() => {
    if (!places || Object.keys(places).length === 0 || isUpdatingImages.current)
      return;

    console.log("useEffect: Places updated, triggering handleUpdateImages.");
    handleUpdateImages();
  }, [places]);

  const handleUpdateImages = async () => {
    if (!places || Object.keys(places).length === 0) {
      console.warn("handleUpdateImages: No places to update.");
      return;
    }

    console.log("handleUpdateImages: Updating images for places...", places);

    isUpdatingImages.current = true; // 업데이트 중 상태 설정

    if (updaterRef.current) {
      try {
        await updaterRef.current.updateSessionStorageWithImages();
      } catch (error) {
        console.error("Error updating images:", error);
      }
    }

    const updatedPlaces = sessionStorage.getItem("places");
    if (updatedPlaces) {
      try {
        const parsedPlaces = JSON.parse(updatedPlaces);
        if (JSON.stringify(parsedPlaces) !== JSON.stringify(places)) {
          setPlaces(parsedPlaces); // 변경된 데이터만 업데이트
        }
      } catch (error) {
        console.error("Error parsing updated places:", error);
      }
    }

    isUpdatingImages.current = false; // 업데이트 완료 후 상태 초기화
  };

  // 세션 스토리지 동기화
  useEffect(() => {
    const syncPlacesFromSessionStorage = () => {
      const storedPlaces = sessionStorage.getItem("places");
      if (storedPlaces) {
        try {
          setPlaces(JSON.parse(storedPlaces));
        } catch (error) {
          console.error("Error syncing places from sessionStorage:", error);
          setPlaces({}); // 오류 발생 시 빈 객체로 설정
        }
      } else {
        setPlaces({}); // 기본값 설정
      }
    };

    window.addEventListener("storage", syncPlacesFromSessionStorage);

    return () => {
      window.removeEventListener("storage", syncPlacesFromSessionStorage);
    };
  }, []);

  const itinerary = 4;
  // 초기 상태 복원
  const [isGreetingAccepted, setIsGreetingAccepted] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isGreetingAccepted")) || false;
  });
  const [messages, setMessages] = useState(() => {
    return JSON.parse(sessionStorage.getItem("chatMessages")) || [];
  });
  const [dateRange, setDateRange] = useState(() => {
    const savedDateRange = JSON.parse(sessionStorage.getItem("dateRange"));
    if (
      savedDateRange &&
      Array.isArray(savedDateRange) &&
      savedDateRange.length === 2 &&
      savedDateRange[0] &&
      savedDateRange[1]
    ) {
      // 저장된 값이 유효한 Date 객체인지 확인
      return [new Date(savedDateRange[0]), new Date(savedDateRange[1])];
    }
    return [null, null]; // 기본값
  });

  const [selectedCompanion, setSelectedCompanion] = useState(() => {
    return sessionStorage.getItem("selectedCompanion") || null;
  });
  const [selectedThemes, setSelectedThemes] = useState(() => {
    return JSON.parse(sessionStorage.getItem("selectedThemes")) || [];
  });

  const [message, setMessage] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true); // 입력창 비활성화 상태
  const [isFocused, setIsFocused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // 일정 생성 중 상태
  const navigate = useNavigate();
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [greetingMessage, setGreetingMessage] = useState(""); // 서버에서 받은 인삿말
  const [isWaitingForModify, setIsWaitingForModify] = useState(false); // Modify 대기
  const [hashTags, setHashTags] = useState([]);
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

  const [userInfo, setUserInfo] = useState({
    userInfo: "", // 기본 user_id
    nickname: "", // 기본 닉네임
    profileImage: iconUserProfile, // 기본 이미지
  });

  // 사용자 정보 로드
  useEffect(() => {
    const userId = localStorage.getItem("userId") || "default_user_id";
    const nickname = localStorage.getItem("nickname") || "닉네임 없음";

    // 상태 업데이트
    setUserInfo({
      userId,
      nickname,
      profileImage: iconUserProfile,
    });
  }, []);

  // 상태를 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem(
      "isGreetingAccepted",
      JSON.stringify(isGreetingAccepted)
    );
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    sessionStorage.setItem("dateRange", JSON.stringify(dateRange));
    sessionStorage.setItem("selectedCompanion", selectedCompanion);
    sessionStorage.setItem("selectedThemes", JSON.stringify(selectedThemes));
    sessionStorage.setItem("places", JSON.stringify(places));
  }, [
    isGreetingAccepted,
    messages,
    dateRange,
    selectedCompanion,
    selectedThemes,
    places,
  ]);

  // Modify 상태 복원 (뒤로가기 및 초기 렌더링 시)
  useEffect(() => {
    const savedMessages =
      JSON.parse(sessionStorage.getItem("chatMessages")) || [];
    if (savedMessages.length > 0) {
      const lastMessage = savedMessages[savedMessages.length - 1];

      setIsWaitingForModify(lastMessage.sender === "user"); // Modify 상태 복원
      setIsInputDisabled(false); // 항상 입력창 활성화
    } else {
      setIsWaitingForModify(false);
      setIsInputDisabled(true); // 메시지가 없으면 입력창 비활성화
    }
  }, []);

  useEffect(() => {
    const savedLastHandledMessageId = sessionStorage.getItem(
      "lastHandledMessageId"
    );

    if (!savedLastHandledMessageId) {
      sessionStorage.setItem("lastHandledMessageId", null);
    }
  }, []);

  // Modify 호출 로직
  useEffect(() => {
    if (isWaitingForModify && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const lastHandledMessageId = sessionStorage.getItem(
        "lastHandledMessageId"
      );

      // 마지막 메시지가 사용자 메시지이며, 이미 처리되지 않은 경우
      if (
        lastMessage.sender === "user" &&
        lastMessage.id !== lastHandledMessageId &&
        !isGenerating // 요청 중인 상태에서 중복 요청 방지
      ) {
        console.log("Handling Modify for:", lastMessage.text);

        handleModifyRequest(lastMessage.text)
          .then(() => {
            setIsWaitingForModify(false); // Modify 상태 해제
            sessionStorage.setItem("lastHandledMessageId", lastMessage.id); // 마지막 처리 메시지 저장
          })
          .catch((error) => {
            console.error("Modify API 호출 실패:", error);
            setIsWaitingForModify(false); // 실패 시에 상태 해제
          });
      }
    }
  }, [isWaitingForModify, messages]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      // 마지막 메시지가 사용자 입력인 경우 Modify 활성화
      if (lastMessage.sender === "user") {
        setIsWaitingForModify(true);
      }
    }
  }, [messages]);

  useEffect(() => {
    sessionStorage.setItem(
      "isWaitingForModify",
      JSON.stringify(isWaitingForModify)
    );
  }, [isWaitingForModify]);

  useEffect(() => {
    console.log("isWaitingForModify:", isWaitingForModify);
    console.log("messages:", messages);
  }, [isWaitingForModify, messages]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Observe chatWindow size change
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      scrollToBottom(); // chatWindow 크기 변경 시 아래로 스크롤
    });
    if (chatWindowRef.current) {
      observer.observe(chatWindowRef.current);
    }
    return () => {
      if (chatWindowRef.current) {
        observer.unobserve(chatWindowRef.current); // cleanup observer
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 로딩 상태 변경 시 자동 스크롤
  useEffect(() => {
    if (isGenerating) {
      scrollToBottom();
    }
  }, [isGenerating]);

  // Confirm 버튼 상태 변경 시 자동 스크롤
  useEffect(() => {
    if (selectedThemes.length > 0) {
      scrollToBottom();
    }
  }, [selectedThemes]);

  // greeting API 연결
  const handleGreeting = async () => {
    if (greetingMessage) return; // 이미 메시지가 존재하면 함수 종료

    try {
      const frontInput = "탐탐이와 여행 일정 시작";
      const generateResponse = await getGreetingMessage(frontInput);

      // 상태 업데이트
      setGreetingMessage(generateResponse);
      setIsGreetingAccepted(true);
    } catch (error) {
      console.error("Greeting 요청 오류:", error);
      addMessage("탐탐이가 응답하지 않습니다. 다시 시도해주세요.", false);
    }
  };
  const updaterRef = useRef();
  // plan API 연결
  const handleConfirm = async () => {
    if (isConfirmButtonDisabled) return;

    setIsConfirmButtonDisabled(true);
    const travelDays = Math.ceil(
      (dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)
    );

    const requestData = {
      user_id: userInfo.userId,
      travel_date: `${dateRange[0].toLocaleDateString()} ~ ${dateRange[1].toLocaleDateString()}`,
      travel_days: travelDays,
      travel_mate: selectedCompanion,
      travel_theme: selectedThemes.join(", "),
    };

    setIsGenerating(true);

    try {
      const {
        response: planResponse,
        follow_up: followUp,
        location_info,
      } = await getTravelPlan(requestData);

      if (location_info?.places) {
        const processedPlaces = processPlaces(location_info.places);

        setPlaces((prevPlaces) => {
          const mergedPlaces = { ...prevPlaces, ...processedPlaces };
          sessionStorage.setItem("places", JSON.stringify(mergedPlaces));
          console.log("Merged places saved to sessionStorage:", mergedPlaces);
          return mergedPlaces;
        });
      }

      if (location_info?.hash_tag) {
        setHashTags(location_info.hash_tag);
        sessionStorage.setItem(
          "hashTags",
          JSON.stringify(location_info.hash_tag)
        );
      }

      addMessage(planResponse, false);
      addMessage(followUp, false);
      setIsInputDisabled(false);
      setIsWaitingForModify(true);
    } catch (error) {
      console.error("Plan 요청 오류:", error);
      addMessage("Error: 일정 생성에 실패했습니다. 다시 시도해주세요.", false);
      setIsConfirmButtonDisabled(false);
    } finally {
      setIsGenerating(false);
    }
  };

  // modify API 연결
  const handleModifyRequest = async (modifyRequest) => {
    setIsGenerating(true); // 로딩 시작

    const modifyRrequest = {
      user_id: userInfo.userId,
      modify_request: modifyRequest,
    };

    try {
      const {
        response: modifyResponse,
        follow_up: followUp,
        location_info,
      } = await modifyTravelPlan(modifyRrequest); // Modify API 호출

      // 장소 데이터 처리 및 상태 업데이트
      if (location_info?.places) {
        const processedPlaces = processPlaces(location_info.places);
        setPlaces(processedPlaces);
      }

      // API에서 받은 해시태그 데이터 저장
      if (location_info?.hash_tag) {
        setHashTags(location_info.hash_tag);
        sessionStorage.setItem(
          "hashTags",
          JSON.stringify(location_info.hash_tag)
        );
      }

      // Modify 응답 버블
      addMessage(modifyResponse, false);
      addMessage(followUp, false);
    } catch (error) {
      console.error("Modify 요청 오류:", error);
      addMessage("Error: 일정 수정에 실패했습니다. 다시 시도해주세요.", false);
    } finally {
      setIsGenerating(false); // 로딩 상태 종료
    }
  };

  // 장소 데이터
  const processPlaces = (rawPlaces) => {
    const processed = {};
    for (const [day, spots] of Object.entries(rawPlaces)) {
      processed[day] = spots.map((spot) => ({
        name: spot.name,
        category: spot.category,
        address: spot.location,
        imageUrl: spot.imageUrl,
      }));
    }
    return processed;
  };
  const addMessage = (text, isUser) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: uuidv4(), sender: isUser ? "user" : "GPT", text },
    ]);
  };

  const handleSendMessage = () => {
    if (message.trim() === "" || isInputDisabled) return; // 메시지가 없거나 비활성화 상태인 경우 실행 안 함

    addMessage(message, "user");

    if (isWaitingForModify) {
      handleModifyRequest(message)
        .then(() => setIsWaitingForModify(false))
        .catch((error) => {
          console.error("Modify API 호출 실패:", error);
          setIsWaitingForModify(false);
        });
    }

    setMessage("");
    setTimeout(scrollToBottom, 0);
  };

  const handleReset = () => {
    setMessages([]);
    setDateRange([null, null]);
    setSelectedCompanion(null);
    setSelectedThemes([]);
    setPlaces({});
    setHashTags([]);
    setIsGenerating(false); // 초기화 시 일정 생성 상태도 리셋
    setIsGreetingAccepted(false); // Greeting 초기화
    setGreetingMessage(""); // Greeting 메시지 초기화
    setIsWaitingForModify(false);
    setIsConfirmButtonDisabled(false);
    setIsInputDisabled(true); // 리셋 시 입력창 비활성화
    sessionStorage.clear();
  };

  const handleProfileClick = () => {
    navigate("/mypage");
  };

  const handleCompanionSelect = (companion) => {
    setSelectedCompanion(companion);
  };

  const handleThemeSelectionChange = (themes) => {
    setSelectedThemes(themes);
  };

  const isDateRangeSelected = dateRange[0] && dateRange[1];

  return (
    <div className={styles.container}>
      {/* Sidebar 영역 */}
      <Sidebar>
        <PlacePreview
          places={places}
          itinerary={itinerary}
          hashTags={hashTags}
        />
      </Sidebar>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <p className={styles.title}>탐탐이와 여행 계획하기</p>
            <img
              src={iconClear}
              alt="초기화"
              className={styles.resetButton}
              onClick={handleReset}
              title="대화 초기화"
            />
          </div>
          <div className={styles.profileContainer} onClick={handleProfileClick}>
            <img
              src={userInfo.profileImage || iconUserProfile}
              alt="User Profile"
              className={styles.profileImage}
              onError={(e) => {
                e.target.src = iconUserProfile; // 이미지 로드 실패 시 기본 이미지 사용
              }}
            />
            <span className={styles.profileName}>{userInfo.nickname}</span>
          </div>
        </div>

        {/* Greeting 버튼 및 아이콘 */}
        {!isGreetingAccepted && (
          <div className={styles.greetingContainer}>
            <img
              src={iconGptProfile}
              alt="GPT Profile"
              className={styles.gptProfileIconLarge}
            />
            <button className={styles.greetingButton} onClick={handleGreeting}>
              탐탐이와 대화 시작하기
            </button>
          </div>
        )}

        {/* Chat Window - Greeting 후 표시 */}
        {isGreetingAccepted && (
          <div className={styles.chatWindow} ref={chatWindowRef}>
            {/* 서버에서 받은 인삿말 표시 */}
            {greetingMessage && (
              <div className={styles.gptMessageContainer}>
                <img
                  src={iconGptProfile}
                  alt="GPT Profile"
                  className={styles.gptProfileIcon}
                />
                <div className={styles.gptBubble}>{greetingMessage}</div>
              </div>
            )}

            {/* 날짜 선택 UI */}
            <div className={styles.questionStyle}>
              <div className={styles.calendarStyle}>
                <Calendar
                  dateRange={dateRange}
                  onChange={setDateRange}
                  disabled={isConfirmButtonDisabled} // Confirm 버튼 이후 비활성화
                />
                <span className={styles.gptBubble}>
                  언제 여행을 떠나시나요?
                </span>
              </div>
              <span className={styles.userBubble}>
                {dateRange[0] ? dateRange[0].toLocaleDateString() : null}
                {dateRange[1] && dateRange[0] !== dateRange[1]
                  ? ` ~ ${dateRange[1].toLocaleDateString()}`
                  : ""}
              </span>
            </div>

            {/* 동반자 선택 */}
            {isDateRangeSelected && (
              <div className={styles.questionStyle}>
                <div>
                  <span className={styles.gptBubble}>
                    누구와 함께 여행을 떠나시나요?
                  </span>
                  <WithWhom
                    onCompanionSelect={handleCompanionSelect}
                    disabled={isConfirmButtonDisabled}
                  />
                </div>
                {selectedCompanion && (
                  <span className={styles.userBubble}>{selectedCompanion}</span>
                )}
              </div>
            )}

            {/* 테마 선택 */}
            {selectedCompanion && (
              <div className={styles.questionStyle}>
                <div>
                  <span className={styles.gptBubble}>
                    여행의 테마를 골라주세요! (다중 선택 가능)
                  </span>
                  <Thema
                    onSelectionChange={(themes) => {
                      setSelectedThemes(themes);
                    }}
                    disabled={isConfirmButtonDisabled} // Confirm 버튼 이후 비활성화
                  />
                </div>
                {/* 선택한 테마 표시 */}
                <div className={styles.bubbleContainer}>
                  {selectedThemes.map((theme, index) => (
                    <span key={index} className={styles.bubble}>
                      #{theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 테마 선택 이후에 확정 버튼 표시 */}
            {selectedThemes.length > 0 && (
              <div className={styles.leftButtonContainer}>
                <button
                  className={styles.confirmButton}
                  onClick={handleConfirm}
                  disabled={isConfirmButtonDisabled}
                >
                  이 정보를 바탕으로 탐탐이에게 일정 추천받기
                </button>
              </div>
            )}

            {/* 로딩 메세지 */}
            {isGenerating && (
              <div className={styles.gptMessageContainer}>
                <img
                  src={iconGptProfile}
                  alt="GPT Profile"
                  className={styles.gptProfileIcon}
                />
                <div className={styles.gptBubble}>
                  탐탐이가 일정을 짜고 있어요😊! 잠시만 기다려주세요
                  <span className={styles.dots}></span>
                </div>
              </div>
            )}

            {/* 기존 채팅 메시지 */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.sender === "GPT"
                    ? styles.gptMessageContainer
                    : styles.userMessageContainer
                }
              >
                {msg.sender === "GPT" && (
                  <img
                    src={iconGptProfile}
                    alt="GPT Profile"
                    className={styles.gptProfileIcon}
                  />
                )}
                <div
                  className={
                    msg.sender === "user" ? styles.userBubble : styles.gptBubble
                  }
                >
                  {/*마크다운 메시지 렌더링 */}
                  {msg.sender === "GPT" ? (
                    <ReactMarkdown className="markdown">
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    <span>{msg.text}</span>
                  )}
                </div>
              </div>
            ))}
            {/* 스크롤 기준점 */}
            <div ref={messagesEndRef} />
          </div>
        )}
        {/* 메시지 입력창 */}
        <div className={styles.chatInputContainer}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 보내기"
            className={`${styles.chatInput} ${isFocused ? styles.focused : ""}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Enter 시 기본 동작 차단
                handleSendMessage(); // 메시지 전송
              }
            }}
          />
          <img
            src={iconSend}
            alt="send"
            className={styles.sendIcon}
            onClick={handleSendMessage}
          />
          <GooglePlacesImageUpdater ref={updaterRef} />
        </div>
      </div>
    </div>
  );
}
export default NewChat;
