import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const api = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    
    const matchingResult = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if(matchingResult.length > 10) {
      setInfo('Too many results, type more characters')
    } else {
      setResults(matchingResult);
      setInfo('')
    }
    
    if(e.target.value.length === 0) {
      setResults([]);
      setInfo('')
    }
  }

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
      <div className="search">
        <h4>Search Results</h4>
        {info && <p>{info}</p>}
        { results.map((result) => <li key={result.name.common}>{result.name.common}</li>)}
      </div>
    </>
  );
}

export default App;
