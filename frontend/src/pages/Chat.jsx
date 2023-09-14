import { useState } from "react";
// import axios from "axios";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../components/MyChats";
// import SideDrawer from "../components/misc/SideDrawer";
import Chatbox from "../components/Chatbox";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  // const [ chats, setChats ] = useState([]);

//   const getChats = async () => {
//     const { data } = await axios.get("/api/chats");
//     // console.log("data", data);

//     if (data) setChats(data);
//   };

//   useEffect(() => {
//     getChats();
//   }, []);

  return (
    // <div>
    //     {
    //         chats && chats.map(c => (
    //             <li key={c._id}>{c.chatName}</li>
    //         ))
    //     }
    // </div>

    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />} */}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
