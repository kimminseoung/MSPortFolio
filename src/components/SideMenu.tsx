import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";
import { OpenMobileMenu } from "../etc/atom";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

interface OpenMenu {
  open: boolean;
}
const Wrapper = styled.div<OpenMenu>`
  position: relative;
`;
const Menu = styled.div<OpenMenu>`
  @media ${props => props.theme.desktop} {
    display: none;
  }
  @media ${props => props.theme.mobile} {
    display: block;
    position: fixed;
    transition: 0.5s ease-in-out;
    top: 0;
    height: 100%;
    z-index: 998;
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
    opacity: ${props => (props.open ? "1" : "0")};
    right: ${props => (props.open ? "0" : "-50%")};
    width: ${props => (props.open ? "50%" : "0")};
    padding: 3.125rem 1.25rem;
    .menuList {
      margin-top: 10rem;
      li {
        text-align: right;
        margin-bottom: 1.25rem;
      }
    }
    .etc {
      margin-top: 2.5rem;
      .githublogo {
        margin-bottom: 0.313rem;
      }
      .copyright {
        font-size: 1rem;
      }
    }
  }
`;
const Overlay = styled.div<OpenMenu>`
  @media ${props => props.theme.desktop} {
    opacity: 0;
    visibility: hidden;
  }
  @media ${props => props.theme.mobile} {
    transition: 0.5s ease-in-out;
    width: 100%;
    visibility: ${props => (props.open ? "visible" : "hidden")};
    opacity: ${props => (props.open ? "1" : "0")};
    z-index: ${props => (props.open ? "997" : "0")};
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
function SideMenu() {
  const [open, setOpen] = useRecoilState(OpenMobileMenu);

  return (
    <Wrapper open={open}>
      <Overlay open={open} onClick={() => setOpen(prev => !prev)} />
      <Menu open={open}>
        <ul className='menuList'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/About'>About</Link>
          </li>
          <li>
            <Link to='/Project'>Project</Link>
          </li>
          <li>
            <Link to='/board'>Board</Link>
          </li>
        </ul>
        <div className='etc'>
          <div className='githublogo'>
            <a href='https://github.com/kimminseoung'>
              <FaGithubSquare />
            </a>
          </div>
          <div className='copyright'>Copyright © 2022</div>
        </div>
      </Menu>
    </Wrapper>
  );
}
export default SideMenu;
