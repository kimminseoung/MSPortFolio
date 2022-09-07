import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { DarkModeValue } from "../etc/atom";
interface ContainerProps {
  bgcolor: boolean;
}
const Container = styled(motion.div)<ContainerProps>`
  position: absolute;
  bottom: 60px;
  right: 50px;
  width: 50px;
  height: 50px;
  background-color: ${props => (props.bgcolor ? "#dff9fb" : "#273c75")};
  font-size: 24px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  box-shadow: ${props => (props.bgcolor ? "0 0 10px rgba(0, 0, 0, 0.5)" : "")};
  z-index: 111;
  color: red;
  transition: 0.5s;
`;
const inOut = {
  init: {
    x: -5,
  },
  show: {
    x: 0,
    transition: {
      duration: 2,
      delay: 2,
    },
  },
};
const updown = {
  hover: {
    hide: {
      y: -5,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2,
        delay: 2,
      },
    },
  },
};
function DarkMode() {
  const [show, setShow] = useState(false);
  const [dark, setDark] = useRecoilState(DarkModeValue);
  useEffect(() => {
    setShow(true);
  }, []);

  return show ? (
    <Container
      variants={inOut}
      whileHover={"hover"}
      initial='init'
      animate='show'
      bgcolor={dark}
      onClick={() => {
        setDark(prev => !prev);
      }}
    >
      {dark ? (
        <>
          <BsSunFill style={{ color: "orangered" }} />
        </>
      ) : (
        <>
          <BsFillMoonStarsFill style={{ color: "yellow" }} />
        </>
      )}
    </Container>
  ) : null;
}

export default DarkMode;
