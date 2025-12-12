import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Connect from './components/Connect';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Journeys from './pages/Journeys';
import ProjectDetail from './pages/ProjectDetail';
import JourneyDetail from './pages/JourneyDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<ProjectDetail />} />
        <Route path="/stories" element={<Journeys />} />
        <Route path="/stories/:slug" element={<JourneyDetail />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;