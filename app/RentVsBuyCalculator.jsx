"use client"

import { useState } from "react"

function fmt(num) { 
  return "$" + Math.round(num).toLocaleString("en-US") 
}

export default function RentVsBuyCalculator() {
  const [rent, setRent] = useState("")
  const [homePrice, setHomePrice] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("30")
  const [years, setYears] = useState("")
  const [results, setResults] = useState(null)

  const calculate = () => {
    const monthlyRent = parseFloat(rent)
    const price = parseFloat(homePrice)
    const down = parseFloat(downPayment) || 0
    const rate = (parseFloat(interestRate) || 0) / 100 / 12
    const termYears = parseFloat(loanTerm)
    const holdYears = parseFloat(years)
    
    if (!monthlyRent || !price || !rate || !termYears || !holdYears) return
    
    const loanAmount = price - down
    const months = termYears * 12
    const holdMonths = holdYears * 12
    
    // Monthly mortgage payment (standard amortization formula)
    const mortgagePayment = loanAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
    
    // Assumptions (explained in content sections)
    const homeAppreciation = 0.03      // 3% annual home value increase
    const rentIncrease = 0.02          // 2% annual rent increase
    const investmentReturn = 0.07      // 7% annual return on investments
    const sellingCosts = 0.06          // 6% realtor fees + closing costs on sale
    
    // --- BUYING SCENARIO ---
    let homeValue = price
    let remainingLoan = loanAmount
    
    for (let i = 0; i < holdMonths; i++) {
      const interestThisMonth = remainingLoan * rate
      const principalThisMonth = mortgagePayment - interestThisMonth
      remainingLoan -= principalThisMonth
      if (i % 12 === 11) homeValue = homeValue * (1 + homeAppreciation)
    }
    
    const netProceeds = homeValue - Math.max(0, remainingLoan) - (homeValue * sellingCosts)
    
    // --- RENTING SCENARIO ---
    let monthlyRentCurrent = monthlyRent
    let totalRentPaid = 0
    for (let i = 0; i < holdMonths; i++) {
      totalRentPaid += monthlyRentCurrent
      if (i % 12 === 11) monthlyRentCurrent = monthlyRentCurrent * (1 + rentIncrease)
    }
    
    // Down payment invested instead
    let investedDown = down
    for (let i = 0; i < holdYears; i++) investedDown = investedDown * (1 + investmentReturn)
    
    // Monthly savings (if rent < mortgage) or extra cost (if mortgage < rent)
    const monthlyDiff = mortgagePayment - monthlyRent
    let investedSavings = 0
    if (monthlyDiff > 0) {
      for (let i = 0; i < holdMonths; i++) {
        investedSavings = investedSavings * (1 + investmentReturn / 12) + monthlyDiff
      }
    }
    
    const rentingNetWorth = investedDown + investedSavings
    const buyingNetWorth = netProceeds
    const winner = buyingNetWorth > rentingNetWorth ? "Buying" : "Renting"
    const difference = Math.abs(buyingNetWorth - rentingNetWorth)
    
    setResults({ 
      buyingNetWorth: Math.round(buyingNetWorth), 
      rentingNetWorth: Math.round(rentingNetWorth), 
      winner, 
      difference,
      holdYears,
      mortgagePayment: Math.round(mortgagePayment)
    })
  }

  return (
    <div className="rbe-card">
      <div className="rbe-field-row">
        <div>
          <label className="rbe-field-label">Monthly rent</label>
          <div className="rbe-input-wrap">
            <span className="rbe-prefix">$</span>
            <input 
              className="rbe-input" 
              type="number" 
              placeholder="1,500" 
              value={rent} 
              onChange={e => setRent(e.target.value)} 
            />
          </div>
        </div>
        <div>
          <label className="rbe-field-label">Home price</label>
          <div className="rbe-input-wrap">
            <span className="rbe-prefix">$</span>
            <input 
              className="rbe-input" 
              type="number" 
              placeholder="300,000" 
              value={homePrice} 
              onChange={e => setHomePrice(e.target.value)} 
            />
          </div>
        </div>
      </div>

      <div className="rbe-field-row">
        <div>
          <label className="rbe-field-label">Down payment</label>
          <div className="rbe-input-wrap">
            <span className="rbe-prefix">$</span>
            <input 
              className="rbe-input" 
              type="number" 
              placeholder="60,000" 
              value={downPayment} 
              onChange={e => setDownPayment(e.target.value)} 
            />
          </div>
        </div>
        <div>
          <label className="rbe-field-label">Interest rate</label>
          <div className="rbe-input-wrap">
            <input 
              className="rbe-input" 
              type="number" 
              step="0.125" 
              placeholder="6.5" 
              value={interestRate} 
              onChange={e => setInterestRate(e.target.value)} 
            />
            <span style={{ position: "absolute", right: "0", top: ".4rem", fontSize: "1rem", color: "#aaa" }}>%</span>
          </div>
        </div>
      </div>

      <div className="rbe-field-row">
        <div>
          <label className="rbe-field-label">Loan term</label>
          <select className="rbe-select" value={loanTerm} onChange={e => setLoanTerm(e.target.value)}>
            <option value="15">15 years</option>
            <option value="30">30 years</option>
          </select>
        </div>
        <div>
          <label className="rbe-field-label">How many years will you stay?</label>
          <input 
            className="rbe-input" 
            type="number" 
            placeholder="5" 
            value={years} 
            onChange={e => setYears(e.target.value)} 
          />
        </div>
      </div>

      <button className="rbe-calc-btn" onClick={calculate}>
        Compare rent vs buy →
      </button>

      {results && (
        <div className="rbe-results">
          <div className="rbe-result-grid">
            <div className="rbe-result-cell">
              <p className="rbe-result-label">If you buy</p>
              <p className={`rbe-result-val ${results.winner === "Buying" ? "green" : ""}`}>
                {fmt(results.buyingNetWorth)}
              </p>
              <p className="rbe-result-sub" style={{ fontSize: "10px", color: "#888", marginTop: ".25rem" }}>
                Net after selling
              </p>
            </div>
            <div className="rbe-result-cell">
              <p className="rbe-result-label">If you rent</p>
              <p className={`rbe-result-val ${results.winner === "Renting" ? "green" : ""}`}>
                {fmt(results.rentingNetWorth)}
              </p>
              <p className="rbe-result-sub" style={{ fontSize: "10px", color: "#888", marginTop: ".25rem" }}>
                Down payment + savings invested
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
            <p style={{ fontSize: "13px", color: "#444", lineHeight: "1.6" }}>
              <strong>Winner:</strong> {results.winner} by {fmt(results.difference)} over {results.holdYears} years
            </p>
            <p style={{ fontSize: "11px", color: "#888", marginTop: ".5rem" }}>
              Mortgage payment: {fmt(results.mortgagePayment)}/month · Assumes 3% home appreciation, 7% investment returns, 6% selling costs
            </p>
          </div>
        </div>
      )}
    </div>
  )
}