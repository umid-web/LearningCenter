import { useEffect, useState } from "react";
import axios from "axios";
import "./Consultation.scss";

const Consultation = () => {
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "+998 ",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get("/db.json").then((res) => {
      setData(res.data.consultation);
    });
  }, []);

  if (!data) return null;

  const createMarkup = (text) => ({
    __html: text,
  });

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.startsWith("998")) {
      value = value.slice(3);
    }

    let formatted = "+998";

    if (value.length > 0) {
      formatted += " " + value.substring(0, 2);
    }

    if (value.length > 2) {
      formatted += " " + value.substring(2, 5);
    }

    if (value.length > 5) {
      formatted += " " + value.substring(5, 7);
    }

    if (value.length > 7) {
      formatted += " " + value.substring(7, 9);
    }

    setFormData({
      ...formData,
      phone: formatted,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Yuborildi:", formData);

    setSuccess(true);

    setFormData({
      name: "",
      phone: "+998 ",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <section className="consult">
      <div className="consult__shape consult__shape--1" />
      <div className="consult__shape consult__shape--2" />
      <div className="consult__shape consult__shape--3" />
      <div className="consult__shape consult__shape--4" />

      <div className="consult__container">
        <div className="consult__grid">

          {/* FORM */}
          <div className="consult__form-wrapper">
            <div className="consult__form-glow"></div>

            <div className="consult__form-header">
              <h3 className="consult__form-title">
                Bepul konsultatsiya
              </h3>

              <p className="consult__form-sub">
                24 soat ichida javob oling
              </p>
            </div>

            <form
              className="consult__form"
              onSubmit={handleSubmit}
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder={data.form.namePlaceholder}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                />

                <span className="input-focus-line"></span>
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  placeholder={data.form.phonePlaceholder}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength={17}
                  required
                />

                <span className="input-focus-line"></span>
              </div>

              <button
                type="submit"
                className="consult__submit-btn"
              >
                <span>{data.form.button}</span>

                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {success && (
                <div className="consult__success">
                  ✅ So‘rovingiz muvaffaqiyatli yuborildi!
                </div>
              )}

              <small className="consult__privacy">
                🔒 Ma’lumotlaringiz maxfiy saqlanadi
              </small>
            </form>
          </div>

          {/* INFO */}
          <div className="consult__info">
            <div className="consult__header">
              <span className="consult__badge">
                ⭐ Nega aynan biz?
              </span>

              <h2
                className="consult__title"
                dangerouslySetInnerHTML={createMarkup(
                  data.title
                )}
              />

              <p className="consult__description">
                {data.description}
              </p>

              <div className="consult__highlight">
                {data.highlight}
              </div>
            </div>

            <div className="consult__timeline">
              {data.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="consult__timeline-item"
                >
                  <div className="consult__timeline-icon-box">
                    <span className="consult__timeline-icon">
                      {step.icon}
                    </span>
                  </div>

                  <div className="consult__timeline-content">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="consult__phones">
              {data.phones.map((phone, index) => (
                <a
                  key={index}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="consult__phone-link"
                >
                  <span className="phone-icon">📞</span>
                  <span className="phone-text">
                    {phone}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Consultation;