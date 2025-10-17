import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAll } from "./api/country.api";
import { useField } from "./hooks/useField";
import { Country } from "./components/Country";
import { useCountry } from "./hooks/useCountry";
import CountriesList from "./components/CountriesList";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <form onSubmit={fetch}>
          <input {...nameInput} />
          <button>find</button>
        </form>

        <Country country={country} />
      </div>
      <div className="">
        <CountriesList />
      </div>
    </div>
  );
};

export default App;
