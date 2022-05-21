import React, { Fragment, useState } from 'react';
import { Translate } from './Translate';

import i18n from '../utils/i18n';
import { Language, availableLanguages, defaultLanguage } from './LanguageConfig';

/* import {ReactComponent as polish} from '../style/icons/poland.svg';
import {ReactComponent as english} from '../style/icons/united-kingdom.svg'; */

import polish from '../style/icons/poland.svg';
import english from '../style/icons/united-kingdom.svg';

const LANGUAGE_CODE_TO_KEY: {
  [K in Language]: string;
} = {
  'en-GB': "language-switcher.language.english-gb",
  'pl': "language-switcher.language.polish",
}

const LanguageSwitcher = () => {
  
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<Language>(defaultLanguage);
  const [showSelect, setShowSelect] = useState(false)

  const flag: any = {
    'en-GB': english,
    'pl': polish
  }

  return (
    <Fragment>
      <label className="language-switcher">

        <label onClick={() => setShowSelect(!showSelect)}>
          
          <Translate tKey={LANGUAGE_CODE_TO_KEY[selectedLanguageCode]} />

          <img src={flag[selectedLanguageCode]} alt="current_flag" />

        </label>

          {
            showSelect && 
              <Fragment>
                <div onClick={() => setShowSelect(false)} className="shadow-box"></div>
                <ul>
                    {availableLanguages.filter((element: any) => element !== selectedLanguageCode).map((languageCode) => {
                      return (
                        <label 
                          key={languageCode}
                          onClick={() => {
                            setSelectedLanguageCode(languageCode);
                            i18n.changeLanguage(languageCode);
                            setShowSelect(false);
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
