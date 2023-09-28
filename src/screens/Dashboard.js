import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
//import Button from '../components/Button'
import { Appbar, Avatar, Button, Card, Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import GoogleFit, { Scopes } from 'react-native-google-fit';

import { useDispatch, useSelector } from 'react-redux';
import { langAction } from '../../store/actions';


//const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
    Scopes.FITNESS_BLOOD_PRESSURE_READ,
    Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
    Scopes.FITNESS_BLOOD_GLUCOSE_READ,
    Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
    Scopes.FITNESS_NUTRITION_WRITE,
    Scopes.FITNESS_SLEEP_READ,
  ],
};

function Dashboard() {

  const dispatch = useDispatch();
  const { appLang } = useSelector((state) => state.appLang);

  // start multi language support code
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        setLanguage(value);
        dispatch(langAction.setAppLang({ "currLang": 'hi' }));
      }).catch(err => console.log(err));
  };

  // end multi language support code

  // start smart watch integration code

  var [dailySteps, setdailySteps] = useState(0);
  var [heartRate, setHeartRate] = useState(0);
  var [calories, setCalories] = useState(0);
  var [hydration, setHydration] = useState(0);
  var [sleep, setSleep] = useState(0);
  var [weight, setWeight] = useState(0);
  var [bloodPressure, setBloodPressure] = useState({});
  var [loading, setLoading] = useState(true);

  var today = new Date();
  var lastWeekDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 8,
  );
  const opt = {
    startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
    endDate: today.toISOString(), // required ISO8601Timestamp
    bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  useEffect(() => {

    //dispatch(langAction.setAppLang({ "currLang": 'hi' }));

    //i18n.changeLanguage(appLang.currLang);

    /*GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      console.log("authorized", authorized);
      if (authorized) {
        console.log("inside if");
        // if already authorized, fetch data
        let fetchStepsData = async opt => {
          console.log("here");
          const res = await GoogleFit.getDailyStepCountSamples(opt);
          console.log("res", res);
          if (res.length !== 0) {
            for (var i = 0; i < res.length; i++) {
              if (res[i].source === 'com.google.android.gms:estimated_steps') {
                let data = res[i].steps.reverse();
                dailyStepCount = res[i].steps;
                setdailySteps(data[0].value);
              }
            }
          } else {
            console.log('Not Found');
          }
        };

      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            console.log(authResult)
            if (authResult.success) {
              console.log('AUTH_SUCCESS');

              // if successfully authorized, fetch data
            } else {
              console.log('AUTH_DENIED ' + authResult.message);
            }
          })
          .catch(() => {
            dispatch('AUTH_ERROR');
          });
      }
    });*/
  }, []);

  // end smart watch integration code

  return (
    <>
      <Appbar.Header dark style={{ backgroundColor: 'rgb(120, 69, 172)' }}>
        <Appbar.Content title="Dashboard" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">
            <Paragraph>{t('this line is translated')}</Paragraph>
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => changeLanguage('en')}>English</Button>
          <Button onPress={() => changeLanguage('hi')}>Hindi</Button>
          {/* <ButtonPaper onPress={() => changeLanguage('en')} title='English' />
          <ButtonPaper onPress={() => changeLanguage('hi')} title='Hindi' /> */}
        </Card.Actions>
      </Card>
    </>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  card: {
    margin: 8
  },
})

