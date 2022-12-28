import React, { FC } from 'react';
import ReactApexCharts from 'react-apexcharts';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { listChartOptions } from '../../../configs/listChartConfigs';
import './CryptocurrencySliderCardStyle.css';

type CryptocurrencySliderCardDataType = {
    name: string;
    symbol: string;
    currentPrice: number;
    isChange24hRising: boolean;
    priceChangePercentage24h: string;
    isChange7dRising: boolean;
    priceChangePercentage7d: string;
    isChange30dRising: boolean;
    priceChangePercentage30d: string;
    priceHistory7dData: number[];
};

const CryptocurrencySliderCard: FC<CryptocurrencySliderCardDataType> = (props) => {
    const { symbol, currentPrice, priceChangePercentage24h, priceChangePercentage7d, priceChangePercentage30d, isChange24hRising, isChange7dRising, isChange30dRising, name, priceHistory7dData } =
        props;

    const priceChangeUp = isChange24hRising;
    const colorTernar: string = priceChangeUp === true ? '#0d9b44' : '#e41f1f';

    const series = [
        {
            name: name,
            color: colorTernar,
            legend: { show: false },
            data: priceHistory7dData
        }
    ];

    return (
        <div className="currency-card-body">
            <div className="card-top-container">
                <div className="top-info-container">
                    <div className="currency-info-container">
                        <p className="currency-info">{symbol}</p>
                    </div>
                    <div className="currency-info-container">
                        <p className="currency-info">{currentPrice}</p>
                    </div>
                </div>
                <div className="card-chart-container">
                    <ReactApexCharts series={series} width={220} height={92} options={listChartOptions} />
                </div>
            </div>

            <div className="card-bottom-container">
                <div className="currency-info-container">
                    <div className="percentage-static-label 24h-container">
                        <p className="static-label 24h-label">24h:</p>
                    </div>
                    {isChange24hRising ? (
                        <div className="percentage-dinamic-info">
                            <ExpandLessIcon className="icon-up" />
                            <p className="dinamic-info raise-up">{priceChangePercentage24h}%</p>
                        </div>
                    ) : (
                        <div className="percentage-dinamic-info">
                            <ExpandMoreIcon className="icon-down" />
                            <p className="dinamic-info fall-dawn">{priceChangePercentage24h}%</p>
                        </div>
                    )}
                </div>
                <div className="currency-info-container">
                    <div className="percentage-static-label 7d-container">
                        <p className="static-label 7d-label">7d:</p>
                    </div>
                    {isChange7dRising ? (
                        <div className="percentage-dinamic-info">
                            <ExpandLessIcon className="icon-up" />
                            <p className="dinamic-info raise-up">{priceChangePercentage7d}%</p>
                        </div>
                    ) : (
                        <div className="percentage-dinamic-info">
                            <ExpandMoreIcon className="icon-down" />
                            <p className="dinamic-info fall-dawn">{priceChangePercentage7d}%</p>
                        </div>
                    )}
                </div>
                <div className="currency-info-container">
                    <div className="percentage-static-label 30d-container">
                        <p className="static-label 30d-label">30d:</p>
                    </div>
                    {isChange30dRising ? (
                        <div className="percentage-dinamic-info">
                            <ExpandLessIcon className="icon-up" />
                            <p className="dinamic-info raise-up">{priceChangePercentage30d}%</p>
                        </div>
                    ) : (
                        <div className="percentage-dinamic-info">
                            <ExpandMoreIcon className="icon-down" />
                            <p className="dinamic-info fall-dawn">{priceChangePercentage30d}%</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CryptocurrencySliderCard;
//abo
