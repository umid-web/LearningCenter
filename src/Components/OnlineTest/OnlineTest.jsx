import { useEffect, useState } from "react";
import axios from "axios";
import "./OnlineTest.scss";

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
    axios.get("/db.json")
      .then((res) => {
        const tests = res.data.tests || [];
        setAllQuestions(tests);
        setLevels(res.data.levels || []);
        if (res.data.testSettings?.questionCounts) {
          setQuestionCounts(res.data.testSettings.questionCounts);
        }
      })
      .catch((err) => console.error("Ma'lumot yuklanmadi:", err))
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
      if (answers[q.id] === q.answer) correct++;
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
                  <h3>{idx + 1}. {q.question}</h3>
                  <div className="options">
                    {q.options.map(opt => (
                      <label key={opt}>
                        <input
                          type="radio"
                          name={`q${q.id}`}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => handleAnswer(q.id, opt)}
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