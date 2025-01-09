// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    name: '',
    description: '',
    owner: '',
    location: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/resources')
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResource),
    })
      .then((res) => res.json())
      .then((data) => {
        setResources([...resources, data]);
        setNewResource({
          name: '',
          description: '',
          owner: '',
          location: '',
        });
      });
  };

  return (
    <div className="App">
      <h1>Community Resource Sharing Platform</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Resource Name"
          value={newResource.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newResource.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="owner"
          placeholder="Owner Name"
          value={newResource.owner}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newResource.location}
          onChange={handleInputChange}
        />
        <button type="submit">Add Resource</button>
      </form>

      <h2>Available Resources</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            <h3>{resource.name}</h3>
            <p>{resource.description}</p>
            <p>Owner: {resource.owner}</p>
            <p>Location: {resource.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
