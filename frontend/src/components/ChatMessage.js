import styled from "styled-components";
import Avatar from "./Avatar";

// 공통 메시지 스타일
const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
  align-items: flex-start;
`;

const MessageContent = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div`
  background: ${(props) => {
    if (props.isHighlighted) return "rgba(113, 64, 234, 0.2)";
    return props.isMine ? "rgba(29, 255, 163, 0.15)" : "#000000";
  }};
  border: 2px solid ${(props) => {
    if (props.isHighlighted) return "#7140EA";
    return props.isMine ? "#1DFFA3" : "#495057";
  }};
  border-radius: 12px;
  padding: 10px 14px;
  color: #F1F3F5;
  margin-bottom: 4px;
  word-break: break-word;
  transition: all 0.3s ease;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6c757d;
`;

const MessageTime = styled.span`
  color: #6c757d;
`;

const MessageReadCount = styled.span`
  color: ${(props) => (props.unread > 0 ? "#7140EA" : "#6c757d")};
  font-weight: ${(props) => (props.unread > 0 ? "bold" : "normal")};
  min-width: 20px;
  height: 20px;
  display: ${(props) => (props.unread > 0 ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;



const SenderName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #F1F3F5;
  margin-bottom: 4px;
`;

const FileAttachment = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
`;

const FileName = styled.span`
  color: #F1F3F5;
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.span`
  color: #6c757d;
  font-size: 12px;
`;

const FileIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #7140EA;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
`;

/**
 * 채팅 메시지 컴포넌트
 * @param {Object} props
 * @param {Object} props.message - 메시지 정보
 * @param {boolean} props.isMine - 내 메시지인지 여부
 */
function ChatMessage({ message, isMine, isHighlighted, className }) {
  return (
    <MessageContainer isMine={isMine} className={className}>
      {!isMine && <Avatar name={message.sender.name} color={message.sender.color} />}

      <MessageContent isMine={isMine}>
        {!isMine && <SenderName>{message.sender.name}</SenderName>}

        <MessageBubble isMine={isMine} isHighlighted={isHighlighted}>
          {message.content}

          {message.file && (
            <FileAttachment>
              <FileIcon>{message.file.type.substring(0, 3).toUpperCase()}</FileIcon>
              <div style={{ flex: 1, minWidth: 0 }}>
                <FileName>{message.file.name}</FileName>
                <FileSize>{message.file.size}</FileSize>
              </div>
            </FileAttachment>
          )}
        </MessageBubble>

        <MessageInfo>
          <MessageTime>{message.time}</MessageTime>
          <MessageReadCount unread={message.unreadCount}>
            {message.unreadCount > 0 ? message.unreadCount : ""}
          </MessageReadCount>
        </MessageInfo>
      </MessageContent>
    </MessageContainer>
  );
}

export default ChatMessage;
