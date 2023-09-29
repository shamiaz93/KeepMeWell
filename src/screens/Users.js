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

function Users() {

    const dispatch = useDispatch();

    const { loggedInUser } = useSelector((state) => state.loggedInUser);

    const { appLang } = useSelector((state) => state.appLang);

    const { t, i18n } = useTranslation();

    const addUserDetails = () => {

    }

    return (
        <>
            <Appbar.Header dark style={{ backgroundColor: 'rgb(120, 69, 172)' }}>
                <Appbar.Content title={t("users")} />
                <Appbar.Action icon={require('../assets/add-user.png')} onPress={() => { addUserDetails() }} />
            </Appbar.Header>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="bodyMedium">
                        <Paragraph>{t('please select preferred language')}</Paragraph>
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

export default Users;

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
