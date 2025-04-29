import styled from "styled-components";
import { X, LogOut } from "lucide-react";
import Avatar from "./Avatar";
import IconButton from "./IconButton";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: #000000;
  border-left: 2px solid #495057;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px 16px 24px 16px;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    width: 320px;
    padding: 20px 20px 28px 20px;
  }
  
  @media (max-width: 350px) {
    width: 260px;
    padding: 12px 12px 20px 12px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SidebarTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #F1F3F5;
`;

const ParticipantsList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  max-height: calc(100vh - 140px);
`;

const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #1a1a1a;
`;

const ParticipantInfo = styled.div`
  flex: 1;
`;

const ParticipantName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #F1F3F5;
`;

const LeaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #E02020;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 8px;
  margin-top: auto;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 100%;
  min-height: 42px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
  
  @media (max-width: 350px) {
    font-size: 12px;
    padding: 8px 4px;
    min-height: 36px;
  }
  
  &:hover {
    background: #c51818;
  }
`;

/**
 * 채팅방 사이드바 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 사이드바 열림 여부
 * @param {Function} props.onClose - 사이드바 닫기 핸들러
 * @param {Array} props.participants - 참여자 목록
 * @param {Function} props.onLeave - 채팅방 나가기 핸들러
 */
function ChatSidebar({ isOpen, onClose, participants, onLeave }) {
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>참여자 정보</SidebarTitle>
        <IconButton onClick={onClose}>
          <X size={20} />
        </IconButton>
      </SidebarHeader>

      <ParticipantsList>
        {participants.map((participant) => (
          <ParticipantItem key={participant.id}>
            <Avatar name={participant.name} color={participant.color} />
            <ParticipantInfo>
              <ParticipantName>{participant.name}</ParticipantName>
            </ParticipantInfo>
          </ParticipantItem>
        ))}
      </ParticipantsList>

      <LeaveButton onClick={onLeave}>
        <LogOut size={16} />
        채팅방 나가기
      </LeaveButton>
    </SidebarContainer>
  );
}

export default ChatSidebar;
