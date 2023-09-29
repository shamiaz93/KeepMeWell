import '../../assets/i18n/i18n';
import Paragraph from '../components/Paragraph'
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  var [isIdAuthorized, setIsIdAuthorized] = useState();
  var [refreshHealthData, setRefreshHealthData] = useState();

  // start multi language support code
  const { t, i18n } = useTranslation();

  /*const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        setLanguage(value);
        dispatch(langAction.setAppLang({ "currLang": 'hi' }));
      }).catch(err => console.log(err));
  }; */

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
    unit: 'kg',
    bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  useEffect(() => {
    /* GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      setIsIdAuthorized(authorized);
      console.log("authorized", authorized);
      if (authorized) {
        console.log("inside if");
        // if already authorized, fetch data

      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log('AUTH_SUCCESS');
              setIsIdAuthorized(true);
              // if successfully authorized, fetch data
            } else {
              console.log('AUTH_DENIED ' + authResult.message);
            }
          })
          .catch(() => {
            dispatch('AUTH_ERROR');
          });
      }
    }); */

  }, []);

  useEffect(() => {
    if (isIdAuthorized) {
      let fetchStepsData = async opt => {
        console.log("here");
        console.log("opt - ", opt);
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

      let fetchCaloriesData = async opt => {
        const res = await GoogleFit.getDailyCalorieSamples(opt);
        let data = res.reverse();
        if (data.length === 0) {
          setCalories('Not Found');
        } else {
          setCalories(Math.round(data[0].calorie * -1 * 100) / 100);
        }
      };

      let fetchWeightData = async (opt) => {
        const res = await GoogleFit.getWeightSamples(opt);
        let data = res.reverse();
        setWeight(Math.round(data[0].value * 100) / 100);
      };

      let fetchSleepData = async opt => {
        var midnight = new Date();
        midnight.setHours(0, 0, 0, 0);
        let sleepTotal = 0;
        const res = await GoogleFit.getSleepSamples(opt);

        for (var i = 0; i < res.length; i++) {
          if (new Date(res[i].endDate) > Date.parse(midnight)) {
            if (new Date(res[i].startDate) > Date.parse(midnight)) {
              sleepTotal +=
                Date.parse(res[i].endDate) - Date.parse(res[i].startDate);
            } else {
              sleepTotal += Date.parse(res[i].endDate) - Date.parse(midnight);
            }
            if (
              i + 1 < res.length &&
              Date.parse(res[i].startDate) < Date.parse(res[i + 1].endDate)
            ) {
              sleepTotal -=
                Date.parse(res[i + 1].endDate) - Date.parse(res[i].startDate);
            }
          }
        }
        setSleep(Math.round((sleepTotal / (1000 * 60 * 60)) * 100) / 100);
      };

      /* fetchSleepData(opt).catch(console.error);
      fetchCaloriesData(opt).catch(console.error);
      fetchStepsData(opt).catch(console.error);
      fetchWeightData(opt).catch(console.error); */
    }
  }, [isIdAuthorized, refreshHealthData]);

  function fetchAllHealthData() {
    setRefreshHealthData(true);
  }

  // end smart watch integration code

  return (
    <>
      <Appbar.Header dark style={{ backgroundColor: 'rgb(120, 69, 172)' }}>
        <Appbar.Content title="Dashboard" />
        <Appbar.Action icon={require('../assets/refreshing.png')} onPress={() => { fetchAllHealthData() }} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">
            <Paragraph>{t('this line is translated')}</Paragraph>
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">
            <Paragraph>{t('this line is translated')}</Paragraph>
          </Text>
        </Card.Content>
        {/* <Card.Actions>
          <Button onPress={() => changeLanguage('en')}>English</Button>
          <Button onPress={() => changeLanguage('hi')}>Hindi</Button>
        </Card.Actions> */}
      </Card>
      <View style={[{ flex: 1 }]}>
        <View style={styles.row}>
          <View style={[styles.row_2, styles.containerBlue]}>
            <Text style={styles.textContainerBlue}>Step Count - Today</Text>
          </View>
          <View style={[styles.row_2, styles.containerWhite]}>
            <Text style={styles.textContainerWhite}>{dailySteps}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.row_2, styles.containerBlue]}>
            <Text style={styles.textContainerBlue}>Heart Rate</Text>
          </View>
          <View style={[styles.row_2, styles.containerWhite]}>
            <Text style={styles.textContainerWhite}>{heartRate}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.row_2, styles.containerBlue]}>
            <Text style={styles.textContainerBlue}>BP- Systolic </Text>
          </View>
          <View style={[styles.row_2, styles.containerWhite]}>
            <Text style={styles.textContainerWhite}>
              {bloodPressure.systolic}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.row_2, styles.containerBlue]}>
            <Text style={styles.textContainerBlue}>BP - Diastolic </Text>
          </View>
          <View style={[styles.row_2, styles.containerWhite]}>
            <Text style={styles.textContainerWhite}>
              {bloodPressure.diastolic}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.row_2, styles.containerBlue]}>
            <Text style={styles.textContainerBlue}>Calories</Text>
          </View>
          <View style={[styles.row_2, styles.containerWhite]}>
            <Text style={styles.textContainerWhite}>{calories}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.row_2, styles.containerBlue]}>
            <Text style={styles.textContainerBlue}>Sleep - Today</Text>
          </View>
          <View style={[styles.row_2, styles.containerWhite]}>
            <Text style={styles.textContainerWhite}>{sleep} hours</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.row_2, styles.containerBlue]}>
            <Text style={styles.textContainerBlue}>Weight</Text>
          </View>
          <View style={[styles.row_2, styles.containerWhite]}>
            <Text style={styles.textContainerWhite}>{weight} Kg</Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  card: {
    margin: 8
  },
  row: {
    flexDirection: 'row',
    height: 30,
    margin: 10,
    marginTop: 12,
  },
  rowBlue: {
    padding: 2,
  },
  row_1: {
    flex: 1,
  },
  row_2: {
    flex: 2,
  },
  containerBlue: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#187FA1',
    color: 'white',
  },
  containerWhite: {
    marginTop: 10,
    height: 50,
    backgroundColor: 'white',
    color: '#187FA1',
  },
  textContainerBlue: {
    paddingTop: 15,
    paddingLeft: 15,
    color: 'white',
  },
  textContainerWhite: {
    paddingTop: 15,
    paddingLeft: 70,
    color: '#187FA1',
  },
});

