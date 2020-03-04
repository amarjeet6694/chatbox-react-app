import React, { useState } from 'react';
import classes from './NewChatRoomForm.module.css';


const NewChatRoomForm = props => {

    const [roomName, setRoomName] = useState("");

    const handleChange = e => {
        e.preventDefault();
        setRoomName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.createRoom(roomName);
        setRoomName("");
    }

    return (
        <div className={classes.chatRoomForm}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Create a room"
                    onChange={handleChange}
                    value={roomName}
                    required />
                <button id="create-room-btn" type="submit">+</button>
            </form>
        </div>
    )
}

export default NewChatRoomForm