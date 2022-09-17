import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";

const FooterBar = styled.footer`
  height: 70px;
  line-height: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  position: fixed;
  padding: 0 70px;
  @media ${props => props.theme.mobile} {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-size: 20px;
  }
`;
function Footer() {
  return (
    <FooterBar>
      <Wrapper>
        <div className='copyright'>Copyright © 2022</div>
        <div className='menu'>
          <a href='https://github.com/kimminseoung'>
            <FaGithubSquare />
          </a>
        </div>
      </Wrapper>
    </FooterBar>
  );
}
export default Footer;
