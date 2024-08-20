import React from 'react';

const HeroMenu = ({ hero, onChangeColor }) => {
  return (
    <div style={{ position: 'absolute', top: hero.y, left: hero.x }}>
      <button onClick={() => onChangeColor('red')}>Красный</button>
      <button onClick={() => onChangeColor('blue')}>Синий</button>
      <button onClick={() => onChangeColor('green')}>Зелёный</button>
    </div>
  );
};

export default HeroMenu;
