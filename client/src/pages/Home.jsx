import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../api/projectsApi';
import { getLatestJourneys } from '../api/journeysApi';
import { getServices } from '../api/servicesApi';
import { getSettings } from '../api/settingsApi';
import Footer from '../components/Footer';
import '../App.css';

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [latestJourneys, setLatestJourneys] = useState([]);
  const [offeredServices, setOfferedServices] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [projects, journeys, services, globalSettings] = await Promise.all([
          getFeaturedProjects(4),
          getLatestJourneys(3),
          getServices(),
          getSettings()
        ]);
        if (!mounted) return;
        setFeaturedProjects(projects);
        setLatestJourneys(journeys);
        setOfferedServices(services);
        setSettings(globalSettings);
      } catch (err) {
        console.error('Home data fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const scrollToPortfolio = () => {
    // Smooth scroll behavior for showreel button
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {loading || !settings ? (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        </div>
      ) : (
        <>
          {/* SECTION 1 — HERO */}
          <section
            className="home-hero"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dvyccelsj/image/upload/f_auto,q_auto,dpr_auto,c_fill,w_1200,h_600/v1765555402/cinematographer-bg.webp_adrlmk.webp)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content content-width">
              <h1 className="heading-xl">Adith Krishna</h1>
              <p className="eyebrow">Cinematographer · Designer · Traveler · Motorsport Adventurer</p>
              <div className="hero-buttons" style={{ marginTop: '2rem' }}>
                <Link to="/portfolio" className="btn-secondary">
                  View Portfolio
                </Link>
              </div>
            </div>
          </section>

          <main>
            {/* SECTION 2 — FOUR LANES (IDENTITY GRID) */}
            <section className="section">
              <div className="four-lanes-grid content-width">
                <div className="lane-card">
                  <h3 className="heading-md">Cinematography</h3>
                  <p className="body-md">Framing motion, light and emotion into cinematic sequences.</p>
                </div>
                <div className="lane-card">
                  <h3 className="heading-md">Design</h3>
                  <p className="body-md">Crafting visual systems, typography and composition that guide the story.</p>
                </div>
                <div className="lane-card">
                  <h3 className="heading-md">Travel</h3>
                  <p className="body-md">Chasing real locations, weather and cultures that ground each frame.</p>
                </div>
                <div className="lane-card">
                  <h3 className="heading-md">Motorsport Adventurer</h3>
                  <p className="body-md">Living speed, risk and terrain to capture authentic motorsport energy.</p>
                </div>
              </div>
            </section>

            {/* SECTION 3 — FEATURED WORK */}
            <section className="section" style={{ background: 'var(--dark-card)' }}>
              <div className="content-width">
                <div className="section-header">
                  <h2 className="heading-lg">Featured Work</h2>
                  <p className="body-md section-subtext">
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
                        <span className="body-sm project-type">{project.type}</span>
                        <h3 className="heading-md">{project.title}</h3>
                        <p className="body-md">{project.shortDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="section-cta">
                  <Link to="/portfolio" className="btn-outline">
                    See All Work
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 4 — LATEST FIELD LOGS */}
            <section className="section">
              <div className="content-width">
                <div className="section-header">
                  <h2 className="heading-lg">Journeys — Field Logs from the Road & Track</h2>
                </div>
                <div className="journeys-grid">
                  {latestJourneys.map(journey => (
                    <div key={journey.id} className="journey-card">
                      <div className="journey-meta">
                        <span className="body-sm journey-type">{journey.type}</span>
                        <span className="body-sm journey-date">
                          {new Date(journey.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="heading-md">{journey.title}</h3>
                      <p className="body-sm journey-location">{journey.location}</p>
                      <p className="body-md journey-excerpt">{journey.excerpt}</p>
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
              </div>
            </section>

            {/* SECTION 5 — SERVICES / WORK WITH ME */}
            <section className="section" style={{ background: 'var(--dark-card)' }}>
              <div className="content-width">
                <div className="section-header">
                  <h2 className="heading-lg">Work With Me</h2>
                  <p className="body-md section-subtext">{settings.connectSubtitle}</p>
                </div>
                <div className="services-grid-new">
                  {offeredServices.map(service => (
                    <div key={service.id} className="service-card-new">
                      <h3 className="heading-md">{service.title}</h3>
                      <p className="body-md">{service.shortDescription}</p>
                    </div>
                  ))}
                </div>
                <div className="section-cta">
                  <Link to="/connect" className="btn-primary">
                    Start a Project
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 6 — SOFT FOOTER CTA */}
            <section className="section-narrow">
              <div className="soft-footer-cta content-width-narrow">
                <p className="body-lg cta-text">
                  Looking for cinematic storytelling grounded in real roads, tracks and places?
                </p>
                <Link to="/connect" className="btn-outline">
                  Let's Talk
                </Link>
              </div>
            </section>
          </main>


        </>
      )}
    </div>
  );
}

export default Home;
