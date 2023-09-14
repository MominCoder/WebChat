import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";

import {
  getRecievedTime,
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";

import { ChatState } from "../context/ChatProvider";
import { Text } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <Text
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#D1F4CC" : "#fff"
                }`,
                color:"#111b21",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "10px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
              fontSize="md"
            >
              {m.content}
              <Text marginLeft={2} color="#667781" display="inline-flex" fontSize="x-small">{getRecievedTime(m?.createdAt)}</Text>
            </Text>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;