import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const api = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState(false);
  const [country, setCountry] = useState(null);
  const [cityWeather, setCityWeather] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const matchingResult = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );

    console.log(matchingResult.length);

    if (value.length === 0 || matchingResult.length === 0) {
      setInfo(false);
      setResults([]);
    }

    if (matchingResult.length > 10) {
      setInfo(true);
      setResults([])
      return;
    } else {
      setInfo(false);
      setResults(matchingResult);
      return;
    }
  };

  const handleShow = (result) => {
    setCountry(result);

    async function getWeatherData(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      try {
        const res = await axios.get(url);
        setCityWeather(res.data);
      } catch (error) {
        console.log(error);
        setCityWeather(null)
      }
    }
    getWeatherData(result?.capital);
  };

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`${api}/api/all`);
        setCountries(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <h1>Find Information of Countries</h1>
      <div>
        <p>
          <label htmlFor="search">Find Countries</label>
          <input
            id="seach"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            disabled={!countries}
          />
        </p>
      </div>

      <div>
        <h4>Search Results</h4>
        <p>{info && "Too Many Results, Please type more characters"}</p>
        {results.length < 10 && !info &&
          results.map((result) => (
            <div
              key={result.name.common}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                marginBottom: "5px",
              }}
            >
              <li>{result.name.common}</li>
              <button onClick={() => handleShow(result)}>Show</button>
            </div>
          ))}
      </div>

      <div>
        {country !== null && (
          <div style={{ marginTop: "50px" }}>
            <h1>{country.name.common}</h1>

            <br></br>
            <p>Capital : {country?.capital}</p>
            <p>Area : {country?.area}</p>
            <br></br>
            <h4>Languages</h4>
            <ul>
              {Object.values(country.languages).map((lan) => (
                <li key={lan}>{lan}</li>
              ))}
            </ul>
            <img
              src={country.flags?.png || country.flags?.svg}
              alt={country.flags?.alt}
            />
          </div>
        )}
      </div>

      <div>
        {cityWeather && (
          <>
            <h4>{`Weather in ${cityWeather?.name}`}</h4>
            <p>
              Temperature <span>{cityWeather?.main.temp} celsius</span>
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
              alt="empty"
            />
            <p>
              Wind <span>{cityWeather?.wind.speed} m/s</span>
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default App;
