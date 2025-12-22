import React, { Suspense } from "react";
import Loading from '../components/Loading/Loading';
import CVPresentation from "../components/cv/CVPresentation";

const CV = () => {
    return (
        <Suspense fallback={<Loading />}>
            <CVPresentation />
        </Suspense>
    );
}
export default CV;