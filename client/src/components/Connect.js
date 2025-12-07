import React, { useState } from 'react';
import './Connect.css';

function Connect() {
  const [formType, setFormType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    artistName: '',
    collaborationType: '',
    availability: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct email subject based on form type
    const subject = formType === 'collaboration'
      ? 'Request for Collaboration'
      : 'Request for Partnership';

    // Construct email body with form details
    let body = `Form Type: ${formType === 'collaboration' ? 'Collaboration' : 'Hiring'}\n\n`;
    body += `Name: ${formData.name}\n`;
    body += `Email: ${formData.email}\n`;
    if (formData.phone) body += `Phone: ${formData.phone}\n`;

    if (formType === 'hiring') {
      body += `\nProject Details:\n`;
      body += `Project Type: ${formData.projectType}\n`;
      if (formData.budget) body += `Budget Range: ${formData.budget}\n`;
      if (formData.timeline) body += `Timeline: ${formData.timeline}\n`;
    } else if (formType === 'collaboration') {
      body += `\nCollaboration Details:\n`;
      body += `Artist Name/Brand: ${formData.artistName}\n`;
      body += `Collaboration Type: ${formData.collaborationType}\n`;
      if (formData.availability) body += `Availability: ${formData.availability}\n`;
    }

    body += `\nMessage:\n${formData.message}`;

    // Encode for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Create mailto URL
    const mailtoUrl = `mailto:adithkrishna16@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    // Open email client
    window.location.href = mailtoUrl;
  };

  return (
    <div className="connect-page">
      <header className="connect-header">
        <h1>Let's Connect</h1>
        <p>Start your creative journey with us</p>
      </header>
      <main className="connect-main">
        <form className="connect-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>What brings you here?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="formType"
                  value="collaboration"
                  onChange={(e) => setFormType(e.target.value)}
                />
                Collaboration 
              </label>
              <label>
                <input
                  type="radio"
                  name="formType"
                  value="hiring"
                  onChange={(e) => setFormType(e.target.value)}
                />
                Hiring 
              </label>
            </div>
          </div>

          {formType && (
            <>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              {formType === 'hiring' && (
                <>
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type *</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select project type</option>
                      <option value="feature-film">Feature Film</option>
                      <option value="documentary">Documentary</option>
                      <option value="commercial">Commercial</option>
                      <option value="music-video">Music Video</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-50k">$10,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeline">Timeline</label>
                    <input
                      type="text"
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      placeholder="e.g., 3 months"
                    />
                  </div>
                </>
              )}

              {formType === 'collaboration' && (
                <>
                  <div className="form-group">
                    <label htmlFor="artistName">Your Artist Name/Brand *</label>
                    <input
                      type="text"
                      id="artistName"
                      name="artistName"
                      value={formData.artistName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="collaborationType">Type of Collaboration *</label>
                    <select
                      id="collaborationType"
                      name="collaborationType"
                      value={formData.collaborationType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select collaboration type</option>
                      <option value="barter-collaborations">Barter collaborations</option>
                      <option value="paid-collaborations">Paid collaborations</option>
                      <option value="cross-promotion">Cross Promotion</option>
                      <option value="sponsored-content">Sponsored Content</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="availability">Your Availability</label>
                    <input
                      type="text"
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      placeholder="e.g., Weekends, Flexible"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="message">Tell us more about your project/idea *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                  placeholder="Describe your vision, goals, and any specific requirements..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </>
          )}
        </form>
      </main>
    </div>
  );
}

export default Connect;
