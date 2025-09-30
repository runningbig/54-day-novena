import { useState, useEffect } from 'react';
import './app.css';
import prayersData from './prayers.json';

export default function App() {
  const today = new Date();
  const [startDate, setStartDate] = useState(localStorage.getItem('novenaStartDate'));
  const [dayNumber, setDayNumber] = useState(1);
  const [content, setContent] = useState([]);

  // Calculate current day of novena
  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
      setDayNumber(Math.min(diffDays, 54));
    }
  }, [startDate]);

  const handleStart = () => {
    const date = prompt("Enter your start date (YYYY-MM-DD):", today.toISOString().slice(0,10));
    if (date) {
      localStorage.setItem('novenaStartDate', date);
      setStartDate(date);
    }
  };

  const handleKnowMore = () => {
    setContent([
      <div className="card" key="knowMore">
        <h2>About the 54-Day Novena</h2>
        <p>The 54-Day Novena is a powerful prayer tradition combining 27 days of petition and 27 days of thanksgiving. It strengthens faith, deepens devotion, and guides the faithful daily.</p>
      </div>
    ]);
  };

  const handlePrayToday = () => {
    const dayPrayers = prayersData.find(d => d.day === dayNumber);
    if (!dayPrayers) {
      setContent([
        <div className="card" key="noPrayers">
          <p>Prayers for Day {dayNumber} are not yet available.</p>
        </div>
      ]);
      return;
    }

    const mysteriesHtml = dayPrayers.mysteries.map((m, index) => (
      <div key={index} className="card">
        <h3>{m.title}</h3>
        <p>{m.reflection}</p>
      </div>
    ));

    setContent([
      <div className="card" key="opening">
        <h2>Day {dayNumber} Prayers</h2>
        <h3>Opening Prayer</h3>
        <p>{dayPrayers.openingPrayer}</p>
      </div>,
      ...mysteriesHtml,
      <div className="card" key="closing">
        <h3>Closing Prayer</h3>
        <p>{dayPrayers.closingPrayer}</p>
      </div>,
      <div className="card" key="congrats">
        <p>Congratulations! You have completed Day {dayNumber}. May God bless your continued prayer journey.</p>
      </div>
    ]);
  };

  return (
    <div className="container">
      <h1>
        {startDate
          ? `Today is Day ${dayNumber} of your 54-Day Novena.`
          : "Welcome! Would you like to start the 54-Day Novena today?"}
      </h1>
      <div className="buttons">
        <button onClick={handleStart}>Start Novena</button>
        <button onClick={handlePrayToday}>Pray Today</button>
        <button onClick={handleKnowMore}>Know More About the Novena</button>
      </div>
      <div id="content" className="fade-in">
        {content}
      </div>
    </div>
  );
}
