import React, { Component } from 'react';

import MessageList from '../../components/Message/MessageList/MessageList';
import MessageForm from '../../components/Message/MessageForm/MessageForm';
import ChatRoomList from '../../components/ChatRoom/ChatRoomList/ChatRoomList';
import NewChatRoomForm from '../../components/ChatRoom/NewChatRoomForm/NewChatRoomForm';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        }
    }

    componentDidMount() {
        this.getAvailableRooms();
    }

    componentDidUpdate() {
        this.getAvailableRooms();
    }

    // Getting available/joinable rooms for current user
    getAvailableRooms = () => {
        this.props.currentUser
            .getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.props.currentUser.rooms
                })
            })
            .catch(error => console.log("Error getting joinable rooms", error));
    }

    // Subscribe to particular room selected by current user
    subscribeToRoom = id => {
        this.setState({ messages: [] });
        this.props.currentUser
            .subscribeToRoom({
                roomId: id,
                hooks: {
                    onMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
            .then(room => {
                this.setState({ roomId: room.id });
                this.getAvailableRooms();
            })
            .catch(error => console.log("Error getting joinable rooms", error));
    }

    // Sending messages to particular room
    sendMessageHandler = text => {
        this.props.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }

    // Creating a new room
    createRoom = name => {
        this.props.currentUser
            .createRoom({ name })
            .then(room => this.subscribeToRoom(room.id))
            .catch(error => console.log("Error creating room", error));
    }

    render() {
        return (
            <div className="app">

                <ChatRoomList
                    roomId={this.state.roomId}
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />

                <MessageList roomId={this.state.roomId} messages={this.state.messages} />

                <MessageForm disabled={!this.state.roomId} sendMessage={this.sendMessageHandler} />

                <NewChatRoomForm createRoom={this.createRoom} />

            </div>
        );
    }
}

export default Layout;