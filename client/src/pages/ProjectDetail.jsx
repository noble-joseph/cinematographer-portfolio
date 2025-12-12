import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectBySlug } from '../api/projectsApi';
import '../App.css';

function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const projectData = await getProjectBySlug(slug);
        if (!mounted) return;
        setProject(projectData);
      } catch (err) {
        console.error('Project data fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="App">
        <div className="error">Project not found</div>
      </div>
    );
  }

  const allMedia = [...(project.gallery || [])];
  const hasMedia = allMedia.length > 0;

  const goToPreviousMedia = () => {
    setCurrentMediaIndex(prev => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const goToNextMedia = () => {
    setCurrentMediaIndex(prev => (prev === allMedia.length - 1 ? 0 : prev + 1));
  };

  const currentMedia = allMedia[currentMediaIndex];

  return (
    <div className="App">
      <header className="App-header">
        <h1>{project.title}</h1>
        <div className="project-meta-detail">
          <span className="project-year">{project.year}</span>
          {project.client && (
            <>
              <span className="meta-separator">·</span>
              <span className="project-client">{project.client}</span>
            </>
          )}
          <span className="meta-separator">·</span>
          <span className="project-role">{project.role}</span>
        </div>
        <span className="project-type-tag">{project.type}</span>
      </header>

      <main>
        <section className="project-detail">
          {/* Main Media Gallery */}
          <div className="project-media-section">
            {hasMedia ? (
              <div className="media-gallery">
                <div className="media-container">
                  {currentMedia.type === 'image' ? (
                    <img 
                      src={currentMedia.url} 
                      alt={currentMedia.caption || project.title}
                      className="main-media-image"
                    />
                  ) : (
                    <iframe
                      src={currentMedia.url}
                      title={currentMedia.caption || project.title}
                      className="main-media-video"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                  
                  {/* Navigation Arrows */}
                  {allMedia.length > 1 && (
                    <>
                      <button 
                        className="media-nav-button prev" 
                        onClick={goToPreviousMedia}
                        aria-label="Previous media"
                      >
                        ←
                      </button>
                      <button 
                        className="media-nav-button next" 
                        onClick={goToNextMedia}
                        aria-label="Next media"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
                
                {/* Media Counter */}
                {allMedia.length > 1 && (
                  <div className="media-counter">
                    {currentMediaIndex + 1} / {allMedia.length}
                  </div>
                )}
                
                {/* Caption */}
                {currentMedia.caption && (
                  <div className="media-caption">
                    {currentMedia.caption}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-media">
                <p>No media available for this project.</p>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="project-details-section">
            <div className="project-description">
              <h2>Description</h2>
              <p>{project.shortDescription}</p>
              {project.fullDescription && (
                <div dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
              )}
            </div>
            
            {/* Gallery Thumbnails */}
            {hasMedia && allMedia.length > 1 && (
              <div className="gallery-thumbnails">
                <h3>Gallery</h3>
                <div className="thumbnails-container">
                  {allMedia.map((media, index) => (
                    <div 
                      key={index}
                      className={`thumbnail-item ${index === currentMediaIndex ? 'active' : ''}`}
                      onClick={() => setCurrentMediaIndex(index)}
                    >
                      {media.type === 'image' ? (
                        <img 
                          src={media.url} 
                          alt={media.caption || `Thumbnail ${index + 1}`}
                          className="thumbnail-image"
                        />
                      ) : (
                        <div className="thumbnail-video">
                          <span className="play-icon">▶</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProjectDetail;