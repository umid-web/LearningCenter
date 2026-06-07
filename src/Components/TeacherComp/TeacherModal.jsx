import { useEffect } from 'react';

const TeacherModal = ({ teacher, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('teacher-modal')) onClose();
  };

  if (!teacher) return null;

  return (
    <div className="teacher-modal" onClick={handleBackdropClick}>
      <div className="teacher-modal__content">
        <button className="teacher-modal__close" onClick={onClose}>
          ✕
        </button>

        <div className="teacher-modal__left">
          <img
            src={teacher.image || 'https://via.placeholder.com/280'}
            alt={teacher.name}
            className="teacher-modal__image"
          />
          <div className="teacher-modal__result-badge">{teacher.result}</div>
        </div>

        <div className="teacher-modal__right">
          <h2 className="teacher-modal__name">{teacher.name}</h2>
          <div className="teacher-modal__rating">
            {'⭐'.repeat(Math.floor(teacher.rating || 0))}{' '}
            <span>{teacher.rating || '—'}</span>
          </div>

          <div className="teacher-modal__info-row">
            <strong>Tajribasi:</strong> {teacher.experience || "Ma'lumot yo‘q"}
          </div>
          <div className="teacher-modal__info-row">
            <strong>Yo‘nalishlar:</strong>{' '}
            {teacher.subjects ? teacher.subjects.join(' · ') : "Ma'lumot yo‘q"}
          </div>
          <div className="teacher-modal__info-row">
            <strong>Yutuqlari:</strong>
            <ul>
              {teacher.achievements && teacher.achievements.length ? (
                teacher.achievements.map((ach, idx) => <li key={idx}>{ach}</li>)
              ) : (
                <li>Ma'lumot yo‘q</li>
              )}
            </ul>
          </div>
          <div className="teacher-modal__bio">
            <strong>Qisqacha:</strong>
            <p>{teacher.bio || "Ma'lumot yo‘q"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;