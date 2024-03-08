import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: ${({ baseHeight }) => baseHeight};
  max-width: 1600px;
  margin: 0 auto;
`;
Container.displayName = "Container";

export const ChildContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: row;
  transition: right 1s;
  transition-delay: 0s;
  ${({ currentSlide }) =>
    `
      right: ${currentSlide * 100}%;
    `}
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    ${({ slides }) =>
      slides.map(
        (_, i) =>
          `&:nth-child(${i + 1}) {
          left: ${i * 100}%;
        }`
      )}
  }
`;
ChildContainer.displayName = "ChildContainer";

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -50%);
  bottom: 0;
  left: 50%;
  height: 20px;
`;
ButtonsContainer.displayName = "ButtonsContainer";

export const SlideBar = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  border-bottom: solid lightgray;
  border-width: 5px;
  width: 24px;
  margin: 0 5px;
  transition: border-width 500ms;
  &:hover,
  &.active {
    border-width: 10px;
    border-color: gray;
  }
`;
SlideBar.displayName = "SlideBar";

export const CaretLeft = styled.button`
  cursor: pointer;
  position: absolute;
  background: none;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  border-bottom: 4px solid;
  border-left: 4px solid;
  border-radius: 2px;
  border-color: gray;
  transform: translate(-50%, -50%) rotate(45deg);
  left: 5%;
  top: 50%;
  &:hover {
    border-color: lightgray;
  }
`;
CaretLeft.displayName = "CaretLeft";

export const CaretRight = styled.button`
  cursor: pointer;
  position: absolute;
  background: none;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  border-bottom: 4px solid;
  border-right: 4px solid;
  border-radius: 2px;
  border-color: gray;
  transform: translate(50%, -50%) rotate(-45deg);
  right: 5%;
  top: 50%;
  &:hover {
    border-color: lightgray;
  }
`;
CaretRight.displayName = "CaretRight";
