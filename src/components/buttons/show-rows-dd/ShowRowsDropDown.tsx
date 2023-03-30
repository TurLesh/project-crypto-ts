import { FC, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { showRowsConfigs } from '../../../configs/ddConfigs';
import { useAppDispatch } from '../../../services/hooks/useTypedSelector';
import { CHANGE_ROWS_AMOUNT } from '../../../services/store/reducers/showRowsReducer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './ShowRowsDropDownStyle.css';

const ShowRowsDropDown: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [isShowRowsExpanded, setIsShowRowsExpanded] = useState(false);
    const [selectedShowRows, setSelectedShowRows] = useState(20);
    const showRowsDropDownRef = useRef<HTMLDivElement>(null);
    const showRowsList: number[] = showRowsConfigs;

    // close dd on click out of dd panel
    useEffect(() => {
        if (isShowRowsExpanded === true) {
            const handleClickOutside = (event: any) => {
                if (showRowsDropDownRef.current && !showRowsDropDownRef.current.contains(event.target)) {
                    setIsShowRowsExpanded(false);
                }
            };
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [isShowRowsExpanded]);

    // change amount of rows on number click inside dd panel and close panel
    const changeRowsAmount = (number: number) => {
        setSelectedShowRows(number);
        setIsShowRowsExpanded(false);

        //set value to storage
        dispatch({ type: CHANGE_ROWS_AMOUNT, payload: number });
    };

    //on show rows button click handler
    const expandShowRowsHandler = () => {
        setIsShowRowsExpanded((prevValue) => !prevValue);
    };

    //categories tiles map inside panel container
    const showRowsItemMap = showRowsList.map((number, index) => {
        return (
            <div key={index}>
                {selectedShowRows !== number && (
                    <div className="show-rows-dd-panel-tile">
                        <button onClick={() => changeRowsAmount(number)} className="show-rows-dd-panel-btn">
                            <p className="show-rows-dd-panel-btn-text">{number}</p>
                        </button>
                    </div>
                )}
            </div>
        );
    });

    const showRowsArrow = isShowRowsExpanded ? (
        <ArrowDropUpIcon className="show-rows-dd-arrow" />
    ) : (
        <ArrowDropDownIcon className="show-rows-dd-arrow" />
    );

    return (
        <div ref={showRowsDropDownRef} className="show-rows-wrapper">
            <div className="show-rows-btn-wrapper">
                <div className="show-rows-text">{t('cryptocurrency-filters-panel.show-rows-btn')}</div>
                <button className="show-rows-dd-wrapper" onClick={expandShowRowsHandler}>
                    <div className="show-rows-dd-number">{selectedShowRows}</div>
                    <div className="show-rows-dd-arrow-container">{showRowsArrow}</div>
                </button>
            </div>
            <CSSTransition in={isShowRowsExpanded} timeout={200} classNames="display" unmountOnExit>
                <div className="show-rows-dd-panel-wrapper">
                    <div className="show-rows-dd-panel-triangle" />
                    <div className="show-rows-dd-panel-container">{showRowsItemMap}</div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default ShowRowsDropDown;
