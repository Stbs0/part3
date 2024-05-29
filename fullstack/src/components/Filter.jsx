/* eslint-disable react/prop-types */
const Filter = ({handleOnChangeFilter, filter}) => {
  return (
    <div>
      filter shown with <input type="search" onChange={handleOnChangeFilter} />
      <ul>
        {filter.map((person) => (
          <li key={person.id}>{person.name} </li>
        ))}
      </ul>
    </div>
  );
};
export default Filter