import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import ChatSidebar from "../components/ChatSidebar";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  color: #F1F3F5;
  padding: 0;
  position: relative;
  max-width: 100%;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    max-width: 90%;
    padding: 0 20px;
  }
  
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
  width: 100%;
  max-height: calc(100vh - 120px); /* Adjust based on header and input heights */
  scrollbar-width: thin;
  scrollbar-color: #495057 #141517;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #141517;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #495057;
    border-radius: 6px;
  }
`;

const DateDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #6c757d;
  font-size: 12px;
  width: 100%;
  
  &::before, &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #495057;
  }
  
  &::before {
    margin-right: 10px;
  }
  
  &::after {
    margin-left: 10px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isVisible ? "block" : "none")};
  z-index: 100;
  
  @media (min-width: 992px) {
    display: none; /* Hide overlay on larger screens */
  }
`;

// 샘플 데이터
const currentUser = { id: 1, name: "나", color: "#1DFFA3" }

const participants = [
  { id: 1, name: "나", color: "#1DFFA3" },
  { id: 2, name: "김민수", color: "#7140EA" },
  { id: 3, name: "이지은", color: "#EDFA19" },
  { id: 4, name: "박준호", color: "#E02020" },
]

const initialMessages = [
  {
    id: 1,
    sender: { id: 2, name: "김민수", color: "#7140EA" },
    content: "안녕하세요! 프로젝트 진행 상황 공유해 주세요.",
    time: "오전 10:30",
    unreadCount: 0,
  },
  {
    id: 2,
    sender: { id: 1, name: "나", color: "#1DFFA3" },
    content: "네, 현재 UI 디자인 작업 중입니다. 내일까지 완료할 예정입니다.",
    time: "오전 10:32",
    unreadCount: 0,
  },
  {
    id: 3,
    sender: { id: 3, name: "이지은", color: "#EDFA19" },
    content: "저는 백엔드 API 개발 중입니다. 이번 주 금요일까지 완료 예정입니다.",
    time: "오전 10:35",
    unreadCount: 1,
  },
  {
    id: 4,
    sender: { id: 4, name: "박준호", color: "#E02020" },
    content: "회의록 공유드립니다.",
    time: "오전 10:40",
    unreadCount: 2,
    file: {
      name: "프로젝트_회의록_0528.pdf",
      size: "2.4MB",
      type: "application/pdf",
    },
  },
  {
    id: 5,
    sender: { id: 1, name: "나", color: "#1DFFA3" },
    content: "감사합니다! 확인해볼게요.",
    time: "오전 10:42",
    unreadCount: 2,
  },
]

function ChatRoomPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const chatContainerRef = useRef(null)
  const [searchResults, setSearchResults] = useState([])
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1)

  // 검색 결과 찾기
  useEffect(() => {
    if (searchTerm) {
      const results = []
      messages.forEach((message, messageIndex) => {
        if (message.content.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(messageIndex)
        }
      })
      setSearchResults(results)
      setCurrentSearchIndex(results.length > 0 ? 0 : -1)
    } else {
      setSearchResults([])
      setCurrentSearchIndex(-1)
    }
  }, [searchTerm, messages])

  // 검색 결과로 스크롤
  useEffect(() => {
    if (currentSearchIndex >= 0 && searchResults.length > 0) {
      const messageIndex = searchResults[currentSearchIndex]
      const messageElements = chatContainerRef.current.querySelectorAll('.message-item')
      
      if (messageElements[messageIndex]) {
        messageElements[messageIndex].scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [currentSearchIndex, searchResults])

  // 채팅창 자동 스크롤 (새 메시지)
  useEffect(() => {
    if (chatContainerRef.current && !searchTerm) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, searchTerm])

  const handleSendMessage = ({ text, file }) => {
    const newMessage = {
      id: messages.length + 1,
      sender: currentUser,
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      unreadCount: participants.length - 1,
      file: file
        ? {
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
            type: file.type,
          }
        : null,
    }

    setMessages([...messages, newMessage])
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleNextSearchResult = () => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex((prevIndex) => 
        (prevIndex + 1) % searchResults.length
      )
    }
  }

  const handlePrevSearchResult = () => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
      )
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setCurrentSearchIndex(-1)
  }

  const handleLeaveRoom = () => {
    alert("채팅방을 나갔습니다.")
    // 실제 구현에서는 여기서 라우팅 처리
  }

  return (
    <PageContainer>
      <ChatHeader
        title="프로젝트 팀"
        onToggleSidebar={() => setIsSidebarOpen(true)}
        searchTerm={searchTerm}
        onSearch={handleSearch} 
        onClearSearch={clearSearch}
        onNextResult={handleNextSearchResult}
        onPrevResult={handlePrevSearchResult}
        searchResultsCount={searchResults.length}
        currentResultIndex={currentSearchIndex}
      />

      <ChatContainer ref={chatContainerRef}>
        <DateDivider>2023년 5월 28일</DateDivider>

        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isMine={message.sender.id === currentUser.id}
            className="message-item"
            isHighlighted={searchResults.includes(index) && searchResults[currentSearchIndex] === index}
          />
        ))}
      </ChatContainer>

      <ChatInput
        onSend={handleSendMessage}
        placeholder="메시지를 입력하세요..."
      />

      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        participants={participants}
        onLeave={handleLeaveRoom}
      />

      <Overlay isVisible={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
    </PageContainer>
  );
}

export default ChatRoomPage;
