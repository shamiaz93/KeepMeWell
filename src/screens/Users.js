import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { useSelector } from 'react-redux';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

export default function Users() {
    const { appLang } = useSelector((state) => state.appLang);
    const { t, i18n } = useTranslation();

    console.log(appLang.currLang);

    return (
        <Background>
            <Header>Users</Header>
            <Paragraph>{t('this line is translated')}</Paragraph>
            <Paragraph>
                Page Content
            </Paragraph>
        </Background>
    )
}
