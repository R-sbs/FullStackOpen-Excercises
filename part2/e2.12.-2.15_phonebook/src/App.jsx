import { useEffect, useState } from "react";
import { getAll, create, update, deletePerson } from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const filterspersonsArr = search ? filteredPersons : persons;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filteredPersons);
    setFilteredPersons(filteredPersons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newPerson = { name: newName, phone: newPhone };
    const existingPerson = persons.find(
      (each) => each.name.toLowerCase() === newName.toLowerCase()
    );
  
    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} already exists in Phonebook. Replace the old number with the new one?`
      );
  
      if (confirmed) {
        const changedPerson = { ...existingPerson, phone: newPhone };
  
        try {
          const returnedPerson = await update(existingPerson.id, changedPerson);
          setPersons(
            persons.map((p) =>
              p.id === existingPerson.id ? returnedPerson : p
            )
          );
          setNewName("");
          setNewPhone("");
        } catch (err) {
          alert("Update failed. Please try again.");
          console.error(err);
        }
  
        return;
      }
  
      return;
    }
  
    try {
      const createdPerson = await create(newPerson);
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewPhone("");
    } catch (err) {
      alert("Failed to add contact. Please try again.");
      console.error(err);
    }
  };
  

  const handleDelete = (id) => {
    const selectedPerson = persons.find((person) => person.id === id);

    const confirmed = window.confirm(
      `Are you sure you want to delete : ${selectedPerson.name} ?`
    );
    if (confirmed) {
      const res = deletePerson(id);
      if (res) {
        setPersons(persons.filter((person) => person.id !== id));
      } else {
        alert("Retry deleting again");
      }
    } else return;
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAll();
      console.log(data);
      setPersons(data);
    }
    fetchData();
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
              {person.name} : {person.phone}{" "}
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </p>
          );
        })}
    </div>
  );
};

export default App;
