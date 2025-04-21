// const CountryDetails = ({ country }) => {
//     if (!country) return null;
  
//     return (
//       <div className="country-info">
//         <h2>{country.name.common}</h2>
//         <p>Capital: {country?.capital}</p>
//         <p>Area: {country.area} SqKms</p>
  
//         <h4>Languages:</h4>
//         <ul>
//           {Object.values(country.languages || {}).map((lang) => (
//             <li key={lang}>{lang}</li>
//           ))}
//         </ul>
  
//         <img
//           src={country.flags?.png || country.flags?.svg}
//           alt="Flag"
//           style={{ maxWidth: "200px", marginTop: "10px" }}
//         />
//       </div>
//     );
//   };
  
//   export default CountryDetails;
  