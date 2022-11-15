const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;
import React from "react";

export default function MapDistance({ leg }) {
  if (!leg.distance || !leg.duration) return null;

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );
  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );

  return (
    <div>
      <p>
        This Merchant is <span className="highlight">{leg.distance.text}</span>{" "}
        away from your location.
      </p>
    </div>
  );
}
