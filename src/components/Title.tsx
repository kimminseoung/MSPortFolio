import styled from "styled-components";

const TitleText = styled.div`
  overflow: hidden;
  margin-bottom: 15px;
  span {
    display: inline-block;
    position: relative;
    letter-spacing: 7px;
    text-transform: uppercase;
    font-weight: 700;
    &::after {
      content: "";
      margin-left: 25px;
      position: absolute;
      width: 5000px;
      height: 1px;
      background-color: #7d7789;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;
interface titleText {
  titleName: string;
}

function TitleForm(props: titleText) {
  return (
    <TitleText>
      <span>{props.titleName}</span>
    </TitleText>
  );
}
export default TitleForm;
