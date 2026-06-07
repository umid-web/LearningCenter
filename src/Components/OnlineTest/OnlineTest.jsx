import { useEffect, useState } from "react";
import "./OnlineTest.scss";
import axios from "axios";

function OnlineTest() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);
  const [userLevel, setUserLevel] = useState(null);
  const [questionCounts, setQuestionCounts] = useState([10, 15, 20, 25]);

  useEffect(() => {
    // Fetch from actual db.json file
    axios.get("/db.json")
      .then((res) => {
        const db = res.data;
        
        // Get all questions from tests
        let allQuestionsList = [];
        
        if (db.tests && Array.isArray(db.tests)) {
          // Check if tests is array of individual questions (flat structure) or test objects
          if (db.tests.length > 0) {
            const firstItem = db.tests[0];
            
            if (firstItem.hasOwnProperty('question') || firstItem.hasOwnProperty('text')) {
              // Flat structure: individual questions
              allQuestionsList = db.tests.map((q, idx) => {
                // Find correct answer index from options
                let correctAnswerIdx = 0;
                if (q.answer) {
                  const answerText = String(q.answer).toLowerCase().trim();
                  correctAnswerIdx = (q.options || []).findIndex(
                    opt => String(opt).toLowerCase().trim() === answerText
                  );
                  if (correctAnswerIdx === -1) correctAnswerIdx = 0; // fallback
                }
                
                return {
                  id: q.id || idx,
                  text: q.question || q.text || '',
                  options: q.options || [],
                  answer: q.answer || '',
                  correctAnswer: correctAnswerIdx
                };
              });
            } else if (firstItem.hasOwnProperty('questions')) {
              // Test collection structure: test objects with questions array
              firstItem.questions.forEach(test => {
                if (test.questions && Array.isArray(test.questions)) {
                  allQuestionsList = [...allQuestionsList, ...test.questions];
                }
              });
            }
          }
        }
        
        setAllQuestions(allQuestionsList);
        
        // Get levels and test settings
        const testSettings = db.testSettings || {};
        setLevels(testSettings.levels || db.levels || []);
        if (testSettings.questionCounts) {
          setQuestionCounts(testSettings.questionCounts);
        }
      })
      .catch((err) => {
        console.error("[v0] Test data loading error:", err);
        setAllQuestions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const startTest = (count) => {
    if (allQuestions.length === 0) {
      alert("Hozircha test savollari mavjud emas.");
      return;
    }
    const available = Math.min(count, allQuestions.length);
    const randomQuestions = shuffleArray(allQuestions).slice(0, available);
    setQuestions(randomQuestions);
    setStarted(true);
    setAnswers({});
    setResult(null);
    setUserLevel(null);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const finishTest = () => {
    let correct = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const correctAnswer = typeof q.answer === 'number' ? q.answer : q.correctAnswer;
      
      if (userAnswer !== undefined && userAnswer !== '') {
        if (Number(userAnswer) === Number(correctAnswer)) {
          correct++;
        }
      }
    });
    const percent = Math.round((correct / questions.length) * 100);
    const foundLevel = levels.find(l => percent >= l.min && percent <= l.max);

    setResult({ correct, total: questions.length, percent });
    setUserLevel(foundLevel);
  };

  const resetTest = () => {
    setStarted(false);
    setResult(null);
    setAnswers({});
    setQuestions([]);
  };

  if (loading) {
    return (
      <div className="online-test">
        <div className="container">
          <div className="test-loading">
            <div className="spinner"></div>
            <p>Yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="online-test">
      <div className="container">
        <div className="test-header">
          <h1>Ingliz Tili Daraja Testi</h1>
          <p>Ingliz tilingiz darajasini bepul aniqlang</p>
        </div>

        {!started && !result && (
          <div className="test-selector">
            <h2>Test sonini tanlang</h2>
            <div className="buttons">
              {questionCounts.map(count => (
                <button key={count} onClick={() => startTest(count)}>
                  {count} ta savol
                </button>
              ))}
            </div>
          </div>
        )}

        {started && !result && (
          <>
            <div className="questions">
              {questions.map((q, idx) => (
                <div key={q.id} className="question-card">
                  <h3>{idx + 1}. {q.text || q.question}</h3>
                  <div className="options">
                    {q.options.map((opt, optIdx) => (
                      <label key={optIdx}>
                        <input
                          type="radio"
                          name={`q${q.id}`}
                          value={optIdx}
                          checked={Number(answers[q.id]) === optIdx}
                          onChange={() => handleAnswer(q.id, optIdx)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="finish-btn"
              onClick={finishTest}
              disabled={Object.keys(answers).length !== questions.length}
            >
              Testni yakunlash {Object.keys(answers).length !== questions.length && `(${Object.keys(answers).length}/${questions.length})`}
            </button>
          </>
        )}

        {result && (
          <div className="result-box">
            <h2>Natija</h2>
            <div className="score">{result.correct} / {result.total}</div>
            <div className="percent">{result.percent}%</div>
            {userLevel && (
              <>
                <h3>{userLevel.level}</h3>
                <p>{userLevel.description}</p>
                <div className="recommended">
                  Tavsiya etilgan kurs:
                  <strong>
                    {" "}
                    {userLevel.recommendedCourse ||
                      (userLevel.level.includes("A1") ? "General English (A1)" :
                       userLevel.level.includes("A2") ? "General English (A2)" :
                       userLevel.level.includes("B1") ? "General English (B1)" :
                       userLevel.level.includes("B2") ? "General English (B2)" : "IELTS / CEFR tayyorlov")}
                  </strong>
                </div>
              </>
            )}
            <button onClick={resetTest}>Qayta topshirish</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default OnlineTest;
