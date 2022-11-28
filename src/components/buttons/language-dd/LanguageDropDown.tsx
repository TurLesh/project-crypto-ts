import { FC, useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './LanguageDropDownStyle.css';

type LanguageListType = {
    code: string;
    name: string;
};

const LanguageDropDown: FC = () => {
    const [isLanguageExpanded, setIsLanguageExpanded] = useState(false);
    const languageDropDownRef = useRef<HTMLDivElement>(null);

    const { i18n } = useTranslation();

    const languageList: LanguageListType[] = [
        {
            code: 'en',
            name: 'ENG'
        },
        {
            code: 'ua',
            name: 'UKR'
        },
        {
            code: 'pl',
            name: 'POL'
        },
        {
            code: 'ru',
            name: 'RUS'
        }
    ];

    const findNameByCode = (code: string) => {
        return Object.values(languageList).find((obj) => obj.code === code)?.name;
    };

    const languageDropDownOnClickHandler = () => {
        setIsLanguageExpanded((current) => !current);
    };

    const changeLanguageHandler = (lang: string) => {
        i18n.changeLanguage(lang);
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

    // used to close dropdown after each new language selection action
    useEffect(() => {
        setIsLanguageExpanded(false);
    }, [i18n.language]);

    const langTestMap = languageList.map(({ code, name }) => {
        return (
            <div key={code}>
                {i18n.language !== code && (
                    <div className="language-dd-panel-tile">
                        <button onClick={() => changeLanguageHandler(code)} className="language-dd-panel-btn">
                            <p className="language-dd-panel-btn-text">{name}</p>
                        </button>
                    </div>
                )}
            </div>
        );
    });

    return (
        <div ref={languageDropDownRef} className="language-dd-wrapper">
            <button onClick={languageDropDownOnClickHandler} className="language-button-body">
                <div className="language-text-container">
                    <p className="language-text">{findNameByCode(i18n.language)}</p>
                </div>
                <div className="language-arrow-cointainer">{isLanguageExpanded ? <ArrowDropUpIcon className="language-arrow-expand" /> : <ArrowDropDownIcon className="language-arrow-expand" />}</div>
            </button>
            {isLanguageExpanded && (
                <div className="language-dd-panel-wrapper">
                    <div className="language-dd-panel-triangle" />
                    <div className="language-dd-panel-container">{langTestMap}</div>
                </div>
            )}
        </div>
    );
};

export default LanguageDropDown;
