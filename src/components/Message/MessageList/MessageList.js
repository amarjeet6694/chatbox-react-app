import React, { useEffect, useRef } from 'react';
import classes from './MessageList.module.css';

import Message from '../Message';

const MessageList = props => {

    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (props.roomId) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [props.roomId, props.messages]);

    const messageData = props.messages.map((data, index) =>
        <Message key={index} username={data.senderId} text={data.text} />
    );

    if (!props.roomId) {
        return (
            <div className={classes.messageList}>
                <div className={classes.joinRoom}>
                    &larr; Join a room!
                </div>
            </div>
        )
    }

    return (
        <div className={classes.messageList}>
            {messageData}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default MessageList;