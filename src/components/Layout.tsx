import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideMenu from "./SideMenu";

const Container = styled.main`
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
  @media ${props => props.theme.mobile} {
    position: static;
  }
`;
const Picture = styled.div`
  width: 35%;
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  @media ${props => props.theme.mobile} {
    display: none;
  }
`;
const Contents = styled.div`
  width: calc(100% - 35%);
  background-color: ${props => props.theme.bgColor};
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
          <img src={require("../img/ride.png")} alt='street' />
        </Picture>
        <Contents>
          <Outlet />
          <SideMenu />
        </Contents>
      </div>
    </Container>
  );
}

export default Layout;
