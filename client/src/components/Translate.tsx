import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslateProps {
    tKey: string;
}

export const Translate = ({ tKey }: TranslateProps) => {
    const { t } = useTranslation();

    return <Fragment>{t(tKey)}</Fragment>
}
