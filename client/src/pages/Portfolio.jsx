import React, { useState } from 'react';
import { projects } from '../data/projects';
import '../App.css';

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Define filter categories
  const filterCategories = ['All', 'Cinematography', 'Design', 'Travel', 'Motorsport'];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => 
        project.categories.some(cat => cat.toLowerCase() === activeFilter.toLowerCase())
      );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Selected Work</h1>
        <p>Films, campaigns, and visual systems from the road, track, and studio.</p>
      </header>

      <main>
        <section className="portfolio">
          {/* Filter Bar */}
          <div className="portfolio-filters">
            {filterCategories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <div key={project.id} className="project-card">
                  {/* Thumbnail */}
                  <div 
                    className="project-thumbnail"
                    style={{ 
                      backgroundImage: `url(${project.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="thumbnail-overlay-portfolio"></div>
                  </div>

                  {/* Project Info */}
                  <div className="project-info">
                    <span className="project-type-tag">{project.type}</span>
                    <h3>{project.title}</h3>
                    <div className="project-meta">
                      <span className="project-year">{project.year}</span>
                      {project.client && (
                        <>
                          <span className="meta-separator">·</span>
                          <span className="project-client">{project.client}</span>
                        </>
                      )}
                    </div>
                    <p className="project-description">{project.shortDescription}</p>
                    
                    {/* View Film Button */}
                    {project.videoUrl && (
                      <a 
                        href={project.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-film-btn"
                      >
                        View Film →
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-projects">
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Portfolio;
