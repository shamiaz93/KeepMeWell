import React, { useEffect, useRef, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import axios from 'axios';
import { Appbar, Card, Text, } from 'react-native-paper'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Image, View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { theme } from '../core/theme'
import { useDispatch, useSelector } from 'react-redux'

function Notifications() {
    const { loggedInUser } = useSelector((state) => state.loggedInUser);
    const scrollViewRef = useRef();
    const [userQuery, setUserQuery] = useState('');
    const [messages, setMessages] = useState([{ "msg": "Hey, Cariene here. How may I help you?", "name": "Carine" }]);

    const apiKey = '';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

    const fetchOpenApiRes = async () => {
        //loggedInUser
        const newMessage = {
            name: 'Shamia',
            msg: userQuery
        }
        const updatedMessages = [...messages, newMessage];

        setMessages(updatedMessages);
    }
    console.log(messages);

    useEffect(() => {

        if (userQuery !== '') {
            setUserQuery('');
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

                const newResponse = {
                    name: 'Carine',
                    msg: data.toString().replace(/(\r\n|\n|\r)/gm, "")
                }
                console.log(messages);
                const updatedResponses = [...messages, newResponse];
                setMessages(updatedResponses);
            }
            console.log('kkkkkkk');

            getApiRes();
        }

    }, [messages]);


    return (
        <>
            <Appbar.Header dark style={{ backgroundColor: 'rgb(120, 69, 172)' }}>
                <Appbar.Content title={"Query"} />
            </Appbar.Header>
            <View style={styles.parentContainer}>
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    {
                        messages && messages.length > 0 &&
                        <>
                            {
                                messages.map((message, index) => {
                                    return (
                                        <Card style={[styles.card, message.name == 'Carine' ? styles.cardBot : styles.cardUser]} key={index}>
                                            <Card.Content key={index}>
                                                <Text variant="titleLarge">{message.name}:</Text>
                                                <Text variant="bodyMedium" key={index}>{message.msg}</Text>
                                            </Card.Content>
                                        </Card>
                                    )
                                })
                            }
                        </>
                    }
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <View style={{ flex: 4 }}>
                        <TextInput
                            value={userQuery}
                            onChangeText={(text) => { setUserQuery(text) }}
                            style={{ backgroundColor: 'transparent', color: 'black' }}
                            onSubmitEditing={() => { fetchOpenApiRes() }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button onPress={() => fetchOpenApiRes()} style={{ width: 50, height: 50 }}>
                            <Image source={require('../assets/paper-plane.png')} style={{ width: 35, height: 35 }} />
                        </Button>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Notifications;


const styles = StyleSheet.create({
    card: {
        margin: 8
    },
    cardBot: {
        backgroundColor: 'rgb(236, 224, 249)',
    },
    cardUser: {
        backgroundColor: 'rgb(224, 238, 249)',
    },
    bottomContainer: {
        flexDirection: 'row',
        height: 50,
        width: window.width,
        margin: 8,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    parentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }
})
