import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import TextInput from '../components/TextInput'
import { View } from 'react-native';
import { Appbar, Avatar, Button, Card, Divider, RadioButton, Modal, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { langAction } from '../../store/actions'
import firestore from '@react-native-firebase/firestore';

function Users() {

    const dispatch = useDispatch();

    const { loggedInUser } = useSelector((state) => state.loggedInUser);

    const { appLang } = useSelector((state) => state.appLang);

    const { t, i18n } = useTranslation();

    const [allUsers, setAllUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [isDataAdded, setIsDataAdded] = useState(false);

    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userNotes, setUserNotes] = useState('');

    const openModal = () => setShowModal(true);
    const hideModal = () => setShowModal(false);

    const addUserDetails = () => {
        hideModal();
        firestore()
            .collection('secondaryUsers')
            .add({
                userName,
                userAge,
                userNotes
            })
            .then(() => {
                console.log('User added!');
                setIsDataAdded(true)
            });
    }

    useEffect(() => {
        async function fetchAllUsers() {
            const snapshot = await firestore().collection("secondaryUsers").get();
            setAllUsers(snapshot.docs.map((doc) => doc.data()));
        }
        fetchAllUsers();

        /* function onResult(QuerySnapshot) {
            setAllUsers(QuerySnapshot.docs.map((doc) => doc.data()));
        }

        function onError(error) {
            console.error(error);
        }

        firestore().collection('secondaryUsers').onSnapshot(onResult, onError); */

    }, [isDataAdded]);

    return (
        <>
            <Appbar.Header dark style={{ backgroundColor: 'rgb(120, 69, 172)' }}>
                <Appbar.Content title={t("users")} />
                <Appbar.Action icon={require('../assets/add-user.png')} onPress={() => { openModal() }} />
            </Appbar.Header>
            {
                allUsers && allUsers.length > 0 ?
                    <>
                        {
                            allUsers.map((user, index) => {
                                return (
                                    <Card style={styles.card} key={index}>
                                        <Card.Content key={index}>
                                            <Text variant="bodyMedium" key={index}>
                                                <Paragraph>Name: {user.userName}{"\n"}</Paragraph>
                                                <Paragraph>Age: {user.userAge}{"\n"}</Paragraph>
                                                <Paragraph>Details: {user.userNotes}{"\n"}</Paragraph>
                                            </Text>
                                        </Card.Content>
                                    </Card>
                                )
                            })
                        }
                    </>
                    : <Paragraph>No Users are added yet</Paragraph>
            }
            <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                <Header>Add User</Header>
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                />
                <TextInput
                    label="Age"
                    returnKeyType="next"
                    value={userAge}
                    onChangeText={(text) => setUserAge(text)}
                />
                <TextInput
                    label="Notes"
                    returnKeyType="done"
                    value={userNotes}
                    onChangeText={(text) => setUserNotes(text)}
                />
                <View style={styles.row}>
                    <Button
                        mode="contained"
                        onPress={addUserDetails}
                        style={{ marginTop: 24 }}
                    >
                        Add User Details
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={hideModal}
                        style={{ marginTop: 24 }}
                    >
                        Dismiss Form
                    </Button>
                </View>
            </Modal>
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
        justifyContent: 'space-around'
    },
    column: {
        flexDirection: 'column',
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: 20
    }
})
