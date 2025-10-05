import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenue au Quiz! 🎉</h1>
    <h2>Frontend uniquement — backend non inclus (hébergement payant pour node.js).</h2>
      
      <Link to="/quiz">
        <button className="start-btn">Commencer le Quiz</button>
      </Link>

      {/* QR Code Section */}
      <div className="qr-section">
        <p className="qr-text">Scanne ou clique pour visiter mon portfolio :</p>
        <a 
          href="https://zatermus-portfolio.netlify.app" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src="/portfolioqr.jpg" 
            alt="QR Code Portfolio" 
            className="qr-img" 
          />
        </a>
      </div>
    </div>
  );
}

export default Home;
