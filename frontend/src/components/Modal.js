import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Content = styled.div`
  background: #000000;
  border-radius: 12px;
  border: 2px solid #495057;
  width: 90%;
  max-width: ${(props) => props.maxWidth || "500px"};
  padding: 24px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #F1F3F5;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #F1F3F5;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  
  &:hover {
    color: #E02020;
  }
`;

/**
 * 모달 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {string} props.title - 모달 제목
 * @param {Function} props.onClose - 닫기 버튼 클릭 이벤트 핸들러
 * @param {React.ReactNode} props.children - 모달 내용
 * @param {string} [props.maxWidth] - 최대 너비 (CSS 값)
 */
function Modal({ isOpen, title, onClose, children, maxWidth }) {
  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()} maxWidth={maxWidth}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        {children}
      </Content>
    </Overlay>
  );
}

export default Modal;
