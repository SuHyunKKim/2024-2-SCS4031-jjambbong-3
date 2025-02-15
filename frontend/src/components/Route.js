import React, { useState, useEffect } from "react";
import styles from "./Route.module.css";

const Route = () => {
  const [activeDay, setActiveDay] = useState(1); // 현재 활성화된 날짜
  const [itineraryDays, setItineraryDays] = useState([]); // 여행 일정 데이터
  const [, setCoordinatesLog] = useState([]); // 좌표 확인 로그
  const defaultImageUrl =
    "https://private-user-images.githubusercontent.com/144208568/395778736-c1597f72-1208-46fd-aca1-7857fe7dbd13.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQyNDA0MzksIm5iZiI6MTczNDI0MDEzOSwicGF0aCI6Ii8xNDQyMDg1NjgvMzk1Nzc4NzM2LWMxNTk3ZjcyLTEyMDgtNDZmZC1hY2ExLTc4NTdmZTdkYmQxMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjE1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIxNVQwNTIyMTlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04NTQ5YzQzYjgwMWJkZjE0N2U5MDllNDUxNGFhNjFiZTY5ZjQwNGQyOWU4MDNiZTU4NTM4YWM1ZDU3YjU1MmRlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.BJ1KdTJZ05TqCkWCLGhrYBmE1HHJmw2Lt5ZxcpECteg";
  useEffect(() => {
    // Kakao Maps API 로드 확인
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
    } else {
      console.log("Kakao Maps API 로드 성공");
    }

    // sessionStorage에서 여행 데이터 로드
    const fetchItineraryData = () => {
      try {
        const storedData = JSON.parse(sessionStorage.getItem("places"));
        if (storedData) {
          const formattedData = Object.keys(storedData).map((dayKey) => ({
            day: dayKey,
            spots: storedData[dayKey].map((spot) => ({
              ...spot,
              imageUrl: spot.imageUrl || defaultImageUrl, // 기본 이미지 설정
            })),
          }));
          setItineraryDays(formattedData);
        } else {
          console.error("No itinerary data found in sessionStorage.");
        }
      } catch (error) {
        console.error("Error parsing itinerary data:", error);
      }
    };

    fetchItineraryData();
  }, []);

  // 탭 버튼 클릭
  const handleTabClick = (dayIndex) => {
    setActiveDay(dayIndex);
  };

  // 주소를 좌표로 변환
  const getCoordinates = async (address, name) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 1. 주소 검색
      geocoder.addressSearch(address, (result, status) => {
        if (
          status === window.kakao.maps.services.Status.OK &&
          result.length > 0
        ) {
          const coordinates = {
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          };
          console.log("주소 검색 성공:", coordinates);
          setCoordinatesLog((prev) => [...prev, { address, coordinates }]);
          resolve(coordinates);
        } else {
          console.error("주소 검색 실패:", address, status);

          // 2. 주소 검색 실패 시 name으로 키워드 검색
          const places = new window.kakao.maps.services.Places();
          places.keywordSearch(name, (results, keywordStatus) => {
            if (
              keywordStatus === window.kakao.maps.services.Status.OK &&
              results.length > 0
            ) {
              const coordinates = {
                lat: parseFloat(results[0].y),
                lng: parseFloat(results[0].x),
              };
              console.log("키워드 검색 성공 (name):", coordinates);
              setCoordinatesLog((prev) => [...prev, { name, coordinates }]);
              resolve(coordinates);
            } else {
              console.error("키워드 검색 실패:", name, keywordStatus);
              reject(
                new Error(
                  "Failed to find coordinates for address or name: " + address
                )
              );
            }
          });
        }
      });
    });
  };

  // 출발지-도착지 경로 쌍 생성
  const createRoutePairs = (spots) => {
    const pairs = [];
    for (let i = 0; i < spots.length - 1; i++) {
      pairs.push([spots[i], spots[i + 1]]);
    }
    return pairs;
  };

  // Kakao 지도 길찾기 링크 생성
  const createKakaoMapLink = async (start, end) => {
    try {
      const startCoords = await getCoordinates(start.address, start.name);
      const endCoords = await getCoordinates(end.address, end.name);

      const baseUrl = "https://map.kakao.com/link";
      const fromInfo = `from/${encodeURIComponent(start.name)},${startCoords.lat},${startCoords.lng}`;
      const toInfo = `to/${encodeURIComponent(end.name)},${endCoords.lat},${endCoords.lng}`;
      return `${baseUrl}/${fromInfo}/${toInfo}`;
    } catch (error) {
      console.error("Error creating Kakao map link:", error);
      return "#";
    }
  };

  return (
    <div className={styles.detailedSchedule}>
      {/* 탭 버튼 */}
      <div className={styles.tabs}>
        {itineraryDays.map((day, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              activeDay === index + 1 ? styles.active : ""
            }`}
            onClick={() => handleTabClick(index + 1)}
          >
            {index + 1}일차
          </button>
        ))}
      </div>

      {/* 선택된 날짜의 여행 스팟과 길찾기 경로 */}
      <div className={styles.routeList}>
        {itineraryDays[activeDay - 1]?.spots &&
          createRoutePairs(itineraryDays[activeDay - 1].spots).map(
            ([start, end], idx) => (
              <div key={idx} className={styles.routeItem}>
                <div
                  className={styles.routeDetails}
                  onClick={async () => {
                    const kakaoLink = await createKakaoMapLink(start, end);
                    window.open(kakaoLink, "_blank");
                  }}
                >
                  <div className={styles.spotInfo}>
                    <div className={styles.imageContainer}>
                      <img
                        src={start.imageUrl}
                        alt={start.name || "출발지"}
                        className={styles.spotImage}
                      />
                      <span className={styles.imageLabel}>{start.name}</span>
                    </div>
                  </div>
                  <div className={styles.arrow}>→</div>
                  <div className={styles.spotInfo}>
                    <div className={styles.imageContainer}>
                      <img
                        src={end.imageUrl}
                        alt={end.name || "도착지"}
                        className={styles.spotImage}
                      />
                      <span className={styles.imageLabel}>{end.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Route;
