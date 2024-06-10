import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import GoBack from '../components/GoBack/GoBack';
import { MainCtx } from '../App';
import Loader from '../components/Loader/Loader';

const ChatElement = (props) => {
    const {
        text,
        onRigth = false,
    } = props;

    return (
        <div className={`chat-element ${onRigth ? "chat-rigth" : ""}`}>
            <div className='arrow'/>
            {text}
        </div>
    )
}

const ChatPage = () => {

    const {
        chatsList,
        chatsLoading,
    } = useContext(MainCtx);

    const { chatIndex } = useParams();
    // //retrieve the specific chat from db
    const foundChat = chatsList.find(chat => chat.id === parseInt(chatIndex)) || {};

    return (
        <>
            <GoBack />
            {chatsLoading ? (
                <Loader/>
            ) : (
                foundChat ? (
                    <>
                        <ChatElement text={foundChat.question} onRigth/>
                        {foundChat.answer && (
                            <ChatElement text={foundChat.answer} />
                        )}
                    </>
                ) : (
                    <span>Sorry, we haven't found the chat!</span>
                )
            )}
        </>
    );


};

export default ChatPage;