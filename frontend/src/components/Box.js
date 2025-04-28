import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  width: ${(props) => props.width || '350px'};
  height: ${(props) => props.height || '350px'};
  background: ${(props) => props.background || '#ffffff'};
  border: ${(props) => props.border || '2px solid #495057'};
  border-radius: ${(props) => props.borderRadius || '16px'};
  box-shadow: ${(props) => props.boxShadow || '0 0 8px 0 rgba(0, 0, 0, 0.04)'};
  margin: ${(props) => props.margin || '196px auto 32px'};
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  align-items: center;      /* 추가! */
  justify-content: center; /* 세로 중앙 정렬 */
  padding: ${(props) => props.padding || '20px'};
  color: ${(props) => props.color || 'white'};
`;

function Box({ 
  children, 
  width, 
  height, 
  background, 
  borderRadius, 
  boxShadow, 
  margin, 
  flexDirection, 
  padding, 
  color 
}) {
  return (
    <StyledBox
      width={width}
      height={height}
      background={background}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      margin={margin}
      flexDirection={flexDirection}
      padding={padding}
      color={color}
    >
      {children}
    </StyledBox>
  );
}

export default Box;
