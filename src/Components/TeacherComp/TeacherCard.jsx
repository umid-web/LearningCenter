const TeacherCard = ({ teacher, onViewDetails }) => {
  if (!teacher) return null;

  return (
    <div className="teacher-card">
      <div className="teacher-card__inner">
        <div className="teacher-card__image-wrapper">
          <img
            src={teacher.image || "https://via.placeholder.com/400"}
            alt={teacher.name}
            className="teacher-card__image"
          />
          <div className="teacher-card__overlay">
            <button
              className="teacher-card__details-btn"
              onClick={() => onViewDetails(teacher)}
            >
              <span>Batafsil</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="teacher-card__info">
          <h3 className="teacher-card__name">{teacher.name}</h3>
          <p className="teacher-card__result">{teacher.result}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;