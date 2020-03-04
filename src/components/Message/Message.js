import React from 'react';
import classes from './Message.module.css';

const message = props => (
    <div className={classes.message}>
        <div className={classes.messageUsername}>{props.username}</div>
        <div className={classes.messageText}>{props.text}</div>
    </div>
)

export default message;