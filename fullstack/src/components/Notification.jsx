/* eslint-disable react/prop-types */
const Notification = ({ succussMsg, errorMsg }) => {
  if (succussMsg === null && errorMsg === null) return;
  const message = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (succussMsg) {
    message.color="green"
    return <div style={message}>{succussMsg}</div>;
}else{
    message.color = "red";
      return <div style={message}>{errorMsg}</div>;

  }
  
};
export default Notification;
