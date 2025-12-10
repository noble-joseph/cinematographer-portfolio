import React from 'react';
import { settings } from '../data/settings';
import '../App.css';

function About() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>About</h1>
        <p>Cinematic storytelling from city lights to race tracks and remote landscapes.</p>
      </header>

      <main>
        <section className="about-content">
          <div className="about-text">
            {/* Section 1: Intro */}
            <div className="about-intro">
              <p className="about-lead">
                I'm a cinematographer and designer whose work is shaped by travel and motorsport adventure. 
                My films and visual systems are built on the belief that the best stories emerge when you're 
                willing to chase real light, real terrain, and real moments — whether that's on a race track 
                at dawn, a remote mountain pass, or the controlled chaos of a brand campaign.
              </p>
            </div>

            {/* Section 2: Path / Journey */}
            <div className="about-journey">
              <h2>The Path</h2>
              <p>
                Cinematography taught me to see — to understand how light shapes emotion, how movement creates 
                rhythm, and how a single frame can carry the weight of an entire narrative. But it was design 
                that taught me to think structurally, to build visual languages that guide audiences through 
                complex stories with clarity and intention.
              </p>
              <p>
                Travel became the laboratory. Every location — from Kerala's backwaters to the Himalayas, from 
                coastal highways to urban labyrinths — offered lessons in adaptation, in reading weather and culture, 
                in finding beauty in unpredictability. These weren't just backdrops; they became collaborators in 
                the creative process.
              </p>
              <p>
                Motorsport brought precision and adrenaline into the equation. Riding motorcycles through mountain 
                ghats, documenting racing circuits, and understanding the physics of speed taught me that great 
                cinematography requires the same thing great racing does: absolute presence, calculated risk, and 
                respect for the machine. This intersection of motion, mechanics, and emotion became central to how 
                I approach every project.
              </p>
            </div>

            {/* Section 3: What I Care About in My Work */}
            <div className="about-values">
              <h2>What I Care About in My Work</h2>
              <ul className="about-values-list">
                <li>
                  <strong>Design-led storytelling with intentional frames.</strong> Every shot is a deliberate 
                  choice — composition, color, and movement work together to serve the narrative, not just the aesthetic.
                </li>
                <li>
                  <strong>Respect for real locations, light, and conditions.</strong> I don't fake environments or 
                  force moments. The best work comes from understanding and working with what's actually there.
                </li>
                <li>
                  <strong>Precision in motion — whether it's a bike, a car, or a character.</strong> Movement is 
                  never arbitrary. Speed, pacing, and trajectory are choreographed with the same rigor as any visual element.
                </li>
                <li>
                  <strong>Collaborative processes with brands and teams.</strong> Great work happens when egos step 
                  aside and everyone — client, crew, subject — is aligned on the vision and committed to the craft.
                </li>
              </ul>
            </div>

            {/* Section 4: Selected Highlights */}
            <div className="about-highlights">
              <h2>Selected Highlights</h2>
              <div className="highlights-grid">
                <div className="highlight-column">
                  <h3>Collaborations</h3>
                  <ul className="highlights-list">
                    <li>Royal Enfield — Brand Films</li>
                    <li>Kerala Tourism Board</li>
                    <li>RevLine Automotive — Visual Identity</li>
                    <li>Apex Motorsports</li>
                    <li>Wanderlust Collective</li>
                  </ul>
                </div>
                <div className="highlight-column">
                  <h3>Recognition</h3>
                  <ul className="highlights-list">
                    <li>Featured: Grid Racing Series Campaign</li>
                    <li>Published: Travel + Leisure India</li>
                    <li>Showcased: Motorsport Film Festival (2024)</li>
                    <li>Award: Best Cinematography — Regional Doc</li>
                  </ul>
                </div>
                <div className="highlight-column">
                  <h3>Approach</h3>
                  <ul className="highlights-list">
                    <li>Film-first storytelling</li>
                    <li>Location-driven narratives</li>
                    <li>Hybrid design + cinematography</li>
                    <li>Adventure-informed production</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="about-cta">
              <p>Based in {settings.location} — Available for select projects worldwide.</p>
              <a href="/connect" className="about-contact-btn">Let's Work Together</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;
