import RentVsBuyCalculator from "./RentVsBuyCalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .rbe-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .rbe-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .rbe-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .rbe-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .rbe-title em { font-style: italic; color: #d97706; }
  .rbe-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .rbe-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .rbe-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .rbe-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .rbe-input-wrap { position: relative; }
  .rbe-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .rbe-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0 .4rem 1.2rem; outline: none; }
  .rbe-input:focus { border-color: #d97706; }
  .rbe-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .4rem 0; outline: none; cursor: pointer; }
  .rbe-calc-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .15s; }
  .rbe-calc-btn:hover { background: #d97706; }
  .rbe-results { margin-top: 1.5rem; border-top: 1px solid #e0dbd3; padding-top: 1.5rem; }
  .rbe-result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .rbe-result-cell { background: #fff; padding: 1rem; }
  .rbe-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .rbe-result-val { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #1a1a1a; }
  .rbe-result-val.green { color: #d97706; }
  .rbe-result-sub { font-size: 10px; color: #888; margin-top: .25rem; }
  .rbe-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .rbe-prose p:last-child { margin-bottom: 0; }
  .rbe-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .rbe-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .rbe-info-item { padding: .75rem; border-left: 2px solid #fbd38d; }
  .rbe-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rbe-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rbe-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .rbe-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fbd38d; line-height: 1; margin-bottom: .4rem; }
  .rbe-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .rbe-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .rbe-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .rbe-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .rbe-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .rbe-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #d97706; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .rbe-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .rbe-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .rbe-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .rbe-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .rbe-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .rbe-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .rbe-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .rbe-field-row, .rbe-result-grid, .rbe-info-grid, .rbe-tip-grid { grid-template-columns: 1fr; }
  }
`

const FAQ = [
  {
    q: "How long do I need to stay in a home for buying to beat renting?",
    a: "The breakeven point typically falls between 4–7 years, depending on your local market, interest rates, and transaction costs. Buying involves significant upfront costs (closing fees, inspection, appraisal) and selling costs (typically 6% for realtor commissions). Generally, if you plan to stay less than 3 years, renting almost always wins. At 5+ years, buying often wins. At 10+ years, buying wins in almost all markets."
  },
  {
    q: "What costs does this calculator include?",
    a: "The calculator includes: mortgage principal and interest, down payment opportunity cost (money that could have been invested instead), selling costs (6% of home value), home appreciation (3% annually by default), rent increases (2% annually), and investment returns on savings (7% annually). It does not include property taxes, homeowners insurance, maintenance costs (typically 1% of home value per year), HOA fees, or renter's insurance — all of which would tilt the comparison further toward renting. Add those manually to your rent number for a more complete comparison."
  },
  {
    q: "Why does the calculator use 7% for investment returns and 3% for home appreciation?",
    a: "These are long-term historical averages for broad market returns (S&P 500) and US home prices (Case-Shiller Index). The stock market has averaged 9–10% before inflation, or about 7% after inflation. Home prices have averaged 3–4% above inflation. Individual markets vary significantly — San Francisco and NYC have seen higher appreciation, while Midwest and rural areas have seen lower. Adjust the numbers mentally based on your local market."
  },
  {
    q: "Should I include property taxes and maintenance?",
    a: "Yes, ideally. For a more accurate comparison, add estimated property taxes (typically 0.5–2% of home value annually) and maintenance (roughly 1% annually) to your monthly housing cost. These are omitted in the base calculator to avoid complexity, but they meaningfully favor renting. A $300,000 home with 1% property taxes and 1% maintenance adds $500/month that you don't pay as a renter."
  },
  {
    q: "What about mortgage interest tax deduction?",
    a: "The mortgage interest tax deduction primarily benefits high-income earners in expensive homes who itemize deductions. Since the 2017 Tax Cuts and Jobs Act raised the standard deduction significantly, most homeowners no longer itemize. For those who do, the deduction reduces the effective interest rate by your marginal tax rate — e.g., 6.5% interest at 24% tax bracket becomes roughly 4.9% after deduction. This calculator does not include the deduction to avoid overstating its benefit to average homeowners."
  },
  {
    q: "Does renting really build wealth?",
    a: "Yes — renting builds wealth when the money you save on upfront costs (down payment, closing costs) and monthly payments is invested instead. A $60,000 down payment invested at 7% annual return becomes $118,000 after 10 years without any additional contributions. Add monthly savings if rent is cheaper than a mortgage, and the gap grows. Renting is not 'throwing money away' — it's trading housing stability for liquidity and investment flexibility."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="rbe-wrap">

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="rbe-header">
          <p className="rbe-eyebrow">Housing Decision</p>
          <h1 className="rbe-title">Rent vs Buy<br /><em>Estimator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to compare renting versus buying a home. Enter your numbers to see which option builds more wealth over time — accounting for home appreciation, mortgage costs, and investment returns on your down payment.
        </p>

        {/* INTERACTIVE TOOL — client component */}
        <RentVsBuyCalculator />

        {/* HOW IT WORKS */}
        <div className="rbe-card">
          <p className="rbe-section-title">How this calculator works</p>
          <div className="rbe-prose">
            <p>This calculator compares your net worth after a set number of years under both scenarios. On the buying side, it calculates mortgage payments, tracks home value appreciation (3% annually), and subtracts selling costs (6%) at the end. On the renting side, it invests your down payment, adds any monthly savings (if rent is cheaper than a mortgage), and grows everything at a 7% annual return — the historical long-term average for the stock market after inflation.</p>
            <p>The difference between the two final numbers tells you which option leaves you better off financially. This is a simplified model — real-world decisions also involve quality of life, housing stability, and market variability — but the core math reveals the breakeven timeframe that most people underestimate.</p>
          </div>
          <div className="rbe-info-grid">
            <div className="rbe-info-item">
              <p className="rbe-info-title">The 5-year rule of thumb</p>
              <p className="rbe-info-body">In most markets, you need to stay 5+ years for buying to beat renting. Under 3 years, renting almost always wins because transaction costs take years to recover.</p>
            </div>
            <div className="rbe-info-item">
              <p className="rbe-info-title">Hidden costs of owning</p>
              <p className="rbe-info-body">Beyond the mortgage, owners pay property taxes (0.5–2% of home value), maintenance (roughly 1%), insurance, and potentially HOA fees. These tilt the comparison further toward renting.</p>
            </div>
            <div className="rbe-info-item">
              <p className="rbe-info-title">Hidden costs of renting</p>
              <p className="rbe-info-body">Rent increases (2% annually by default), potential moving costs, and lack of forced equity building. The landlord covers maintenance and property taxes.</p>
            </div>
            <div className="rbe-info-item">
              <p className="rbe-info-title">Opportunity cost</p>
              <p className="rbe-info-body">Your down payment could be invested instead. A $60,000 down payment at 7% returns becomes $118,000 after 10 years — money that never builds equity in a home.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="rbe-card">
          <p className="rbe-section-title">Why most people get this wrong</p>
          <div className="rbe-prose">
            <p>The cultural assumption that "buying is always better than renting" is one of the most persistent personal finance myths. It dates from an era when home prices appreciated faster, interest rates were higher, and renting was seen as temporary. Today, the math is much closer — and in expensive coastal cities, renting plus investing often wins indefinitely.</p>
            <p>The mistake most people make is ignoring transaction costs (8–9% of home value to buy and sell), underestimating maintenance, and failing to account for what their down payment and monthly savings could earn in the stock market. When you run the actual numbers, the breakeven point often surprises even financially savvy people.</p>
            <p>This calculator removes the guesswork. See the actual dollar difference for your specific situation, not someone else's rule of thumb.</p>
          </div>
        </div>

        {/* WHEN EACH CHOICE MAKES SENSE */}
        <div className="rbe-card">
          <p className="rbe-section-title">When each choice makes sense</p>
          <div className="rbe-tip-grid">
            <div>
              <p className="rbe-tip-num">01</p>
              <p className="rbe-tip-title">Buy if staying 7+ years</p>
              <p className="rbe-tip-body">Transaction costs get fully diluted, equity builds significantly, and appreciation adds meaningful wealth.</p>
            </div>
            <div>
              <p className="rbe-tip-num">02</p>
              <p className="rbe-tip-title">Rent if staying under 3 years</p>
              <p className="rbe-tip-body">Closing costs and realtor fees will almost certainly exceed any appreciation or equity built.</p>
            </div>
            <div>
              <p className="rbe-tip-num">03</p>
              <p className="rbe-tip-title">Buy in slow-appreciation markets</p>
              <p className="rbe-tip-body">You need even more years to break even. Midwest and rural areas often require 7–10 years.</p>
            </div>
            <div>
              <p className="rbe-tip-num">04</p>
              <p className="rbe-tip-title">Rent in expensive coastal cities</p>
              <p className="rbe-tip-body">In SF, NYC, LA, Seattle, renting + investing often wins even over 10+ years due to price-to-rent ratios.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="rbe-card">
          <p className="rbe-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="rbe-faq-item" key={i}>
              <p className="rbe-faq-q">{item.q}</p>
              <p className="rbe-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="rbe-card">
          <p className="rbe-section-title">Related tools</p>
          <p className="rbe-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="rbe-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="rbe-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="rbe-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial or real estate advice. Assumptions (3% appreciation, 7% returns, 6% selling costs) are historical averages and not guarantees. Actual results vary significantly by location and market conditions. Consult a professional before making housing decisions. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="rbe-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}