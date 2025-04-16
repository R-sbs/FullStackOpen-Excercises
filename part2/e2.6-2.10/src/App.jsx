import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
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
      {filterspersonsArr.map((person) => {
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
