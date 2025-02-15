import React from "react";
import styles from "./TravelSpot.module.css";
import defaultImageUrl from "../assets/images/jeju.png";
function TravelSpot({ spotData }) {
  const { imageUrl, name, category, address } = spotData;
  return (
    <div className={styles.spotContainer}>
      {/* 이미지 표시 */}
      <img
        src={imageUrl || defaultImageUrl} // 이미지가 없으면 기본 이미지
        alt={name || "Travel Spot"} // 대체 텍스트
        className={styles.image}
      />

      {/* 장소 설명 */}
      <div className={styles.description}>
        <span className={styles.name}>{name || "Unknown Spot"}</span>
        <span className={styles.category}>
          {category || "Category Unavailable"}
        </span>
        <span className={styles.address}>
          {address || "Address Unavailable"}
        </span>
      </div>
    </div>
  );
}

export default TravelSpot;
