import { useEffect, useState } from "react";
import axios from "axios";
import "./Aboute.scss";

const Aboute = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/db.json").then((res) => {
      setData(res.data.about);
    });
  }, []);

  if (!data) return null;

  // Xavfsiz HTML render (title ichidagi span uchun)
  const createMarkup = (html) => ({ __html: html });

  return (
    <section className="about">
      <div className="about__container">
        {/* Hero section */}
        <div className="about__hero">
          <span className="about__badge">{data.hero.badge}</span>
          <h1 className="about__title" dangerouslySetInnerHTML={createMarkup(data.hero.title)} />
          <p className="about__description">{data.hero.description}</p>
        </div>

        {/* Mission */}
        <div className="about__mission">
          <h2 className="about__mission-title">{data.mission.title}</h2>
          <p className="about__mission-desc">{data.mission.description}</p>
          <blockquote className="about__mission-quote">“{data.mission.quote}”</blockquote>
        </div>

        {/* Values (grid) */}
        <div className="about__values">
          <h2 className="about__section-title">Bizning qadriyatlarimiz</h2>
          <div className="about__values-grid">
            {data.values.map((value, idx) => (
              <div key={idx} className="about__value-card">
                <div className="about__value-icon">{value.icon}</div>
                <h3 className="about__value-title">{value.title}</h3>
                <p className="about__value-desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Directions */}
        <div className="about__directions">
          <h2 className="about__section-title">Yo‘nalishlarimiz</h2>
          <div className="about__directions-grid">
            {data.directions.map((dir, idx) => (
              <div key={idx} className="about__direction-item">
                <span className="about__direction-dot">•</span>
                <div>
                  <h4>{dir.name}</h4>
                  <p>{dir.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div className="about__goal">
          <div className="about__goal-inner">
            <h2>{data.goal.title}</h2>
            <p>{data.goal.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboute;