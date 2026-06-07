import { useState, useEffect } from 'react';
import { getHomepage, updateHomepage } from '../utils/dbApi';
import { uploadImage } from '../utils/imageUpload';
import './admin.scss';

const HomepageManager = () => {
  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [heroForm, setHeroForm] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    backgroundImage: ''
  });

  const [aboutForm, setAboutForm] = useState({
    title: '',
    description: '',
    features: []
  });

  const [trustForm, setTrustForm] = useState({
    title: '',
    values: []
  });

  const [consultationForm, setConsultationForm] = useState({
    title: '',
    description: '',
    buttonText: '',
    image: ''
  });

  const [ieltsForm, setIeltsForm] = useState({
    title: '',
    description: '',
    score: '',
    improvements: []
  });

  const [footerForm, setFooterForm] = useState({
    company: '',
    description: '',
    quickLinks: [],
    contact: {},
    social: {}
  });

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = () => {
    setLoading(true);
    const data = getHomepage();
    setHomepage(data);
    setHeroForm(data.hero);
    setAboutForm(data.about);
    setTrustForm(data.trust);
    setConsultationForm(data.consultation);
    setIeltsForm(data.ieltsResults);
    setFooterForm(data.footer);
    setLoading(false);
  };

  const handleImageUpload = async (e, setForm, formData, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploading(true);
        const base64 = await uploadImage(file, 1000);
        setForm({
          ...formData,
          [field]: base64
        });
        setImagePreview(base64);
      } catch (error) {
        alert(`Xato: ${error.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSaveSection = (section, formData) => {
    try {
      updateHomepage(section, formData);
      alert('Saqlandi!');
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page homepage-manager">
      <h1>Bosh Sahifa Boshqaruvi</h1>
      <p className="page-subtitle">Saytning bosh sahifasidagi barcha matnlar va rasmlarni boshqarish</p>

      <div className="section-tabs">
        <button
          className={`tab-btn ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveSection('hero')}
        >
          Hero Section
        </button>
        <button
          className={`tab-btn ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => setActiveSection('about')}
        >
          About
        </button>
        <button
          className={`tab-btn ${activeSection === 'trust' ? 'active' : ''}`}
          onClick={() => setActiveSection('trust')}
        >
          Trust
        </button>
        <button
          className={`tab-btn ${activeSection === 'consultation' ? 'active' : ''}`}
          onClick={() => setActiveSection('consultation')}
        >
          Consultation
        </button>
        <button
          className={`tab-btn ${activeSection === 'ielts' ? 'active' : ''}`}
          onClick={() => setActiveSection('ielts')}
        >
          IELTS Results
        </button>
        <button
          className={`tab-btn ${activeSection === 'footer' ? 'active' : ''}`}
          onClick={() => setActiveSection('footer')}
        >
          Footer
        </button>
      </div>

      <div className="section-content">
        {activeSection === 'hero' && (
          <div className="form-section">
            <h2>Hero Section</h2>
            <div className="form-group">
              <label>Asosiy Sarlavha</label>
              <input
                type="text"
                value={heroForm.title}
                onChange={(e) => setHeroForm({...heroForm, title: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Qo'shimcha Matn</label>
              <textarea
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({...heroForm, subtitle: e.target.value})}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Tugma Matni</label>
              <input
                type="text"
                value={heroForm.ctaText}
                onChange={(e) => setHeroForm({...heroForm, ctaText: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Fon Rasmi</label>
              <div className="image-upload-area">
                {heroForm.backgroundImage && (
                  <div className="image-preview">
                    <img src={heroForm.backgroundImage} alt="Hero" />
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => setHeroForm({...heroForm, backgroundImage: ''})}
                    >
                      ✕
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setHeroForm, heroForm, 'backgroundImage')}
                  disabled={uploading}
                />
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => handleSaveSection('hero', heroForm)}>
              Saqlash
            </button>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="form-section">
            <h2>About Section</h2>
            <div className="form-group">
              <label>Sarlavha</label>
              <input
                type="text"
                value={aboutForm.title}
                onChange={(e) => setAboutForm({...aboutForm, title: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Tavsif</label>
              <textarea
                value={aboutForm.description}
                onChange={(e) => setAboutForm({...aboutForm, description: e.target.value})}
                rows="4"
              />
            </div>

            <h3 style={{marginTop: '2rem'}}>Xususiyatlar</h3>
            {aboutForm.features?.map((feature, idx) => (
              <div key={idx} className="feature-item" style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="Icon (emoji yoki matn)"
                  value={feature.icon}
                  onChange={(e) => {
                    const newFeatures = [...aboutForm.features];
                    newFeatures[idx].icon = e.target.value;
                    setAboutForm({...aboutForm, features: newFeatures});
                  }}
                  style={{marginBottom: '0.5rem'}}
                />
                <input
                  type="text"
                  placeholder="Xususiyat matni"
                  value={feature.text}
                  onChange={(e) => {
                    const newFeatures = [...aboutForm.features];
                    newFeatures[idx].text = e.target.value;
                    setAboutForm({...aboutForm, features: newFeatures});
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-delete"
                  onClick={() => setAboutForm({...aboutForm, features: aboutForm.features.filter((_, i) => i !== idx)})}
                  style={{marginTop: '0.5rem'}}
                >
                  O'chirish
                </button>
              </div>
            ))}

            <button
              className="btn btn-secondary"
              onClick={() => setAboutForm({...aboutForm, features: [...(aboutForm.features || []), {icon: '', text: ''}]})}
              style={{marginBottom: '1rem'}}
            >
              + Xususiyat Qo'shish
            </button>

            <button className="btn btn-primary" onClick={() => handleSaveSection('about', aboutForm)}>
              Saqlash
            </button>
          </div>
        )}

        {activeSection === 'trust' && (
          <div className="form-section">
            <h2>Trust Section</h2>
            <div className="form-group">
              <label>Sarlavha</label>
              <input
                type="text"
                value={trustForm.title}
                onChange={(e) => setTrustForm({...trustForm, title: e.target.value})}
              />
            </div>

            <h3 style={{marginTop: '2rem'}}>Qiymatlar</h3>
            {trustForm.values?.map((value, idx) => (
              <div key={idx} className="value-item" style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="Raqam (100+)"
                  value={value.number}
                  onChange={(e) => {
                    const newValues = [...trustForm.values];
                    newValues[idx].number = e.target.value;
                    setTrustForm({...trustForm, values: newValues});
                  }}
                  style={{marginBottom: '0.5rem'}}
                />
                <input
                  type="text"
                  placeholder="Label (Kurslar)"
                  value={value.label}
                  onChange={(e) => {
                    const newValues = [...trustForm.values];
                    newValues[idx].label = e.target.value;
                    setTrustForm({...trustForm, values: newValues});
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-delete"
                  onClick={() => setTrustForm({...trustForm, values: trustForm.values.filter((_, i) => i !== idx)})}
                  style={{marginTop: '0.5rem'}}
                >
                  O'chirish
                </button>
              </div>
            ))}

            <button
              className="btn btn-secondary"
              onClick={() => setTrustForm({...trustForm, values: [...(trustForm.values || []), {number: '', label: ''}]})}
              style={{marginBottom: '1rem'}}
            >
              + Qiymat Qo'shish
            </button>

            <button className="btn btn-primary" onClick={() => handleSaveSection('trust', trustForm)}>
              Saqlash
            </button>
          </div>
        )}

        {activeSection === 'consultation' && (
          <div className="form-section">
            <h2>Consultation Section</h2>
            <div className="form-group">
              <label>Sarlavha</label>
              <input
                type="text"
                value={consultationForm.title}
                onChange={(e) => setConsultationForm({...consultationForm, title: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Tavsif</label>
              <textarea
                value={consultationForm.description}
                onChange={(e) => setConsultationForm({...consultationForm, description: e.target.value})}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Tugma Matni</label>
              <input
                type="text"
                value={consultationForm.buttonText}
                onChange={(e) => setConsultationForm({...consultationForm, buttonText: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Rasmi</label>
              <div className="image-upload-area">
                {consultationForm.image && (
                  <div className="image-preview">
                    <img src={consultationForm.image} alt="Consultation" />
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => setConsultationForm({...consultationForm, image: ''})}
                    >
                      ✕
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setConsultationForm, consultationForm, 'image')}
                  disabled={uploading}
                />
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => handleSaveSection('consultation', consultationForm)}>
              Saqlash
            </button>
          </div>
        )}

        {activeSection === 'ielts' && (
          <div className="form-section">
            <h2>IELTS Results Section</h2>
            <div className="form-group">
              <label>Sarlavha</label>
              <input
                type="text"
                value={ieltsForm.title}
                onChange={(e) => setIeltsForm({...ieltsForm, title: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Tavsif</label>
              <textarea
                value={ieltsForm.description}
                onChange={(e) => setIeltsForm({...ieltsForm, description: e.target.value})}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>O'rtacha Ball</label>
              <input
                type="text"
                value={ieltsForm.score}
                onChange={(e) => setIeltsForm({...ieltsForm, score: e.target.value})}
                placeholder="7.5"
              />
            </div>

            <h3 style={{marginTop: '2rem'}}>Takomillashish Misollar</h3>
            {ieltsForm.improvements?.map((improvement, idx) => (
              <div key={idx} className="improvement-item" style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="O'quvchi nomi"
                  value={improvement.student}
                  onChange={(e) => {
                    const newImprovements = [...ieltsForm.improvements];
                    newImprovements[idx].student = e.target.value;
                    setIeltsForm({...ieltsForm, improvements: newImprovements});
                  }}
                  style={{marginBottom: '0.5rem'}}
                />
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Avvalgi: 5.5"
                    value={improvement.from}
                    onChange={(e) => {
                      const newImprovements = [...ieltsForm.improvements];
                      newImprovements[idx].from = e.target.value;
                      setIeltsForm({...ieltsForm, improvements: newImprovements});
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Keyingi: 7.8"
                    value={improvement.to}
                    onChange={(e) => {
                      const newImprovements = [...ieltsForm.improvements];
                      newImprovements[idx].to = e.target.value;
                      setIeltsForm({...ieltsForm, improvements: newImprovements});
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Kurs nomi"
                  value={improvement.course}
                  onChange={(e) => {
                    const newImprovements = [...ieltsForm.improvements];
                    newImprovements[idx].course = e.target.value;
                    setIeltsForm({...ieltsForm, improvements: newImprovements});
                  }}
                  style={{marginTop: '0.5rem'}}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-delete"
                  onClick={() => setIeltsForm({...ieltsForm, improvements: ieltsForm.improvements.filter((_, i) => i !== idx)})}
                  style={{marginTop: '0.5rem'}}
                >
                  O'chirish
                </button>
              </div>
            ))}

            <button
              className="btn btn-secondary"
              onClick={() => setIeltsForm({...ieltsForm, improvements: [...(ieltsForm.improvements || []), {student: '', from: '', to: '', course: ''}]})}
              style={{marginBottom: '1rem'}}
            >
              + Misol Qo'shish
            </button>

            <button className="btn btn-primary" onClick={() => handleSaveSection('ieltsResults', ieltsForm)}>
              Saqlash
            </button>
          </div>
        )}

        {activeSection === 'footer' && (
          <div className="form-section">
            <h2>Footer</h2>
            <div className="form-group">
              <label>Kompaniya nomi</label>
              <input
                type="text"
                value={footerForm.company}
                onChange={(e) => setFooterForm({...footerForm, company: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Tavsif</label>
              <textarea
                value={footerForm.description}
                onChange={(e) => setFooterForm({...footerForm, description: e.target.value})}
                rows="2"
              />
            </div>

            <h3 style={{marginTop: '2rem'}}>Kontakt Ma'lumotlari</h3>
            <div className="form-group">
              <label>Manzil</label>
              <input
                type="text"
                value={footerForm.contact?.address || ''}
                onChange={(e) => setFooterForm({...footerForm, contact: {...footerForm.contact, address: e.target.value}})}
              />
            </div>

            <div className="form-group">
              <label>Telefon</label>
              <input
                type="text"
                value={footerForm.contact?.phone || ''}
                onChange={(e) => setFooterForm({...footerForm, contact: {...footerForm.contact, phone: e.target.value}})}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={footerForm.contact?.email || ''}
                onChange={(e) => setFooterForm({...footerForm, contact: {...footerForm.contact, email: e.target.value}})}
              />
            </div>

            <h3 style={{marginTop: '2rem'}}>Ijtimoiy Tarmoqlar</h3>
            <div className="form-group">
              <label>Facebook</label>
              <input
                type="url"
                value={footerForm.social?.facebook || ''}
                onChange={(e) => setFooterForm({...footerForm, social: {...footerForm.social, facebook: e.target.value}})}
              />
            </div>

            <div className="form-group">
              <label>Instagram</label>
              <input
                type="url"
                value={footerForm.social?.instagram || ''}
                onChange={(e) => setFooterForm({...footerForm, social: {...footerForm.social, instagram: e.target.value}})}
              />
            </div>

            <div className="form-group">
              <label>Twitter</label>
              <input
                type="url"
                value={footerForm.social?.twitter || ''}
                onChange={(e) => setFooterForm({...footerForm, social: {...footerForm.social, twitter: e.target.value}})}
              />
            </div>

            <button className="btn btn-primary" onClick={() => handleSaveSection('footer', footerForm)}>
              Saqlash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomepageManager;
