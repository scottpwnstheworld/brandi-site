import React, { useState } from 'react'
import axios from 'axios';

export const SingleUploader = () => {
    const [input, setInput] = useState('');

    const inputChange = (event) => {
        setInput(event.target.value);
    }

    const doSubmit = async () => {
        console.log('submitting: ', input);
        let response;
        try {
            response = JSON.parse(input);
            console.log('response ', response)
        } catch (e) {
            console.log('bad json');
            return
        }

        
        const result = await axios.post('http://localhost:5050/missing', response);
    }

    return <div className='uploader'>
        <textarea onChange={inputChange} />
        <button onClick={doSubmit}>submit</button>
    </div>
}