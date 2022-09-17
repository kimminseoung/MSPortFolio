import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { showHide, showHideChild } from "./About";
import { useRef } from "react";
import { useInterval } from "../hooks/setInterVal";

const HomeCotainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Wrapper = styled(motion.div)`
  padding-left: 6.25rem;
  @media ${props => props.theme.mobile} {
    padding-left: 4.25rem;
  }
  .name {
    font-size: 4.5rem;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 1.875rem;
    color: ${props => props.theme.textColor};
  }
  .line {
    display: inline-block;
    width: 4.375rem;
    height: 0.313rem;
    background-color: ${props => props.theme.bgColor};
    margin-bottom: 1.875rem;
  }
  .button {
    width: 100%;
    & > a {
      text-decoration: none;
      color: ${props => props.theme.bgColor};
      display: inline-block;
      background-color: ${props => props.theme.textColor};
      padding: 1.75rem 2.375rem;
      line-height: 0.375;
      text-transform: none;
      font-weight: 500;
      text-transform: capitalize;
      letter-spacing: 0.063rem;
      border: 2px solid ${props => props.theme.textColor};
      transition: all 0.3s ease;
      &:hover {
        color: ${props => props.theme.textColor};
        background-color: ${props => props.theme.bgColor};
      }
    }
  }
`;
const Animation = styled(motion.h3)`
  font-size: 1.563rem;
  margin-bottom: 2.188rem;
  line-height: 1.875rem;
  font-weight: 400;
  color: ${props => props.theme.textColor};
  display: flex;
  .textanibox {
    margin-left: 0.5rem;
    position: relative;
    transform-origin: 50% 100%;
    & > div {
      position: absolute;
      width: 100%;
      bottom: -1.563rem;
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
      <Wrapper  variants={showHide} initial='start' animate='end'>
        <motion.h3 variants={showHideChild} className='name'>
          Kim MinSeong
        </motion.h3>
        <motion.span variants={showHideChild} className='line' />
        <Animation  variants={showHideChild}>
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
          <Link to='project'>go project</Link>
        </motion.div>
      </Wrapper>
    </HomeCotainer>
  );
}
export default Home;
