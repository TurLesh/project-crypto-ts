import React, { FC } from 'react';
import ReactApexCharts from 'react-apexcharts';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './CryptocurrencySliderCardStyle.css';

type CryptocurrencySliderCardDataType = {
    symbol: string;
    value: number;
    oneday: number;
    oneweek: number;
    onemonth: number;
    up24h: boolean;
    up7d: boolean;
    up30d: boolean;
    name: string;
    priceHistory: number[];
};

const CryptocurrencySliderCard: FC<CryptocurrencySliderCardDataType> = ({ symbol, value, oneday, oneweek, onemonth, up24h, up7d, up30d, name, priceHistory }) => {
    //options for chart component
    const options = {
        stroke: {
            curve: 'smooth',
            width: 3
        },
        chart: {
            toolbar: {
                show: false
            }
        },
        grid: {
            show: false
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            labels: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        }
    } as const;

    const priceChangeUp = up24h;
    const colorTernar: string = priceChangeUp === true ? '#0d9b44' : '#e41f1f';

    const series = [
        {
            name: name,
            color: colorTernar,
            legend: { show: false },
            data: priceHistory
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
                        <p className="currency-info">{value}</p>
                    </div>
                </div>
                <div className="card-chart-container">
                    <ReactApexCharts series={series} width={220} height={92} options={options} />
                </div>
            </div>

            <div className="card-bottom-container">
                <div className="currency-info-container">
                    <div className="percentage-static-label 24h-container">
                        <p className="static-label 24h-label">24h:</p>
                    </div>
                    {up24h ? (
                        <div className="percentage-dinamic-info">
                            <ExpandLessIcon className="icon-up" />
                            <p className="dinamic-info raise-up">{oneday}%</p>
                        </div>
                    ) : (
                        <div className="percentage-dinamic-info">
                            <ExpandMoreIcon className="icon-down" />
                            <p className="dinamic-info fall-dawn">{oneday}%</p>
                        </div>
                    )}
                </div>
                <div className="currency-info-container">
                    <div className="percentage-static-label 7d-container">
                        <p className="static-label 7d-label">7d:</p>
                    </div>
                    {up7d ? (
                        <div className="percentage-dinamic-info">
                            <ExpandLessIcon className="icon-up" />
                            <p className="dinamic-info raise-up">{oneweek}%</p>
                        </div>
                    ) : (
                        <div className="percentage-dinamic-info">
                            <ExpandMoreIcon className="icon-down" />
                            <p className="dinamic-info fall-dawn">{oneweek}%</p>
                        </div>
                    )}
                </div>
                <div className="currency-info-container">
                    <div className="percentage-static-label 30d-container">
                        <p className="static-label 30d-label">30d:</p>
                    </div>
                    {up30d ? (
                        <div className="percentage-dinamic-info">
                            <ExpandLessIcon className="icon-up" />
                            <p className="dinamic-info raise-up">{onemonth}%</p>
                        </div>
                    ) : (
                        <div className="percentage-dinamic-info">
                            <ExpandMoreIcon className="icon-down" />
                            <p className="dinamic-info fall-dawn">{onemonth}%</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CryptocurrencySliderCard;
//abo
