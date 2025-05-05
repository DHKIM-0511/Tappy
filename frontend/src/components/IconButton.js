import styled from "styled-components"
import { Bell, Plus, Settings } from "lucide-react"

const ButtonContainer = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #000000;
  border: 2px solid #495057;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #F1F3F5;
  transition: all 0.2s ease;
  
  &:hover {
    background: #1DFFA3;
    color: #000000;
    border-color: #1DFFA3;
  }
`

const NotificationContainer = styled(ButtonContainer)`
  position: relative;
`

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #E02020;
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`

/**
 * 버튼 컴포넌트
 * @param {Object} props
 * @param {string} props.type - 버튼 타입 ('add' 또는 'notification')
 * @param {number} [props.count] - 알림 개수 (type이 'notification'일 때만 사용)
 * @param {Function} props.onClick - 클릭 이벤트 핸들러
 * @param {React.ReactNode} [props.children] - 커스텀 아이콘을 위한 자식 요소
 */
const IconButton = ({ type = "add", count = 0, onClick, children }) => {
  if (type === "notification") {
    return (
      <NotificationContainer onClick={onClick}>
        {children || <Bell size={20} />}
        {count > 0 && <NotificationBadge>{count}</NotificationBadge>}
      </NotificationContainer>
    )
  }

  if (type === "settings") {
    return (
      <ButtonContainer onClick={onClick}>
        {children || <Settings size={20} />}
      </ButtonContainer>
    )
  }

  return <ButtonContainer onClick={onClick}>{children || <Plus size={20} />}</ButtonContainer>
}

export default IconButton
