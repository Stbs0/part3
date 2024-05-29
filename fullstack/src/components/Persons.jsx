/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

const Persons = ({ persons, handleOnClickDelete }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleOnClickDelete(person.id, person.name)}>
          delete
        </button>
      </li>
    ))}
  </ul>
);
export default Persons;
