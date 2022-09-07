import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderNavi = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${props => props.theme.bgColor};
  left: 0;
  right: 0;
  z-index: 10;
  .logo {
    font-size: 50px;
    font-weight: bold;
    color: ${props => props.theme.textColor};
  }
  .menu {
    ul {
      display: flex;
    }
    li {
      margin-right: 5px;
      line-height: 38px;
      & > a {
        padding: 0 30px;
        display: inline-block;
        color: ${props => props.theme.textColor};
        font-weight: 500;
        transition: all 0.3s ease;
        position: relative;
        &::after {
          width: 0;
          left: 0;
          position: absolute;
          height: 100%;
          color: ${props => props.theme.bgColor};
          content: "";
          z-index: -1;
          transition: all 0.6s ease 0.3s;
          background-color: ${props => props.theme.textColor};
        }
        &:hover {
          color: ${props => props.theme.bgColor};
        }
        &:hover::after {
          width: 100%;
        }
        &.active {
          left: 0;
          height: 0;
          background-color: ${props => props.theme.textColor};
          height: 100%;
          z-index: 100;
          color: ${props => props.theme.bgColor};
        }
      }
    }
  }
`;
const Wrapper = styled.nav`
  display: flex;
  margin: 0 auto;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  width: 93%;
`;
function Header() {
  const location = useLocation().pathname;
  return (
    <HeaderNavi>
      <Wrapper>
        <div className='logo'>
          <Link to='/'>MS's</Link>
        </div>
        <div className='menu'>
          <ul>
            <li>
              <Link to='/' className={location === "home" || location === "/" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/About' className={location === "/About" ? "active" : ""}>
                About
              </Link>
            </li>
            <li>
              <Link to='/Project' className={location === "/Project" ? "active" : ""}>
                Project
              </Link>
            </li>
            <li>
              <Link to='/board'>Board</Link>
            </li>
          </ul>
        </div>
      </Wrapper>
    </HeaderNavi>
  );
}
export default Header;
