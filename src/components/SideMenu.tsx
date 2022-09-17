import styled from "styled-components";
import { FaGithubSquare } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { OpenMobileMenu } from "../etc/atom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Menu = styled(motion.div)<{ open: boolean }>`
  @media ${(props) => props.theme.desktop} {
    display: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: block;
    position: fixed;
    transition: 0.5s ease-in-out;
    top: 0;
    height: 100%;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    opacity: ${(props) => (props.open ? "1" : "0")};
    right: ${(props) => (props.open ? "0" : "-50%")};
    width: ${(props) => (props.open ? "50%" : "0")};
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

function SideMenu() {
  const open = useRecoilValue(OpenMobileMenu);
  return (
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
  );
}
export default SideMenu;
