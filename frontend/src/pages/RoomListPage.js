import { useState, useMemo, useRef, useEffect } from 'react'
import styled from "styled-components"
import { Plus, Bell, Settings, LogOut } from "lucide-react"
import IconButton from "../components/IconButton"
import SearchBar from "../components/SearchBar"
import RoomCard from "../components/RoomCard"
import Sidebar from "../components/Sidebar"
import Modal from "../components/Modal"
import FriendItem from "../components/FriendItem"
import { logout } from "../api/api"

// 스타일 컴포넌트
const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  color: #F1F3F5;
`

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #F1F3F5;
`

const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
`

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #495057;
  margin-bottom: 20px;
`

const Tab = styled.button`
  padding: 12px 24px;
  background: transparent;
  border: none;
  color: ${(props) => (props.active ? "#1DFFA3" : "#F1F3F5")};
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${(props) => (props.active ? "#1DFFA3" : "transparent")};
  }
`

const Button = styled.button`
  background: #1DFFA3;
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #19e090;
    transform: translateY(-2px);
  }
`

const SidebarTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #F1F3F5;
  margin-top: 20px;
  margin-bottom: 20px;
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #1A1B1E;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 250px;
  overflow: hidden;
  margin-top: 8px;
  z-index: 1000;
`

const DropdownHeader = styled.div`
  padding: 15px;
  background: #212428;
  border-bottom: 1px solid #333;
`

const DropdownTitle = styled.div`
  color: #F1F3F5;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`

const DropdownContent = styled.div`
  padding: 10px 0;
`

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 15px;
  color: #F1F3F5;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    margin-right: 12px;
    color: #717171;
  }
  
  &:hover {
    background: #2A2B2E;
    
    svg {
      color: #1DFFA3;
    }
  }
