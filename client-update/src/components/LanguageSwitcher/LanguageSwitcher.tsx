import React, { Fragment, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Translate } from '../Translate/Translate';
import i18n from '../../utils/i18n';
import { Language, availableLanguages, defaultLanguage } from '../../utils/LanguageConfig';

import polish from '/assets/icons/poland.svg';
import english from '/assets/icons/united-kingdom.svg';

import { SettingsContext } from '../../context/SettingsContext';

const LANGUAGE_CODE_TO_KEY: {
  [K in Language]: string;
} = {
  'en-GB': "language-switcher.language.english-gb",
  'pl': "language-switcher.language.polish",
}
import styles from "./LanguageSwitcher.module.scss";
interface LanguageSwitcherProps {
  className?: string
}
const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<Language>(defaultLanguage);
  const [showSelect, setShowSelect] = useState(false)
  
  const settingsContext = useContext<any>(SettingsContext);
  const flag: { 'en-GB': string, 'pl': string} = {
    'en-GB': english,
    'pl': polish
  }
  const saveLanguage = async (languageCode: Language) => {
    try {
      localStorage.setItem('languageCode', languageCode);
      
      setSelectedLanguageCode(languageCode);
      i18n.changeLanguage(languageCode);
      settingsContext.language.setState(languageCode)
      setShowSelect(false);
    } catch (err) {
      setSelectedLanguageCode(defaultLanguage);
      i18n.changeLanguage(defaultLanguage);
      settingsContext.language.setState(defaultLanguage)
      setShowSelect(false);
      console.log(err.message)
    }
  }
  useEffect(() => {
    const languageCode: Language = localStorage.getItem('languageCode');
    
    if (languageCode) {
      setSelectedLanguageCode(languageCode);
      i18n.changeLanguage(languageCode);
      settingsContext.language.setState(languageCode)
      setShowSelect(false);
      
    } else {
      setSelectedLanguageCode(defaultLanguage);
      i18n.changeLanguage(defaultLanguage);
      settingsContext.language.setState(defaultLanguage)
      setShowSelect(false);
    }
  }, [settingsContext])
  return (
    <Fragment>
      <label className={clsx(styles.languageSwitcher, className)} >
        <label onClick={() => setShowSelect(!showSelect)}>
          <span>
            <Translate tKey={LANGUAGE_CODE_TO_KEY[selectedLanguageCode]} />
          </span>
          <img src={flag[selectedLanguageCode]} alt="current_flag" />
        </label>
          {
            showSelect && (
              <Fragment>
                <div onClick={() => setShowSelect(false)} className={styles.shadowBox}></div>
                <ul style={{ zIndex: 15 }}>
                    {
                      availableLanguages.filter((element: Language) => element !== selectedLanguageCode).map((languageCode: Language) => {
                        return (
                          <label 
                            key={languageCode}
                            onClick={() => {
                              saveLanguage(languageCode);
                            }}
                          >
                            <span>
                              <Translate tKey={LANGUAGE_CODE_TO_KEY[languageCode]} />
                            </span>
  
                            <img src={flag[languageCode]} alt="flag" />
  
                          </label>
                        );
                      })
                    }
                </ul>
              </Fragment>
            )
          }
      </label>
    </Fragment>
  );
};
export default LanguageSwitcher;
