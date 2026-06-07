import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/db.json")
      .then((res) => {
        console.log(res.data.footer);
        setData(res.data.footer);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!data) return null;

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">

          <div className="footer__brand">
            <img
              src={data.logo}
              alt="Logo"
              className="footer__logo"
            />

            <p className="footer__brand-desc">
              IELTS, CEFR va General English kurslari orqali
              xalqaro darajadagi natijalarga erishing.
            </p>
          </div>

          <div className="footer__column">
            <h3>Sahifalar</h3>

            {data.links.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="footer__link"
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          <div className="footer__column">
            <h3>Ijtimoiy tarmoqlar</h3>

            {data.socials.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="footer__link footer__social-link"
              >
                <span className="footer__social-icon">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </a>
            ))}
          </div>

          <div className="footer__column">
            <h3>Bog‘lanish</h3>

            <a
              href={`tel:${data.phone.replace(/\s/g, "")}`}
              className="footer__contact-link"
            >
              📞 {data.phone}
            </a>

            <a
              href={`mailto:${data.email}`}
              className="footer__contact-link"
            >
              ✉️ {data.email}
            </a>
          </div>

        </div>

        <div className="footer__bottom">
          <p>{data.copyright}</p>
        </div>
      </div>
                <a
            href="https://t.me/umid_web"
            target="_blank"
            rel="noreferrer"
            className="footer__creator-btn"
          >
            Sayt yaratish
          </a>
    </footer>
  );
};

export default Footer;