`


// 샘플 데이터
const rooms = [
  { id: 1, title: "프로젝트 팀", lastMessage: "다음 회의는 언제인가요?", time: "12:30", unread: 3 },
  { id: 2, title: "가족 그룹", lastMessage: "저녁 식사 준비했어요", time: "11:45", unread: 0 },
  { id: 3, title: "디자인 스터디", lastMessage: "새로운 디자인 트렌드에 대해 이야기해봐요", time: "어제", unread: 0 },
  { id: 4, title: "여행 계획", lastMessage: "항공권 예약했습니다!", time: "어제", unread: 5 },
  { id: 5, title: "개발자 모임", lastMessage: "새로운 라이브러리 출시됐네요", time: "월요일", unread: 0 },
]

const friends = [
  { id: 2, name: "김민수", color: "#7140EA" },
  { id: 3, name: "이지은", color: "#1DFFA3" },
  { id: 4, name: "박준호", color: "#E02020" },
  { id: 5, name: "최유진", color: "#EDFA19" },
  { id: 6, name: "정승환", color: "#7140EA" },
]

function RoomListPage() {
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friendSearchTerm, setFriendSearchTerm] = useState('');
  const [roomFriendSearchTerm, setRoomFriendSearchTerm] = useState('');
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const settingsRef = useRef(null);
  
  // 친구 검색 핸들러
  const handleFriendSearch = (term) => {
    setFilteredFriends(friends.filter((friend) => friend.name.toLowerCase().includes(term.toLowerCase())));
  };

  // 채팅방 검색 핸들러
  const handleRoomSearch = (term) => {
    // 실제 구현에서는 채팅방 필터링 로직 추가
    console.log("채팅방 검색:", term);  
  };

  // 친구 아이템 렌더링 함수 (모달용)
  const renderFriendWithButton = (friend) => (
    <FriendItem key={friend.id} friend={friend} action={<Button>추가</Button>} />
  );

  // 친구 체크박스 토글 함수
  const toggleFriendSelection = (friendId) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId) 
        : [...prev, friendId]
    );
  };

  // 친구 아이템 렌더링 함수 (채팅방 생성 모달용)
  const renderFriendWithCheckbox = (friend) => {
    const isSelected = selectedFriends.includes(friend.id);
    
    return (
      <FriendItem
        key={friend.id}
        friend={friend}
        action={
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => toggleFriendSelection(friend.id)}
            style={{ width: "20px", height: "20px" }} 
          />
        }
      />
    );
  }

  // 검색어에 따라 친구 목록 필터링
  const filteredModalFriends = useMemo(() => {
    if (!friendSearchTerm) return friends;
    return friends.filter(friend => 
      friend.name.toLowerCase().includes(friendSearchTerm.toLowerCase())
    );
  }, [friendSearchTerm]);

  // 채팅방 생성 모달에서 친구 목록 필터링
  const filteredRoomFriends = useMemo(() => {
    if (!roomFriendSearchTerm) return friends;
    return friends.filter(friend => 
      friend.name.toLowerCase().includes(roomFriendSearchTerm.toLowerCase())
    );
  }, [roomFriendSearchTerm]);



  //클릭 이벤트 처리
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettingsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleLogout = async () => {
    await logout();
  };
  return (
    <PageContainer>
      <MainContent>
        <Header>
          <Title>채팅</Title>
          <HeaderButtons>
            <IconButton type="add" onClick={() => setShowCreateRoomModal(true)}>
              <Plus size={20} />
            </IconButton>
            <IconButton type="notification" count={3}>
              <Bell size={20} />
            </IconButton>
            <div style={{ position: 'relative' }} ref={settingsRef}>
              <IconButton type="settings" onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}>
                <Settings size={20} />
              </IconButton>
              {showSettingsDropdown && (
                <DropdownMenu>
                  <DropdownHeader>
                    <DropdownTitle>설정</DropdownTitle>
                  </DropdownHeader>
                  <DropdownContent>
                    <DropdownItem onClick={handleLogout}>
                      <LogOut size={16} />
                      로그아웃
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              )}
            </div>
          </HeaderButtons>
        </Header>

        <SearchBar placeholder="채팅방 검색..." onChange={(e) => handleRoomSearch(e.target.value)} />

        <RoomList>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onClick={() => console.log("채팅방 클릭:", room.id)} />
          ))}
        </RoomList>
      </MainContent>

      <Sidebar
        title="친구"
        items={filteredFriends}
        onAddClick={() => setShowFriendModal(true)}
        onSearch={handleFriendSearch}
        searchPlaceholder="친구 검색..."
      />

      {/* 친구 찾기 모달 */}
      <Modal isOpen={showFriendModal} title="친구 찾기" onClose={() => setShowFriendModal(false)}>
        <div style={{ width: '450px', minHeight: '500px' }}>
          <TabContainer>
            <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
              전체
            </Tab>
            <Tab active={activeTab === "pending"} onClick={() => setActiveTab("pending")}>
              요청
            </Tab>
          </TabContainer>

          <SearchBar placeholder="이름으로 검색..." onChange={(e) => setFriendSearchTerm(e.target.value)} />

          <div style={{ height: "300px", overflow: "auto", marginBottom: '20px' }}>
            {filteredModalFriends.map((friend) => renderFriendWithButton(friend))}
          </div>
        </div>
      </Modal>

      {/* 채팅방 생성 모달 */}
      <Modal isOpen={showCreateRoomModal} title="새 채팅방 만들기" onClose={() => setShowCreateRoomModal(false)}>
        <div style={{ width: '450px', minHeight: '500px' }}>
          <SearchBar placeholder="친구 검색..." onChange={(e) => setRoomFriendSearchTerm(e.target.value)} />
          <SidebarTitle>친구 선택</SidebarTitle>
          <div style={{ height: "300px", overflow: "auto", marginBottom: '20px' }}>
            {filteredRoomFriends.map((friend) => renderFriendWithCheckbox(friend))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button>채팅방 생성</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}

export default RoomListPage
