import { FC } from 'react';
import ReactApexCharts from 'react-apexcharts';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { listChartOptions } from '../../../configs/listChartConfigs';
import ErrorIcon from '../../../assets/images/error.png';
import '../../cards/cryptocurrency-list-cards/coin-card/CryptocurrencyListCardStyle.css';

type CoinListDataType = {
    numerationNumber?: string;
    symbol: string;
    name: string;
    currentPrice: string;
    priceChangePercentage1h: string;
    priceChangePercentage24h: string;
    priceChangePercentage7d: string;
    priceChangePercentage30d: string;
    marketCap: string;
    volume24h: string;
    coinHistory7dData: number[];
    chartType: string;
    candlestickChartData: object[];
    currencyPrefix: string;
};

const CryptocurrencyListErrorCard: FC<CoinListDataType> = (props) => {
    const {
        symbol,
        name,
        numerationNumber,
        currencyPrefix,
        currentPrice,
        marketCap,
        volume24h,
        priceChangePercentage1h,
        priceChangePercentage24h,
        priceChangePercentage7d,
        priceChangePercentage30d,
        coinHistory7dData,
        chartType,
        candlestickChartData
    } = props;

    const lineSeries = [
        {
            name: name,
            color: '#fb3131',
            legend: { show: false },
            data: coinHistory7dData
        }
    ];

    const candlestickSeries = [
        {
            data: candlestickChartData as any[]
        }
    ];

    return (
        <div className="cryptocurrency-list-card-wrapper">
            <div className="star-container">
                <StarBorderIcon />
            </div>
            <div className="numeration-container">{numerationNumber}</div>
            <div className="name-wrapper">
                <div className="icon-container">
                    <img src={ErrorIcon} className="cryptocurrency-icon" alt="cryptocurrency-icon" />
                </div>
                <div className="name-text">{name}</div>
                <div className="symbol-text">{symbol}</div>
            </div>
            <div className="current-price">
                {currencyPrefix}
                {currentPrice}
            </div>
            <div className="price-change-percentage-wrapper">
                <div className="price-change-container">
                    <div className="rising-arrow-container">
                        <ExpandMoreIcon className="rising-arrow fall" />
                    </div>
                    <div className="rising-value value-fall">{priceChangePercentage1h}%</div>
                </div>
                <div className="price-change-container">
                    <div className="rising-arrow-container">
                        <ExpandMoreIcon className="rising-arrow fall" />
                    </div>
                    <div className="rising-value value-fall">{priceChangePercentage24h}%</div>
                </div>
                <div className="price-change-container">
                    <div className="rising-arrow-container">
                        <ExpandMoreIcon className="rising-arrow fall" />
                    </div>
                    <div className="rising-value value-fall">{priceChangePercentage7d}%</div>
                </div>
                <div className="price-change-container">
                    <div className="rising-arrow-container">
                        <ExpandMoreIcon className="rising-arrow fall" />
                    </div>
                    <div className="rising-value value-fall">{priceChangePercentage30d}%</div>
                </div>
            </div>
            <div className="market-info-wrapper">
                <div className="market-cap market-info-item">
                    {currencyPrefix}
                    {marketCap}
                </div>
                <div className="volume-24h market-info-item">
                    {currencyPrefix}
                    {volume24h}
                </div>
            </div>
            <div className="chart-container">
                {chartType === 'line' && (
                    <ReactApexCharts
                        series={lineSeries}
                        width={200}
                        height={80}
                        options={listChartOptions}
                        className="chart"
                    />
                )}
                {chartType === 'candlestick' && (
                    <ReactApexCharts
                        series={candlestickSeries}
                        width={200}
                        height={80}
                        options={listChartOptions}
                        type="candlestick"
                        className="chart"
                    />
                )}
            </div>
            <div className="more-icon-container">
                <MoreVertIcon />
            </div>
        </div>
    );
};

export default CryptocurrencyListErrorCard;
