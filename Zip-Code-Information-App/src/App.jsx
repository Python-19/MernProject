import React, { useState } from "react";
import "./App.css"; // Import CSS file for styling
import Form from "./Form";
import Location from "./Location";

function App() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(location);

  const fetchLocation = async (postalCode) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.zippopotam.us/in/${postalCode}`
      );
      if (!response.ok) {
        throw new Error("Postal code not found");
      }
      const data = await response.json();
      setLocation(data);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      setError(error.message);
      setLocation(null); // Reset location on error
    } finally {
      setLoading(false); // Set loading to false after fetch completion
    }
  };

  const clearLocation = () => {
    setLocation(null);
    setError(null);
  };

  return (
    <div className="App">
      <h1>Postal Code Information</h1>
      <Form onFetch={fetchLocation} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <Location location={location} />
      {location && <button onClick={clearLocation}>Clear</button>}
    </div>
  );
}

export default App;
