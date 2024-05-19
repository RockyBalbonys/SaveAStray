import { createContext, useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [contactId, setContactId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/fetchContacts/${user}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "8888",
            },
            params: { user },
          }
        );
        const { messages } = response.data;
        const mappedMessages = messages.map((message) => ({
          name: message.receiverName,
          chatId: message.chatId,
          timestamp: "sample timestamp" /* message.timestamp */,
          conversation: message.conversation,
          dp: message.dp,
        }));
        setContacts(mappedMessages);
        setIsUserChatLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserChatLoading(true);
        setUserChatsError(error);
      }
    };

    fetchContacts();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        contacts,
        isUserChatLoading,
        userChatsError,
        contactId,
        setContactId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
