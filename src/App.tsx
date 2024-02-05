// src/App.tsx
import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Content from './components/Content';  // Updated import
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Content />
      <Footer />

    </div>
  );
}

export default App;