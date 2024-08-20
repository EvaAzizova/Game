import React, { useState, useEffect, useRef } from 'react';
import Hero from './models/Hero';
import Spell from './models/Spell';
import HeroMenu from './components/HeroMenu';
import HeroSettings from './components/HeroSettings';

const DuelGame = () => {
  const canvasRef = useRef(null);
  const [heroes, setHeroes] = useState([]);
  const [spells, setSpells] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);
  const [hero1Settings, setHero1Settings] = useState({ speed: 2, fireRate: 1000 });
  const [hero2Settings, setHero2Settings] = useState({ speed: 2, fireRate: 1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const hero1 = new Hero(50, canvas.height / 2, 20, "blue", hero1Settings.speed, 1);
    const hero2 = new Hero(canvas.width - 50, canvas.height / 2, 20, "red", hero2Settings.speed, 1);

    setHeroes([hero1, hero2]);

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Движение героев
      heroes.forEach((hero) => {
        hero.move(canvas);
        hero.draw(ctx);
      });

      // Движение и отрисовка заклинаний
      setSpells((prevSpells) => {
        return prevSpells
          .map((spell) => {
            spell.move();
            spell.draw(ctx);

            // Проверка на столкновение заклинания с героем
            heroes.forEach((hero) => {
              if (Math.hypot(spell.x - hero.x, spell.y - hero.y) < hero.radius + spell.radius) {
                // Если заклинание попадает в героя
                console.log("Попадание в героя!");
                spell.hit = true; // помечаем заклинание как попавшее
              }
            });

            return spell;
          })
          .filter((spell) => !spell.hit); // Убираем заклинания, которые попали в героев
      });

      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [heroes]);

  // Стрельба героев
  useEffect(() => {
    const interval1 = setInterval(() => {
      const hero1 = heroes[0];
      if (hero1) {
        const newSpell = new Spell(hero1.x + hero1.radius, hero1.y, 10, hero1.color, 5, 0);
        setSpells((prevSpells) => [...prevSpells, newSpell]);
      }
    }, hero1Settings.fireRate);

    const interval2 = setInterval(() => {
      const hero2 = heroes[1];
      if (hero2) {
        const newSpell = new Spell(hero2.x - hero2.radius, hero2.y, 10, hero2.color, -5, 0);
        setSpells((prevSpells) => [...prevSpells, newSpell]);
      }
    }, hero2Settings.fireRate);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [heroes, hero1Settings.fireRate, hero2Settings.fireRate]);

  const handleClickHero = (hero) => {
    setSelectedHero(hero);
    setMenuVisible(true);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onClick={(e) => {
          const x = e.clientX - canvasRef.current.offsetLeft;
          const y = e.clientY - canvasRef.current.offsetTop;
          heroes.forEach((hero) => {
            if (Math.hypot(hero.x - x, hero.y - y) < hero.radius) {
              handleClickHero(hero);
            }
          });
        }}
      />
      {menuVisible && (
        <HeroMenu
          hero={selectedHero}
          onChangeColor={(color) => {
            selectedHero.color = color;
            setMenuVisible(false);
          }}
        />
      )}
      <HeroSettings
        heroSettings={hero1Settings}
        onSpeedChange={(speed) => setHero1Settings({ ...hero1Settings, speed })}
        onFireRateChange={(rate) => setHero1Settings({ ...hero1Settings, fireRate: rate })}
      />
      <HeroSettings
        heroSettings={hero2Settings}
        onSpeedChange={(speed) => setHero2Settings({ ...hero2Settings, speed })}
        onFireRateChange={(rate) => setHero2Settings({ ...hero2Settings, fireRate: rate })}
      />
    </div>
  );
};

export default DuelGame;
