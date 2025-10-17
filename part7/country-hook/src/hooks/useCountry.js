import { useEffect, useState } from "react";
import { getAll, getByName } from "../api/country.api";

export const useCountry = (name) => {
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function fetchCountryByName(name) {
      try {
        const fetchedCountry = await getByName(name);
        setCountry(fetchedCountry);
      } catch (error) {
        console.log(error?.response.data.error);
        setCountry(error?.response.data);
      }
    }
    name && fetchCountryByName(name);
  }, [name]);

  return country;
};
