import { useState, useEffect } from 'react'

const ROICalculator = () => {
  const [leadsPerMonth, setLeadsPerMonth] = useState(100)
  const [avgTimePerLead, setAvgTimePerLead] = useState(15)
  const [hourlyRate, setHourlyRate] = useState(50)
  const [currentConversion, setCurrentConversion] = useState(15)
  
  const [results, setResults] = useState({
    timeSaved: 0,
    moneySaved: 0,
    additionalRevenue: 0,
    totalROI: 0
  })
  
  useEffect(() => {
    // Calculate time saved (60% reduction in time on bad leads)
    const badLeads = leadsPerMonth * (1 - currentConversion / 100)
    const timeSavedHours = (badLeads * avgTimePerLead * 0.6) / 60
    const moneySaved = timeSavedHours * hourlyRate
    
    // Calculate additional revenue (3.5x conversion improvement)
    const newConversionRate = Math.min(currentConversion * 2.5, 95)
    const additionalConversions = leadsPerMonth * ((newConversionRate - currentConversion) / 100)
    const avgJobValue = 3500 // Average moving job
    const additionalRevenue = additionalConversions * avgJobValue
    
    const totalROI = moneySaved + additionalRevenue
    const serviceCost = 299 // Monthly subscription
    const netROI = totalROI - serviceCost
    
    setResults({
      timeSaved: Math.round(timeSavedHours),
      moneySaved: Math.round(moneySaved),
      additionalRevenue: Math.round(additionalRevenue),
      totalROI: Math.round(netROI)
    })
  }, [leadsPerMonth, avgTimePerLead, hourlyRate, currentConversion])
  
  return (
    <section id="roi-calculator" className="roi-calculator">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">ROI Calculator</span>
          <h2 className="section-title">
            Calculate Your<br />
            <span className="gradient-text">Cost Savings</span>
          </h2>
          <p className="section-subtitle">
            See exactly how much time and money you'll save with AI-scored leads
          </p>
        </div>
        
        <div className="calculator-wrapper">
          <div className="calculator-inputs">
            <div className="input-group">
              <label htmlFor="leads">
                <span className="label-text">Monthly Leads</span>
                <span className="label-value">{leadsPerMonth}</span>
              </label>
              <input
                id="leads"
                type="range"
                min="20"
                max="500"
                step="10"
                value={leadsPerMonth}
                onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>20</span>
                <span>500</span>
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="time">
                <span className="label-text">Avg. Time Per Lead (minutes)</span>
                <span className="label-value">{avgTimePerLead}</span>
              </label>
              <input
                id="time"
                type="range"
                min="5"
                max="60"
                step="5"
                value={avgTimePerLead}
                onChange={(e) => setAvgTimePerLead(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>5</span>
                <span>60</span>
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="rate">
                <span className="label-text">Hourly Labor Rate ($)</span>
                <span className="label-value">${hourlyRate}</span>
              </label>
              <input
                id="rate"
                type="range"
                min="20"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>$20</span>
                <span>$150</span>
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="conversion">
                <span className="label-text">Current Conversion Rate (%)</span>
                <span className="label-value">{currentConversion}%</span>
              </label>
              <input
                id="conversion"
                type="range"
                min="5"
                max="50"
                step="1"
                value={currentConversion}
                onChange={(e) => setCurrentConversion(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>
          </div>
          
          <div className="calculator-results">
            <div className="results-card">
              <h3 className="results-title">Your Monthly Savings</h3>
              
              <div className="result-item">
                <div className="result-icon">⏱️</div>
                <div className="result-content">
                  <div className="result-label">Time Saved</div>
                  <div className="result-value">{results.timeSaved} hours</div>
                </div>
              </div>
              
              <div className="result-item">
                <div className="result-icon">💰</div>
                <div className="result-content">
                  <div className="result-label">Labor Cost Savings</div>
                  <div className="result-value">${results.moneySaved.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="result-item">
                <div className="result-icon">📈</div>
                <div className="result-content">
                  <div className="result-label">Additional Revenue</div>
                  <div className="result-value">${results.additionalRevenue.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="result-total">
                <div className="total-label">Total Monthly ROI</div>
                <div className="total-value">${results.totalROI.toLocaleString()}</div>
                <div className="total-subtitle">After $299/mo subscription</div>
              </div>
              
              <button className="btn btn-primary btn-full" onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Saving Now
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ROICalculator

