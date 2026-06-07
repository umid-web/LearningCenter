import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './PlacementTest.scss';

const PlacementTest = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/db.json');
        setData(res.data.placementTest);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="placement-test">
      <div className="placement-test__bg" />
      <div className="placement-test__container">
        <motion.div
          className="placement-test__banner"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="placement-test__badge-wrapper">
            <span className="placement-test__badge">✨ Bepul | 20 daqiqa</span>
          </div>
          <h2 className="placement-test__title">{data.title}</h2>
          <p className="placement-test__description">{data.description}</p>
          <motion.a
            href={data.button.link}
            className="placement-test__button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{data.button.text}</span>
            <svg className="placement-test__button-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PlacementTest;