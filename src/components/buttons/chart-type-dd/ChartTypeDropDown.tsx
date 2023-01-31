import { FC, useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { chartTypeConfigs } from '../../../configs/ddConfigs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import './ChartTypeDropDownStyle.css';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/store';
import { CHANGE_CHART_TYPE } from '../../../services/store/chartTypeReducer';

const ChartTypeDropDown: FC = () => {
    const [isChartTypeExpanded, setIsChartTypeExpanded] = useState(false);
    const chartTypeDropDownRef = useRef<HTMLDivElement>(null);
    const chartTypeList: string[] = chartTypeConfigs;

    const [selectedChartType, setSelectedChartType] = useState('line');

    // close dd on click out of dd panel
    useEffect(() => {
        if (isChartTypeExpanded === true) {
            const handleClickOutside = (event: any) => {
                if (chartTypeDropDownRef.current && !chartTypeDropDownRef.current.contains(event.target)) {
                    setIsChartTypeExpanded(false);
                }
            };
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [isChartTypeExpanded]);

    const dispatch: AppDispatch = useDispatch();

    // change chart type on icon click inside dd panel
    const changeChartTypeHandler = (item: string) => {
        setSelectedChartType(item);

        //set value to storage
        dispatch({ type: CHANGE_CHART_TYPE, payload: item });
    };

    // close dd after chart type change
    useEffect(() => {
        setIsChartTypeExpanded(false);
    }, [selectedChartType]);

    //on chart type button click handler
    const expandChartTypeHandler = () => {
        setIsChartTypeExpanded((prevValue) => !prevValue);
    };

    //return icon depend on chart type given in prop
    const getChartIconByCode = (code: string) => {
        switch (code) {
            case 'line':
                return <ShowChartIcon className="chart-type-dd-icon" />;
            case 'candlestick':
                return <CandlestickChartIcon className="chart-type-dd-icon" />;
            default:
                return <ShowChartIcon />;
        }
    };

    //categories tiles map inside panel container
    const chartTypeItemMap = chartTypeList.map((item, index) => {
        const chartIcon = getChartIconByCode(item);

        return (
            <div key={index}>
                {selectedChartType !== item && (
                    <div className="chart-type-dd-panel-tile">
                        <button onClick={() => changeChartTypeHandler(item)} className="chart-type-dd-panel-btn">
                            <p className="chart-type-dd-panel-btn-icon">{chartIcon}</p>
                        </button>
                    </div>
                )}
            </div>
        );
    });

    //get active chart icon
    const activeChartIcon = getChartIconByCode(selectedChartType);

    const chartTypeArrow = isChartTypeExpanded ? <ArrowDropUpIcon className="chart-type-dd-arrow" /> : <ArrowDropDownIcon className="chart-type-dd-arrow" />;

    return (
        <div ref={chartTypeDropDownRef} className="chart-type-wrapper">
            <div className="chart-type-btn-wrapper">
                <div className="chart-type-text">Chart type: </div>
                <button className="chart-type-dd-wrapper" onClick={expandChartTypeHandler}>
                    <div className="chart-type-dd-icon-container">{activeChartIcon}</div>
                    <div className="chart-type-dd-arrow-container">{chartTypeArrow}</div>
                </button>
            </div>
            <CSSTransition in={isChartTypeExpanded} timeout={200} classNames="display" unmountOnExit>
                <div className="chart-type-dd-panel-wrapper">
                    <div className="chart-type-dd-panel-triangle" />
                    <div className="chart-type-dd-panel-container">{chartTypeItemMap}</div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default ChartTypeDropDown;
