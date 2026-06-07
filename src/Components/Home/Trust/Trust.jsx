import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Trust.scss';

const Counter = ({ end, suffix, isActive }) => {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && !hasStarted.current && end > 0) {
      hasStarted.current = true;
      let start = 0;
      const duration = 2000;
      const stepTime = 16;
      const increment = end / (duration / stepTime);
      timerRef.current = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timerRef.current);
          timerRef.current = null;
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, end]);

  // Agar isActive false bo‘lib, keyin true bo‘lsa, yuqoridagi useEffect ishlaydi.
  // Shuningdek, agar isActive true bo‘lib keyin false qaytsa (bo‘lishi mumkin emas), hech narsa bo‘lmaydi.

  return (
    <h3 className="trust__number">
      {count}
      {suffix}
    </h3>
  );
};

const Trust = () => {
  const [trust, setTrust] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(false);
  const sectionRef = useRef(null);
  const animatedRef = useRef(false);

  // Scroll bo‘yicha tekshirish (observer ishlamasa)
  useEffect(() => {
    const checkVisibility = () => {
      if (animatedRef.current) return;
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Agar bo‘limning yuqori qismi ekranning 80% dan yuqoriga chiqsa yoki pastki qismi ko‘rinsa
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          setVisibleCards(true);
          animatedRef.current = true;
          window.removeEventListener('scroll', checkVisibility);
          window.removeEventListener('resize', checkVisibility);
        }
      }
    };

    // Kichik kechikish bilan bir marta tekshirib, keyin eventlarni ulash
    const timeout = setTimeout(() => {
      checkVisibility();
      window.addEventListener('scroll', checkVisibility);
      window.addEventListener('resize', checkVisibility);
    }, 200);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/db.json');
        setTrust(res.data.trust);
      } catch (error) {
        console.error('Xatolik:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null;
  if (!trust) return null;

  return (
    <section ref={sectionRef} className={`trust ${visibleCards ? 'trust--visible' : ''}`}>
      <div className="trust__container">
        <h2 className="trust__title">{trust.title}</h2>
        <div className="trust__grid">
          {trust.items.map((item, index) => (
            <div className="trust__card" key={index}>
              <Counter end={item.number} suffix={item.suffix} isActive={visibleCards} />
              <p className="trust__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;