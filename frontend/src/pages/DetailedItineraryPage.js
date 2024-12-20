import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarTabs from "../components/SidebarTabs";
import TravelSummary from "../components/TravelSummary";
import DetailedSchedule from "../components/DetailedSchedule";
import Route from "../components/Route";
import Checklist from "../components/Checklist";
import Modal from "../components/Modal";
import InputModal from "../components/InputModal";
import styles from "./DetailedItineraryPage.module.css";
import { saveTravelPlan } from "../api/savePlanApi";
import KakaoMap from "../components/KakaoMap";

function DetailedItineraryPage() {
  const location = useLocation(); // 이전 페이지에서 상태 가져오기
  const {
    savedMessages = [], // 채팅 데이터
    places: initialPlaces = null,
    hashTags = [],
    dateRange: initialDateRange = [null, null],
    selectedCompanion: initialCompanion = null,
    selectedThemes: initialThemes = [],
  } = location.state || {};

  const [activeTab, setActiveTab] = useState("여행 요약");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [selectedThemes, setSelectedThemes] = useState(initialThemes);
  const [selectedCompanion, setSelectedCompanion] = useState(initialCompanion);
  const [places, setPlaces] = useState(initialPlaces);
  const [travelName, setTravelName] = useState(""); // 일정 제목 저장
  const [userInfo, setUserInfo] = useState({
    userId: "default_user_id",
    nickname: "닉네임 없음",
  });
  const navigate = useNavigate();

  const tabs = [
    { label: "여행 요약", content: <TravelSummary /> },
    { label: "상세 일정", content: <DetailedSchedule /> },
    { label: "길찾기", content: <Route /> },
    { label: "체크리스트", content: <Checklist /> },
  ];

  // 사용자 정보 가져오기
  useEffect(() => {
    const userId = localStorage.getItem("userId") || "default_user_id";
    const nickname = localStorage.getItem("nickname") || "닉네임 없음";

    setUserInfo({ userId, nickname });
  }, []);

  useEffect(() => {
    // 상태를 sessionStorage에 저장
    sessionStorage.setItem("dateRange", JSON.stringify(dateRange));
    sessionStorage.setItem("selectedCompanion", selectedCompanion);
    sessionStorage.setItem("selectedThemes", JSON.stringify(selectedThemes));
    sessionStorage.setItem("places", JSON.stringify(places));
  }, [dateRange, selectedCompanion, selectedThemes, places]);

  const handleConfirmClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenInputModal = () => {
    setIsModalOpen(false); // 확인 모달 닫기
    setIsInputModalOpen(true); // 제목 입력 모달 열기
  };

  const handleInputModalClose = () => {
    setIsInputModalOpen(false); // 제목 입력 모달 닫기
  };

  const handleInputModalConfirm = async (title) => {
    try {
      if (!title.trim()) {
        alert("일정 제목을 입력해주세요.");
        return;
      }

      setIsInputModalOpen(false); // 모달 닫기

      const { userId } = userInfo;

      // 서버로 전송할 데이터 준비
      const payload = {
        user_id: userId,
        travel_name: title,
      };

      // API 요청
      const response = await saveTravelPlan(
        payload.user_id,
        payload.travel_name
      );

      alert(response.message); // 성공 메시지 표시
      navigate("/mypage"); // 저장 완료 후 마이페이지로 이동
    } catch (error) {
      console.error("일정 저장 오류:", error);
      alert(error.message || "일정을 저장하는 데 문제가 발생했습니다.");
    }
  };

  return (
    <div className={styles.detailedItineraryPage}>
      {/* 왼쪽 사이드바 영역 */}
      <div className={styles.sidebarContainer}>
        <Sidebar>
          <SidebarTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />
        </Sidebar>
      </div>

      {/* 오른쪽 지도 영역 */}
      <div className={styles.mapContainer}>
        <KakaoMap />
        {/* savedMessages가 있을 때만 버튼 표시 */}
        {savedMessages.length > 0 && (
          <button className={styles.confirmButton} onClick={handleConfirmClick}>
            일정 확정하기
          </button>
        )}
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <Modal
          title="일정 확정"
          message="일정이 확정되면 마이페이지로 이동됩니다. 일정을 확정하시겠습니까?"
          onClose={handleModalClose}
          onConfirm={handleOpenInputModal}
        />
      )}

      {/* 제목 입력 모달 */}
      {isInputModalOpen && (
        <InputModal
          title="일정 제목 입력"
          description="확정할 일정의 제목을 입력해주세요."
          placeholder="ex) 제주도 가족여행"
          onClose={handleInputModalClose}
          onConfirm={handleInputModalConfirm}
        />
      )}
    </div>
  );
}

export default DetailedItineraryPage;
