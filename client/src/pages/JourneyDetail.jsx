import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJourneyBySlug } from '../api/journeysApi';
import '../App.css';

function JourneyDetail() {
    const { slug } = useParams();
    const [journey, setJourney] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                const data = await getJourneyBySlug(slug);
                if (!mounted) return;
                setJourney(data);
            } catch (err) {
                console.error('Journey data fetch error:', err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [slug]);

    if (loading) {
        return (
            <div className="App">
                <div className="loading">Loading journey...</div>
            </div>
        );
    }

    if (!journey) {
        return (
            <div className="App">
                <div className="error">Journey not found</div>
            </div>
        );
    }

    const allMedia = [...(journey.gallery || [])];
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
                <div className="back-nav">
                    <Link to="/stories" className="back-link">← Back to Journeys</Link>
                </div>
                <h1>{journey.title}</h1>
                <div className="project-meta-detail">
                    <span className="project-year">
                        {new Date(journey.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    {journey.location && (
                        <>
                            <span className="meta-separator">·</span>
                            <span className="project-client">{journey.location}</span>
                        </>
                    )}
                </div>
                <span className="project-type-tag">{journey.type}</span>
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
                                            alt={currentMedia.caption || journey.title}
                                            className="main-media-image"
                                        />
                                    ) : (
                                        <iframe
                                            src={currentMedia.url}
                                            title={currentMedia.caption || journey.title}
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
                                <p>No media available for this journey.</p>
                            </div>
                        )}
                    </div>

                    {/* Stats & Details */}
                    <div className="project-details-section">
                        {/* Stats Row */}
                        {(journey.distanceKm || journey.elevationGain || journey.vehicle || journey.terrain) && (
                            <div className="journey-stats-bar">
                                {journey.distanceKm && <div className="stat-box"><strong>Distance</strong><span>{journey.distanceKm} km</span></div>}
                                {journey.elevationGain && <div className="stat-box"><strong>Elevation</strong><span>{journey.elevationGain} m</span></div>}
                                {journey.vehicle && <div className="stat-box"><strong>Vehicle</strong><span>{journey.vehicle}</span></div>}
                                {journey.terrain && <div className="stat-box"><strong>Terrain</strong><span>{journey.terrain}</span></div>}
                            </div>
                        )}

                        <div className="project-description">
                            <h2>Field Notes</h2>
                            <p>{journey.excerpt}</p>
                            {journey.content && (
                                <div dangerouslySetInnerHTML={{ __html: journey.content }} />
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

                        {/* Related Project Link */}
                        {journey.relatedProject && (
                            <div className="related-project-section">
                                <h3>Related Project</h3>
                                <Link to={`/portfolio/${journey.relatedProject.slug}`} className="related-project-card">
                                    <div className="related-content">
                                        <h4>{journey.relatedProject.title} →</h4>
                                        <p>{journey.relatedProject.year} · {journey.relatedProject.client}</p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default JourneyDetail;
