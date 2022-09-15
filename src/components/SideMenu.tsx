import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { OpenMobileMenu } from "../etc/atom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Menu = styled(motion.div)<{ openmenu: boolean }>`
  @media ${props => props.theme.desktop} {
    display: none;
  }
  @media ${props => props.theme.mobile} {
    display: block;
    position: fixed;
    transition: 0.5s ease-in-out;
    right: ${props => (props.openmenu ? "0" : "-50%")};
    top: 0;
    opacity: ${props => (props.openmenu ? "1" : "0")};
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
    height: 100%;
    width: ${props => (props.openmenu ? "50%" : "0")};
    padding: 3.125rem 1.25rem;
    z-index: 10;
    .menuList {
      margin-top: 10rem;
      li {
        text-align: right;
        margin-bottom: 1.25rem;
      }
    }
    .etc {
      margin-top: 40px;
      .githublogo {
        margin-bottom: 5px;
      }
      .copyright {
        font-size: 1rem;
      }
    }
  }
`;

function SideMenu() {
  const open = useRecoilValue(OpenMobileMenu);
  return (
    <Menu openmenu={open}>
      <>
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
      </>
    </Menu>
  );
}
export default SideMenu;
