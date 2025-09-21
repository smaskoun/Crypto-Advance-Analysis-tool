// Application Data
const cryptoData = {
  "metadata": {
    "created_date": "2025-09-21",
    "analysis_period": "30 days",
    "data_sources": [
      "CoinGecko", "Glassnode", "Chainalysis", "Nansen", "DeFiLlama", "Whale Alert"
    ],
    "methodology": "Fundamental + Technical + Flow Analysis + Extreme Risk Assessment"
  },
  "standard_cryptocurrencies": {
    "bitcoin": {
      "symbol": "BTC", "name": "Bitcoin", "current_price": 116394.80, "market_cap": 2300000000000,
      "fundamentals_score": 95, "risk_level": "Low", "potential_gain_percent": 10.2,
      "flow_analysis": {
        "institutional_inflows": "Very High", "whale_activity": "Accumulation",
        "exchange_flows": "Net Outflow (Bullish)", "etf_flows": "Strong Positive"
      },
      "30_day_prediction": {
        "target_low": 109419, "target_high": 128267, "probability": 85,
        "key_catalysts": ["Strategic Bitcoin Reserve discussions", "Continued ETF inflows", "Institutional adoption", "Supply shock from halving effects"]
      }
    },
    "ethereum": {
      "symbol": "ETH", "name": "Ethereum", "current_price": 4476.85, "market_cap": 580000000000,
      "fundamentals_score": 92, "risk_level": "Low-Medium", "potential_gain_percent": 10.6,
      "flow_analysis": {
        "institutional_inflows": "High", "whale_activity": "Strong Accumulation",
        "exchange_flows": "Net Inflow", "tvl_growth": "$100B+ DeFi TVL"
      },
      "30_day_prediction": {
        "target_low": 4200, "target_high": 4950, "probability": 80,
        "key_catalysts": ["$2B institutional inflows", "DeFi TVL recovery to $170B", "Layer 2 ecosystem growth", "Staking yield improvements"]
      }
    },
    "solana": {
      "symbol": "SOL", "name": "Solana", "current_price": 218.45, "market_cap": 105000000000,
      "fundamentals_score": 88, "risk_level": "Medium", "potential_gain_percent": 32.8,
      "flow_analysis": {
        "institutional_inflows": "High", "whale_activity": "Accumulation",
        "exchange_flows": "Balanced", "tvl_growth": "$14.4B DeFi TVL"
      },
      "30_day_prediction": {
        "target_low": 200, "target_high": 290, "probability": 75,
        "key_catalysts": ["High transaction volume (100M+ daily)", "Solana ETF discussions", "Meme coin ecosystem growth", "Developer ecosystem expansion"]
      }
    },
    "chainlink": {
      "symbol": "LINK", "name": "Chainlink", "current_price": 24.80, "market_cap": 15600000000,
      "fundamentals_score": 86, "risk_level": "Low-Medium", "potential_gain_percent": 29.0,
      "flow_analysis": {
        "institutional_inflows": "Medium", "whale_activity": "Steady Accumulation",
        "exchange_flows": "Stable", "partnerships": "Growing"
      },
      "30_day_prediction": {
        "target_low": 22, "target_high": 32, "probability": 72,
        "key_catalysts": ["Oracle demand increasing", "Cross-chain interoperability", "RWA tokenization partnerships", "Traditional finance adoption"]
      }
    }
  },
  "extreme_risk_cryptocurrencies": {
    "wall_street_pepe": {
      "symbol": "WEPE", "name": "Wall Street Pepe", "current_price": 0.00036647, "market_cap": 48000000,
      "fundamentals_score": 35, "risk_level": "Extreme", "potential_gain_percent": 991,
      "flow_analysis": {
        "presale_momentum": "Extremely High", "social_media_buzz": "Viral Growth",
        "whale_interest": "Moderate", "community_growth": "Exponential"
      },
      "30_day_prediction": {
        "target_low": 0.0002, "target_high": 0.004, "probability": 25,
        "key_catalysts": ["$48M+ raised in presale", "Anti-whale trading tools launch", "Major exchange listings pending", "Meme coin super cycle momentum"]
      },
      "legitimacy_indicators": {
        "team_transparency": "Limited", "audit_status": "Pending",
        "community_strength": "Very Strong", "real_world_utility": "Speculative Trading Tools"
      }
    },
    "bitcoin_hyper": {
      "symbol": "HYPER", "name": "Bitcoin Hyper", "current_price": 0.0168, "market_cap": 12000000,
      "fundamentals_score": 65, "risk_level": "Extreme", "potential_gain_percent": 971,
      "flow_analysis": {
        "presale_momentum": "Very High", "institutional_interest": "Growing",
        "developer_activity": "Active", "staking_rewards": "150% APY"
      },
      "30_day_prediction": {
        "target_low": 0.01, "target_high": 0.18, "probability": 30,
        "key_catalysts": ["First Bitcoin Layer-2 launch", "Solana VM integration breakthrough", "150% staking APY attraction", "Bitcoin ecosystem expansion"]
      },
      "legitimacy_indicators": {
        "team_transparency": "Good", "audit_status": "In Progress",
        "technology_innovation": "High", "real_world_utility": "Bitcoin Scaling Solution"
      }
    },
    "render": {
      "symbol": "RNDR", "name": "Render Token", "current_price": 7.85, "market_cap": 4100000000,
      "fundamentals_score": 75, "risk_level": "Very High", "potential_gain_percent": 983,
      "flow_analysis": {
        "ai_narrative": "Extremely Strong", "gpu_demand": "Skyrocketing",
        "institutional_adoption": "Growing", "utility_growth": "Exponential"
      },
      "30_day_prediction": {
        "target_low": 6.50, "target_high": 85.00, "probability": 35,
        "key_catalysts": ["AI/ML compute demand explosion", "OpenAI and major AI partnerships", "Decentralized GPU network growth", "Web3 gaming rendering needs"]
      },
      "legitimacy_indicators": {
        "team_transparency": "Excellent", "audit_status": "Complete",
        "technology_adoption": "Growing", "real_world_utility": "AI Computing Infrastructure"
      }
    },
    "fetch_ai": {
      "symbol": "FET", "name": "Fetch.ai", "current_price": 1.28, "market_cap": 1100000000,
      "fundamentals_score": 78, "risk_level": "Very High", "potential_gain_percent": 994,
      "flow_analysis": {
        "ai_integration": "Leading Edge", "autonomous_agents": "Revolutionary",
        "institutional_interest": "Very High", "partnership_growth": "Strong"
      },
      "30_day_prediction": {
        "target_low": 1.00, "target_high": 14.00, "probability": 32,
        "key_catalysts": ["AI autonomous agents breakthrough", "Smart city implementations", "DeFi AI integration explosion", "Corporate AI adoption surge"]
      },
      "legitimacy_indicators": {
        "team_transparency": "Excellent", "technology_innovation": "Cutting Edge",
        "partnerships": "Enterprise Level", "real_world_utility": "AI Infrastructure"
      }
    },
    "immutable_x": {
      "symbol": "IMX", "name": "Immutable X", "current_price": 1.45, "market_cap": 871000000,
      "fundamentals_score": 72, "risk_level": "Very High", "potential_gain_percent": 1003,
      "flow_analysis": {
        "gaming_adoption": "Strong", "nft_marketplace_growth": "High",
        "layer2_ethereum": "Proven", "partnerships": "Major Gaming Studios"
      },
      "30_day_prediction": {
        "target_low": 1.20, "target_high": 16.00, "probability": 28,
        "key_catalysts": ["Major gaming partnerships announced", "GameStop and TikTok integrations", "Web3 gaming breakout moment", "NFT gaming marketplace explosion"]
      },
      "legitimacy_indicators": {
        "team_transparency": "Excellent", "audit_status": "Complete",
        "partnerships": "Major Brands", "real_world_utility": "Gaming Infrastructure"
      }
    },
    "sui": {
      "symbol": "SUI", "name": "Sui Network", "current_price": 4.75, "market_cap": 14500000000,
      "fundamentals_score": 82, "risk_level": "Very High", "potential_gain_percent": 995,
      "flow_analysis": {
        "developer_adoption": "Rapid Growth", "ecosystem_expansion": "Strong",
        "vc_backing": "Top Tier", "technology_advantage": "Parallel Execution"
      },
      "30_day_prediction": {
        "target_low": 3.80, "target_high": 52.00, "probability": 30,
        "key_catalysts": ["Major gaming studios adoption", "Airdrops and ecosystem incentives", "Layer-1 altcoin season rotation", "Developer tooling breakthroughs"]
      },
      "legitimacy_indicators": {
        "team_transparency": "Excellent", "technology_innovation": "Very High",
        "vc_backing": "Top Tier", "real_world_utility": "High-Speed Blockchain"
      }
    },
    "solaxy": {
      "symbol": "SOLX", "name": "Solaxy", "current_price": 0.00156, "market_cap": 8500000,
      "fundamentals_score": 58, "risk_level": "Extreme", "potential_gain_percent": 990,
      "flow_analysis": {
        "presale_momentum": "High", "solana_ecosystem_growth": "Strong",
        "layer2_narrative": "Trending", "developer_adoption": "Early Stage"
      },
      "30_day_prediction": {
        "target_low": 0.001, "target_high": 0.017, "probability": 25,
        "key_catalysts": ["Solana Layer-2 solution launch", "Gaming and DeFi integration", "Ultra-high speed transactions", "Solana ecosystem boom"]
      },
      "legitimacy_indicators": {
        "team_transparency": "Moderate", "audit_status": "Scheduled",
        "technology_focus": "Layer-2 Scaling", "real_world_utility": "Solana Enhancement"
      }
    }
  },
  "risk_management": {
    "position_sizing": {
      "low": "Up to 40% of crypto portfolio",
      "medium": "10-25% of crypto portfolio", 
      "high": "5-15% of crypto portfolio",
      "very-high": "2-5% of crypto portfolio",
      "extreme": "1-2% per position, max 5-10% total"
    },
    "stop_loss_recommendations": {
      "low": "20-30% stop loss",
      "medium": "30-40% stop loss",
      "high": "40-50% stop loss", 
      "very-high": "50-60% stop loss",
      "extreme": "50% stop loss mandatory"
    }
  }
};

