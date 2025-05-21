import React from 'react';
import UploadForm from './components/UploadForm';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <div>
        <h1 className={styles.title}>Car Type Identifier</h1>
        <UploadForm />
      </div>
    </div>
  );
}

export default App;