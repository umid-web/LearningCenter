// src/Admin/TeacherManager.jsx
import ResourceManager from "./components/ResourceManager.jsx";
import { useResource } from "./hooks/useResource.js";
import { teachersService } from "./services/crudService.js";

const fields = [
  { name: "name", label: "Ism familiya", required: true, placeholder: "Sarvar Akramov" },
  { name: "image", label: "Rasm URL", placeholder: "https://..." },
  { name: "result", label: "Natija", placeholder: "IELTS 8.5" },
  { name: "experience", label: "Tajriba", placeholder: "10+ yil" },
  { name: "rating", label: "Reyting", type: "number", default: 5 },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "O'qituvchi haqida qisqacha...",
  },
];

const columns = [
  {
    key: "name",
    label: "O'qituvchi",
    render: (r) => (
      <span className="cell-title">
        {r.image && (
          <img className="cell-avatar" src={r.image || "/placeholder.svg"} alt="" />
        )}
        {r.name}
      </span>
    ),
  },
  { key: "result", label: "Natija" },
  { key: "experience", label: "Tajriba" },
  {
    key: "rating",
    label: "Reyting",
    render: (r) => <span className="badge">{r.rating} ★</span>,
  },
];

const TeacherManager = () => {
  const resource = useResource(teachersService);
  return (
    <ResourceManager
      title="O'qituvchilar boshqaruvi"
      subtitle="O'qituvchilarni qo'shing, tahrirlang yoki o'chiring"
      fields={fields}
      columns={columns}
      resource={resource}
    />
  );
};

export default TeacherManager;
