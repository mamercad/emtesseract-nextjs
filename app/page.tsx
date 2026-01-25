export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero">
        <div className="container">
          <div className="logo">
            <div className="tesseract-logo">
              <div className="tesseract-cube cube-outer"></div>
              <div className="tesseract-cube cube-inner"></div>
            </div>
          </div>
          <div className="hero-content">
            <h1>EMTesseract</h1>
            <p className="subtitle">Crafting immersive digital experiences through code</p>
            <a href="#games" className="cta-button">Explore Games</a>
          </div>
          <div className="scroll-indicator">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <h2>About the Vision</h2>
            <p>Building innovative game experiences with modern technology and creative storytelling</p>
          </div>
          <div className="about-grid">
            <div className="glass-card about-card">
              <div className="about-icon">🎮</div>
              <h3>Game Development</h3>
              <p>Creating engaging gameplay mechanics and immersive worlds using cutting-edge technologies and frameworks.</p>
            </div>
            <div className="glass-card about-card">
              <div className="about-icon">🎨</div>
              <h3>Visual Design</h3>
              <p>Crafting beautiful interfaces and memorable visual experiences that captivate and inspire players.</p>
            </div>
            <div className="glass-card about-card">
              <div className="about-icon">⚡</div>
              <h3>Performance</h3>
              <p>Optimizing every aspect for smooth, responsive gameplay across all platforms and devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Games</h2>
            <p>Explore our collection of interactive experiences</p>
          </div>
          <div className="games-grid">
            <div className="glass-card game-card">
              <div className="card-image">🎯</div>
              <div className="card-content">
                <h3>Dart Tournament</h3>
                <p>A competitive dart-throwing simulation with realistic physics and engaging multiplayer gameplay.</p>
                <span className="game-status">Available Now</span>
              </div>
            </div>
            <div className="glass-card game-card">
              <div className="card-image">♟️</div>
              <div className="card-content">
                <h3>Strategy Quest</h3>
                <p>Turn-based strategy game combining tactical decision-making with rich narrative elements.</p>
                <span className="game-status in-progress">In Development</span>
              </div>
            </div>
            <div className="glass-card game-card">
              <div className="card-image">🌌</div>
              <div className="card-content">
                <h3>Space Explorer</h3>
                <p>Explore vast galaxies, discover new worlds, and uncover ancient mysteries in this space adventure.</p>
                <span className="game-status in-progress">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="contact-content">
            <div className="section-header">
              <h2>Get in Touch</h2>
              <p>Have questions or want to collaborate? Reach out through any of these channels</p>
            </div>
            <div className="contact-links">
              <a href="mailto:root@emtesseract.com" className="contact-link">
                <span className="contact-icon">📧</span>
                <span>Email</span>
              </a>
              <a href="#" className="contact-link">
                <span className="contact-icon">💬</span>
                <span>Discord</span>
              </a>
              <a href="https://github.com/mamercad" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-icon">🐙</span>
                <span>GitHub</span>
              </a>
              <a href="#" className="contact-link">
                <span className="contact-icon">🐦</span>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2024 EMTesseract. Crafted with passion and code.</p>
        </div>
      </footer>
    </>
  );
}
