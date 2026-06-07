import { useState, useEffect } from 'react';
import { getTests, addTest, updateTest, deleteTest, addQuestion, updateQuestion, deleteQuestion } from '../utils/dbApi';
import WordTestUpload from './WordTestUpload';
import './admin.scss';

const TestManager = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showWordUpload, setShowWordUpload] = useState(false);
  const [editingTestId, setEditingTestId] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  
  const [testFormData, setTestFormData] = useState({
    title: '',
    description: '',
    level: 'A1',
    passingScore: 70,
    duration: 30,
    totalPoints: 100
  });

  const [questionFormData, setQuestionFormData] = useState({
    text: '',
    type: 'multiple',
    points: 1,
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = () => {
    setLoading(true);
    setTests(getTests());
    setLoading(false);
  };

  const handleTestInputChange = (e) => {
    const { name, value } = e.target;
    setTestFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'passingScore' || name === 'totalPoints' ? parseInt(value) : value
    }));
  };

  const handleQuestionInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionFormData(prev => ({
      ...prev,
      [name]: name === 'points' || name === 'correctAnswer' ? parseInt(value) : value
    }));
  };

  const handleOptionChange = (index, value) => {
    setQuestionFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const handleAddNewTest = () => {
    setEditingTestId(null);
    setTestFormData({
      title: '',
      description: '',
      level: 'A1',
      passingScore: 70,
      duration: 30,
      totalPoints: 100
    });
    setShowTestModal(true);
  };

  const handleEditTest = (test) => {
    setEditingTestId(test.id);
    setTestFormData({
      title: test.title,
      description: test.description,
      level: test.level,
      passingScore: test.passingScore,
      duration: test.duration,
      totalPoints: test.totalPoints
    });
    setShowTestModal(true);
  };

  const handleSaveTest = () => {
    if (!testFormData.title || !testFormData.description) {
      alert('Testning nomi va tavsifini kiriting!');
      return;
    }

    try {
      if (editingTestId) {
        updateTest(editingTestId, testFormData);
      } else {
        addTest(testFormData);
      }
      loadTests();
      setShowTestModal(false);
      alert('Test muvaffaqiyatli saqlandi!');
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  const handleDeleteTest = (id) => {
    if (window.confirm('Bu testni o\'chirib tashlamoqchisiz?')) {
      try {
        deleteTest(id);
        loadTests();
        if (selectedTest?.id === id) {
          setSelectedTest(null);
        }
        alert('Test o\'chirildi!');
      } catch (error) {
        alert(`Xato: ${error.message}`);
      }
    }
  };

  const handleAddQuestion = () => {
    setEditingQuestionId(null);
    setQuestionFormData({
      text: '',
      type: 'multiple',
      points: 1,
      options: ['', '', '', ''],
      correctAnswer: 0
    });
    setShowQuestionModal(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestionId(question.id);
    setQuestionFormData({
      text: question.text,
      type: question.type || 'multiple',
      points: question.points || 1,
      options: question.options || ['', '', '', ''],
      correctAnswer: question.correctAnswer || 0
    });
    setShowQuestionModal(true);
  };

  const handleSaveQuestion = () => {
    if (!questionFormData.text) {
      alert('Savolni kiriting!');
      return;
    }

    if (questionFormData.type === 'multiple' && questionFormData.options.some(opt => !opt)) {
      alert('Barcha variantlarni to\'ldiring!');
      return;
    }

    try {
      if (editingQuestionId) {
        updateQuestion(selectedTest.id, editingQuestionId, questionFormData);
      } else {
        addQuestion(selectedTest.id, questionFormData);
      }

      const updatedTests = getTests();
      setTests(updatedTests);
      const updatedTest = updatedTests.find(t => t.id === selectedTest.id);
      setSelectedTest(updatedTest);
      setShowQuestionModal(false);
      alert('Savol muvaffaqiyatli saqlandi!');
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Bu savolni o\'chirib tashlamoqchisiz?')) {
      try {
        deleteQuestion(selectedTest.id, questionId);
        const updatedTests = getTests();
        setTests(updatedTests);
        const updatedTest = updatedTests.find(t => t.id === selectedTest.id);
        setSelectedTest(updatedTest);
        alert('Savol o\'chirildi!');
      } catch (error) {
        alert(`Xato: ${error.message}`);
      }
    }
  };

  const handleWordUploadSuccess = (testData) => {
    try {
      addTest(testData);
      loadTests();
      setShowWordUpload(false);
      alert('Test Word fayldan muvaffaqiyatli yaratildi!');
    } catch (error) {
      alert(`Xato: ${error.message}`);
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || test.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  if (loading) {
    return <div className="admin-page"><p>Yuklanmoqda...</p></div>;
  }

  return (
    <div className="admin-page tests-page">
      <h1>Testlar Boshqaruvi</h1>
      <p className="page-subtitle">Online testlar va savollarni boshqarish</p>

      <div className="page-actions">
        <button className="btn btn-primary" onClick={handleAddNewTest}>
          + Yangi Test Qo'shish
        </button>
        <button className="btn btn-primary" onClick={() => setShowWordUpload(true)} style={{background: 'linear-gradient(135deg, #10b981, #34d399)'}}>
          📄 Word Fayldan Yaratish
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Testni qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="filter-select"
        >
          <option value="all">Barcha darajalar</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
      </div>

      <div className="tests-grid">
        <div className="tests-list">
          <h3>Testlar Ro'yxati</h3>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nomi</th>
                  <th>Darajasi</th>
                  <th>Savollar</th>
                  <th>Vaqti</th>
                  <th>Harakatlar</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.length > 0 ? (
                  filteredTests.map(test => (
                    <tr key={test.id} className={selectedTest?.id === test.id ? 'selected' : ''}>
                      <td>
                        <button 
                          style={{background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline'}}
                          onClick={() => setSelectedTest(test)}
                        >
                          {test.title}
                        </button>
                      </td>
                      <td>{test.level}</td>
                      <td>{test.questions?.length || 0} ta</td>
                      <td>{test.duration} min</td>
                      <td className="action-buttons">
                        <button className="btn btn-sm btn-edit" onClick={() => handleEditTest(test)}>✏️</button>
                        <button className="btn btn-sm btn-delete" onClick={() => handleDeleteTest(test.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>Testlar topilmadi</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedTest && (
          <div className="test-questions">
            <h3>{selectedTest.title} - Savollar</h3>
            <button className="btn btn-primary" onClick={handleAddQuestion} style={{marginBottom: '1rem'}}>
              + Yangi Savol Qo'shish
            </button>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Savol</th>
                    <th>Turi</th>
                    <th>Ballari</th>
                    <th>Harakatlar</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTest.questions && selectedTest.questions.length > 0 ? (
                    selectedTest.questions.map((q, idx) => (
                      <tr key={q.id}>
                        <td>{idx + 1}</td>
                        <td>{q.text.substring(0, 50)}...</td>
                        <td><span className="type-badge">{q.type === 'multiple' ? 'Ko\'p variantli' : q.type === 'truefalse' ? 'To\'g\'ri/Noto\'g\'ri' : 'Esse'}</span></td>
                        <td>{q.points}</td>
                        <td className="action-buttons">
                          <button className="btn btn-sm btn-edit" onClick={() => handleEditQuestion(q)}>✏️</button>
                          <button className="btn btn-sm btn-delete" onClick={() => handleDeleteQuestion(q.id)}>🗑️</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>Savollar qo\'shilmagan</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showTestModal && (
        <div className="modal-overlay" onClick={() => setShowTestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTestId ? 'Testni Tahrirlash' : 'Yangi Test Qo\'shish'}</h2>
              <button className="modal-close" onClick={() => setShowTestModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Test nomi *</label>
                <input
                  type="text"
                  name="title"
                  value={testFormData.title}
                  onChange={handleTestInputChange}
                  placeholder="Test nomi"
                />
              </div>

              <div className="form-group">
                <label>Tavsifi *</label>
                <textarea
                  name="description"
                  value={testFormData.description}
                  onChange={handleTestInputChange}
                  placeholder="Test haqida qisqacha tavsif"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Darajasi</label>
                  <select name="level" value={testFormData.level} onChange={handleTestInputChange}>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Vaqti (minut)</label>
                  <input
                    type="number"
                    name="duration"
                    value={testFormData.duration}
                    onChange={handleTestInputChange}
                    min="1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>O'tish balli (%)</label>
                  <input
                    type="number"
                    name="passingScore"
                    value={testFormData.passingScore}
                    onChange={handleTestInputChange}
                    min="0"
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label>Jami ballari</label>
                  <input
                    type="number"
                    name="totalPoints"
                    value={testFormData.totalPoints}
                    onChange={handleTestInputChange}
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowTestModal(false)}>Bekor qilish</button>
              <button className="btn btn-primary" onClick={handleSaveTest}>Saqlash</button>
            </div>
          </div>
        </div>
      )}

      {showQuestionModal && (
        <div className="modal-overlay" onClick={() => setShowQuestionModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingQuestionId ? 'Savolni Tahrirlash' : 'Yangi Savol Qo\'shish'}</h2>
              <button className="modal-close" onClick={() => setShowQuestionModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Savol *</label>
                <textarea
                  name="text"
                  value={questionFormData.text}
                  onChange={handleQuestionInputChange}
                  placeholder="Savolni kiriting"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Turi</label>
                  <select name="type" value={questionFormData.type} onChange={handleQuestionInputChange}>
                    <option value="multiple">Ko'p variantli</option>
                    <option value="truefalse">To'g'ri/Noto'g'ri</option>
                    <option value="essay">Esse</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Ballari</label>
                  <input
                    type="number"
                    name="points"
                    value={questionFormData.points}
                    onChange={handleQuestionInputChange}
                    min="1"
                  />
                </div>
              </div>

              {questionFormData.type === 'multiple' && (
                <>
                  <label style={{display: 'block', marginBottom: '1rem', fontWeight: '600'}}>Variantlar</label>
                  {questionFormData.options.map((option, idx) => (
                    <div key={idx} className="form-group">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        placeholder={`Variant ${idx + 1}`}
                      />
                    </div>
                  ))}

                  <div className="form-group">
                    <label>To'g'ri javob</label>
                    <select
                      name="correctAnswer"
                      value={questionFormData.correctAnswer}
                      onChange={handleQuestionInputChange}
                    >
                      {questionFormData.options.map((_, idx) => (
                        <option key={idx} value={idx}>Variant {idx + 1}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowQuestionModal(false)}>Bekor qilish</button>
              <button className="btn btn-primary" onClick={handleSaveQuestion}>Saqlash</button>
            </div>
          </div>
        </div>
      )}

      {showWordUpload && (
        <WordTestUpload 
          onUploadSuccess={handleWordUploadSuccess}
          onClose={() => setShowWordUpload(false)}
        />
      )}
    </div>
  );
};

export default TestManager;
