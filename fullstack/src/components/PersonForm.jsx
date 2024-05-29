/* eslint-disable react/prop-types */
const PersonForm = ({
  handleOnSubmit,
  newName,
  handleOnChangeName,
  newNumber,
  handleOnChangeNumber,
}) => (
  <form onSubmit={handleOnSubmit}>
    <div>
      name: <input value={newName} onChange={handleOnChangeName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleOnChangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
