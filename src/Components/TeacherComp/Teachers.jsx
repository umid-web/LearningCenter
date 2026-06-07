import { useEffect, useState } from "react";
import axios from "axios";
import TeacherCard from "../TeacherComp/TeacherCard";
import TeacherModal from "../TeacherComp/TeacherModal";
import "../TeacherComp/Teachers.scss";

const Teachers = () => {
  const [pageData, setPageData] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    axios
      .get("/db.json")
      .then((res) => {
        const data = res.data;
        // Sahifa matnlarini olish
        setPageData(data.teachersPage || {
          badge: "Bizning jamoa",
          title: "Tajribali ustozlar",
          subtitle: "Har bir o‘qituvchimiz o‘z sohasining professionali"
        });
        // O‘qituvchilarni olish
        const teachersList = data.teachers || [];
        setTeachers(teachersList);
        setFilteredTeachers(teachersList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ma'lumotlarni yuklashda xatolik:", err);
        setLoading(false);
      });
  }, []);

  // Filtr variantlarini o‘qituvchilarning result maydonidan avtomatik yig‘ish
  const getFilterOptions = () => {
    const levels = teachers.map(t => t.result).filter(Boolean);
    const uniqueLevels = [...new Set(levels)];
    return uniqueLevels.sort();
  };

  const filterOptions = getFilterOptions();

  const handleFilter = (level) => {
    setActiveFilter(level);
    if (level === "all") {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(teacher => teacher.result === level);
      setFilteredTeachers(filtered);
    }
  };

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="teachers-loading">
        <div className="loader"></div>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <section className="teachers">
      <div className="teachers__container">
        <div className="teachers__header">
          <span className="teachers__badge">{pageData?.badge}</span>
          <h1 className="teachers__title">{pageData?.title}</h1>
          <p className="teachers__subtitle">{pageData?.subtitle}</p>
        </div>

        {/* FILTER SECTION */}
        {filterOptions.length > 0 && (
          <div className="teachers__filter">
            <div className="teachers__filter-label">Daraja bo‘yicha:</div>
            <div className="teachers__filter-buttons">
              <button
                className={`teachers__filter-btn ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => handleFilter("all")}
              >
                Barchasi
              </button>
              {filterOptions.map((level) => (
                <button
                  key={level}
                  className={`teachers__filter-btn ${activeFilter === level ? "active" : ""}`}
                  onClick={() => handleFilter(level)}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="teachers__filter-count">
              {filteredTeachers.length} / {teachers.length} ta o‘qituvchi
            </div>
          </div>
        )}

        {filteredTeachers.length === 0 ? (
          <div className="teachers__empty">
            <p>Bu darajadagi o‘qituvchi topilmadi</p>
          </div>
        ) : (
          <div className="teachers__grid">
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onViewDetails={openModal}
              />
            ))}
          </div>
        )}
      </div>

      {selectedTeacher && (
        <TeacherModal teacher={selectedTeacher} onClose={closeModal} />
      )}
    </section>
  );
};

export default Teachers;