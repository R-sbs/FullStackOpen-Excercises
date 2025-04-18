import { useEffect, useState } from "react";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filteredPersons);
    setFilteredPersons(filteredPersons);
  };

  const filterspersonsArr = search ? filteredPersons : persons;

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNewNameExitsAlready = (function () {
      const found = persons.filter(
        (each) => each.name.toLowerCase() === newName.toLowerCase()
      );
      if (found.length > 0) return true;
      return false;
    })();

    if (isNewNameExitsAlready)
      return alert(`${newName} Already Exists in Phonebook`);

    const newPersons = persons.concat({ name: newName, phone: newPhone });

    setPersons(newPersons);
    setNewName("");
    setNewPhone("");
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3001/persons");
      const data = res.data;
      console.log(data);
      setPersons(data);
    }
    fetchData()
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        Filter Shown with: <input value={search} onChange={handleSearch} />
      </p>
      <form onSubmit={handleSubmit}>
        <p>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </p>
        <p>
          Phone:{" "}
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        </p>
        <div>
          <button type="submit" disabled={newName === "" || newPhone === ""}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons &&
        filterspersonsArr.map((person) => {
          return (
            <p key={person.name}>
              {person.name} : {person.phone}
            </p>
          );
        })}
    </div>
  );
};

export default App;
