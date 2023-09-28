import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { View, Text, Pressable } from 'react-native'

export default function StartScreen({ navigation }) {

  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  return (
    <Background>
      <Logo />
      <Header>KeepMeWell</Header>
      <Paragraph>
        AI Based Wellness App
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>

      {/* <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
          {t('hello')}{' '}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
          {t('this line is translated')}
        </Text>
        <Pressable
          onPress={() => changeLanguage('en')}
          style={{
            backgroundColor:
              currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
            padding: 20,
          }}>
          <Text>Select English</Text>
        </Pressable>
        <Pressable
          onPress={() => changeLanguage('hi')}
          style={{
            backgroundColor:
              currentLanguage === 'hi' ? '#33A850' : '#d3d3d3',
            padding: 20,
          }}>
          <Text>हिंदी का चयन करें</Text>
        </Pressable>
      </View> */}
    </Background>
  )
}
