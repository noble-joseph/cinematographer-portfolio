import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Connect from './components/Connect';
import './App.css';

function Home() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(response => response.json())
      .then(data => {
        setPortfolio(data.projects);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching portfolio:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/cinematographer-bg.webp)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
        <h1>Adith Krishna</h1>
        <p>Where art meets Adventure</p>
      </header>
      <main>
        <section className="who-am-i-section" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/whoami.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="who-am-i-content">
            <h2>Who Am I</h2>
            <p>I am a passionate cinematographer with over a decade of experience crafting visual stories that captivate and inspire. My journey in cinematography has taken me across various genres, from intimate documentaries to large-scale feature films, always focusing on the perfect blend of technical precision and artistic vision.</p>
          </div>
        </section>

        <section className="services">
          <h2>Work With Us</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Collaborate with us</h3>
              <p>Let's work together to bring your vision to life through exceptional cinematography.</p>
            </div>
            <div className="service-card">
              <h3>Partner With Us</h3>
              <p>Seeking a creative team to help tell your story with cinematic impact? We’re here to make it happen.</p>
            </div>
          </div>
          <div className="connect-section">
            <button className="connect-btn" onClick={() => window.location.href = '/connect'}><strong>Connect</strong>_Us</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function About() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>About Me</h1>
        <p>Crafting visual stories through the lens</p>
      </header>
      <main>
        <section className="about-content">
          <div className="about-text">
            <h2>My Journey</h2>
            <p>With over a decade of experience in cinematography, I specialize in creating compelling visual narratives that captivate audiences and bring stories to life.</p>
            <p>My work spans across various genres, from intimate documentaries to large-scale feature films, always focusing on the perfect blend of technical precision and artistic vision.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(response => response.json())
      .then(data => {
        setPortfolio(data.projects);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching portfolio:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Portfolio</h1>
        <p>A showcase of my cinematic work</p>
      </header>
      <main>
        <section className="portfolio">
          <h2>Featured Projects</h2>
          {loading ? (
            <div className="loading">Loading portfolio...</div>
          ) : (
            <div className="projects">
              {portfolio.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span>{project.year} - {project.category}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Stories() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stories</h1>
        <p>Behind the scenes and cinematic tales</p>
      </header>
      <main>
        <section className="stories-content">
          <div className="story-card">
            <h3>The Making of "Shadows of the Forgotten"</h3>
            <p>Exploring abandoned film sets revealed stories of dreams left behind and the passage of time in cinema.</p>
          </div>
          <div className="story-card">
            <h3>Urban Symphony: Capturing City Rhythm</h3>
            <p>How natural lighting and camera movement can transform urban landscapes into living symphonies.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </Router>
  );
}

export default App;
