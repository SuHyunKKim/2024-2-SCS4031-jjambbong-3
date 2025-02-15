import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TravelSummary.module.css";
import TravelSpot from "./TravelSpot";
import { loadDetailedPlan } from "../api/savePlanApi";

function TravelSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("사용자");
  const [itinerarySummary, setItinerarySummary] = useState({
    totalPlaces: 0,
    tags: [],
    totalDays: 0,
  });
  const [sampleHighlights, setSampleHighlights] = useState([]);
  const [formattedTags, setFormattedTags] = useState([]);

  const {
    itinerary,
    places: chatPlaces,
    hashTags: chatHashTags,
  } = location.state || {};

  // 데이터 처리 함수
  const handleDataProcessing = useCallback(async () => {
    let placesData = {};
    let tags = [];
    let isChatData = false;

    if (chatPlaces && chatHashTags) {
      placesData = chatPlaces;
      tags = chatHashTags;
      isChatData = true;
    } else if (itinerary?.title) {
      try {
        const userId = localStorage.getItem("userId");
        const travelName = itinerary.title;

        if (!userId || !travelName) {
          alert(
            "사용자 ID 또는 여행 이름이 누락되었습니다. 마이 페이지로 이동합니다."
          );
          navigate("/mypage");
          return;
        }

        const response = await loadDetailedPlan(userId, travelName);
        placesData = response?.plan?.places || {};
        tags = response?.plan?.hash_tag || [];
        isChatData = false;
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        alert("일정 데이터를 불러오는 데 실패했습니다.");
        navigate("/mypage");
        return;
      }
    } else {
      console.error("데이터가 없습니다.");
      alert("데이터를 가져올 수 없습니다.");
      navigate("/mypage");
      return;
    }

    // 속도 개선을 위한 주요 이미지 매핑
    const imageMapping = {
      황우지해안:
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AdDdOWpJUNQJy-60SccLIhgElDKPvhoXgQ4heqyyP1kl9ZACLtIEQoqsuTFJmGO6TpLvfj011NF7TEA5pJWJkiABZDUrDTT7hv8y8L2D-5Yqjrk0A2AEZzzDRsEW4q76NQPGvV14x3yv_dMUtLYDObvVEStv7UWLkHxoaMoUJRyHYu8bZw0O&key=AIzaSyBenOSRj_n3bCTZcdqOmqnnBmCEsi1kOyI",
      동산관광농원:
        "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F1906EC454F717C0D05",
      국수문화거리:
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AdDdOWrt7FbbMaQ5I8WvHX0aVC4jKq5AE8vXN3eGxyFcMo37rp04V_nZNDdbVwy36SMb3G9iAefH74aRSwOXY1PM6XV0QIdzFe6_GVqb4FFyEsgdmlz7uSDUC4ht6DTaNY-Yr9dxCBu3peYZeA1K6D7P4Q8rtzkzEkVrCYX4dKiLQFGiECuN&key=AIzaSyBenOSRj_n3bCTZcdqOmqnnBmCEsi1kOyI",
      관덕정성지:
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AdDdOWohGU_p7dLOYPled12cR8gct9WyD55JD6NK2iLww_mssegWiCNRAQVe7khamIGTIPkhg2rcEKGWRX7RouXLKMOEabvhM56OQhI3bfD5hrVn0uEeCVIU37D63BuSQJ_hgFRdzagONRPNOqedtIDhG0qxkxonI_6yq3nOAI92VIFhFv0_&key=AIzaSyBenOSRj_n3bCTZcdqOmqnnBmCEsi1kOyI",
      제주민속관광타운:
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AdDdOWrJVYvkRNj22WQQN1DiFZf8Yrz4Kc6Lqeog2CcVRrXgADC4T8FAIfxlC3r9Z5UmtyqKa19UZXNG2MERP-YPfJkDox3IruuK3hJsa1LLoedLLNWNupqCj2iJ6yhR83pYl9DtiF65T_yewNSJs4eDPb299nepoUMQvXIZO4gDX4MXpcv7&key=AIzaSyBenOSRj_n3bCTZcdqOmqnnBmCEsi1kOyI",
      제주허브동산:
        "https://lh5.googleusercontent.com/p/AF1QipP7lNiMllNOcG8FC3DqALuO3HMBv30ylFMyZoAx=w408-h306-k-no",
      한라산탐방로:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODEwMjJfMjM2%2FMDAxNTQwMjA5NTEyOTUw.xIjeYzYHUYjtuSpnMOsbtrx9LhoTTaOb8oHkZgS-Rfwg.sG8Fo8Qz4skIqCzxUWWHQPvWq5pNKVZ5-ompCipqZfQg.JPEG.kokage1120%2FP1970602.jpg%23591x886",
      "호루의 한끼":
        "https://lh5.googleusercontent.com/p/AF1QipPoEvEX9rTCdXoxzYJ8OzNJ4XfhJXZTduXPr4mJ=w426-h240-k-no",
      동백동산:
        "https://lh5.googleusercontent.com/p/AF1QipMnuHsgty_PkqBF_ewJfoUVzQ-WwmBtYDZLuVW1=w408-h272-k-no",
      서빈백사해수욕장:
        "https://lh5.googleusercontent.com/p/AF1QipNoXRQjxaZ3sPpU9t6cgSt2jGWPsTtPA1e0En6c=w408-h306-k-no",
      "형과 아우(한얼식당)":
        "https://lh5.googleusercontent.com/p/AF1QipNlQahXghvLQE2c1sS77OoTBYrZtpSZwp0L8X7u=w408-h905-k-no",
      교래생태체험장:
        "https://lh5.googleusercontent.com/p/AF1QipMJrMPZN3qMRV9O_5IuSw5Hy9FjRAupVvYIDZZL=w533-h240-k-no",
      천지연기정길:
        "https://lh5.googleusercontent.com/p/AF1QipOAkhVKrq3broFnCMCx4sdqm45jxANDfoC2k3bi=w426-h240-k-no",
      "Cafe Gyulkkot Darak":
        "https://lh5.googleusercontent.com/p/AF1QipODfr1-46iW-luojJPPZ8v0ruhnexsiHVTSnkZP=w408-h306-k-no",
      협재관광지:
        "https://lh5.googleusercontent.com/p/AF1QipNFmem5tBp7EDwMWE2eUNzWkwbvMUnsuenKD7Na=w408-h306-k-no",
      표선우동가게:
        "https://lh5.googleusercontent.com/p/AF1QipNsiy4JqSDNepPKRhYM2mUlrA574x8QhGBvY8iO=w408-h306-k-no",
      사라봉공원:
        "https://lh5.googleusercontent.com/p/AF1QipP86pLgM-W16NUUbSG-hTGtIIsNOs57zTrrCGso=w408-h306-k-no",
      "각 is in 별":
        "https://lh5.googleusercontent.com/p/AF1QipOmfRYtUXu6rDXj1dSTsnps2SjX5vlvTz7etcCS=w519-h240-k-no",
      곽지관광지:
        "https://lh5.googleusercontent.com/p/AF1QipP3sRGK46ajzwD3kKvhqYNyGJDFL5pJL8FDrVQc=w408-h306-k-no",
    };

    const processedPlaces = Object.entries(placesData).map(
      ([dayKey, spots]) => {
        const validSpots = Array.isArray(spots)
          ? spots.map((spot) => ({
              name: spot.name || "이름 없음",
              address: isChatData
                ? spot.address || "주소 정보 없음"
                : spot.location || "주소 정보 없음",
              category: spot.category || "카테고리 없음",
              imageUrl: imageMapping[spot.name] || spot.imageUrl || null, // 매핑된 이미지 URL 적용
            }))
          : [];
        return {
          day: isChatData ? dayKey : dayKey.replace("day", ""),
          highlights: validSpots,
        };
      }
    );

    setSampleHighlights(processedPlaces);
    const totalPlaces = processedPlaces.reduce(
      (sum, day) => sum + day.highlights.length,
      0
    );
    const totalDays = processedPlaces.length;

    setItinerarySummary({ totalPlaces, tags, totalDays });
    processHashTags(tags);
  }, [chatPlaces, chatHashTags, itinerary, navigate]);

  // useEffect에서 handleDataProcessing 호출
  useEffect(() => {
    handleDataProcessing();
  }, [handleDataProcessing]);

  // 해시태그 처리 함수
  const processHashTags = (tags) => {
    if (Array.isArray(tags)) {
      setFormattedTags(tags.filter((tag) => tag.startsWith("#")));
    } else if (typeof tags === "string") {
      setFormattedTags(
        tags.split(/[\s,]+/).filter((tag) => tag.startsWith("#"))
      );
    } else {
      setFormattedTags([]);
    }
  };

  // 사용자 이름 로드
  useEffect(() => {
    const nickname = localStorage.getItem("nickname") || "사용자";
    setUserName(nickname);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.itinerarySummary}>
        <p>
          <b>{userName}</b>님을 위한{" "}
          {itinerarySummary.totalDays > 0 ? itinerarySummary.totalDays - 1 : 0}
          박 {itinerarySummary.totalDays}일 여행코스
        </p>
        <p>
          총 <b>{itinerarySummary.totalPlaces}</b>개의 여행지/음식점/카페
        </p>
        <div className={styles.tagsContainer}>
          {formattedTags.length > 0 ? (
            formattedTags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))
          ) : (
            <span>No hashtags available</span>
          )}
        </div>
      </div>

      <div className={styles.highlights}>
        {sampleHighlights.map((day) => (
          <div key={day.day} className={styles.dayHighlights}>
            <h3>{day.day}</h3>
            <div className={styles.places}>
              {day.highlights.length > 0 ? (
                day.highlights.map((spot, index) => (
                  <TravelSpot
                    key={index}
                    spotData={{
                      name: spot.name || "이름 없음",
                      category: spot.category || "카테고리 없음",
                      address: spot.address,
                      imageUrl: spot.imageUrl, // imageUrl 그대로 전달
                    }}
                  />
                ))
              ) : (
                <p>여행지 정보가 없습니다.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelSummary;
