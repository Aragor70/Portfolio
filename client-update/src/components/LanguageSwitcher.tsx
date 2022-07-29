import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Translate } from './Translate';

import i18n from '../utils/i18n';
import { Language, availableLanguages, defaultLanguage } from './LanguageConfig';


import polish from '/assets/icons/poland.svg';
import english from '/assets/icons/united-kingdom.svg';
import { LanguageContext } from '../context/LanguageContext';

const LANGUAGE_CODE_TO_KEY: {
  [K in Language]: string;
} = {
  'en-GB': "language-switcher.language.english-gb",
  'pl': "language-switcher.language.polish",
}

const LanguageSwitcher = () => {
  
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<Language>(defaultLanguage);
  const [showSelect, setShowSelect] = useState(false)

  
  // eslint-disable-next-line
  const languageContext = useContext<any>(LanguageContext);

  const flag: { 'en-GB': string, 'pl': string} = {
    'en-GB': english,
    'pl': polish
  }

  const saveLanguage = async (languageCode: Language) => {
    try {
      localStorage.setItem('languageCode', languageCode);
      
      setSelectedLanguageCode(languageCode);
      i18n.changeLanguage(languageCode);
      languageContext.setLanguageCode(languageCode)
      setShowSelect(false);

    } catch (err) {
      setSelectedLanguageCode(defaultLanguage);
      i18n.changeLanguage(defaultLanguage);
      languageContext.setLanguageCode(defaultLanguage)
      setShowSelect(false);
      console.log(err.message)
    }
  }

  useEffect(() => {

    const languageCode: Language = localStorage.getItem('languageCode');
    
    if (languageCode) {
      setSelectedLanguageCode(languageCode);
      i18n.changeLanguage(languageCode);
      languageContext.setLanguageCode(languageCode)
      setShowSelect(false);
      
    } else {
      setSelectedLanguageCode(defaultLanguage);
      i18n.changeLanguage(defaultLanguage);
      languageContext.setLanguageCode(defaultLanguage)
      setShowSelect(false);
    }

  }, [languageContext])
  console.log(selectedLanguageCode)
  return (
    <Fragment>
      <label className={"language-switcher"} >

        <label onClick={() => setShowSelect(!showSelect)}>
          
          <Translate tKey={LANGUAGE_CODE_TO_KEY[selectedLanguageCode]} />

          <img src={flag[selectedLanguageCode]} alt="current_flag" />

        </label>

          {
            showSelect && 
              <Fragment>
                <div onClick={() => setShowSelect(false)} className="shadow-box"></div>
                <ul style={{ zIndex: 15 }}>
                    {availableLanguages.filter((element: Language) => element !== selectedLanguageCode).map((languageCode: Language) => {
                      return (
                        <label 
                          key={languageCode}
                          onClick={() => {
                            saveLanguage(languageCode);
                          }}
                        >
                          
                          <Translate tKey={LANGUAGE_CODE_TO_KEY[languageCode]} />

                          <img src={flag[languageCode]} alt="flag" />

                        </label>
                      );
                    })}
                </ul>
              </Fragment>
          }
      </label>
      
          
    </Fragment>
  );
};

export default LanguageSwitcher;
