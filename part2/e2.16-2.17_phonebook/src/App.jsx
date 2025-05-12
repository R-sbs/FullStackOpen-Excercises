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
          const response = await update(existingPerson._id, changedPerson);

          if (response.status === 200) {
            const returnedPerson = response.data;
            setPersons(
              persons.map((p) =>
                p._id === returnedPerson._id ? returnedPerson : p
              )
            );
            setSuccess(`${existingPerson.name} is updated successfully.`);
            setNewName("");
            setNewnumber("");
            setTimeout(() => setSuccess(null), 4000);
          } else if (response.status !== 200) {
            const errorMessage = response.data.error;
            setError(errorMessage);
            setTimeout(() => setError(null), 4000);
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.error || "Update failed. Please try again.";
          setError(errorMessage);
          setTimeout(() => setError(null), 4000);
        }

        return;
      }

      return;
    }

    try {
      const addedPerson = await create(newPerson);
      setPersons(persons.concat(addedPerson));
      setSuccess("Successfully added person.");
      setNewName("");
      setNewnumber("");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to add contact. Please try again.";
      setError(errorMessage);
      setTimeout(() => setError(null), 4000);
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
