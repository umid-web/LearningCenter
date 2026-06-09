// src/Admin/CourseManager.jsx
import ResourceManager from "./components/ResourceManager.jsx";
import { useResource } from "./hooks/useResource.js";
import { coursesService } from "./services/crudService.js";

const fields = [
  { name: "title", label: "Kurs nomi", required: true, placeholder: "General English" },
  { name: "level", label: "Daraja", placeholder: "A1-B1" },
  { name: "duration", label: "Davomiyligi", placeholder: "3 oy" },
  { name: "icon", label: "Ikonka (emoji)", placeholder: "📘" },
  { name: "price", label: "Narxi", placeholder: "1 200 000 so'm" },
  {
    name: "fullDescription",
    label: "Tavsif",
    type: "textarea",
    placeholder: "Kurs haqida batafsil...",
  },
];

const columns = [
  {
    key: "title",
    label: "Kurs",
    render: (r) => (
      <span className="cell-title">
        <span className="cell-icon">{r.icon}</span> {r.title}
      </span>
    ),
  },
  { key: "level", label: "Daraja" },
  { key: "duration", label: "Davomiyligi" },
  { key: "price", label: "Narxi" },
];

const CourseManager = () => {
  const resource = useResource(coursesService);
  return (
    <ResourceManager
      title="Kurslar boshqaruvi"
      subtitle="Kurslarni qo'shing, tahrirlang yoki o'chiring"
      fields={fields}
      columns={columns}
      resource={resource}
    />
  );
};

export default CourseManager;
