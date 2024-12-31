import React, { useEffect, useMemo, useState } from 'react';


import { withRouter } from 'react-router-dom';

import { ErrorContext } from './context/ErrorContext';
import { LanguageContext } from './context/LanguageContext';
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
  const [ pageTitle, setPageTitle ] = useState('')
  const [ scrollPosition, setScrollPosition ] = useState<number | null>(null);

  const value = useMemo(() => ({ user, setUser, loadingUser, setLoadingUser }), [user, loadingUser]);

  const languageValue = useMemo(() => ({ languageCode, setLanguageCode }), [languageCode]);
  const errorValue = useMemo(() => ({ errorResponse, setErrorResponse }), [errorResponse]);

  const pageTitleValue = useMemo(() => ({ pageTitle, setPageTitle }), [pageTitle])
  const scrollValue = useMemo(() => ({ scrollPosition, setScrollPosition }), [scrollPosition])

  
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
    <LanguageContext.Provider value={languageValue}>
    <ErrorContext.Provider value={errorValue}>
    <PageTitleContext.Provider value={pageTitleValue}>
    <ScrollContext.Provider value={scrollValue}>
        
        <Layout />

    </ScrollContext.Provider>
    </PageTitleContext.Provider>
    </ErrorContext.Provider>
    </LanguageContext.Provider>
    </UserContext.Provider>
  );
}
export default withRouter(App);