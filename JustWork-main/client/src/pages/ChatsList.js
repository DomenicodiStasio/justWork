import React, { useContext } from 'react';

import GoBack from '../components/GoBack/GoBack';
import Chat from '../components/Chat/Chat';
import { MainCtx } from '../App';
import Loader from '../components/Loader/Loader';

const ChatsList = () => {
  const {
    chatsList,
    chatsLoading,
  } = useContext(MainCtx);


  return (
    <>
     <GoBack />
      <h1 className="page-title">Your Chats</h1>
      {chatsLoading ? (
        <Loader/>
      ) : (
        chatsList?.length === 0 ? (
          <span>No chat started yet! Go in a job application detail page to send a message. Here you'll find the answer!</span>
        ) : (
          chatsList.map((chat) => (
            <Chat
              key={chat.id}
              id={chat.id}
              title={chat.title}
              question={chat.question}
              answer={chat.answer}
            />
          ))
        )
      )}
    </>
  );
};

export default ChatsList;
