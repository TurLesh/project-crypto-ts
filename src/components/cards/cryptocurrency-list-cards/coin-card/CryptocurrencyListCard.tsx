import { FC, useState } from 'react';
import ReactApexCharts from 'react-apexcharts';
import { listChartOptions } from '../../../../configs/listChartConfigs';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './CryptocurrencyListCardStyle.css';

type CoinListDataType = {
    numerationNumber?: number;
    icon: string;
    symbol: string;
    name: string;
    currentPrice: number;
    isChange1hRising: boolean;
    priceChangePercentage1h: string;
    isChange24hRising: boolean;
    priceChangePercentage24h: string;
    isChange7dRising: boolean;
    priceChangePercentage7d: string;
    isChange30dRising: boolean;
    priceChangePercentage30d: string;
    marketCap: string;
    volume24h: string;
    coinHistory7dData: number[];
    activeCurrency: string;
    chartType: string;
    candlestickChartData: object[];
};

const CryptocurrencyListCard: FC<CoinListDataType> = (props) => {
    const {
        symbol,
        name,
        numerationNumber,
        icon,
        currentPrice,
        marketCap,
        volume24h,
        isChange1hRising,
        priceChangePercentage1h,
        isChange24hRising,
        priceChangePercentage24h,
        isChange7dRising,
        priceChangePercentage7d,
        isChange30dRising,
        priceChangePercentage30d,
        coinHistory7dData,
        activeCurrency,
        chartType,
        candlestickChartData
    } = props;

    const [isStarActive, setIsStartActive] = useState(false);

    const starClickHandler = () => {
        setIsStartActive((prevState) => !prevState);
    };

    const activeStar = isStarActive ? <StarIcon /> : <StarBorderIcon />;

    //1h
    const activeArrow1h = isChange1hRising ? (
        <ExpandLessIcon className="rising-arrow rise" />
    ) : (
        <ExpandMoreIcon className="rising-arrow fall" />
    );
    const risingValue1hClassName = isChange1hRising ? 'rising-value value-rise' : 'rising-value value-fall';

    //24h
    const activeArrow24h = isChange24hRising ? (
        <ExpandLessIcon className="rising-arrow rise" />
    ) : (
        <ExpandMoreIcon className="rising-arrow fall" />
    );
    const risingValue24hClassName = isChange24hRising ? 'rising-value value-rise' : 'rising-value value-fall';

    //7d
    const activeArrow7d = isChange7dRising ? (
        <ExpandLessIcon className="rising-arrow rise" />
    ) : (
        <ExpandMoreIcon className="rising-arrow fall" />
    );
    const risingValue7dClassName = isChange7dRising ? 'rising-value value-rise' : 'rising-value value-fall';

    //30d
    const activeArrow30d = isChange30dRising ? (
        <ExpandLessIcon className="rising-arrow rise" />
    ) : (
        <ExpandMoreIcon className="rising-arrow fall" />
    );
    const risingValue30dClassName = isChange30dRising ? 'rising-value value-rise' : 'rising-value value-fall';

    //chart options
    const chartChangeUp = isChange7dRising;
    const colorTernar: string = chartChangeUp === true ? '#0d9b44' : '#fb3131';

    // chart series depend on chart type
    const lineSeries = [
        {
            name: name,
            color: colorTernar,
            legend: { show: false },
            data: coinHistory7dData
        }
    ];

    const candlestickSeries = [
        {
            data: candlestickChartData as any[]
        }
    ];

    // get currency symbol/prefix by currency
    const getCurrencyPrefix = (activeCurrency: string) => {
        switch (activeCurrency) {
            case 'usd':
                const currencyPrefixUSD = '$';
                return currencyPrefixUSD;
            case 'eur':
                const currencyPrefixEUR = '€';
                return currencyPrefixEUR;
            case 'uah':
                const currencyPrefixUAH = '₴';
                return currencyPrefixUAH;
            case 'pln':
                const currencyPrefixPLN = 'zł';
                return currencyPrefixPLN;
            default:
                const currencyPrefixDefault = '$';
                return currencyPrefixDefault;
        }
    };

    const currencyPrefix = getCurrencyPrefix(activeCurrency);

    //if market_cap_rank exist -> return market_cap_rank, else (numerationNumber === null) return '-'
    const checkNumerationNymber = () => {
        if (numerationNumber) {
            return numerationNumber;
        } else {
            return '-';
        }
    };

    return (
        <div className="cryptocurrency-list-card-wrapper">
            <div className="star-container" onClick={starClickHandler}>
                {activeStar}
            </div>
            <div className="numeration-container">{checkNumerationNymber()}</div>
            <div className="name-wrapper">
                <div className="icon-container">
                    <img src={icon} className="cryptocurrency-icon" alt="cryptocurrency-icon" />
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
                    <div className="rising-arrow-container">{activeArrow1h}</div>
                    <div className={risingValue1hClassName}>{priceChangePercentage1h}%</div>
                </div>
                <div className="price-change-container">
                    <div className="rising-arrow-container">{activeArrow24h}</div>
                    <div className={risingValue24hClassName}>{priceChangePercentage24h}%</div>
                </div>
                <div className="price-change-container">
                    <div className="rising-arrow-container">{activeArrow7d}</div>
                    <div className={risingValue7dClassName}>{priceChangePercentage7d}%</div>
                </div>
                <div className="price-change-container">
                    <div className="rising-arrow-container">{activeArrow30d}</div>
                    <div className={risingValue30dClassName}>{priceChangePercentage30d}%</div>
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

export default CryptocurrencyListCard;
