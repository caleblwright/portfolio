import React, { useState } from "react";

const AddPlayerForm = (props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addPlayer(value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {console.log(value)}
      <input
        type="text"
        value={value}
        placeholder="Don't see your name? Add it here!"
        onChange={(e) => setValue(e.target.value)}
      />
      <input type="submit" value="Sign me up!" />
    </form>
  );
};

export default AddPlayerForm;