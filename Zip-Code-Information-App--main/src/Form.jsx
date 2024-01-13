import React, { useState } from "react";

const Form = ({ onFetch }) => {
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetch(postalCode);
    setPostalCode(""); // Clear the input field after submission
  };

  console.log(postalCode);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <br></br>
        <br></br>
        <button type="submit">Fetch Location</button>
      </form>
    </div>
  );
};

export default Form;
