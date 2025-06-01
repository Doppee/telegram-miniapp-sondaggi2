import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [surveys, setSurveys] = useState([]);
  const [current, setCurrent] = useState(null);
  const [stelle, setStelle] = useState(0);
  const [done, setDone] = useState(false);
  const userId = "user123"; // Semplificato

  useEffect(() => {
    fetch("/api/user", { headers: { "x-user-id": userId } })
      .then(res => res.json())
      .then(data => setStelle(data.stelle));

    fetch("/api/surveys", { headers: { "x-user-id": userId } })
      .then(res => res.json())
      .then(data => setSurveys(data.surveys));
  }, []);

  const rispondi = async (surveyId, risposta) => {
    await fetch("/api/surveys", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify({ surveyId, risposta })
    });
    await fetch("/api/user", {
      method: "POST",
      headers: { "x-user-id": userId }
    }).then(res => res.json()).then(data => setStelle(data.stelle));
    setCurrent(null);
    setDone(true);
  };

  if (current !== null) {
    const sondaggio = surveys[current];
    return (
      <div>
        <h2>{sondaggio.domanda}</h2>
        {sondaggio.opzioni.map((opt, i) => (
          <button key={i} onClick={() => rispondi(sondaggio.id, opt)}>{opt}</button>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Benvenuto nella MiniApp</h1>
      <p>Hai {stelle} ⭐</p>
      {!done && (
        <button onClick={() => setCurrent(0)}>Inizia il sondaggio</button>
      )}
      {done && <p>Grazie per aver partecipato!</p>}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);