import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideMenu from "./SideMenu";

const Container = styled.main`
  @media ${props => props.theme.desktop} {
    position: absolute;
    top: 70px;
    bottom: 70px;
    left: 70px;
    right: 70px;
    overflow: hidden;
    & > div {
      height: 100%;
      display: flex;
    }
  }
  @media ${props => props.theme.mobile} {
    position: static;
  }
`;
const Picture = styled.div`
  @media ${props => props.theme.desktop} {
    width: 40%;
    background-color: transparent;
    position: relative;
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media ${props => props.theme.mobile} {
    display: none;
  }
`;
const Contents = styled.div`
  width: calc(100% - 40%);
  background-color: transparent;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${props => props.theme.mobile} {
    width: 100%;
    height: 100vh;
  }
`;

function Layout() {
  return (
    <Container>
      <div>
        <Picture>
          <img src={require("../img/flowers.png")} alt='street' />
        </Picture>
        <Contents>
          <Outlet />
          <SideMenu/>
        </Contents>
      </div>
    </Container>
  );
}

export default Layout;
