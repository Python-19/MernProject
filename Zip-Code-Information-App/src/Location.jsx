import React from "react";

const Location = ({ location }) => {
  if (!location) {
    return null;
  } 

  const { country, places } = location;

  return (
    <div>
      <h2>Location Information</h2>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Place Name</th>
            <th>State</th>
            <th>Longitude</th>
            <th>Latitude</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place, index) => (
            <tr key={index}>
              <td>{country}</td>
              <td>{place["place name"]}</td>
              <td>{place.state}</td>
              <td>{place.longitude}</td>
              <td>{place.latitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Location;
