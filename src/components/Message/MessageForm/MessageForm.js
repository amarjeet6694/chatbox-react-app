import React, { useState } from 'react';
import classes from './MessageForm.module.css';


const MessageForm = props => {

    const [message, setMessage] = useState("");

    const handleChangeHandler = e => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        props.sendMessage(message);
        setMessage("");
    }

    return (
        <form onSubmit={handleFormSubmit} className={classes.messageForm}>
            <input
                disabled={props.disabled}
                onChange={handleChangeHandler}
                placeholder="Type your message and hit ENTER"
                type="text"
                value={message}
            />
        </form>
    )
}

export default MessageForm;