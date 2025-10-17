export const Country = ({ country }) => {
  console.log(country);
  if (!country) {
    return null;
  }

  if (country.error) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.official} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.flags.alt}`}
      />
    </div>
  );
};
