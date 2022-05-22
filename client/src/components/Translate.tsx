import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';

interface TranslateProps {
    tKey: string;
}

export const Translate = ({ tKey }: TranslateProps) => {
    const { t } = useTranslation();

    return <Fragment>{ReactHtmlParser(t(tKey))}</Fragment>
}
