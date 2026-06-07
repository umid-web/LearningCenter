import { useState } from 'react';
import { parseWordFile, validateQuestions } from '../utils/wordParser';
import './admin.scss';

const WordTestUpload = ({ onUploadSuccess, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [editingQuestions, setEditingQuestions] = useState([]);
  const [testInfo, setTestInfo] = useState({
    title: '',
    description: '',
    level: 'A1'
  });

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Check file type
    if (!selectedFile.name.endsWith('.docx')) {
      setError('Faqat .docx formatdagi fayllar qabul qilinadi');
      return;
    }

    setFile(selectedFile);
    setError('');
    await parseFile(selectedFile);
  };

  const parseFile = async (fileToparse) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await parseWordFile(fileToparse);
      
      if (result.success) {
        setPreview(result);
        setEditingQuestions(result.questions);
      } else {
        setError(result.message || 'Faylni qayta ishlab bo\'lmadi');
        setPreview(null);
      }
    } catch (err) {
      setError(err.message || 'Xatoli');
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionEdit = (index, field, value) => {
    const updatedQuestions = [...editingQuestions];
    if (field.includes('option')) {
      const optionIndex = parseInt(field.split('[')[1]);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = parseInt(value);
    } else {
      updatedQuestions[index][field] = value;
    }
    setEditingQuestions(updatedQuestions);
  };

  const handleUpload = () => {
    // Validate test info
    if (!testInfo.title || !testInfo.description) {
      setError('Test nomi va tavsifini kiriting');
      return;
    }

    // Validate questions
    const validation = validateQuestions(editingQuestions);
    if (!validation.isValid) {
      setError('Savollarni tekshiring:\n' + validation.errors.join('\n'));
      return;
    }

    // Call parent callback
    onUploadSuccess({
      title: testInfo.title,
      description: testInfo.description,
      level: testInfo.level,
      questions: editingQuestions,
      duration: editingQuestions.length * 2,
      totalPoints: editingQuestions.length
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Word Fayldan Test Yaratish</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {!preview ? (
            <div className="word-upload-section">
              <h3>1. Word Faylni Tanlang</h3>
              <div className="image-upload-area">
                <input
                  type="file"
                  accept=".docx"
                  onChange={handleFileSelect}
                  disabled={loading}
                />
                <p className="upload-hint">
                  .docx faylni tanlang yoki shu yerga o'tkazing
                </p>
                {loading && <p>Fayling qayta ishlanmoqda...</p>}
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  marginTop: '1rem'
                }}>
                  {error}
                </div>
              )}

              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 1rem', color: '#93c5fd' }}>Format Talabi:</h4>
                <pre style={{ color: '#e0e0e0', fontSize: '0.85rem', overflow: 'auto' }}>
Savol 1 matni
A) Birinchi variant
B) Ikkinchi variant
C) Uchinchi variant
D) To'rtinchi variant
Answer: A

Savol 2 matni
A) Variant 1
B) Variant 2
C) Variant 3
D) Variant 4
Javob: B
                </pre>
              </div>
            </div>
          ) : (
            <div className="word-preview-section">
              <h3>2. Test Ma'lumotlarini Kiriting</h3>
              
              <div className="form-group">
                <label>Test Nomi *</label>
                <input
                  type="text"
                  value={testInfo.title}
                  onChange={(e) => setTestInfo({...testInfo, title: e.target.value})}
                  placeholder="Masalan: Grammar Test 1"
                />
              </div>

              <div className="form-group">
                <label>Tavsif *</label>
                <textarea
                  value={testInfo.description}
                  onChange={(e) => setTestInfo({...testInfo, description: e.target.value})}
                  placeholder="Test haqida qisqacha ma'lumot"
                  rows="3"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: '#e0e0e0',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div className="form-group">
                <label>Daraja</label>
                <select
                  value={testInfo.level}
                  onChange={(e) => setTestInfo({...testInfo, level: e.target.value})}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: '#e0e0e0'
                  }}
                >
                  <option value="A1">A1 - Boshlang'ich</option>
                  <option value="A2">A2 - Elementar</option>
                  <option value="B1">B1 - O'rta</option>
                  <option value="B2">B2 - Yuqori o'rta</option>
                  <option value="C1">C1 - Ilg'or</option>
                </select>
              </div>

              <h3 style={{ marginTop: '2rem' }}>3. Savollarni Tekshiring va O'zgartiring</h3>
              <p style={{ color: '#e0e0e0', opacity: 0.7, fontSize: '0.9rem', margin: '0 0 1rem' }}>
                {editingQuestions.length} ta savol topildi. Kerak bo'lsa tahrirlang:
              </p>

              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {editingQuestions.map((question, qIndex) => (
                  <div key={qIndex} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ margin: '0 0 0.75rem', color: 'var(--admin-accent)' }}>
                      Savol {qIndex + 1}
                    </h4>

                    <div className="form-group">
                      <label>Savol Matni</label>
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleQuestionEdit(qIndex, 'text', e.target.value)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          color: '#e0e0e0'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="form-group">
                          <label>{String.fromCharCode(65 + oIndex)})</label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleQuestionEdit(qIndex, `option[${oIndex}]`, e.target.value)}
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '8px',
                              padding: '0.75rem 1rem',
                              color: '#e0e0e0',
                              margin: '0'
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="form-group">
                      <label>To'g'ri Javob</label>
                      <select
                        value={question.correctAnswer}
                        onChange={(e) => handleQuestionEdit(qIndex, 'correctAnswer', e.target.value)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          color: '#e0e0e0'
                        }}
                      >
                        <option value="0">{`A) ${question.options[0]}`}</option>
                        <option value="1">{`B) ${question.options[1]}`}</option>
                        <option value="2">{`C) ${question.options[2]}`}</option>
                        <option value="3">{`D) ${question.options[3]}`}</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  marginTop: '1rem'
                }}>
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          {preview ? (
            <>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                  setEditingQuestions([]);
                  setError('');
                }}
              >
                ← Faylni O'zgartirish
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleUpload}
              >
                ✓ Saqlash va Yaratish
              </button>
            </>
          ) : (
            <button className="btn btn-secondary" onClick={onClose}>
              Bekor qilish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordTestUpload;
