import { useState, useRef } from "react";
import styled from "styled-components";
import { Send, Paperclip } from "lucide-react";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #000000;
  border: 2px solid #495057;
  border-radius: 12px;
  padding: 10px 16px;
  margin: 20px 0;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  background: transparent;
  border: none;
  color: #F1F3F5;
  font-size: 14px;
  width: 100%;
  resize: none;
  outline: none;
  max-height: 120px;
  min-height: 24px;
  
  &::placeholder {
    color: #6c757d;
  }
`;

const IconWrapper = styled.button`
  background: transparent;
  border: none;
  color: #F1F3F5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(29, 255, 163, 0.1);
    color: #1DFFA3;
  }
`;

const SendButton = styled.button`
  background: ${(props) => (props.active ? "#1DFFA3" : "rgba(29, 255, 163, 0.1)")};
  color: ${(props) => (props.active ? "#000000" : "#1DFFA3")};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(props) => (props.active ? "#19e090" : "rgba(29, 255, 163, 0.2)")};
    transform: scale(1.05);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  background: #1a1a1a;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 10px;
  gap: 10px;
`;

const FileName = styled.span`
  color: #F1F3F5;
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #E02020;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * 채팅 입력 컴포넌트
 * @param {Object} props
 * @param {Function} props.onSend - 메시지 전송 핸들러
 * @param {boolean} props.isSearchMode - 검색 모드 여부
 * @param {string} props.placeholder - 입력창 플레이스홀더
 */
function ChatInput({ onSend, isSearchMode = false, placeholder = "메시지를 입력하세요..." }) {
  const [message, setMessage] = useState("")
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (message.trim() || file) {
      onSend({ text: message, file })
      setMessage("")
      setFile(null)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div>
      {file && (
        <FilePreview>
          <span>📎</span>
          <FileName>{file.name}</FileName>
          <RemoveButton onClick={() => setFile(null)}>&times;</RemoveButton>
        </FilePreview>
      )}

      <InputContainer>
        {!isSearchMode && (
          <>
            <IconWrapper onClick={() => fileInputRef.current.click()}>
              <Paperclip size={20} />
            </IconWrapper>
            <FileInput type="file" ref={fileInputRef} onChange={handleFileChange} />
          </>
        )}

        <TextArea
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <SendButton active={message.trim() || file} onClick={handleSend} aria-label="전송">
          <Send size={20} />
        </SendButton>
      </InputContainer>
    </div>
  );
}

export default ChatInput;
