import styled from "styled-components";

const Card = styled.div`
  background: #000000;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #495057;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1DFFA3;
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #F1F3F5;
`;

const Time = styled.span`
  font-size: 12px;
  color: #6c757d;
`;

const Preview = styled.p`
  font-size: 14px;
  color: #adb5bd;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadBadge = styled.div`
  background: #E02020;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: bold;
`;

/**
 * 채팅방 카드 컴포넌트
 * @param {Object} props
 * @param {Object} props.room - 채팅방 정보 객체
 * @param {Function} [props.onClick] - 클릭 이벤트 핸들러
 */
function RoomCard({ room, onClick }) {
  return (
    <Card onClick={onClick}>
      <Header>
        <Title>{room.title}</Title>
        <Time>{room.time}</Time>
      </Header>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Preview>{room.lastMessage}</Preview>
        {room.unread > 0 && <UnreadBadge>{room.unread}</UnreadBadge>}
      </div>
    </Card>
  );
}

export default RoomCard;
