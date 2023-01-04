import React from 'react';
import './i18nSuspenseStyle.css';

const I18nSuspense = () => {
    return (
        <div className="i18n-suspense-wrapper">
            <div className="spiner-container">
                <div className="lds-dual-ring"></div>
            </div>
        </div>
    );
};

export default I18nSuspense;
