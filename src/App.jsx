import Figure from './Figure';
import { useState, useEffect } from 'react';
import axios from 'axios';

const NASA_URL = 'https://api.nasa.gov/';
const NASA_API_KEY = import.meta.env.VITE_APP_NASA_API_KEY;

function App() {
  const [date, setDate] = useState(new Date(Date.now()).toISOString().slice(0, 10));
  const [sol, setSol] = useState(1000);
  const [solValid, setSolValid] = useState(true);
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState(null);
  const [apiSelection, setApiSelection] = useState('apod');

  function handleInput(ev) {
    if (apiSelection === 'apod') {
      setDate(ev.target.value);
    } else {
      let sol = ev.target.value;
      setSol(sol);
      if (sol >= 0 && sol <= 3200) {
        setSolValid(true);
      } else {
        setSolValid(false);
      }
    }
  }

  const handleApiSelection = (ev) => {
    setApiSelection(ev.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let url;
      try {
        if (apiSelection === 'apod') {
          url = `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`;
        } else if (apiSelection === 'marsRover' && solValid) {
          url = `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}`;
        } else {
          return;
        }

        const response = await axios.get(url);
        setApodData(response.data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setApodData(null);
      }
    };

    fetchData();
  }, [date, sol, apiSelection, solValid]);

  return (
    <div>
      <select onChange={handleApiSelection}>
        <option value='apod'>APOD</option>
        <option value='marsRover'>Mars Rover</option>
      </select>
      {apiSelection === 'apod' ? (
        <input
          type='date'
          value={date}
          onChange={handleInput}
          max={new Date().toISOString().split('T')[0]}
        />
      ) : (
        <div>
          <input type='number' value={sol} min='0' max='3200' onChange={handleInput} />
          {!solValid && <p>Please enter a valid Sol number between 0 and 3200.</p>}
        </div>
      )}
      {error ? (
        <p>{error}</p>
      ) : (
        <Figure apodData={apodData} apiSelection={apiSelection} />
      )}
    </div>
  );
}

export default App;
