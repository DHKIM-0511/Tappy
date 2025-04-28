import styled from "styled-components"

const AvatarContainer = styled.div`
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  border-radius: 50%;
  background: ${(props) => props.color || "#7140EA"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: ${(props) => props.fontSize || "16px"};
`;

/**
 * 아바타 컴포넌트
 * @param {Object} props
 * @param {string} props.name - 사용자 이름 (이니셜을 표시하는데 사용)
 * @param {string} [props.color] - 배경색
 * @param {string} [props.size] - 아바타 크기 (CSS 값)
 * @param {string} [props.fontSize] - 글자 크기 (CSS 값)
 */
function Avatar ({ name, color, size, fontSize }) {
  return (
    <AvatarContainer color={color} size={size} fontSize={fontSize}>
      {name ? name.charAt(0) : "?"}
    </AvatarContainer>
  );
};

export default Avatar;