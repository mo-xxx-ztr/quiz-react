import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import questions from "./questions";
import "./Quiz.css";

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selected, setSelected] = useState(null); // stocke le choix cliqué
  const navigate = useNavigate();

  // Définir handleAnswer avec useCallback pour que useEffect puisse l'utiliser sans warning
  const handleAnswer = useCallback(
    (option) => {
      setSelected(option);

      let newScore = score;
      if (option && option === questions[current].answer) {
        newScore = score + 1;
        setScore(newScore);
      }

      setTimeout(() => {
        const next = current + 1;
        if (next < questions.length) {
          setCurrent(next);
          setSelected(null);
          setTimeLeft(15);
        } else {
          navigate("/result", {
            state: { score: newScore, total: questions.length },
          });
        }
      }, 1000);
    },
    [current, score, navigate]
  );

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleAnswer]);

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <h2 className="quiz-question">{questions[current].question}</h2>

      <div className="quiz-options">
        {questions[current].options.map((option, i) => {
          let btnClass = "quiz-btn";

          if (selected) {
            if (option === questions[current].answer) {
              btnClass += " correct"; // vert si bonne réponse
            } else if (option === selected) {
              btnClass += " wrong"; // rouge si mauvaise réponse
            }
          }

          return (
            <button
              key={i}
              onClick={() => !selected && handleAnswer(option)} // bloquer double clic
              className={btnClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      <p className="quiz-timer">⏱️ Temps restant : {timeLeft}s</p>
      <p className="quiz-progress">
        Question {current + 1} / {questions.length}
      </p>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default Quiz;
