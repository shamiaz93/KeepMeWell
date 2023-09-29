import { BottomNavigation } from 'react-native-paper';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Notifications from './Notifications';
import React from 'react';
import Users from './Users';
import { useSelector } from 'react-redux';

export default function LandingScreen() {
    const { loggedInUser } = useSelector((state) => state.loggedInUser);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Dashboard', focusedIcon: require('../assets/information-management.png'), unfocusedIcon: require('../assets/arrow_back.png') },
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
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}

        />
    )
}
