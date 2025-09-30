import React, { useState, useEffect } from 'react';
import prayersData from './prayers.json';

function App() {
  const [day, setDay] = useState(1);

  useEffect(() => {
    const savedDay = localStorage.getItem('novenaDay');
    if (savedDay) setDay(Number(savedDay));
  }, []);

  const nextDay = () => {
    const newDay = day + 1;
    setDay(newDay);
    localStorage.setItem('novenaDay', newDay);
  };

  const prayer = prayersData[`day${day}`];

  return (
    <div className="app-container">
      <h1>54-Day Novena</h1>
      <h2>Day {day}</h2>

      {prayer ? (
        <div className="prayers">
          <h3>Opening Prayer</h3>
          <p>{prayer.opening}</p>

          <h3>Mystery</h3>
          <p>{prayer.mystery}</p>

          <h3>Prayer for Virtue</h3>
          <p>{prayer.prayer_for_virtue}</p>

          <h3>Petition / Thanksgiving</h3>
          <p>{prayer.petition_or_thanksgiving}</p>

          <h3>Closing Prayer</h3>
          <p>{prayer.closing}</p>
        </div>
      ) : (
        <p>Prayers not found for this day.</p>
      )}

      <button onClick={nextDay}>Next Day</button>
    </div>
  );
}

export default App;
