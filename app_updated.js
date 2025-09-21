// Cryptocurrency Data with CoinGecko API Integration
class CryptoPredictionPlatform {
    constructor() {
        this.apiBaseUrl = 'https://api.coingecko.com/api/v3';
        this.defillama = 'https://api.llama.fi';
        this.refreshing = false;
        this.lastUpdate = new Date();

        // CoinGecko ID mappings
        this.coinGeckoIds = {
            'bitcoin': 'bitcoin',
            'ethereum': 'ethereum', 
            'solana': 'solana',
            'chainlink': 'chainlink',
            'cardano': 'cardano',
            'polygon': 'matic-network',
            'render': 'render-token',
            'fetch_ai': 'fetch-ai',
            'immutable_x': 'immutable-x',
            'sui': 'sui'
        };

        this.initializePlatform();
    }

    initializePlatform() {
        this.renderCryptocurrencies();
        this.setupEventListeners();
        this.updateTimestamp();

        // Auto-refresh every 5 minutes
        setInterval(() => {
            if (!this.refreshing) {
                this.refreshAllData(true); // Silent refresh
            }
        }, 5 * 60 * 1000);
    }

    setupEventListeners() {
        // Filter event listeners
        document.getElementById('riskFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('gainFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('probabilityFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('sortFilter').addEventListener('change', () => this.applyFilters());
    }

    async refreshAllData(silent = false) {
        if (this.refreshing) return;

        try {
            this.refreshing = true;

            if (!silent) {
                this.showLoadingOverlay();
                this.setRefreshButtonLoading(true);
            }

            // Refresh prices from CoinGecko
            await this.updatePricesFromAPI();

            // Update market data
            await this.updateGlobalMarketData();

            // Update DeFi TVL data
            await this.updateDeFiData();

            // Re-render with updated data
            this.renderCryptocurrencies();
            this.updateTimestamp();

            if (!silent) {
                this.showNotification('Data refreshed successfully!', 'success');
            }

        } catch (error) {
            console.error('Refresh failed:', error);
            this.showNotification('Failed to refresh data. Please try again.', 'error');
        } finally {
            this.refreshing = false;
            if (!silent) {
                this.hideLoadingOverlay();
                this.setRefreshButtonLoading(false);
            }
        }
    }

    async updatePricesFromAPI() {
        const coinIds = Object.values(this.coinGeckoIds).join(',');
        const url = `${this.apiBaseUrl}/simple/price?ids=${coinIds}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Update standard cryptocurrencies
            this.updateCryptoData('bitcoin', data.bitcoin);
            this.updateCryptoData('ethereum', data.ethereum);
            this.updateCryptoData('solana', data.solana);
            this.updateCryptoData('chainlink', data.chainlink);
            this.updateCryptoData('cardano', data.cardano);

            // Update extreme risk cryptocurrencies
            this.updateExtremeCryptoData('render', data['render-token']);
            this.updateExtremeCryptoData('fetch_ai', data['fetch-ai']);
            this.updateExtremeCryptoData('immutable_x', data['immutable-x']);
            this.updateExtremeCryptoData('sui', data.sui);

        } catch (error) {
            console.error('Error fetching price data:', error);
            throw error;
        }
    }

    updateCryptoData(cryptoKey, apiData) {
        if (!apiData || !cryptoData.standard_cryptocurrencies[cryptoKey]) return;

        const crypto = cryptoData.standard_cryptocurrencies[cryptoKey];

        // Update price data
        crypto.current_price = apiData.usd;
        crypto.market_cap = apiData.usd_market_cap;
        crypto.volume_24h = apiData.usd_24h_vol;
        crypto.price_change_24h = apiData.usd_24h_change;

        // Recalculate potential gain
        const targetHigh = crypto['30_day_prediction'].target_high;
        crypto.potential_gain_percent = ((targetHigh - crypto.current_price) / crypto.current_price) * 100;
    }

    updateExtremeCryptoData(cryptoKey, apiData) {
        if (!apiData || !cryptoData.extreme_risk_cryptocurrencies[cryptoKey]) return;

        const crypto = cryptoData.extreme_risk_cryptocurrencies[cryptoKey];

        // Update price data
        crypto.current_price = apiData.usd;
        crypto.market_cap = apiData.usd_market_cap;
        crypto.volume_24h = apiData.usd_24h_vol;
        crypto.price_change_24h = apiData.usd_24h_change;

        // Recalculate potential gain
        const targetHigh = crypto['30_day_prediction'].target_high;
        crypto.potential_gain_percent = ((targetHigh - crypto.current_price) / crypto.current_price) * 100;
    }

    async updateGlobalMarketData() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/global`);
            const data = await response.json();

            if (data.data) {
                const globalData = data.data;

                // Update market cap
                const totalMarketCap = globalData.total_market_cap.usd;
                document.getElementById('totalMarketCap').textContent = 
                    '$' + (totalMarketCap / 1e12).toFixed(2) + 'T';

                // Update Bitcoin dominance
                document.getElementById('btcDominance').textContent = 
                    globalData.market_cap_percentage.btc.toFixed(1) + '%';

                // Calculate altcoin season index (simplified)
                const altcoinIndex = 100 - globalData.market_cap_percentage.btc;
                document.getElementById('altcoinIndex').textContent = altcoinIndex.toFixed(1);
            }
        } catch (error) {
            console.warn('Could not update global market data:', error);
        }
    }

