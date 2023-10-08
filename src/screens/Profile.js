import auth from '@react-native-firebase/auth';
import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { View } from 'react-native';
import { Appbar, Avatar, Button, Card, Divider, RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { langAction } from '../../store/actions'

function Profile() {

    const dispatch = useDispatch();

    const { loggedInUser } = useSelector((state) => state.loggedInUser);

    const { appLang } = useSelector((state) => state.appLang);

    const { t, i18n } = useTranslation();

    const changeLanguageToHindi = (value) => {
        i18n
            .changeLanguage(value)
            .then(() => {
                dispatch(langAction.setAppLang('hi'));
            }).catch(err => console.log(err));
    };

    const changeLanguageToEnglish = (value) => {
        i18n
            .changeLanguage(value)
            .then(() => {
                dispatch(langAction.setAppLang('en'));
            }).catch(err => console.log(err));
    };

    const logOutUser = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <>
            <Appbar.Header dark style={{ backgroundColor: 'rgb(120, 69, 172)' }}>
                <Appbar.Content title={t("settings")} />
                <Appbar.Action icon={require('../assets/logout.png')} onPress={() => { logOutUser() }} />
            </Appbar.Header>
            <Card style={styles.card}>
                <Card.Content>
                    {/* <Avatar.Icon size={24} icon={require('../assets/arrow_back.png')} /> */}
                    <Text variant="bodyMedium">
                        <Paragraph>{t('try KeepMeWell in your language')}</Paragraph>
                    </Text>
                </Card.Content>
                <Card.Actions >
                    <Button mode='contained-tonal' onPress={() => changeLanguageToEnglish('en')}>English</Button>
                    <Button mode='contained-tonal' onPress={() => changeLanguageToHindi('hi')} >{t('hindi')}</Button>
                    <Button mode='contained-tonal' disabled>{t('odiya')}</Button>
                </Card.Actions>
            </Card>
        </>
    )
}

export default Profile;

const styles = StyleSheet.create({
    card: {
        margin: 8
    },
    row: {
        flexDirection: 'row',
        marginTop: 2,
    },
    column: {
        flexDirection: 'column',
    }
})

{/* <Background>
            <Header>Profile</Header>
            <Paragraph>
                Your amazing app starts here. Open you favorite code editor and start
                editing this project.
            </Paragraph>
        </Background> */}
