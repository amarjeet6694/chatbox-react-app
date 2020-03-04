import React from 'react';
import classes from './ChatRoomList.module.css';

const chatRoomList = props => {

    const orderedRooms = [...props.rooms].sort();
    return (
        <div className={classes.chatRoomList}>
            <ul>
                <h3>Your rooms:</h3>
                {orderedRooms.map(room => {
                    const listClass = [classes.chatRoom];
                    const isCurrentRoomActive = props.roomId === room.id;
                    const activeClass = isCurrentRoomActive ? classes.activeClass : '';
                    listClass.push(activeClass);
                    return (
                        <li key={room.id} className={listClass.join(' ')}>
                            <a
                                className={isCurrentRoomActive ? classes.disableClass : ''}
                                onClick={() => props.subscribeToRoom(room.id)}
                                href="# ">
                                #{room.name}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default chatRoomList;