import { FC, useRef, useEffect, useState } from 'react';
import { AvailableLanguages } from '../../../data/available-options';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './LanguageDropDownStyle.css';

type LanguageDropDownOptionsType = {
    id: string;
    symbol: string;
    name?: string;
    isAvailable: boolean;
    isActive: boolean;
};

const LanguageDropDown: FC = () => {
    const [isLanguageExpanded, setIsLanguageExpanded] = useState(false);
    const languageDropDownRef = useRef<HTMLDivElement>(null);

    const languageDropDownOnClickHandler = () => {
        setIsLanguageExpanded((current) => !current);
    };

    useEffect(() => {
        if (isLanguageExpanded === true) {
            const handleClickOutside = (event: any) => {
                if (languageDropDownRef.current && !languageDropDownRef.current.contains(event.target)) {
                    setIsLanguageExpanded(false);
                }
            };
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [isLanguageExpanded]);

    console.log(isLanguageExpanded);

    const languageData: LanguageDropDownOptionsType[] = AvailableLanguages;

    const languagePannelMapFunc = languageData.map(({ isAvailable, isActive, id, symbol }) => {
        return (
            <div key={id}>
                {isActive === false && (
                    <div className="language-dd-panel-tile">
                        <button className="language-dd-panel-btn">{isAvailable && <p className="language-dd-panel-btn-text">{symbol}</p>}</button>
                    </div>
                )}
            </div>
        );
    });

    return (
        <div ref={languageDropDownRef} className="language-dd-wrapper">
            <button onClick={languageDropDownOnClickHandler} className="language-button-body">
                <div className="language-text-container">
                    <p className="language-text">ENG</p>
                </div>
                <div className="language-arrow-cointainer">{isLanguageExpanded ? <ArrowDropUpIcon className="language-arrow-expand" /> : <ArrowDropDownIcon className="language-arrow-expand" />}</div>
            </button>
            {isLanguageExpanded && (
                <div className="language-dd-panel-wrapper">
                    <div className="language-dd-panel-triangle" />
                    <div className="language-dd-panel-container">{languagePannelMapFunc}</div>
                </div>
            )}
        </div>
    );
};

export default LanguageDropDown;
