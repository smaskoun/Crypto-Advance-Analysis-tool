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
        const riskFilter = document.getElementById('riskFilter').value;
        const gainFilter = document.getElementById('gainFilter').value;
        const probabilityFilter = document.getElementById('probabilityFilter').value;
        const sortFilter = document.getElementById('sortFilter').value;

        // Combine all cryptocurrencies for filtering
        let allCryptos = [];

        // Add standard cryptocurrencies
        Object.entries(cryptoData.standard_cryptocurrencies).forEach(([key, crypto]) => {
            allCryptos.push({
                key,
                data: crypto,
                isExtremeRisk: false
            });
        });

        // Add extreme risk cryptocurrencies
        Object.entries(cryptoData.extreme_risk_cryptocurrencies).forEach(([key, crypto]) => {
            allCryptos.push({
                key,
                data: crypto,
                isExtremeRisk: true
            });
        });

        // Apply filters
        let filteredCryptos = allCryptos.filter(crypto => {
            const data = crypto.data;

            // Risk level filter
            if (riskFilter !== 'all' && data.risk_level !== riskFilter) {
                return false;
            }

            // Potential gain filter
            const gain = data.potential_gain_percent;
            if (gainFilter !== 'all') {
                switch(gainFilter) {
                    case 'low':
                        if (gain >= 50) return false;
                        break;
                    case 'medium':
                        if (gain < 50 || gain >= 200) return false;
                        break;
                    case 'high':
                        if (gain < 200 || gain >= 500) return false;
                        break;
                    case 'extreme':
                        if (gain < 500 || gain >= 1000) return false;
                        break;
                    case 'moonshot':
                        if (gain < 1000) return false;
                        break;
                }
            }

            // Probability filter
            const probability = data['30_day_prediction'].probability;
            if (probabilityFilter !== 'all') {
                switch(probabilityFilter) {
                    case 'high':
                        if (probability < 70) return false;
                        break;
                    case 'medium':
                        if (probability < 50 || probability >= 70) return false;
                        break;
                    case 'low':
                        if (probability < 30 || probability >= 50) return false;
                        break;
                    case 'verylow':
                        if (probability >= 30) return false;
                        break;
                }
            }

            return true;
        });

        // Apply sorting
        filteredCryptos.sort((a, b) => {
            const dataA = a.data;
            const dataB = b.data;

            switch(sortFilter) {
                case 'potential_gain':
                    return dataB.potential_gain_percent - dataA.potential_gain_percent;
                case 'probability':
                    return dataB['30_day_prediction'].probability - dataA['30_day_prediction'].probability;
                case 'risk_level':
                    const riskOrder = { 'Low': 1, 'Low-Medium': 2, 'Medium': 3, 'High': 4, 'Very High': 5, 'Extreme': 6 };
                    return riskOrder[dataA.risk_level] - riskOrder[dataB.risk_level];
                case 'market_cap':
                    return dataB.market_cap - dataA.market_cap;
                case 'fundamentals':
                    return dataB.fundamentals_score - dataA.fundamentals_score;
                default:
                    return 0;
            }
        });

        // Render filtered results
        this.renderFilteredCryptos(filteredCryptos);
    }

    renderFilteredCryptos(filteredCryptos) {
        // Separate standard and extreme risk cryptos
        const standardCryptos = filteredCryptos.filter(c => !c.isExtremeRisk);
        const extremeRiskCryptos = filteredCryptos.filter(c => c.isExtremeRisk);

        // Render standard cryptocurrencies
        const standardGrid = document.getElementById('standardCryptoGrid');
        if (standardGrid) {
            standardGrid.innerHTML = '';
            standardCryptos.forEach(crypto => {
                const card = this.createCryptoCard(crypto.data, false);
                standardGrid.appendChild(card);
            });

            // Show/hide section based on results
            const standardSection = document.querySelector('.crypto-section');
            if (standardSection) {
                standardSection.style.display = standardCryptos.length > 0 ? 'block' : 'none';
            }
        }

        // Render extreme risk cryptocurrencies
        const extremeRiskGrid = document.getElementById('extremeRiskGrid');
        if (extremeRiskGrid) {
            extremeRiskGrid.innerHTML = '';
            extremeRiskCryptos.forEach(crypto => {
                const card = this.createCryptoCard(crypto.data, true);
                extremeRiskGrid.appendChild(card);
            });

            // Show/hide section based on results
            const extremeRiskSection = document.querySelector('.extreme-risk-section');
            if (extremeRiskSection) {
                extremeRiskSection.style.display = extremeRiskCryptos.length > 0 ? 'block' : 'none';
            }
        }

        // Show results count
        this.showFilterResults(filteredCryptos.length);
    }

    showFilterResults(count) {
        // Remove existing results indicator
        const existing = document.querySelector('.filter-results');
        if (existing) existing.remove();

        // Add results indicator
        const filtersSection = document.querySelector('.filters-section');
        if (filtersSection) {
            const resultsDiv = document.createElement('div');
            resultsDiv.className = 'filter-results';
            resultsDiv.innerHTML = `
                <div class="container">
                    <p class="results-text">
                        <i class="fas fa-filter"></i>
                        Showing ${count} cryptocurrency${count !== 1 ? 's' : ''} based on your filters
                        ${count === 0 ? '<button onclick="clearAllFilters()" class="clear-filters-btn">Clear All Filters</button>' : ''}
                    </p>
                </div>
            `;
            filtersSection.appendChild(resultsDiv);
        }
    }
}

// Clear all filters function
function clearAllFilters() {
    document.getElementById('riskFilter').value = 'all';
    document.getElementById('gainFilter').value = 'all';
    document.getElementById('probabilityFilter').value = 'all';
    document.getElementById('sortFilter').value = 'potential_gain';

    if (window.cryptoPlatform) {
        window.cryptoPlatform.applyFilters();
    }
}

// Cryptocurrency data - this should come from your data source
const cryptoData = {
    // your existing data object here or imported
};

async function refreshAllData() {
    if (window.cryptoPlatform) {
        await window.cryptoPlatform.refreshAllData();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.cryptoPlatform = new CryptoPredictionPlatform();
});
