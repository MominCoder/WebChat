import { useEffect } from "react";
import axios from "axios";
// import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { getSender, messageRecievedOn, note } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./misc/GroupChatModal";
// import { Button } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "./misc/SideDrawer.jsx";
import { Avatar } from "@chakra-ui/react";

const MyChats = ({ fetchAgain }) => {
  // const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats, notification } =
    ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    // seUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      // p={3}
      bg="white"
      flex={{ base: "0 0 100%", md: "0 0 30%" }}
      // w={{ base: "100%", md: "31%" }}
      // borderRadius="lg"
      // borderWidth="1px"
      borderRight="solid 1px #E2E8F0"
    >
      <Box
        // py={3}
        // px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>*/}
        <SideDrawer />
      </Box>
      <Box
        display="flex"
        flexDir="column"
        // p={3}
        // bg="#F8F8F8"
        w="100%"
        h="100%"
        // borderRadius="lg"
        overflowY="hidden"
        // borderTop="1px solid #f0f2f5"
      >
        {chats ? (
          <Stack px={3} py={3} borderTop="1px solid #f0f2f5" overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                // bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                // color={selectedChat === chat ? "#111b21": "#3b4a54" }
                bg={selectedChat === chat ? "#f0f2f5" : "#fff"}
                color="#111b21"
                borderTop="1px solid #f0f2f5"
                // px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <div className="flex flex_sb">
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={getSender(user, chat.users)}
                    marginRight={2}
                  />
                  <div>
                    <Text fontSize="lg">
                      {!chat.isGroupChat
                        ? getSender(user, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text
                        fontSize="sm"
                        color={selectedChat === chat ? "#3b4a54" : "#667781"}
                      >
                        {chat.latestMessage.sender._id === user._id
                          ? "You:"
                          : ""}

                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  </div>
                </div>
                <div style={{ width: "20%", textAlign: "center" }}>
                  <Text fontSize="xs" color="#667781">
                    {messageRecievedOn(chat.latestMessage?.createdAt)}
                  </Text>
                  {notification && (
                    <span
                      style={{
                        padding: "1px 5px",
                        display:
                          note(notification, chat) > 0 ? "inline" : "none",
                        borderRadius: "50%",
                        backgroundColor: "tomato",
                        color: "white",
                        fontSize: "0.75rem",
                      }}
                    >
                      {note(notification, chat)}
                    </span>
                  )}
                </div>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