// Global state
let filteredData = {
  standard: Object.values(cryptoData.standard_cryptocurrencies),
  extreme: Object.values(cryptoData.extreme_risk_cryptocurrencies)
};

// Utility functions
function formatPrice(price) {
  if (price < 0.01) {
    return `$${price.toFixed(8)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 1000) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

function formatMarketCap(marketCap) {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
}

function getRiskClass(riskLevel) {
  const risk = riskLevel.toLowerCase().replace(/[-\s]/g, '-');
  return `risk-${risk}`;
}

function getProbabilityClass(probability) {
  if (probability >= 70) return 'probability-high';
  if (probability >= 50) return 'probability-medium';
  return 'probability-low';
}

// Card creation functions
function createStandardCryptoCard(crypto) {
  return `
    <div class="card crypto-card" data-risk="${crypto.risk_level}" data-gain="${crypto.potential_gain_percent}" data-probability="${crypto['30_day_prediction'].probability}" data-market-cap="${crypto.market_cap}">
      <div class="crypto-header">
        <div class="crypto-info">
          <h3>${crypto.name}</h3>
          <div class="crypto-symbol">${crypto.symbol}</div>
          <div class="risk-badge ${getRiskClass(crypto.risk_level)}">${crypto.risk_level} Risk</div>
        </div>
        <div class="crypto-price">
          <div class="current-price">${formatPrice(crypto.current_price)}</div>
          <div class="market-cap">${formatMarketCap(crypto.market_cap)} MC</div>
        </div>
      </div>
      
      <div class="crypto-metrics">
        <div class="metric">
          <div class="metric-label">Potential Gain</div>
          <div class="metric-value gain-positive">+${crypto.potential_gain_percent}%</div>
        </div>
        <div class="metric">
          <div class="metric-label">Success Probability</div>
          <div class="metric-value ${getProbabilityClass(crypto['30_day_prediction'].probability)}">${crypto['30_day_prediction'].probability}%</div>
        </div>
      </div>

      <div class="flow-analysis">
        <h4>Flow Analysis</h4>
        ${Object.entries(crypto.flow_analysis).map(([key, value]) => `
          <div class="flow-item">
            <span class="flow-label">${key.replace(/_/g, ' ')}:</span>
            <span class="flow-value">${value}</span>
          </div>
        `).join('')}
      </div>

      <div class="catalysts">
        <h4>Key Catalysts</h4>
        <ul class="catalyst-list">
          ${crypto['30_day_prediction'].key_catalysts.map(catalyst => `
            <li class="catalyst-item">${catalyst}</li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

function createExtremeCryptoCard(crypto) {
  return `
    <div class="card extreme-crypto-card" data-risk="${crypto.risk_level}" data-gain="${crypto.potential_gain_percent}" data-probability="${crypto['30_day_prediction'].probability}" data-market-cap="${crypto.market_cap}">
      <div class="extreme-indicator">💀 EXTREME RISK</div>
      
      <div class="crypto-header">
        <div class="crypto-info">
          <h3>${crypto.name}</h3>
          <div class="crypto-symbol">${crypto.symbol}</div>
          <div class="risk-badge ${getRiskClass(crypto.risk_level)}">${crypto.risk_level} Risk</div>
        </div>
        <div class="crypto-price">
          <div class="current-price">${formatPrice(crypto.current_price)}</div>
          <div class="market-cap">${formatMarketCap(crypto.market_cap)} MC</div>
        </div>
      </div>
      
      <div class="crypto-metrics">
        <div class="metric">
          <div class="metric-label">Potential Gain</div>
          <div class="metric-value potential-gain-extreme">+${crypto.potential_gain_percent}%</div>
        </div>
        <div class="metric">
          <div class="metric-label">Success Probability</div>
          <div class="metric-value ${getProbabilityClass(crypto['30_day_prediction'].probability)}">${crypto['30_day_prediction'].probability}%</div>
        </div>
      </div>

      <div class="flow-analysis">
        <h4>Flow Analysis</h4>
        ${Object.entries(crypto.flow_analysis).map(([key, value]) => `
          <div class="flow-item">
            <span class="flow-label">${key.replace(/_/g, ' ')}:</span>
            <span class="flow-value">${value}</span>
          </div>
        `).join('')}
      </div>

      ${crypto.legitimacy_indicators ? `
        <div class="flow-analysis">
          <h4>Legitimacy Indicators</h4>
          ${Object.entries(crypto.legitimacy_indicators).map(([key, value]) => `
            <div class="flow-item">
              <span class="flow-label">${key.replace(/_/g, ' ')}:</span>
              <span class="flow-value">${value}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="catalysts">
        <h4>Key Catalysts</h4>
        <ul class="catalyst-list">
          ${crypto['30_day_prediction'].key_catalysts.map(catalyst => `
            <li class="catalyst-item">${catalyst}</li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Filtering functions
function filterByRisk(cryptos, riskLevel) {
  if (riskLevel === 'all') return cryptos;
  return cryptos.filter(crypto => crypto.risk_level === riskLevel);
}

function filterByGain(cryptos, gainLevel) {
  if (gainLevel === 'all') return cryptos;
  
  return cryptos.filter(crypto => {
    const gain = crypto.potential_gain_percent;
    switch (gainLevel) {
      case 'low': return gain < 50;
      case 'medium': return gain >= 50 && gain < 200;
      case 'high': return gain >= 200 && gain < 500;
      case 'very-high': return gain >= 500 && gain < 1000;
      case 'extreme': return gain >= 1000;
      default: return true;
    }
  });
}

function filterByProbability(cryptos, probLevel) {
  if (probLevel === 'all') return cryptos;
  
  return cryptos.filter(crypto => {
    const prob = crypto['30_day_prediction'].probability;
    switch (probLevel) {
      case 'low': return prob < 30;
      case 'medium': return prob >= 30 && prob < 50;
      case 'high': return prob >= 50 && prob < 70;
      case 'very-high': return prob >= 70;
      default: return true;
    }
  });
}

function sortCryptos(cryptos, sortBy) {
  return [...cryptos].sort((a, b) => {
    switch (sortBy) {
      case 'potential':
        return b.potential_gain_percent - a.potential_gain_percent;
      case 'probability':
        return b['30_day_prediction'].probability - a['30_day_prediction'].probability;
      case 'market-cap':
        return b.market_cap - a.market_cap;
      case 'risk':
        const riskOrder = { 'Low': 1, 'Low-Medium': 2, 'Medium': 3, 'High': 4, 'Very High': 5, 'Extreme': 6 };
        return riskOrder[a.risk_level] - riskOrder[b.risk_level];
      default:
        return 0;
    }
  });
}

// Render functions
function renderStandardCryptos() {
  const container = document.getElementById('standardCryptos');
  if (!container) return;
  
  container.innerHTML = filteredData.standard.map(createStandardCryptoCard).join('');
}

function renderExtremeCryptos() {
  const container = document.getElementById('extremeCryptos');
  if (!container) return;
  
  container.innerHTML = filteredData.extreme.map(createExtremeCryptoCard).join('');
}

function applyFilters() {
  const riskFilter = document.getElementById('riskFilter').value;
  const gainFilter = document.getElementById('gainFilter').value;
  const probabilityFilter = document.getElementById('probabilityFilter').value;
  const sortFilter = document.getElementById('sortFilter').value;

  // Filter standard cryptos
  let standardFiltered = Object.values(cryptoData.standard_cryptocurrencies);
  standardFiltered = filterByRisk(standardFiltered, riskFilter);
  standardFiltered = filterByGain(standardFiltered, gainFilter);
  standardFiltered = filterByProbability(standardFiltered, probabilityFilter);
  standardFiltered = sortCryptos(standardFiltered, sortFilter);

  // Filter extreme cryptos
  let extremeFiltered = Object.values(cryptoData.extreme_risk_cryptocurrencies);
  extremeFiltered = filterByRisk(extremeFiltered, riskFilter);
  extremeFiltered = filterByGain(extremeFiltered, gainFilter);
  extremeFiltered = filterByProbability(extremeFiltered, probabilityFilter);
  extremeFiltered = sortCryptos(extremeFiltered, sortFilter);

  filteredData.standard = standardFiltered;
  filteredData.extreme = extremeFiltered;

  renderStandardCryptos();
  renderExtremeCryptos();
}

// Position sizing calculator
function updatePositionCalculation() {
  const portfolioValue = parseFloat(document.getElementById('portfolioValue').value) || 0;
  const riskLevel = document.getElementById('riskLevel').value;
  const resultElement = document.getElementById('positionResult');
  
  if (portfolioValue === 0) {
    resultElement.innerHTML = '<strong>Recommended Position Size: Enter portfolio value above</strong>';
    return;
  }

  const riskPercentages = {
    'low': { min: 30, max: 40 },
    'medium': { min: 10, max: 25 },
    'high': { min: 5, max: 15 },
    'very-high': { min: 2, max: 5 },
    'extreme': { min: 1, max: 2 }
  };

  const risk = riskPercentages[riskLevel];
  const minPosition = (portfolioValue * risk.min / 100);
  const maxPosition = (portfolioValue * risk.max / 100);
  const stopLoss = cryptoData.risk_management.stop_loss_recommendations[riskLevel];

  resultElement.innerHTML = `
    <strong>Recommended Position Size: $${minPosition.toLocaleString()} - $${maxPosition.toLocaleString()}</strong><br>
    <small>Stop Loss: ${stopLoss}</small>
  `;
}

// Modal functions
function showRiskWarningModal() {
  const modal = document.getElementById('riskWarningModal');
  modal.classList.remove('hidden');
}

function hideRiskWarningModal() {
  const modal = document.getElementById('riskWarningModal');
  modal.classList.add('hidden');
  
  // Reset checkboxes
  document.querySelectorAll('#riskWarningModal input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  document.getElementById('acceptRisk').disabled = true;
}

function checkRiskAcknowledgment() {
  const checkboxes = document.querySelectorAll('#riskWarningModal input[type="checkbox"]');
  const acceptButton = document.getElementById('acceptRisk');
  
  const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
  acceptButton.disabled = !allChecked;
}

function showExtremeRiskSection() {
  const section = document.getElementById('extremeRiskSection');
  const button = document.getElementById('showExtremeRisk');
  
  section.classList.remove('hidden');
  button.textContent = 'Hide Extreme Risk Section';
  button.onclick = hideExtremeRiskSection;
}

function hideExtremeRiskSection() {
  const section = document.getElementById('extremeRiskSection');
  const button = document.getElementById('showExtremeRisk');
  
  section.classList.add('hidden');
  button.textContent = 'Show Extreme Risk Section';
  button.onclick = () => showRiskWarningModal();
}

// Event listeners
function initializeEventListeners() {
  // Filter event listeners
  document.getElementById('riskFilter').addEventListener('change', applyFilters);
  document.getElementById('gainFilter').addEventListener('change', applyFilters);
  document.getElementById('probabilityFilter').addEventListener('change', applyFilters);
  document.getElementById('sortFilter').addEventListener('change', applyFilters);

  // Position calculator
  document.getElementById('portfolioValue').addEventListener('input', updatePositionCalculation);
  document.getElementById('riskLevel').addEventListener('change', updatePositionCalculation);

  // Extreme risk section toggle
  document.getElementById('showExtremeRisk').addEventListener('click', () => {
    showRiskWarningModal();
  });

  // Modal event listeners
  document.getElementById('closeRiskModal').addEventListener('click', hideRiskWarningModal);
  document.getElementById('cancelRisk').addEventListener('click', hideRiskWarningModal);
  document.getElementById('acceptRisk').addEventListener('click', () => {
    hideRiskWarningModal();
    showExtremeRiskSection();
  });

  // Risk acknowledgment checkboxes
  document.querySelectorAll('#riskWarningModal input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', checkRiskAcknowledgment);
  });

  // Modal overlay click to close
  document.querySelector('.modal-overlay').addEventListener('click', hideRiskWarningModal);

  // Extreme crypto card clicks
  document.addEventListener('click', (e) => {
    const extremeCard = e.target.closest('.extreme-crypto-card');
    if (extremeCard) {
      showRiskWarningModal();
    }
  });

  // Prevent modal content clicks from closing modal
  document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// Initialize application
function initializeApp() {
  // Set initial filtered data
  filteredData.standard = Object.values(cryptoData.standard_cryptocurrencies);
  filteredData.extreme = Object.values(cryptoData.extreme_risk_cryptocurrencies);

  // Render initial data
  renderStandardCryptos();
  renderExtremeCryptos();

  // Initialize position calculator
  updatePositionCalculation();

  // Initialize event listeners
  initializeEventListeners();

  // Apply initial sorting
  applyFilters();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);