// src/Admin/components/ResourceManager.jsx
// Drives a full CRUD page (table + create/edit modal + delete confirm)
// from a simple field configuration. Keeps every manager page tiny.
import { useState } from "react";
import DataTable from "./DataTable.jsx";
import Modal from "./Modal.jsx";

const buildEmpty = (fields) =>
  fields.reduce((acc, f) => ({ ...acc, [f.name]: f.default ?? "" }), {});

const ResourceManager = ({ title, subtitle, fields, columns, resource }) => {
  const { items, loading, error, saving, create, update, remove } = resource;

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(buildEmpty(fields));
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const openCreate = () => {
    setEditing(null);
    setForm(buildEmpty(fields));
    setSubmitError(null);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ ...buildEmpty(fields), ...row });
    setSubmitError(null);
    setModalOpen(true);
  };

  const handleChange = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      if (editing) {
        await update(editing.id, form);
      } else {
        await create(form);
      }
      setModalOpen(false);
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  const confirmDelete = async () => {
    try {
      await remove(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      setSubmitError(err.message);
      setDeleteTarget(null);
    }
  };

  return (
    <section className="admin-page">
      <header className="page-header">
        <div>
          <h1>{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        <button type="button" className="btn-primary" onClick={openCreate}>
          + Qo&apos;shish
        </button>
      </header>

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={(row) => setDeleteTarget(row)}
      />

      <Modal
        open={modalOpen}
        title={editing ? "Tahrirlash" : "Yangi qo'shish"}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setModalOpen(false)}
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              form="resource-form"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </>
        }
      >
        <form id="resource-form" className="resource-form" onSubmit={handleSubmit}>
          {submitError && <div className="form-error">{submitError}</div>}
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  value={form[field.name]}
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  <option value="" disabled>
                    Tanlang...
                  </option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  rows={3}
                  value={form[field.name]}
                  required={field.required}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type || "text"}
                  value={form[field.name]}
                  required={field.required}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
            </div>
          ))}
        </form>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        title="O'chirishni tasdiqlang"
        onClose={() => setDeleteTarget(null)}
        footer={
          <>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setDeleteTarget(null)}
            >
              Bekor qilish
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={confirmDelete}
            >
              O&apos;chirish
            </button>
          </>
        }
      >
        <p>
          Rostdan ham <strong>{deleteTarget?.name || deleteTarget?.title}</strong>{" "}
          ni o&apos;chirmoqchimisiz? Bu amalni qaytarib bo&apos;lmaydi.
        </p>
      </Modal>
    </section>
  );
};

export default ResourceManager;
