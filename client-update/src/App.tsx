import React, { useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { ErrorContext } from './context/ErrorContext';
import { SettingsContext } from './context/SettingsContext';
import { UserContext } from './context/UserContext';
import { loadUser } from './actions/auth';
import { Language } from './utils/constant';
import Layout from './Layout';
import { PageTitleContext } from './context/PageTitleContext';
import { ScrollContext } from './context/ScrollContext';

const App = () => {
  const [ user, setUser ] = useState(null);
  const [ loadingUser, setLoadingUser ] = useState(false);
  const [ errorResponse, setErrorResponse ] = useState('');
  const [ languageCode, setLanguageCode ] = useState(Language.ENGLISH);
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ pageTitle, setPageTitle ] = useState('');
  const [ scrollPosition, setScrollPosition ] = useState<number | null>(null);

  const settings = {
    language: { state: languageCode, setState: setLanguageCode },
    menu: { state: isMenuOpen, setState: setIsMenuOpen }
  }

  const value = useMemo(() => ({ user, setUser, loadingUser, setLoadingUser }), [user, loadingUser]);
  const settingsValue = useMemo(() => (settings), [languageCode, isMenuOpen]);
  const errorValue = useMemo(() => ({ errorResponse, setErrorResponse }), [errorResponse]);
  const pageTitleValue = useMemo(() => ({ pageTitle, setPageTitle }), [pageTitle]);
  const scrollValue = useMemo(() => ({ scrollPosition, setScrollPosition }), [scrollPosition]);
  
  const refreshUser = async () => {
  
    setLoadingUser(true);
    const res = await loadUser()
    if (typeof res === 'string') {
                
      setLoadingUser(false)
      return setErrorResponse(res)
      
  }
    setErrorResponse('')
    setUser(res)
    setLoadingUser(false)
  }
  
  useEffect(() => {
      
    refreshUser()
  }, [])

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          window.removeEventListener('scroll', handleScroll);
          setScrollPosition(null);
      };
  }, []);

  return (
    <UserContext.Provider value={value}>
    <SettingsContext.Provider value={settingsValue}>
    <ErrorContext.Provider value={errorValue}>
    <PageTitleContext.Provider value={pageTitleValue}>
    <ScrollContext.Provider value={scrollValue}>
        
        <Layout />
    </ScrollContext.Provider>
    </PageTitleContext.Provider>
    </ErrorContext.Provider>
    </SettingsContext.Provider>
    </UserContext.Provider>
  );
}
export default withRouter(App);