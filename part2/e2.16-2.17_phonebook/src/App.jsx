import { useEffect, useState } from "react";
import { getAll, create, update, deletePerson } from "./services/persons.js";
import "./app.css";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newnumber, setNewnumber] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

    const newPerson = { name: newName, number: newnumber };
    const existingPerson = persons.find(
      (each) => each.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} already exists in Phonebook. Replace the old number with the new one?`
      );

      if (confirmed) {
        const changedPerson = { ...existingPerson, number: newnumber };

        try {
          const returnedPerson = await update(existingPerson.id, changedPerson);
          console.log(returnedPerson);
          if (returnedPerson !== 404) {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p
              )
            );
            setSuccess(`${existingPerson.name} is updated successfully.`);
            setNewName("");
            setNewnumber("");
            setTimeout(() => setSuccess(null), 4000);
          } else {
            setError(
              `Information on ${existingPerson.name} is already removed on server.`
            );
            setTimeout((err) => setError(null), 4000);
            return;
          }
        } catch (err) {
          console.log(err);
          setError("Update failed. Please try again.");
          setTimeout((err) => setError(null), 4000);
        }

        return;
      }

      return;
    }

    try {
      await create(newPerson);
      setPersons(persons.concat(newPerson));
      setSuccess("Successfully person is added.");
      setNewName("");
      setNewnumber("");

      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError("Failed to add contact. Please try again.");
      setTimeout(() => setError(null), 4000);
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    const selectedPerson = persons.find((person) => person._id === id);

    const confirmed = window.confirm(
      `Are you sure you want to delete : ${selectedPerson.name} ?`
    );
    if (confirmed) {
      const res = deletePerson(id);
      
      if (res) {
        setPersons(persons.filter((person) => person._id !== id));
        setSuccess(`${selectedPerson.name} is Deleted Successfully`);
        setTimeout(() => setError(null), 4000);
      } else {
        setError("Retry deleting again");
        setTimeout(() => setError(null), 4000);
      }
    } else {
      console.log(res);
    }
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
      <div>
        {error && <p className="baderror">{error}</p>}
        {success && <p className="gooderror">{success}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <p>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </p>
        <p>
          Phone:{" "}
          <input
            value={newnumber}
            onChange={(e) => setNewnumber(e.target.value)}
          />
        </p>
        <div>
          <button type="submit" disabled={newName === "" || newnumber === ""}>
            add
          </button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        <p>
          Filter By Names: <input value={search} onChange={handleSearch} />
        </p>
      </div>
      <div>
        {persons &&
          filterspersonsArr.map((person) => {
            return (
              <p key={person.name}>
                {person.name} : {person.number}{" "}
                <button onClick={() => handleDelete(person._id)}>Delete</button>
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default App;
