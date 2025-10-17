import axios from "axios";

const ALL_COUNTRIES_API_ENDPOINT =
  import.meta.env.VITE_COUNTRIES_API_URL ||
  "https://studies.cs.helsinki.fi/restcountries";

export const getAll = () =>
  axios
    .get(`${ALL_COUNTRIES_API_ENDPOINT}/api/all`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const getByName = (name) =>
  axios
    .get(`${ALL_COUNTRIES_API_ENDPOINT}/api/name/${name}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
