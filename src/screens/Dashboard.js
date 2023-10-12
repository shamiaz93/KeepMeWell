import '../../assets/i18n/i18n';
import Paragraph from '../components/Paragraph'
import { useTranslation } from 'react-i18next';
import { Appbar, Card, Text } from 'react-native-paper';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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

  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

  const dispatch = useDispatch();
  const { appLang } = useSelector((state) => state.appLang);

  var [isIdAuthorized, setIsIdAuthorized] = useState();
  var [refreshHealthData, setRefreshHealthData] = useState();

  // start multi language support code
  const { t, i18n } = useTranslation();
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
  var [stepsTodayCounter, setStepsTodayCounter] = useState(1);
  const [suggestions, setSuggestions] = useState();

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
    const propmtReq = 'Daily fitness advice for me covering just 3000 steps today'

    if (propmtReq !== '') {
      const getApiRes = async () => {
        const response = await axios.post(apiUrl, {
          prompt: propmtReq,
          max_tokens: 1024,
          temperature: 0.5
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });
        const data = (response.data.choices[0].text);
        console.log(response.data.choices[0].text)
        setSuggestions(data.toString().replace(/(\r\n|\n|\r)/gm, ""));
      }
      getApiRes();
    }

  }, [dailySteps]);

  useEffect(() => {
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      setIsIdAuthorized(authorized);
      console.log("authorized", authorized);
      if (authorized) {
        setIsIdAuthorized(true);
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
    });

  }, []);

  useEffect(() => {
    if (isIdAuthorized) {
      let fetchStepsData = async opt => {
        const res = await GoogleFit.getDailyStepCountSamples(opt);
        if (res.length !== 0) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].source === 'com.google.android.gms:estimated_steps') {
              let data = res[i].steps.reverse();
              dailyStepCount = res[i].steps;
              if (data[0] && data[0].value) {
                setdailySteps(data[0].value);
              } else {
                console.log('Steps Data Not Found');
              }
            }
          }
        } else {
          console.log('Steps Data Not Found');
        }
      };

      let fetchCaloriesData = async opt => {
        const res = await GoogleFit.getDailyCalorieSamples(opt);
        let data = res.reverse();
        if (data.length === 0) {
          setCalories('Not Found');
        } else {
          console.log(data);
          setCalories(Math.round(data[0].calorie * -1 * 100) / 100);
        }
      };

      let fetchWeightData = async (opt) => {
        const res = await GoogleFit.getWeightSamples(opt);
        let data = res.reverse();
        if (data[0] && data[0].value) {
          setWeight(Math.round(data[0].value * 100) / 100);
        }
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

      fetchSleepData(opt).catch(console.error);
      fetchCaloriesData(opt).catch(console.error);
      fetchStepsData(opt).catch(console.error);
      fetchWeightData(opt).catch(console.error);
    }
  }, [isIdAuthorized, refreshHealthData]);

  useEffect(() => {
    const getApiRes = async () => {
      const response = await axios.post(apiUrl, {
        prompt: userQuery,
        max_tokens: 1024,
        temperature: 0.5
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      const data = (response.data.choices[0].text);
    }
  }, [])

  /* useEffect(() => {
    var interval = setInterval(update, 10);

    function update() {
      setStepsTodayCounter(stepsTodayCounter + 50);
      if (stepsTodayCounter <= dailySteps) clearInterval(interval);
    }
  }, [stepsTodayCounter]); */

  function fetchAllHealthData() {
    setRefreshHealthData(true);
  }

  // end smart watch integration code

  return (
    <>
      <Appbar.Header dark style={{ backgroundColor: 'rgb(120, 69, 172)' }}>
        <Appbar.Content title={t("dashboard")} />
        <Appbar.Action icon={require('../assets/refreshing.png')} onPress={() => { fetchAllHealthData() }} />
      </Appbar.Header>
      <Card style={styles.stepsCard}>
        <Card.Content style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/walk.gif')}
            style={{
              width: 100,
              height: 100
            }}
          />
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>
            {dailySteps}
          </Text>
          {/* <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 12 }}>Cover {(10000 - dailySteps)} more steps to complete daily goal</Text>
            <Text>{suggestions} </Text> 
          </View> */}
        </Card.Content>
      </Card>
      <View style={{ flexDirection: 'row' }}>
        <Card style={styles.twinCard}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/sleep.gif')}
              style={{
                width: 100,
                height: 100
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ alignItems: 'center' }}>You have slept </Text>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {sleep}
              </Text>
              <Text> hours. </Text>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.twinCard}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/calories.gif')}
              style={{
                width: 100,
                height: 100
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {calories}
              </Text>
              <Text> kcal burned so far! </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
      <Card style={styles.weightCard}>
        <Card.Content style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/weight-scale.gif')}
            style={{
              width: 100,
              height: 100
            }}
          />
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>
            {weight}
          </Text>
          {/* <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 12 }}>Cover {(10000 - dailySteps)} more steps to complete daily goal</Text>
            <Text>{suggestions} </Text>
          </View> */}
        </Card.Content>
      </Card>
      <Card style={styles.suggestionsCard}>
        <Card.Content>
          <ScrollView>
            <Text>{suggestions} </Text>
          </ScrollView>
        </Card.Content>
      </Card>
    </>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  card: {
    margin: 8
  },
  stepsCard: {
    margin: 8,
    height: 160,
    backgroundColor: 'white'
  },
  suggestionsCard: {
    margin: 8,
    height: 150,
    backgroundColor: 'white'
  },
  weightCard: {
    margin: 8,
    height: 160,
    backgroundColor: 'white'
  },
  stepsText: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'flex-end'
  },
  stepsImg: {
    width: 80,
    height: 80,
    justifyContent: 'flex-start'
  },
  twinCard: {
    margin: 8,
    height: 150,
    width: 180,
    backgroundColor: 'white'
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

