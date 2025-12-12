import React, { useState, useEffect } from 'react';
import { getSettings } from '../api/settingsApi';
import { getServices } from '../api/servicesApi';
import './Connect.css';

function Connect() {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [globalSettings, serviceList] = await Promise.all([
          getSettings(),
          getServices()
        ]);
        if (!mounted) return;
        setSettings(globalSettings);
        setServices(serviceList);
      } catch (err) {
        console.error('Connect data fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Form submission placeholder
    console.log('Form Data:', formData);
    alert('Thank you for reaching out! This is a form submission placeholder. Your message has been logged to the console.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      projectType: '',
      budget: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div className="connect-page">
      <header className="connect-header">
        <h1>{settings?.connectHeadline || 'Let\'s Make Something Bold'}</h1>
        <p>{settings?.connectSubtitle || 'Available for brand films, motorsport & travel content, visual campaigns, and collaborative projects.'}</p>
      </header>

      <main className="connect-main">
        {/* Services Offered - Quick Bullets */}
        <section className="connect-services">
          <h2>What I Offer</h2>
          <ul className="services-bullets">
            {services.map(service => (
              <li key={service.id}>{service.title}</li>
            ))}
          </ul>
        </section>

        {/* Contact Form */}
        <section className="connect-form-section">
          <h2>Start a Project</h2>
          <form className="connect-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="projectType">Project Type</label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
              >
                <option value="">Select project type</option>
                <option value="brand-film">Brand Film</option>
                <option value="motorsport-content">Motorsport Content</option>
                <option value="travel-film">Travel Film</option>
                <option value="design-system">Design System</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget Range (Optional)</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-30k">$15,000 - $30,000</option>
                <option value="30k-50k">$30,000 - $50,000</option>
                <option value="over-50k">Over $50,000</option>
                <option value="flexible">Flexible / TBD</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell me about your project *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
                placeholder="Describe your vision, goals, timeline, and any specific requirements..."
                className={errors.message ? 'error' : ''}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </section>

        {/* Direct Contact Info */}
        <section className="direct-contact">
          <h3>Or Reach Out Directly</h3>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href={`mailto:${settings?.email || 'hello@adithkrishna.com'}`} className="contact-link">
                {settings?.email || 'hello@adithkrishna.com'}
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Based in:</span>
              <span className="contact-value">{settings?.location || 'Kerala, India'}</span>
            </div>
          </div>

          <div className="social-links">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                Instagram
              </a>
            )}
            {settings?.youtubeUrl && (
              <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                YouTube
              </a>
            )}
            {settings?.behanceUrl && (
              <a href={settings.behanceUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                Behance
              </a>
            )}
            {settings?.vimeoUrl && (
              <a href={settings.vimeoUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                Vimeo
              </a>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Connect;
