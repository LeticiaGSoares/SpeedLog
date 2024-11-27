import React from 'react';
import { useMessage } from './MessageContext';

const MessageDisplay = () => {
    const { message } = useMessage();

    if (!message) return null;

    return (
        <div className="alert">
            {message}
        </div>
    );
};

export default MessageDisplay;
