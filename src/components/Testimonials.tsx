const testimonials = [
  {
    name: "David Martinez",
    company: "Elite Movers LLC",
    role: "Owner",
    image: "👨‍💼",
    quote: "We've been beta testing for 3 months and our conversion rate jumped from 12% to 41%. The AI scoring is incredibly accurate - we now focus only on leads that are ready to book.",
    rating: 5,
    metric: "3.4x conversion increase"
  },
  {
    name: "Jennifer Lee",
    company: "Coastal Moving Services",
    role: "Sales Manager",
    image: "👩‍💼",
    quote: "Before MovingLead, my team wasted hours chasing tire-kickers. Now we spend our time closing deals. Our revenue per lead has more than doubled.",
    rating: 5,
    metric: "2.3x revenue per lead"
  },
  {
    name: "Robert Thompson",
    company: "Metro Relocation Group",
    role: "CEO",
    image: "👨‍💼",
    quote: "The ROI calculator alone sold me, but the actual results exceeded expectations. We're saving $15K/month in wasted labor costs and closing bigger jobs.",
    rating: 5,
    metric: "$15K monthly savings"
  },
  {
    name: "Amanda Foster",
    company: "Swift Move Solutions",
    role: "Operations Director",
    image: "👩‍💼",
    quote: "As a beta tester, I was skeptical at first. But the AI's ability to predict which leads will convert is almost scary good. Game changer for our business.",
    rating: 5,
    metric: "60% time saved"
  }
]

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Beta Tester Results</span>
          <h2 className="section-title">
            Trusted by Moving Companies<br />
            <span className="gradient-text">Who Demand Results</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our beta testers are saying about their results.
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.image}</div>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-title">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
              
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              
              <div className="testimonial-metric">
                <span className="metric-icon">📈</span>
                <span className="metric-text">{testimonial.metric}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonials-footer">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-number">500+</div>
              <div className="trust-label">Leads Scored Daily</div>
            </div>
            <div className="trust-badge">
              <div className="trust-number">94%</div>
              <div className="trust-label">Accuracy Rate</div>
            </div>
            <div className="trust-badge">
              <div className="trust-number">4.9/5</div>
              <div className="trust-label">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

