import styled from "styled-components";
import { useRecoilState } from "recoil";
import { OpenMobileMenu } from "../etc/atom";

const Menu = styled.div<{ isOpen: boolean }>`
  width: 10%;
  height: 65%;
  z-index: 1111111;
  position: relative;
  & > span {
    position: absolute;
    width: 80%;
    transition: 0.3s ease-in-out;
    height: 2px;
    background-color: ${props=>props.theme.textColor};
    &:nth-child(1) {
      top: ${props => (props.isOpen ? "50%" : "25%")};
      transform: ${props => (props.isOpen ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      top: ${props => (props.isOpen ? "50%" : "50%")};
      opacity: ${props => (props.isOpen ? 0 : 1)};
    }
    &:nth-child(3) {
      top: ${props => (props.isOpen ? "50%" : "75%")};
      transform: ${props => (props.isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
function MobileMenu() {
  const [open,setOpen] = useRecoilState(OpenMobileMenu);
  return (
    <Menu
      className='mMenu'
      onClick={() => {
        setOpen(prev => !prev);
      }}
      isOpen={open}
    >
      <span></span>
      <span></span>
      <span></span>
    </Menu>
  );
}
export default MobileMenu;
