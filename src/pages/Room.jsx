import React from 'react'
import { useSocket } from '../providers/Socket'
import { useEffect, useCallback } from 'react';
import { usePeer } from '../providers/Peer';


const RoomPage = () => {
    const { socket } = useSocket();
    const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer();

    const handleNewUserJoined = useCallback(async (data) => {
        const { emailId } = data;
        console.log("New user joined", emailId);
        const offer = await createOffer();
        socket.emit('call-user', { emailId, offer });
    }, [createOffer, socket]);


    const handleIncomingCall = useCallback(async (data) => {
        const { from, offer } = data;
        console.log("Incoming Call", from, offer)
        const ans = await createAnswer(offer);
        socket.emit('call-accepted', { emailId: from, ans });
    }, [createAnswer, socket]);

    const handleCallAccepted = useCallback(async(data) => {
        const { ans } = data;
        await setRemoteAnswer(ans)

    }, [setRemoteAnswer]);

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined);
        socket.on('incoming-call', handleIncomingCall);
        socket.on('call-accepted', handleCallAccepted);
        return () => {
            socket.off("user-joined", handleNewUserJoined);
            socket.off('incoming-call', handleIncomingCall);
            socket.off('call-accepted', handleCallAccepted);

        }
    }, [handleNewUserJoined, handleCallAccepted,handleIncomingCall, socket]);

    return (
        <div>Room</div>
    )
}

export default RoomPage