import { useLocation, Link } from "react-router-dom";
import "./Result.css";

function Result() {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="result-container">
      <h2 className="result-title">Quiz Terminé 🎉</h2>
      <p className="result-score">
        Ton score : <span className="font-bold">{score}</span> / {total}
      </p>
      <Link to="/">
        <button className="result-btn">Rejouer 🔄</button>
      </Link>
    </div>
  );
}

export default Result;
