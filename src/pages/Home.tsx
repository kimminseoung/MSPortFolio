import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { showHide, showHideChild } from "./About";
import { useRef } from "react";
import { useInterval } from "../hooks/setInterVal";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "./../etc/atom";
const HomeCotainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${props => props.theme.secondBgColor};
  align-items: center;
  & > * {
    user-select: none;
  }
`;
const Wrapper = styled(motion.div)<{ isdark: boolean }>`
  padding-left: 100px;
  .name {
    font-size: 72px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 30px;
    color: ${props => props.theme.textColor};
  }
  .line {
    display: inline-block;
    width: 70px;
    height: 5px;
    background-color: ${props => props.theme.textColor};
    margin-bottom: 30px;
  }
  .button {
    width: 100%;
    & > a {
      text-decoration: none;
      color: ${props => props.theme.bgColor};
      display: inline-block;
      background-color: ${props => props.theme.textColor};
      padding: 28px 38px;
      line-height: 6px;
      text-transform: none;
      font-weight: 500;
      font-size: 16px;
      text-transform: capitalize;
      letter-spacing: 1px;
      border: ${props => (props.isdark ? "2px solid #fff" : "2px solid #333")};
      transition: all 0.3s ease;
      &:hover {
        color: ${props => (props.isdark ? props.theme.textColor : props.theme.textColor)};
        background-color: ${props => (props.isdark ? props.theme.bgColor : "#ddd")};
      }
    }
  }
`;
const Animation = styled(motion.h3)<{ isdark: boolean }>`
  font-size: 25px;
  margin-bottom: 35px;
  line-height: 30px;
  font-weight: 400;
  color: ${props => (props.isdark ? "dodgerblue" : "#7d7789")};
  display: flex;
  .textanibox {
    margin-left: 8px;
    position: relative;
    transform-origin: 50% 100%;
    & > div {
      position: absolute;
      width: 100%;
      bottom: -25px;
      color: ${props => props.theme.textColor};
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
  const isDark = useRecoilValue(DarkModeValue);
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
      <Wrapper isdark={isDark} variants={showHide} initial='start' animate='end'>
        <motion.h3 variants={showHideChild} className='name'>
          Kim MinSeong
        </motion.h3>
        <motion.span variants={showHideChild} className='line' />
        <Animation isdark={isDark} variants={showHideChild}>
          Creative
          <div className='textanibox' ref={divtag}>
            {msgArr.map((m, i) => (
              <div className='isHidden' key={i}>
                {m}
              </div>
            ))}
          </div>
        </Animation>
        <motion.div variants={showHideChild} className='button'>
          <Link to='board'>contact me</Link>
        </motion.div>
      </Wrapper>
    </HomeCotainer>
  );
}
export default Home;
