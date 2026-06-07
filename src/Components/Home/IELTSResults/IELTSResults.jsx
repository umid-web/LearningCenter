import { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./IELTSResults.scss";

const IELTSResults = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/db.json").then((res) => {
      setData(res.data.ieltsResults);
    });
  }, []);

  if (!data) return null;

  return (
    <section className="ielts">
      <div className="ielts__container">
        <div className="ielts__header">
          <h2 className="ielts__title">{data.title}</h2>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          pagination={{ dynamicBullets: true, clickable: true }}
          className="ielts__swiper"
        >
          {data.students.map((student, index) => (
            <SwiperSlide key={index}>
              <div className="ielts__card">
                <div className="ielts__card-inner">
                  <div className="ielts__image-wrapper">
                    <img src={student.image} alt={student.name} className="ielts__image" />
                    <div className="ielts__overall-badge">IELTS {student.overall}</div>
                  </div>
                  <h3 className="ielts__name">{student.name}</h3>
                  <div className="ielts__scores">
                    <div className="ielts__score-item">
                      <span>Listening</span>
                      <strong>{student.listening}</strong>
                    </div>
                    <div className="ielts__score-item">
                      <span>Reading</span>
                      <strong>{student.reading}</strong>
                    </div>
                    <div className="ielts__score-item">
                      <span>Writing</span>
                      <strong>{student.writing}</strong>
                    </div>
                    <div className="ielts__score-item">
                      <span>Speaking</span>
                      <strong>{student.speaking}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default IELTSResults;