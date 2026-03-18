import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Calculator, DollarSign, TrendingUp, Clock, Zap, 
  ChevronRight, Download, MessageCircle, Phone, Info
} from 'lucide-react';

export default function ROICalculator() {
  // Input states
  const [displaySize, setDisplaySize] = useState(10); // sqm
  const [displayType, setDisplayType] = useState('indoor');
  const [usageHours, setUsageHours] = useState(12);
  const [purpose, setPurpose] = useState('advertising');
  const [currentSolution, setCurrentSolution] = useState('static');

  // Calculate ROI
  const calculations = useMemo(() => {
    // Base costs per sqm (AED)
    const costPerSqm = {
      indoor: { fine: 15000, standard: 8000 },
      outdoor: { billboard: 12000, facade: 18000 },
      transparent: { film: 20000, panel: 25000 }
    };

    // Get base cost
    let baseCost = 0;
    if (displayType === 'indoor') baseCost = costPerSqm.indoor.standard;
    else if (displayType === 'outdoor') baseCost = costPerSqm.outdoor.billboard;
    else baseCost = costPerSqm.transparent.film;

    const totalInvestment = displaySize * baseCost;
    const installationCost = totalInvestment * 0.15;
    const yearlyMaintenance = totalInvestment * 0.05;
    
    // Energy calculation
    const wattsPerSqm = displayType === 'indoor' ? 300 : displayType === 'outdoor' ? 600 : 200;
    const totalWatts = displaySize * wattsPerSqm;
    const kwhPerYear = (totalWatts / 1000) * usageHours * 365;
    const energyCostPerYear = kwhPerYear * 0.30; // AED 0.30 per kWh

    // Revenue/Savings based on purpose
    let yearlyBenefit = 0;
    let benefitLabel = '';
    
    if (purpose === 'advertising') {
      // Advertising revenue estimate
      const monthlyAdRevenue = displaySize * 500; // AED 500 per sqm/month
      yearlyBenefit = monthlyAdRevenue * 12;
      benefitLabel = 'Estimated Ad Revenue';
    } else if (purpose === 'retail') {
      // Retail sales lift estimate
      yearlyBenefit = displaySize * 8000; // AED 8000 per sqm annual sales lift
      benefitLabel = 'Sales Uplift Estimate';
    } else if (purpose === 'corporate') {
      // Productivity/image value
      yearlyBenefit = displaySize * 3000;
      benefitLabel = 'Brand Value Estimate';
    } else {
      yearlyBenefit = displaySize * 5000;
      benefitLabel = 'Engagement Value';
    }

    // Static signage comparison
    const staticCostPerYear = currentSolution === 'static' 
      ? displaySize * 2000 // Printing, installation, removal
      : displaySize * 4000; // LCD maintenance

    const yearlySavings = staticCostPerYear;
    const totalYearlyReturn = yearlyBenefit + yearlySavings - yearlyMaintenance - energyCostPerYear;
    const paybackMonths = totalInvestment / (totalYearlyReturn / 12);
    const fiveYearROI = ((totalYearlyReturn * 5) - totalInvestment) / totalInvestment * 100;

    return {
      totalInvestment: Math.round(totalInvestment),
      installationCost: Math.round(installationCost),
      totalProjectCost: Math.round(totalInvestment + installationCost),
      yearlyMaintenance: Math.round(yearlyMaintenance),
      energyCostPerYear: Math.round(energyCostPerYear),
      kwhPerYear: Math.round(kwhPerYear),
      yearlyBenefit: Math.round(yearlyBenefit),
      benefitLabel,
      yearlySavings: Math.round(yearlySavings),
      totalYearlyReturn: Math.round(totalYearlyReturn),
      paybackMonths: Math.round(paybackMonths),
      fiveYearROI: Math.round(fiveYearROI),
    };
  }, [displaySize, displayType, usageHours, purpose, currentSolution]);

  const whatsappNumber = '971559954274';
  const whatsappMessage = `Hi, I used your ROI calculator. Display: ${displaySize}sqm ${displayType}, Purpose: ${purpose}. Estimated ROI: ${calculations.fiveYearROI}%. Can you provide a detailed quote?`;

  return (
    <div className="min-h-screen bg-[#050508] text-white" data-testid="roi-calculator-page">
      <SEO 
        title="LED Display ROI Calculator | Investment Analysis"
        description="Calculate the return on investment for your LED display project. Estimate costs, payback period, and 5-year ROI for digital signage in UAE."
        path="/tools/roi-calculator"
      />

      {/* Hero */}
      <section className="py-16 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Calculator size={16} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Business Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            LED Display ROI Calculator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Estimate your return on investment, payback period, and total cost of ownership 
            for LED display solutions in the UAE market.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-black text-xs flex items-center justify-center font-bold">1</span>
                  Display Specifications
                </h2>
                
                {/* Display Size */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Display Size (sqm)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={displaySize}
                      onChange={(e) => setDisplaySize(Number(e.target.value))}
                      className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="w-20 px-3 py-2 rounded bg-white/5 text-center font-mono text-cyan-400">
                      {displaySize} m²
                    </div>
                  </div>
                </div>

                {/* Display Type */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Display Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'indoor', label: 'Indoor' },
                      { value: 'outdoor', label: 'Outdoor' },
                      { value: 'transparent', label: 'Transparent' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDisplayType(opt.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          displayType === opt.value
                            ? 'bg-cyan-500 text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Usage Hours */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Daily Usage Hours</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="4"
                      max="24"
                      value={usageHours}
                      onChange={(e) => setUsageHours(Number(e.target.value))}
                      className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="w-20 px-3 py-2 rounded bg-white/5 text-center font-mono text-cyan-400">
                      {usageHours}h/day
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-black text-xs flex items-center justify-center font-bold">2</span>
                  Usage & Comparison
                </h2>

                {/* Purpose */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Primary Purpose</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'advertising', label: 'Advertising/DOOH' },
                      { value: 'retail', label: 'Retail Display' },
                      { value: 'corporate', label: 'Corporate/Lobby' },
                      { value: 'entertainment', label: 'Entertainment' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPurpose(opt.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          purpose === opt.value
                            ? 'bg-cyan-500 text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Solution */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Replacing</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'static', label: 'Static Signage' },
                      { value: 'lcd', label: 'LCD/Projector' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCurrentSolution(opt.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          currentSolution === opt.value
                            ? 'bg-cyan-500 text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/20">
                <h2 className="text-lg font-bold mb-6">ROI Analysis</h2>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-black/20">
                    <div className="text-xs text-gray-400 mb-1">Payback Period</div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {calculations.paybackMonths} <span className="text-sm font-normal">months</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-black/20">
                    <div className="text-xs text-gray-400 mb-1">5-Year ROI</div>
                    <div className="text-2xl font-bold text-green-400">
                      {calculations.fiveYearROI}%
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Display Investment</span>
                    <span className="text-white font-mono">AED {calculations.totalInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Installation</span>
                    <span className="text-white font-mono">AED {calculations.installationCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                    <span className="text-white font-medium">Total Project Cost</span>
                    <span className="text-cyan-400 font-bold font-mono">AED {calculations.totalProjectCost.toLocaleString()}</span>
                  </div>
                </div>

                {/* Annual Returns */}
                <div className="p-4 rounded-lg bg-black/20 space-y-2">
                  <div className="text-xs text-gray-400 mb-2">Annual Analysis</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{calculations.benefitLabel}</span>
                    <span className="text-green-400 font-mono">+AED {calculations.yearlyBenefit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Operational Savings</span>
                    <span className="text-green-400 font-mono">+AED {calculations.yearlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Energy Cost</span>
                    <span className="text-red-400 font-mono">-AED {calculations.energyCostPerYear.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Maintenance</span>
                    <span className="text-red-400 font-mono">-AED {calculations.yearlyMaintenance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                    <span className="text-white font-medium">Net Annual Return</span>
                    <span className="text-cyan-400 font-bold font-mono">AED {calculations.totalYearlyReturn.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                <h3 className="font-semibold mb-3">Get a Detailed Quote</h3>
                <p className="text-sm text-gray-400 mb-4">
                  This is an estimate. Contact us for accurate pricing based on your specific requirements.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-white transition-all hover:scale-[1.02]"
                    style={{ background: '#25D366' }}
                  >
                    <MessageCircle size={18} />
                    Share Results on WhatsApp
                  </a>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold border border-white/20 text-white hover:bg-white/5"
                  >
                    Request Formal Quote
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <p>
                  Estimates based on UAE market averages. Actual costs and returns may vary based on 
                  specific requirements, location, and market conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
