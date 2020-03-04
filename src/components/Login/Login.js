import React, { useState } from 'react';
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

import { tokenUrl, instanceLocator } from "../../config";

import './Login.css';

const Login = props => {

    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);

    const chatkitAPIconnection = async username => {
        const chatManager = new ChatManager({
            instanceLocator,
            userId: username,
            tokenProvider: new TokenProvider({ url: tokenUrl })
        });

        // Connecting to Chatkit API
        return await chatManager.connect();
    }

    const inputChangehandler = e => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const result = await chatkitAPIconnection(username);
            props.onSubmit(result);

        } catch (error) {
            setError(true);
        }

        setUsername('');

    }

    let errorMessage = '';
    if (error) {
        errorMessage = <p className="error-content">No user exists with this username. Try another name...
            </p>
    }

    return (
        <div class="login" align="center">
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card">

                        <div className="d-flex justify-content-center text">
                            <p className="header"> Sign in to your workspace </p>
                        </div>
                        <div className="d-flex justify-content-center text">
                            <p className="content"><strong>Enter your username.</strong></p>
                        </div>

                        {errorMessage}

                        <div className="d-flex justify-content-center form_container">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" name="username"
                                        onChange={inputChangehandler}
                                        className="form-control input_user"
                                        value={username} placeholder="Username" required />
                                </div>
                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <button type="submit" name="button" className="btn login_btn">Continue -></button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;