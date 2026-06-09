// src/Admin/StudentManager.jsx
import ResourceManager from "./components/ResourceManager.jsx";
import { useResource } from "./hooks/useResource.js";
import { studentsService } from "./services/crudService.js";

const fields = [
  { name: "name", label: "Ism familiya", required: true, placeholder: "Akmal Tursunov" },
  { name: "email", label: "Email", type: "email", placeholder: "student@example.com" },
  { name: "phone", label: "Telefon", placeholder: "+998 90 123 45 67" },
  {
    name: "level",
    label: "Daraja",
    type: "select",
    options: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper Intermediate",
      "C1 Advanced",
    ],
  },
  { name: "course", label: "Kurs", placeholder: "IELTS Preparation" },
  {
    name: "status",
    label: "Holati",
    type: "select",
    default: "active",
    options: ["active", "inactive"],
  },
];

const columns = [
  { key: "name", label: "Talaba" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Telefon" },
  { key: "level", label: "Daraja" },
  { key: "course", label: "Kurs" },
  {
    key: "status",
    label: "Holati",
    render: (r) => (
      <span className={`status-pill ${r.status === "active" ? "on" : "off"}`}>
        {r.status === "active" ? "Faol" : "Nofaol"}
      </span>
    ),
  },
];

const StudentManager = () => {
  const resource = useResource(studentsService);
  return (
    <ResourceManager
      title="Talabalar boshqaruvi"
      subtitle="Talabalarni qo'shing, tahrirlang yoki o'chiring"
      fields={fields}
      columns={columns}
      resource={resource}
    />
  );
};

export default StudentManager;
