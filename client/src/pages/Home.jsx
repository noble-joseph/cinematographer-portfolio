import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { journeys } from '../data/journeys';
import { services } from '../data/services';
import { settings } from '../data/settings';
import Footer from '../components/Footer';
import '../App.css';

function Home() {
  // Filter featured projects
  const featuredProjects = projects.filter(p => p.isFeatured).slice(0, 4);
  
  // Get latest journeys sorted by date descending
  const latestJourneys = [...journeys]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
  
  // Sort services by order field
  const sortedServices = [...services].sort((a, b) => a.order - b.order);

  const scrollToPortfolio = () => {
    // Smooth scroll behavior for showreel button
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* SECTION 1 — HERO */}
      <section 
        className="home-hero" 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/cinematographer-bg.webp)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-tagline">{settings.heroTagline}</p>
          <h1 className="hero-title">{settings.heroTitle}</h1>
          <p className="hero-subtitle">{settings.heroSubtitle}</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToPortfolio}>
              Watch Showreel
            </button>
            <Link to="/portfolio" className="btn-secondary">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      <main>
        {/* SECTION 2 — FOUR LANES (IDENTITY GRID) */}
        <section className="four-lanes">
          <div className="four-lanes-grid">
            <div className="lane-card">
              <h3>Cinematography</h3>
              <p>Framing motion, light and emotion into cinematic sequences.</p>
            </div>
            <div className="lane-card">
              <h3>Design</h3>
              <p>Crafting visual systems, typography and composition that guide the story.</p>
            </div>
            <div className="lane-card">
              <h3>Travel</h3>
              <p>Chasing real locations, weather and cultures that ground each frame.</p>
            </div>
            <div className="lane-card">
              <h3>Motorsport Adventurer</h3>
              <p>Living speed, risk and terrain to capture authentic motorsport energy.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3 — FEATURED WORK */}
        <section className="featured-work">
          <div className="section-header">
            <h2>Featured Work</h2>
            <p className="section-subtext">
              A glimpse into films, campaigns, and visual systems from the road, track, and city.
            </p>
          </div>
          <div className="featured-grid">
            {featuredProjects.map(project => (
              <div key={project.id} className="featured-card">
                <div 
                  className="featured-thumbnail" 
                  style={{ backgroundImage: `url(${project.thumbnail})` }}
                >
                  <div className="thumbnail-overlay"></div>
                </div>
                <div className="featured-info">
                  <span className="project-type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/portfolio" className="btn-outline">
              See All Work
            </Link>
          </div>
        </section>

        {/* SECTION 4 — LATEST FIELD LOGS */}
        <section className="journeys-section">
          <div className="section-header">
            <h2>Journeys — Field Logs from the Road & Track</h2>
          </div>
          <div className="journeys-grid">
            {latestJourneys.map(journey => (
              <div key={journey.id} className="journey-card">
                <div className="journey-meta">
                  <span className="journey-type">{journey.type}</span>
                  <span className="journey-date">
                    {new Date(journey.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <h3>{journey.title}</h3>
                <p className="journey-location">{journey.location}</p>
                <p className="journey-excerpt">{journey.excerpt}</p>
                {journey.distanceKm && (
                  <div className="journey-stats">
                    <span>{journey.distanceKm}km</span>
                    {journey.elevationGain && <span>↑ {journey.elevationGain}m</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/stories" className="btn-outline">
              Explore All Journeys
            </Link>
          </div>
        </section>

        {/* SECTION 5 — SERVICES / WORK WITH ME */}
        <section className="services-section">
          <div className="section-header">
            <h2>Work With Me</h2>
            <p className="section-subtext">{settings.connectSubtitle}</p>
          </div>
          <div className="services-grid-new">
            {sortedServices.map(service => (
              <div key={service.id} className="service-card-new">
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/connect" className="btn-primary">
              Start a Project
            </Link>
          </div>
        </section>

        {/* SECTION 6 — SOFT FOOTER CTA */}
        <section className="soft-footer-cta">
          <p className="cta-text">
            Looking for cinematic storytelling grounded in real roads, tracks and places?
          </p>
          <Link to="/connect" className="btn-outline">
            Let's Talk
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
