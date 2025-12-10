import React from 'react';
import { journeys } from '../data/journeys';
import '../App.css';

function Journeys() {
  // Sort journeys by date descending (most recent first)
  const sortedJourneys = [...journeys].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Journeys</h1>
        <p>Field logs from the road, the track, and behind the camera.</p>
      </header>

      <main>
        <section className="stories-content">
          {/* Section Tagline */}
          <div className="journeys-tagline">
            <p>Journeys — Field Logs from the Road & Track</p>
          </div>

          {/* Journey Cards Grid */}
          <div className="journeys-cards-grid">
            {sortedJourneys.map(journey => (
              <div key={journey.id} className="story-card journey-card-full">
                {/* Journey Meta Header */}
                <div className="journey-card-meta">
                  <span className="journey-type-badge">{journey.type}</span>
                  <span className="journey-card-date">
                    {new Date(journey.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3>{journey.title}</h3>

                {/* Location */}
                <p className="journey-card-location">
                  <span className="location-icon">📍</span> {journey.location}
                </p>

                {/* Excerpt */}
                <p className="journey-excerpt">{journey.excerpt}</p>

                {/* Journey Stats (optional - only if data exists) */}
                {(journey.distanceKm || journey.elevationGain || journey.vehicle || journey.terrain) && (
                  <div className="journey-stats-inline">
                    {journey.distanceKm && (
                      <span className="stat-item">
                        <strong>{journey.distanceKm}km</strong>
                      </span>
                    )}
                    {journey.elevationGain && (
                      <span className="stat-item">
                        <strong>↑ {journey.elevationGain}m</strong>
                      </span>
                    )}
                    {journey.vehicle && (
                      <span className="stat-item">
                        🏍 {journey.vehicle}
                      </span>
                    )}
                    {journey.terrain && (
                      <span className="stat-item">
                        🗺 {journey.terrain}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Journeys;
