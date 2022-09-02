import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: #000;
  z-index: 111;
  color: red;
`;
const inOut = {
  init: {
    x: -5,
  },
  show: {
    x: 0,
    transition: {
      duration: 2,
      delay:2
    },
  },
};
function DarkMode() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return show ? <Container variants={inOut} initial="init" animate="show">다크모드</Container> : null;
}

export default DarkMode;
