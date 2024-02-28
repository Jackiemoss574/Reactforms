import React, { useState } from 'react';

export default function SignUpForm() {
  // State for the form fields and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handles form submission
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Fetch request to the signup API endpoint
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Parse the JSON from the response

      if (!response.ok) {
        // If response is not OK, throw an error with the message from the response
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      // Here, handle the successful response, such as storing the received token
      // For example, assuming the token is in data.token
      console.log('Signup successful, token:', data.token);
    } catch (error) {
      // Update the error state with the error message
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Sign Up!</h2>
      {/* Display error message if it exists */}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

