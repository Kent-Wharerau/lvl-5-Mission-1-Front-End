// =========== Imports ========== //

import React, { useState } from 'react';
import styles from './UploadForm.module.css';


// =========== Main Component ========== //

const UploadForm = () => {

  // ----- STATE VARIABLES ----- //

  const [file, setFile] = useState(null);

  const [vehicleType, setVehicleType] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');


  // ----- EVENT HANDLERS ----- //

  // This function runs when a user selects a file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    // Clears any previous result or error messages
    setVehicleType('');
    setError('');
  };

  // This function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing

    // If the user didn't select a file, don't do anything
    if (!file) return;

    // Create a new form to send data to the server
    const formData = new FormData();

    // Append the image file to the form, using the name 'image' (this must match the backend code)
    formData.append('image', file);

    // Set the loading state to true while waiting for a response
    setLoading(true);

    // Clear previous messages
    setError('');
    setVehicleType('');

    try {
      // Send the image to the backend using a POST request
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      // If the server didn't return a successful response, throw an error
      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      // Convert the server's response into JSON format
      const data = await response.json();

      // Access the top prediction (the first one in the predictions array)
      const topPrediction = data.predictions?.[0]?.tagName;

      // If there's a prediction, show it; otherwise show "Unknown"
      setVehicleType(topPrediction || 'Unknown');
    } catch (err) {
      // If something went wrong, show the error message
      setError(err.message || 'An error occurred');
    } finally {
      // No matter what happens, stop the loading spinner/message
      setLoading(false);
    }
  };


  // =========== RETURNED HTML ========== //

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* This is the file input where users select an image */}
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {/* This is the submit button, which shows "Identifying..." while loading */}
        <button type="submit" disabled={loading}>
          {loading ? 'Identifying...' : 'Identify Vehicle'}
        </button>
      </form>

      {/* If there's a result, show the predicted vehicle type */}
      {vehicleType && <p className={styles.result}>Vehicle Type: {vehicleType}</p>}

      {/* If there's an error, show the error message */}
      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
};

export default UploadForm;