    async updateDeFiData() {
        try {
            const response = await fetch(`${this.defillama}/protocols`);
            const protocols = await response.json();

            // Calculate Solana TVL
            const solanaProtocols = protocols.filter(p => 
                p.chains && p.chains.includes('Solana') && p.tvl > 0
            );
            const solanaTVL = solanaProtocols.reduce((total, p) => total + (p.tvl || 0), 0);

            // Update Solana TVL in data
            if (cryptoData.standard_cryptocurrencies.solana) {
                cryptoData.standard_cryptocurrencies.solana.flow_analysis.tvl_growth = 
                    `$${(solanaTVL / 1e9).toFixed(1)}B DeFi TVL`;
            }

        } catch (error) {
            console.warn('Could not update DeFi data:', error);
        }
    }

    showLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.add('active');
    }

    hideLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.remove('active');
    }

    setRefreshButtonLoading(loading) {
        const refreshBtn = document.getElementById('refreshBtn');
        if (loading) {
            refreshBtn.classList.add('loading');
            refreshBtn.disabled = true;
        } else {
            refreshBtn.classList.remove('loading');
            refreshBtn.disabled = false;
        }
    }

    updateTimestamp() {
        const now = new Date();
        this.lastUpdate = now;
        const timestamp = now.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric', 
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short'
        });

        document.getElementById('lastUpdated').textContent = timestamp;
        document.getElementById('footerLastUpdate').textContent = timestamp;
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide notification after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    renderCryptocurrencies() {
        this.renderStandardCryptos();
        this.renderExtremeRiskCryptos();
    }

    renderStandardCryptos() {
        const grid = document.getElementById('standardCryptoGrid');
        if (!grid) return;

        grid.innerHTML = '';

        Object.entries(cryptoData.standard_cryptocurrencies).forEach(([key, crypto]) => {
            const card = this.createCryptoCard(crypto, false);
            grid.appendChild(card);
        });
    }

    renderExtremeRiskCryptos() {
        const grid = document.getElementById('extremeRiskGrid');
        if (!grid) return;

        grid.innerHTML = '';

        Object.entries(cryptoData.extreme_risk_cryptocurrencies).forEach(([key, crypto]) => {
            const card = this.createCryptoCard(crypto, true);
            grid.appendChild(card);
        });
    }

    createCryptoCard(crypto, isExtremeRisk) {
        const card = document.createElement('div');
        card.className = `crypto-card ${isExtremeRisk ? 'extreme-risk' : ''}`;

        const priceChangeClass = (crypto.price_change_24h || 0) >= 0 ? 'positive' : 'negative';
        const priceChangeSign = (crypto.price_change_24h || 0) >= 0 ? '+' : '';

        card.innerHTML = `
            <div class="crypto-header">
                <div class="crypto-info">
                    <h3 class="crypto-name">${crypto.name}</h3>
                    <span class="crypto-symbol">${crypto.symbol}</span>
                </div>
                <div class="risk-badge ${crypto.risk_level.toLowerCase().replace(/[^a-z]/g, '')}">
                    ${crypto.risk_level}
                </div>
            </div>

            <div class="crypto-price">
                <div class="current-price">
                    $${this.formatPrice(crypto.current_price)}
                    <span class="price-change ${priceChangeClass}">
                        ${priceChangeSign}${(crypto.price_change_24h || 0).toFixed(2)}%
                    </span>
                </div>
                <div class="market-cap">
                    Market Cap: $${this.formatMarketCap(crypto.market_cap)}
                </div>
            </div>

            <div class="prediction-section">
                <div class="target-range">
                    <span class="label">30-Day Target:</span>
                    <span class="range">$${this.formatPrice(crypto['30_day_prediction'].target_low)} - $${this.formatPrice(crypto['30_day_prediction'].target_high)}</span>
                </div>
                <div class="potential-gain ${this.getGainClass(crypto.potential_gain_percent)}">
                    <span class="gain-percent">${crypto.potential_gain_percent.toFixed(0)}%</span>
                    <span class="gain-label">Potential Gain</span>
                </div>
                <div class="probability">
                    <div class="probability-bar">
                        <div class="probability-fill" style="width: ${crypto['30_day_prediction'].probability}%"></div>
                    </div>
                    <span class="probability-text">${crypto['30_day_prediction'].probability}% Probability</span>
                </div>
            </div>

            <div class="fundamentals">
                <div class="fundamentals-score">
                    <span class="label">Fundamentals Score:</span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${crypto.fundamentals_score}%"></div>
                    </div>
                    <span class="score-text">${crypto.fundamentals_score}/100</span>
                </div>
            </div>

            <div class="key-catalyst">
                <strong>Key Catalyst:</strong> ${crypto['30_day_prediction'].key_catalysts[0]}
            </div>

            ${isExtremeRisk ? '<div class="extreme-warning">💀 EXTREME RISK - High probability of total loss</div>' : ''}
        `;

        return card;
    }

    formatPrice(price) {
        if (price < 0.01) {
            return price.toFixed(6);
        } else if (price < 1) {
            return price.toFixed(4);
        } else if (price < 100) {
            return price.toFixed(2);
        } else {
            return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        }
    }

    formatMarketCap(marketCap) {
        if (marketCap >= 1e12) {
            return (marketCap / 1e12).toFixed(2) + 'T';
        } else if (marketCap >= 1e9) {
            return (marketCap / 1e9).toFixed(1) + 'B';
        } else if (marketCap >= 1e6) {
            return (marketCap / 1e6).toFixed(0) + 'M';
        } else {
            return marketCap.toLocaleString();
        }
    }

    getGainClass(gain) {
        if (gain >= 500) return 'extreme-gain';
        if (gain >= 200) return 'high-gain';
        if (gain >= 50) return 'medium-gain';
        return 'low-gain';
    }

    applyFilters() {
        // Filter logic implementation
        console.log('Filters applied');
    }
}

