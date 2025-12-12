import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getProjectsByCategory } from '../api/projectsApi';
import '../App.css';

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define filter categories
  const filterCategories = ['All', 'Cinematography', 'Design', 'Travel', 'Motorsport'];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const projects = await getProjectsByCategory(activeFilter);
        if (!mounted) return;
        setFilteredProjects(projects);
      } catch (err) {
        console.error('Portfolio data fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [activeFilter]);

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
                <Link to={`/portfolio/${project.slug}`} key={project.id} className="project-link">
                  <div className="project-card">
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
                      
                      {/* Media Count */}
                      {project.gallery && project.gallery.length > 0 && (
                        <div className="media-count">
                          {project.gallery.length} {project.gallery.length === 1 ? 'media item' : 'media items'}
                        </div>
                      )}
                      
                      {/* View Project Button */}
                      <div className="view-project-btn">
                        View Project →
                      </div>
                    </div>
                  </div>
                </Link>
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