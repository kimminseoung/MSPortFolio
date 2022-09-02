import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { showHide, showHideChild } from "./About";
import { useEffect, useRef } from "react";
import { useInterval } from "../hooks/setInterVal";
const HomeCotainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f6fbff;
  align-items: center;
  & > * {
    user-select: none;
  }
`;
const Wrapper = styled(motion.div)`
  padding-left: 100px;
  .name {
    font-size: 72px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 30px;
  }
  .line {
    display: inline-block;
    width: 70px;
    height: 5px;
    background-color: #333;
    margin-bottom: 30px;
  }
  .job {
    font-size: 25px;
    margin-bottom: 35px;
    line-height: 30px;
    font-weight: 400;
    color: #7d7789;
    display: flex;
  }
  .button {
    width: 100%;
    height: auto;
    clear: both;
    float: left;
    & > a {
      text-decoration: none;
      color: #fff;
      display: inline-block;
      background-color: #333;
      padding: 28px 38px;
      line-height: 6px;
      text-transform: none;
      border: 2px solid #333;
      font-weight: 500;
      font-size: 16px;
      text-transform: capitalize;
      letter-spacing: 1px;
      transition: all 0.3s ease;
      &:hover {
        background-color: transparent;
        color: #333;
      }
    }
  }
  .textanibox {
    margin-left: 8px;
    position: relative;
    transform-origin: 50% 100%;
    & > div {
      position: absolute;
      width: 100%;
      bottom: -25px;
      color: #343434;
      transition: 0.5s;
      font-weight: bold;
      &.isActive {
        opacity: 1;
        bottom: 0px;
        visibility: visible;
        transform: rotateX(0deg);
      }
      &.isHidden {
        visibility: hidden;
        opacity: 0;
        transform: rotateX(-180deg);
      }
    }
  }
`;

function Home() {
  const divtag = useRef<HTMLDivElement>(null);
  let arrIndex = 0;
  const WORD_TYPING_SPEED = 2000;
  const msgArr = ["Newcomer", "Developer", "Thinker"];
  const onChangeMsg = () => {
    if (divtag.current) {
      if (arrIndex === 0) {
        divtag?.current.children[0].classList.replace("isHidden", "isActive");
        divtag?.current.children[1].classList.replace("isActive", "isHidden");
        divtag?.current.children[2].classList.replace("isActive", "isHidden");
      } else if (arrIndex === 1) {
        divtag?.current.children[0].classList.replace("isActive", "isHidden");
        divtag?.current.children[1].classList.replace("isHidden", "isActive");
        divtag?.current.children[2].classList.replace("isHidden", "isHidden");
      } else if (arrIndex === 2) {
        divtag?.current.children[0].classList.replace("isActive", "isHidden");
        divtag?.current.children[1].classList.replace("isActive", "isHidden");
        divtag?.current.children[2].classList.replace("isHidden", "isActive");
      }
      arrIndex++;
      if (arrIndex === 3) {
        arrIndex = 0;
      }
    }
  };
  useInterval(() => {
    onChangeMsg();
  }, WORD_TYPING_SPEED);

  return (
    <HomeCotainer>
      <Wrapper variants={showHide} initial='start' animate='end'>
        <motion.h3 variants={showHideChild} className='name'>
          Kim MinSeong
        </motion.h3>
        <motion.span variants={showHideChild} className='line'></motion.span>
        <motion.h3 variants={showHideChild} className='job'>
          Creative
          <div className='textanibox' ref={divtag}>
            {msgArr.map((m, i) => (
              <div className='isHidden' key={i}>
                {m}
              </div>
            ))}
          </div>
        </motion.h3>
        <motion.div variants={showHideChild} className='button'>
          <Link to='etc'>contact me</Link>
        </motion.div>
      </Wrapper>
    </HomeCotainer>
  );
}
export default Home;
