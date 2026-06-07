import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../utils/dbApi';
import { uploadImage } from '../utils/imageUpload';
import './admin.scss';

const EnhancedSettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    siteName: '',
    logo: '',
    favicon: '',
    contact: {
      phone1: '',
      phone2: '',
      email: '',
      address: ''
    },
    social: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      linkedin: ''
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    }
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setLoading(true);
    const settings = getSettings();
    setFormData(settings);
    if (settings.logo) {
      setLogoPreview(settings.logo);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value
      }
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value
      }
    }));
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value
      }
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploading(true);
        const base64 = await uploadImage(file, 500);
        setFormData(prev => ({
          ...prev,
          logo: base64
        }));
        setLogoPreview(base64);
      } catch (error) {
        alert(`Xato: ${error.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = () => {
    try {
      updateSettings(formData);
      alert('Sozlamalar muvaffaqiyatli saqlandi!');
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page settings-page">
      <h1>Sayt Sozlamalari</h1>
      <p className="page-subtitle">Saytning asosiy va SEO sozlamalarini boshqarish</p>

      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          Umumiy
        </button>
        <button
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Kontakt
        </button>
        <button
          className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          Ijtimoiy
        </button>
        <button
          className={`tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          SEO
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && (
          <div className="form-section">
            <h2>Umumiy Sozlamalar</h2>
            
            <div className="form-group">
              <label>Sayt nomi</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleInputChange}
                placeholder="O'quv Markaz"
              />
            </div>

            <div className="form-group">
              <label>Logotipi</label>
              <div className="image-upload-area">
                {logoPreview && (
                  <div className="image-preview" style={{width: '200px'}}>
                    <img src={logoPreview} alt="Logo" style={{maxHeight: '100px'}} />
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => {
                        setLogoPreview(null);
                        setFormData(prev => ({...prev, logo: ''}));
                      }}
                    >
                      ✕ O'chirish
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploading}
                />
                <p className="upload-hint">{uploading ? 'Yuklanmoqda...' : 'Logo rasm tanlang (max 500KB)'}</p>
              </div>
            </div>

            <div className="form-group">
              <label>Favicon URL</label>
              <input
                type="text"
                name="favicon"
                value={formData.favicon}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </div>

            <button className="btn btn-primary" onClick={handleSave}>
              Saqlash
            </button>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="form-section">
            <h2>Kontakt Ma'lumotlari</h2>
            
            <div className="form-group">
              <label>Birinci telefon raqami</label>
              <input
                type="tel"
                name="phone1"
                value={formData.contact.phone1}
                onChange={handleContactChange}
                placeholder="+998 (90) 123-45-67"
              />
            </div>

            <div className="form-group">
              <label>Ikkinchi telefon raqami</label>
              <input
                type="tel"
                name="phone2"
                value={formData.contact.phone2}
                onChange={handleContactChange}
                placeholder="+998 (91) 123-45-67"
              />
            </div>

            <div className="form-group">
              <label>Email manzili</label>
              <input
                type="email"
                name="email"
                value={formData.contact.email}
                onChange={handleContactChange}
                placeholder="info@learningcenter.uz"
              />
            </div>

            <div className="form-group">
              <label>Manzil</label>
              <textarea
                name="address"
                value={formData.contact.address}
                onChange={handleContactChange}
                placeholder="Toshkent, O'zbekiston"
                rows="3"
              />
            </div>

            <button className="btn btn-primary" onClick={handleSave}>
              Saqlash
            </button>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="form-section">
            <h2>Ijtimoiy Tarmoq Havolalari</h2>
            
            <div className="form-group">
              <label>Facebook</label>
              <input
                type="url"
                name="facebook"
                value={formData.social.facebook}
                onChange={handleSocialChange}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="form-group">
              <label>Instagram</label>
              <input
                type="url"
                name="instagram"
                value={formData.social.instagram}
                onChange={handleSocialChange}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="form-group">
              <label>Twitter / X</label>
              <input
                type="url"
                name="twitter"
                value={formData.social.twitter}
                onChange={handleSocialChange}
                placeholder="https://twitter.com/..."
              />
            </div>

            <div className="form-group">
              <label>YouTube</label>
              <input
                type="url"
                name="youtube"
                value={formData.social.youtube}
                onChange={handleSocialChange}
                placeholder="https://youtube.com/..."
              />
            </div>

            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.social.linkedin}
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/company/..."
              />
            </div>

            <button className="btn btn-primary" onClick={handleSave}>
              Saqlash
            </button>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="form-section">
            <h2>SEO Sozlamalari</h2>
            
            <div className="form-group">
              <label>Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleSeoChange}
                placeholder="O'quv Markaz - Professional Ingliz Tili"
              />
              <p className="hint">Google qidiruv natijalarida ko'rsatiladi</p>
            </div>

            <div className="form-group">
              <label>Meta Description</label>
              <textarea
                name="metaDescription"
                value={formData.seo.metaDescription}
                onChange={handleSeoChange}
                placeholder="Professional o'qituvchilar bilan ingliz tilini o'rganing"
                rows="3"
              />
              <p className="hint">Google qidiruv natijalarida ko'rsatiladi (max 160 belgi)</p>
            </div>

            <div className="form-group">
              <label>Kalit Sozlar</label>
              <textarea
                name="keywords"
                value={formData.seo.keywords}
                onChange={handleSeoChange}
                placeholder="ingliz tili, kurs, o'qituvchi, IELTS"
                rows="3"
              />
              <p className="hint">Vergul bilan ajratilgan kalit so'zlar</p>
            </div>

            <button className="btn btn-primary" onClick={handleSave}>
              Saqlash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSettingsManager;
