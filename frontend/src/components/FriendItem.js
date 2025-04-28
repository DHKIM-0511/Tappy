import styled from "styled-components";
import Avatar from "./Avatar";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(29, 255, 163, 0.1);
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #F1F3F5;
`;

const Status = styled.div`
  font-size: 12px;
  color: ${(props) => (props.online ? "#1DFFA3" : "#6c757d")};
`;

/**
 * 친구 요소 컴포넌트
 * @param {Object} props
 * @param {Object} props.friend - 친구 정보 객체
 * @param {React.ReactNode} [props.action] - 우측에 표시할 액션 요소 (버튼 등)
 * @param {Function} [props.onClick] - 클릭 이벤트 핸들러
 */
function FriendItem({ friend, action, onClick }) {
  return (
    <Container onClick={onClick}>
      <Avatar name={friend.name} color={friend.color} />
      <Info>
        <Name>{friend.name}</Name>
        <Status online={friend.online}>{friend.status}</Status>
      </Info>
      {action && action}
    </Container>
  );
};

export default FriendItem;