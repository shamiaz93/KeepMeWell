import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
//import Button from '../components/Button'
import { View } from 'react-native';
import { Appbar, Button, Card, Divider, RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

function Profile() {

    const { t, i18n } = useTranslation();

    const changeLanguageToHindi = (value) => {
        i18n
            .changeLanguage(value)
            .then(() => {
                dispatch(langAction.setAppLang({ "currLang": 'hi' }));
            }).catch(err => console.log(err));
    };

    const changeLanguageToEnglish = (value) => {
        i18n
            .changeLanguage(value)
            .then(() => {
                dispatch(langAction.setAppLang({ "currLang": 'en' }));
            }).catch(err => console.log(err));
    };

    return (
        <>
            <Appbar.Header dark style={{ backgroundColor: 'rgb(120, 69, 172)' }}>
                <Appbar.Content title="Settings" />
            </Appbar.Header>
            <Card style={styles.card}>
                <Card.Content>
                    {/* <Text variant="titleLarge">App language</Text> */}
                    <Text variant="bodyMedium">
                        <Paragraph>{t('please select language')}</Paragraph>
                    </Text>
                </Card.Content>
                <Card.Actions >
                    <Button mode='contained-tonal' onPress={() => changeLanguageToEnglish('en')}>English</Button>
                    <Button mode='contained-tonal' onPress={() => changeLanguageToHindi('hi')} >{t('hindi')}</Button>
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
