import { useCallback, useState } from 'react'
import React from 'react'
import { useSocket } from '../providers/Socket'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Home = () => {
    const navigate = useNavigate();
    const { socket } = useSocket();
    const [email, setEmail] = useState();
    const [roomId, setRoomId] = useState();

    const handleRoomJoined = useCallback(({ roomId }) => {
        navigate(`/room/${roomId}`)
    }, [navigate])

    useEffect(() => {
        socket.on('joined-room', handleRoomJoined);
        return () => {
            socket.off('joined-room', handleRoomJoined);
        }
    }, [handleRoomJoined, socket]);

    const handleJoinRoom = () => {
        socket.emit("join-room", { emailId: email, roomId })
    }

    return (
        <div className='homepage-container'>
            <div className='input-container'>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Enter your email here!' />
                <input value={roomId} onChange={e => setRoomId(e.target.value)} type="text" placeholder='Enter Room code' />
                <button onClick={() => handleJoinRoom()}>Enter Room</button>
            </div>
        </div>
    )
}
