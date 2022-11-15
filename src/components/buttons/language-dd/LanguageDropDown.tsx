import { FC } from 'react';
import './LanguageDropDownStyle.css';
import LanguageDropDownPanel from './LanguageDropDownPanel';

const LanguageDropDown: FC = () => {
    return <LanguageDropDownPanel />;
};

export default LanguageDropDown;

// import { FC, useState, useRef } from 'react';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import './LanguageDropDownStyle.css';
// import LanguageDropDownPanel from './LanguageDropDownPanel';

// const LanguageDropDown: FC = () => {
//     const [isLanguageExpanded, setIsLanguageExpanded] = useState(false);
//     const languageDropDownRef = useRef<HTMLDivElement>(null);

//     const languageDropDownOnClickHandler = () => {
//         setIsLanguageExpanded((current) => !current);
//     };

//     const languagePanelOnOutsideClick = () => {
//         setIsLanguageExpanded(false);
//     };

//     return (
//         <div ref={languageDropDownRef} className="language-dd-wrapper">
//             <button onClick={languageDropDownOnClickHandler} className="language-button-body">
//                 <div className="language-text-container">
//                     <p className="language-text">ENG</p>
//                 </div>
//                 <div className="language-arrow-cointainer">{isLanguageExpanded ? <ArrowDropUpIcon className="language-arrow-expand" /> : <ArrowDropDownIcon className="language-arrow-expand" />}</div>
//             </button>
//             {isLanguageExpanded && <LanguageDropDownPanel languagePanelOnOutsideClick={languagePanelOnOutsideClick} reference={languageDropDownRef} />}
//         </div>
//     );
// };

// export default LanguageDropDown;