// Cryptocurrency data (this will be updated by API calls)
const cryptoData = {
  "standard_cryptocurrencies": {
    "bitcoin": {
      "symbol": "BTC",
      "name": "Bitcoin",
      "current_price": 116394.8,
      "market_cap": 2300000000000,
      "fundamentals_score": 95,
      "risk_level": "Low",
      "potential_gain_percent": 10.2,
      "flow_analysis": {
        "institutional_inflows": "Very High",
        "whale_activity": "Accumulation",
        "exchange_flows": "Net Outflow (Bullish)",
        "etf_flows": "Strong Positive"
      },
      "30_day_prediction": {
        "target_low": 109419,
        "target_high": 128267,
        "probability": 85,
        "key_catalysts": [
          "Strategic Bitcoin Reserve discussions",
          "Continued ETF inflows",
          "Institutional adoption"
        ]
      }
    },
    "ethereum": {
      "symbol": "ETH",
      "name": "Ethereum",
      "current_price": 4476.85,
      "market_cap": 580000000000,
      "fundamentals_score": 92,
      "risk_level": "Low-Medium",
      "potential_gain_percent": 10.6,
      "flow_analysis": {
        "institutional_inflows": "High",
        "whale_activity": "Strong Accumulation",
        "exchange_flows": "Net Inflow",
        "tvl_growth": "$100B+ DeFi TVL"
      },
      "30_day_prediction": {
        "target_low": 4200,
        "target_high": 4950,
        "probability": 80,
        "key_catalysts": [
          "$2B institutional inflows",
          "DeFi TVL recovery",
          "Layer 2 growth"
        ]
      }
    },
    "solana": {
      "symbol": "SOL",
      "name": "Solana",
      "current_price": 218.45,
      "market_cap": 105000000000,
      "fundamentals_score": 88,
      "risk_level": "Medium",
      "potential_gain_percent": 32.8,
      "flow_analysis": {
        "institutional_inflows": "High",
        "whale_activity": "Accumulation",
        "exchange_flows": "Balanced",
        "tvl_growth": "$14.4B DeFi TVL"
      },
      "30_day_prediction": {
        "target_low": 200,
        "target_high": 290,
        "probability": 75,
        "key_catalysts": [
          "High transaction volume",
          "Solana ETF discussions",
          "Meme ecosystem growth"
        ]
      }
    },
    "chainlink": {
      "symbol": "LINK",
      "name": "Chainlink",
      "current_price": 24.8,
      "market_cap": 15600000000,
      "fundamentals_score": 86,
      "risk_level": "Low-Medium",
      "potential_gain_percent": 29.0,
      "flow_analysis": {
        "institutional_inflows": "Medium",
        "whale_activity": "Steady Accumulation",
        "exchange_flows": "Stable",
        "partnerships": "Growing"
      },
      "30_day_prediction": {
        "target_low": 22,
        "target_high": 32,
        "probability": 72,
        "key_catalysts": [
          "Oracle demand increasing",
          "Cross-chain growth",
          "RWA partnerships"
        ]
      }
    },
    "cardano": {
      "symbol": "ADA",
      "name": "Cardano",
      "current_price": 1.15,
      "market_cap": 41000000000,
      "fundamentals_score": 82,
      "risk_level": "Medium",
      "potential_gain_percent": 57.4,
      "flow_analysis": {
        "institutional_inflows": "Medium",
        "whale_activity": "Moderate Accumulation",
        "exchange_flows": "Stable",
        "development_activity": "Consistent"
      },
      "30_day_prediction": {
        "target_low": 0.85,
        "target_high": 1.81,
        "probability": 68,
        "key_catalysts": [
          "Hydra scaling",
          "Smart contract growth",
          "Academic partnerships"
        ]
      }
    }
  },
  "extreme_risk_cryptocurrencies": {
    "render": {
      "symbol": "RNDR",
      "name": "Render Token",
      "current_price": 7.85,
      "market_cap": 4100000000,
      "fundamentals_score": 75,
      "risk_level": "Very High",
      "potential_gain_percent": 983,
      "flow_analysis": {
        "ai_narrative": "Extremely Strong",
        "gpu_demand": "Skyrocketing",
        "institutional_adoption": "Growing",
        "utility_growth": "Exponential"
      },
      "30_day_prediction": {
        "target_low": 6.5,
        "target_high": 85.0,
        "probability": 35,
        "key_catalysts": [
          "AI/ML compute demand explosion",
          "OpenAI partnerships",
          "GPU network growth"
        ]
      }
    },
    "fetch_ai": {
      "symbol": "FET",
      "name": "Fetch.ai",
      "current_price": 1.28,
      "market_cap": 1100000000,
      "fundamentals_score": 78,
      "risk_level": "Very High",
      "potential_gain_percent": 994,
      "flow_analysis": {
        "ai_integration": "Leading Edge",
        "autonomous_agents": "Revolutionary",
        "institutional_interest": "Very High",
        "partnership_growth": "Strong"
      },
      "30_day_prediction": {
        "target_low": 1.0,
        "target_high": 14.0,
        "probability": 32,
        "key_catalysts": [
          "AI agents breakthrough",
          "Smart city implementations",
          "DeFi AI integration"
        ]
      }
    },
    "immutable_x": {
      "symbol": "IMX",
      "name": "Immutable X",
      "current_price": 1.45,
      "market_cap": 871000000,
      "fundamentals_score": 72,
      "risk_level": "Very High",
      "potential_gain_percent": 1003,
      "flow_analysis": {
        "gaming_adoption": "Strong",
        "nft_marketplace_growth": "High",
        "layer2_ethereum": "Proven",
        "partnerships": "Major Gaming Studios"
      },
      "30_day_prediction": {
        "target_low": 1.2,
        "target_high": 16.0,
        "probability": 28,
        "key_catalysts": [
          "Gaming partnerships",
          "GameStop integration",
          "Web3 gaming breakout"
        ]
      }
    },
    "sui": {
      "symbol": "SUI",
      "name": "Sui Network",
      "current_price": 4.75,
      "market_cap": 14500000000,
      "fundamentals_score": 82,
      "risk_level": "Very High",
      "potential_gain_percent": 995,
      "flow_analysis": {
        "developer_adoption": "Rapid Growth",
        "ecosystem_expansion": "Strong",
        "vc_backing": "Top Tier",
        "technology_advantage": "Parallel Execution"
      },
      "30_day_prediction": {
        "target_low": 3.8,
        "target_high": 52.0,
        "probability": 30,
        "key_catalysts": [
          "Gaming studios adoption",
          "Ecosystem incentives",
          "L1 rotation"
        ]
      }
    }
  }
};

// Global refresh function
async function refreshAllData() {
    if (window.cryptoPlatform) {
        await window.cryptoPlatform.refreshAllData();
    }
}

// Initialize the platform when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cryptoPlatform = new CryptoPredictionPlatform();
});
