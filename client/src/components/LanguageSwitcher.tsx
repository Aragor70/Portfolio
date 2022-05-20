import React, { Fragment, useState } from 'react';
import { Translate } from './Translate';

import i18n from '../utils/i18n';
import { Language, availableLanguages, defaultLanguage } from './LanguageConfig';


const LANGUAGE_CODE_TO_KEY: {
  [K in Language]: string;
} = {
  'en-GB': "language-switcher.language.english-gb",
  'pl': "language-switcher.language.polish",
}

const LanguageSwitcher = () => {
  
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<Language>(defaultLanguage);
  const [showSelect, setShowSelect] = useState(false)


  return (
    <Fragment>
      <div className="language-switcher">
        <button onClick={() => setShowSelect(!showSelect)}>
          <Translate tKey={LANGUAGE_CODE_TO_KEY[selectedLanguageCode]} />
        </button>

          {
            showSelect && 
              <div>
                  {availableLanguages.map((languageCode) => {
                    return (
                      <div
                        key={languageCode}
                      >
                        <button
                          onClick={() => {
                            setSelectedLanguageCode(languageCode);
                            i18n.changeLanguage(languageCode);
                          }}
                        >
                          <Translate tKey={LANGUAGE_CODE_TO_KEY[languageCode]} />
                        </button>
                      </div>
                    );
                  })}
              </div>
          }
      </div>
      
          
    </Fragment>
  );
};

export default LanguageSwitcher;
