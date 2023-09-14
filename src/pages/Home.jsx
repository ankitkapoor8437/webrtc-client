import React from 'react'

export const Home = () => {
    return (
        <div className='homepage-container'>
            <div className='input-container'>
                <input type="email" placeholder='Enter your email here!' />
                <input type="text" placeholder='Enter Room code' />
                <button>Enter Room</button>
            </div>
        </div>
    )
}
