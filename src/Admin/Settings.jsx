// src/Admin/Settings.jsx
import { useState } from "react";

const Settings = () => {
  const [apiUrl, setApiUrl] = useState(
    import.meta.env.VITE_API_URL || "http://localhost:3000"
  );
  const [centerName, setCenterName] = useState("O'quv Markaz");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Persist locally for now; ready to POST to /settings when backend exists.
    localStorage.setItem(
      "adminSettings",
      JSON.stringify({ apiUrl, centerName })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <section className="admin-page">
      <header className="page-header">
        <div>
          <h1>Sozlamalar</h1>
          <p className="page-subtitle">Tizim va API konfiguratsiyasi</p>
        </div>
      </header>

      <div className="panel">
        <form className="resource-form settings-form" onSubmit={handleSubmit}>
          {saved && <div className="form-success">Sozlamalar saqlandi.</div>}
          <div className="form-group">
            <label htmlFor="centerName">Markaz nomi</label>
            <input
              id="centerName"
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apiUrl">API Base URL</label>
            <input
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
            <small className="field-hint">
              Backend tayyor bo&apos;lganda shu yerni o&apos;zgartiring (yoki
              VITE_API_URL muhit o&apos;zgaruvchisini sozlang).
            </small>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Settings;
