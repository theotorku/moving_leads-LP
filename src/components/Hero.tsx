const Hero = () => {
  const scrollToCTA = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-icon">✨</span>
          <span>AI-Powered Lead Scoring</span>
        </div>
        
        <h1 className="hero-title">
          AI-Scored Moving Leads<br />
          <span className="gradient-text">That Actually Convert</span>
        </h1>
        
        <p className="hero-subtitle">
          Stop wasting time on unqualified leads. Our AI analyzes and scores every moving lead 
          in real-time, so you only spend time on prospects ready to book.
        </p>
        
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={scrollToCTA}>
            Start Free Trial
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn btn-secondary" onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}>
            Calculate Your Savings
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">3.5x</div>
            <div className="stat-label">Higher Conversion Rate</div>
          </div>
          <div className="stat">
            <div className="stat-number">60%</div>
            <div className="stat-label">Time Saved</div>
          </div>
          <div className="stat">
            <div className="stat-number">$12K</div>
            <div className="stat-label">Avg. Monthly Savings</div>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="dashboard-preview">
          <div className="preview-header">
            <div className="preview-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="preview-title">Lead Dashboard</div>
          </div>
          <div className="preview-content">
            <div className="lead-card hot">
              <div className="lead-score">98</div>
              <div className="lead-info">
                <div className="lead-name">Sarah Johnson</div>
                <div className="lead-details">3BR House • 1,200 mi • $8,500 est.</div>
                <div className="lead-tags">
                  <span className="tag">Ready to Book</span>
                  <span className="tag">High Budget</span>
                </div>
              </div>
            </div>
            <div className="lead-card warm">
              <div className="lead-score">76</div>
              <div className="lead-info">
                <div className="lead-name">Mike Chen</div>
                <div className="lead-details">2BR Apt • 450 mi • $3,200 est.</div>
                <div className="lead-tags">
                  <span className="tag">Flexible Dates</span>
                </div>
              </div>
            </div>
            <div className="lead-card cold">
              <div className="lead-score">42</div>
              <div className="lead-info">
                <div className="lead-name">John Smith</div>
                <div className="lead-details">1BR Apt • 200 mi • $1,800 est.</div>
                <div className="lead-tags">
                  <span className="tag">Price Shopping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

