import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import axios from 'axios';

function Notifications() {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

    useEffect(() => {

        const fetchOpenApiRes = async () => {
            const prompt = "I'm overweight";
            const response = await axios.post(apiUrl, {
                prompt: prompt,
                max_tokens: 1024,
                temperature: 0.5
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            const data = response.data.choices[0].text;
            console.log(data)
        }

        fetchOpenApiRes();

    }, []);

    return (
        <Background>
            <Header>Notifications</Header>
            <Paragraph>
                Page Content
            </Paragraph>
        </Background>
    )
}

export default Notifications;
