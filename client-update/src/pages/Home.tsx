import React, { Suspense } from 'react';
import IndexPresentation from '../components/index/IndexPresentation/IndexPresentation';
import Loading from '../components/Loading/Loading';
const Home = () => {
    
    return (
        <Suspense fallback={<Loading />}>
            <IndexPresentation  />
        </Suspense>
    );
}
export default Home;