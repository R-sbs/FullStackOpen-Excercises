import React, { useEffect, useState } from "react";
import { getAll } from "../api/country.api";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    async function fetchCountries() {
      const response = await getAll();
      console.log(response);
      setCountries(response);
    }
    fetchCountries();
  }, []);
  return (
    <ul>
      {countries.map((e) => (
        <li key={e.cca3}>{e.name.official}</li>
      ))}
    </ul>
  );
};

export default CountriesList;
