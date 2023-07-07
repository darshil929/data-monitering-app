import React, { useState } from "react";
import axios from "axios";

const ConfigForm = () => {
  const [databases, setDatabases] = useState([]);
  const [formData, setFormData] = useState({
    db: "",
    columns: Array.from({ length: 5 }, () => ""),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDatabase = {
      db: formData.db,
      columns: [...formData.columns],
    };

    setDatabases((prevDatabases) => [...prevDatabases, newDatabase]);

    setFormData({
      db: "",
      columns: Array.from({ length: 5 }, () => ""),
    });
  };

  const handleDone = () => {
    const config = {
      databases: {},
    };
  
    databases.forEach((database, index) => {
      config.databases[`db${index + 1}`] = {
        db: database.db,
        columns: {},
      };
  
      database.columns.forEach((column, colIndex) => {
        config.databases[`db${index + 1}`].columns[`column${colIndex + 1}`] = column;
      });
    });
  
    // Make an API request to your server
    axios
      .post("http://localhost:8080/api", config)
      .then((response) => {
        console.log(response.data); // Optional: Handle server response
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleColumnInputChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newColumns = [...prevFormData.columns];
      newColumns[index] = value;
      return {
        ...prevFormData,
        columns: newColumns,
      };
    });
  };

  return (
    <div>
      {databases.map((database, index) => (
        <div key={index}>
          <h3>Database {index + 1}</h3>
          <p>Database: {database.db}</p>
          <ul>
            {database.columns.map((column, colIndex) => (
              <li key={colIndex}>Column {colIndex + 1}: {column}</li>
            ))}
          </ul>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          Database:
          <input
            type="text"
            name="db"
            value={formData.db}
            onChange={handleInputChange}
          />
        </label>
        {formData.columns.map((column, index) => (
          <label key={index}>
            Column {index + 1}:
            <input
              type="text"
              name={`column${index + 1}`}
              value={column}
              onChange={(event) => handleColumnInputChange(index, event)}
            />
          </label>
        ))}
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDone}>Done</button>
    </div>
  );
};

export default ConfigForm;
