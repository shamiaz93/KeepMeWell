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
        { key: 'dashboard', title: 'Dashboard', focusedIcon: require('../assets/dashboard-focused.png'), unfocusedIcon: require('../assets/dashboard.png') },
        { key: 'users', title: 'Users', focusedIcon: require('../assets/group-focused.png'), unfocusedIcon: require('../assets/group.png') },
        { key: 'notifications', title: 'Query', focusedIcon: require('../assets/question-focused.png'), unfocusedIcon: require('../assets/question.png') },
        { key: 'profile', title: 'Profile', focusedIcon: require('../assets/settings-focused.png'), unfocusedIcon: require('../assets/setting.png') },
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
