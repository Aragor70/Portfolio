import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';

interface TranslateProps {
    tKey: string;
    isString?: boolean;
}

export const Translate = ({ tKey, isString = false }: TranslateProps): any => {
    const { t } = useTranslation();
    
    if (isString) return t(tKey);

    return <Fragment>{ReactHtmlParser(t(tKey))}</Fragment>
}
