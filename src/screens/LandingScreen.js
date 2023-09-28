import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { BottomNavigation, PaperProvider, Text } from 'react-native-paper';
import Dashboard from './Dashboard';
import Notifications from './Notifications'
import Profile from './Profile'
import Users from './Users'
import Icon from 'react-native-vector-icons/FontAwesome';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//(props)=> <MaterialCommunityIcons {...props} name='queue-music' size={30}/>
export default function LandingScreen({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Dashboard', focusedIcon: 'view-dashboard', unfocusedIcon: 'view-dashboard-outline' },
        { key: 'users', title: 'Users', focusedIcon: 'account-box-multiple', unfocusedIcon: 'account-box-multiple-outline' },
        { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        dashboard: Dashboard,
        users: Users,
        notifications: Notifications,
        profile: Profile,
    });

    return (
        /* <Background>
            <Logo />
            <Header>Let’s start</Header>
            <Paragraph>
                Your amazing app starts here. Open you favorite code editor and start
                editing this project.
            </Paragraph>
            <Button
                mode="outlined"
                onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'StartScreen' }],
                    })
                }
            >
                Logout
            </Button>
        </Background> */
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}

        />
    )
}
