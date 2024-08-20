import React from 'react';

const HeroSettings = ({ heroSettings, onSpeedChange, onFireRateChange }) => {
  return (
    <div>
      <label>Скорость: </label>
      <input
        type="range"
        min="1"
        max="5"
        value={heroSettings.speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
      />
      <label>Частота стрельбы: </label>
      <input
        type="range"
        min="500"
        max="2000"
        value={heroSettings.fireRate}
        onChange={(e) => onFireRateChange(Number(e.target.value))}
      />
    </div>
  );
};

export default HeroSettings;
