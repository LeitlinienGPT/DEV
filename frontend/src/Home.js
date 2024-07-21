// Home.js
import React from 'react';

function Home() {
  return (
    <div>
      <h1>Willkommen bei LeitlinienGPT</h1>
      <p>Erleichtern Sie Ihre Arbeit mit medizinischen Leitlinien.</p>
      <p>Unsere Software hilft Ihnen, relevante Quellen in den medizinischen Leitlinien schneller zu finden, Zeit zu sparen und qualitativ hochwertige Antworten zu erhalten. Besser als ChatGPT, mit reduzierten Halluzinationen und verbesserter Informationswiedergabe.</p>
      <h2>Unterstützen Sie unser Projekt</h2>
      <p>Seien Sie der Erste, der erfährt, wann die Produktversion veröffentlicht wird, und erhalten Sie weitere wichtige Updates.</p>
      <form>
        <input type="text" placeholder="Ihr Name" />
        <input type="email" placeholder="Ihre E-Mail" />
        <button type="submit">Teilnehmen</button>
      </form>
    </div>
  );
}

export default Home;