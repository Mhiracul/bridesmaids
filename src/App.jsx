import { useState } from "react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import miracleImage from "./assets/miracle.jpg";
import "./App.css";

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");

  const sendResponse = (response) => {
    setAnswer(response);

    if (response === "YES") {
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 },
      });
    }

    emailjs
      .send(
        "service_iq1ubai",
        "template_yzy3yuf",
        {
          bridesmaid_name: name,
          response: response,
          time: new Date().toLocaleString(),
        },
        "PB51fDS-ZOEFysLv5",
      )
      .then(() => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.log("Email error:", error);
      });

    setTimeout(() => {
      setStep(response === "YES" ? 3 : 4);
    }, 700);
  };

  return (
    <main className="page">
      <div className="floating-star star-one">✦</div>
      <div className="floating-star star-two">✧</div>
      <div className="floating-star star-three">✦</div>

      <section className="card">
        {/* NAME */}
        {step === 0 && (
          <div className="screen">
            <div className="seal">M</div>

            <p className="eyebrow">A little something for you</p>

            <h1>
              Before you
              <em> open this...</em>
            </h1>

            <p className="description">First, tell me who you are. 👀</p>

            <input
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button disabled={!name.trim()} onClick={() => setStep(1)}>
              Continue
              <span>→</span>
            </button>
          </div>
        )}

        {/* SURPRISE */}
        {step === 1 && (
          <div className="screen">
            <div className="icon">👀</div>

            <p className="eyebrow">Okay, {name}...</p>

            <h1>
              Let’s pretend
              <em> you didn’t see this coming.</em>
            </h1>

            <p className="description">Now act surprised, please. 😂</p>

            <button onClick={() => setStep(2)}>Open your invitation ✨</button>
          </div>
        )}

        {/* REVEAL */}
        {step === 2 && (
          <div className="screen">
            <div className="icon">💍</div>

            <p className="eyebrow">Dear {name},</p>

            <h1>
              I found
              <em> my man! 🥹</em>
            </h1>

            <p className="description">And now I need my girls by my side.</p>

            <div className="divider" />

            <h2>Would you be my bridesmaid?</h2>

            <div className="choices">
              <button
                className="yes-button"
                onClick={() => sendResponse("YES")}
              >
                YES! 💕
              </button>

              <button className="no-button" onClick={() => sendResponse("NO")}>
                No 😭
              </button>
            </div>
          </div>
        )}

        {/* YES */}
        {step === 3 && (
          <div className="screen">
            <div className="big-icon">🥹💐</div>

            <p className="eyebrow">Officially confirmed</p>

            <h1>
              You said
              <em> YES! ❤️</em>
            </h1>

            <div className="photo-wrapper">
              <img src={miracleImage} alt="Miracle" className="bride-photo" />
            </div>

            <p className="description">
              {name}, welcome to the bride tribe! 🤍
              <br />
              I’m so happy you’ll be standing beside me on one of the biggest
              days of my life.
            </p>

            <div className="bridesmaid-card">
              <span>OFFICIALLY</span>
              <strong>MY BRIDESMAID</strong>
              <small>✦ MIRACLE ✦</small>
            </div>

            <a
              href="https://chat.whatsapp.com/LP8ZIrenG4f1z15DMnT42N?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              Join the Bridesmaid Group 💬
            </a>

            <p className="tiny">Your response has been received. 🤍</p>
          </div>
        )}

        {/* NO */}
        {step === 4 && (
          <div className="screen">
            <div className="big-icon">😭</div>

            <h1>Wait...</h1>

            <p className="description">
              {name}, I’m choosing to believe you clicked that by mistake. 😂
            </p>

            <button onClick={() => setStep(2)}>Okay fine, YES 💕</button>
          </div>
        )}
      </section>

      <footer>With love, Miracle ♡</footer>
    </main>
  );
}

export default App;
