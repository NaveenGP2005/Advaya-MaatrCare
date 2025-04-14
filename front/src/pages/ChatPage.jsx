import React, { useEffect, useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatBoxOffline from '../components/ChatBoxOffline';
import BackButton from '../components/BackButton';

const ChatPage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>
        {isOnline ? <ChatBox /> : <ChatBoxOffline />}
      </div>
    </div>
  );
};

export default ChatPage;
