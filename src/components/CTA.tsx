import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const CTA = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, company }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
        setName('')
        setCompany('')
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <section id="cta-section" className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Transform Your<br />
              <span className="gradient-text">Lead Conversion?</span>
            </h2>
            <p className="cta-subtitle">
              Join moving companies already saving thousands with AI-scored leads.
              Start your 14-day free trial - no credit card required.
            </p>
            
            <form onSubmit={handleSubmit} className="cta-form">
              {error && <div className="form-error">{error}</div>}
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-input"
                />
                <input
                  type="text"
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="text-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="email-input"
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : submitted ? '✓ Submitted!' : 'Start Free Trial'}
                </button>
              </div>
              <p className="form-note">
                ✓ 14-day free trial &nbsp;•&nbsp; ✓ No credit card required &nbsp;•&nbsp; ✓ Cancel anytime
              </p>
            </form>
            
            <div className="cta-features">
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span className="feature-text">Setup in 5 minutes</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span className="feature-text">Enterprise-grade security</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <span className="feature-text">24/7 support</span>
              </div>
            </div>
          </div>
          
          <div className="cta-visual">
            <div className="pricing-card">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-plan">Professional</div>
              <div className="pricing-price">
                <span className="price-currency">$</span>
                <span className="price-amount">299</span>
                <span className="price-period">/month</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Unlimited lead scoring</li>
                <li>✓ Real-time AI analysis</li>
                <li>✓ CRM integration</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
                <li>✓ Custom scoring models</li>
              </ul>
              <div className="pricing-guarantee">
                <span className="guarantee-icon">🛡️</span>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA

