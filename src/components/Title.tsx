import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "./../etc/atom";
const TitleText = styled.div<{ isDark: boolean }>`
  overflow: hidden;
  margin-bottom: 0.938rem;
  span {
    display: inline-block;
    padding-bottom: 0.5rem;
    position: relative;
    letter-spacing: 7px;
    text-transform: uppercase;
    font-weight: 700;
    color: ${props => (props.isDark ? "#fff" : "#333")};
    &::after {
      content: "";
      margin-left: 1.563rem;
      position: absolute;
      width: 5000px;
      height: 1px;
      background-color: ${props => (props.isDark ? "#fff" : "#7d7789")};
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  @media ${props => props.theme.mobile} {
    span {
      letter-spacing: 2px;
    }
  }
`;
interface titleText {
  titleName: string;
}

function TitleForm(props: titleText) {
  const isDark = useRecoilValue(DarkModeValue);

  return (
    <TitleText isDark={isDark}>
      <span>{props.titleName}</span>
    </TitleText>
  );
}
export default TitleForm;
