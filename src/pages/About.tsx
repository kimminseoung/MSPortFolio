import styled from "styled-components";
import { motion } from "framer-motion";
import TitleForm from "../components/Title";

const Container = styled.section`
  background-color: #f6fbff;
  padding: 65px 20px 20px;
`;
const Wrapper = styled(motion.div)``;
const AboutMe = styled(motion.div)`
  color: #333;
  margin-bottom: 50px;
  .text {
    line-height: 25px;
  }
`;
const TechImage = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  img {
    width: 100%;
    height: 100%;
  }
`;
const TechList = styled.div`
  display: flex;
  padding-top: 10px;
  padding-left: 22px;
  margin-bottom: 15px;
`;
const Subheading = styled.h3`
  text-transform: capitalize;
  letter-spacing: 3px;
  font-weight: 600;
  padding-left: 10px;
`;
export const showHide = {
  start: {
    opacity: 0,
    transition: {
      duration: 0,
      staggerChildren: 0.5,
    },
  },
  end: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.5,
    },
  },
};
export const showHideChild = {
  start: {
    y: -5,
    opacity: 0,
  },
  end: {
    y: 0,
    opacity: 1,
  },
};

function About() {
  return (
    <Container>
      <Wrapper variants={showHide} initial='start' animate='end'>
        <AboutMe variants={showHideChild}>
          <TitleForm titleName='about me' />
          <div className='text'>
            안녕하세요 저는 프론트엔드 개발자가 되고 싶은 김민성입니다.
            <br />
            시간을 내어 제 포트폴리오를 봐주셔서 감사합니다.
          </div>
        </AboutMe>
        <AboutMe variants={showHideChild}>
          <TitleForm titleName='웹 개발자를 하고 싶은 이유와 자바스크립트를 선택한 이유?' />
          <div className='text'>
            무엇을 만들면 바로 결과물이 눈에 보이는게 재미가 있어 웹 개발자에 도전하고 싶어졌다.
            <br />
            개인적으로 효율적인 것을 좋아하는 성향이 있는데 자바스크립트는 서버, 게임 등을 만들 수 있다는 것에
            <br />
            매력을 느껴 선택하게 되었다.
          </div>
        </AboutMe>
        <AboutMe variants={showHideChild}>
          <TitleForm titleName='- education' />
          <div className='text'>
            <ul style={{ listStyle: "circle", paddingLeft: "20px" }}>
              <li>2022.03 ~ 서울사이버대학교(컴퓨터공학과) ※재학중</li>
              <li>2020.10 ~ 2021.02 더조은컴퓨터아카데미 - 웹 디자인 및 웹 퍼블리셔 과정 수료</li>
              <li>2012.03 ~ 2015 수원과학대학(정보통신과)</li>
            </ul>
          </div>
        </AboutMe>
        <AboutMe variants={showHideChild}>
          <TitleForm titleName='- certificate' />
          <div className='text'>
            <ul style={{ listStyle: "circle", paddingLeft: "20px" }}>
              <li>정보처리산업기사(2013)</li>
            </ul>
          </div>
        </AboutMe>
        <AboutMe variants={showHideChild}>
          <TitleForm titleName='Front end' />
          <div className='stacks'>
            <div>
              <Subheading>- basic</Subheading>
              <TechList>
                <TechImage>
                  <img src={require("../img/html.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/css.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/js.png")} alt='' />
                </TechImage>
              </TechList>
            </div>
            <div>
              <Subheading>- library</Subheading>
              <TechList>
                <TechImage>
                  <img src={require("../img/react.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/styled-component.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/recoil.jpg")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/react-query.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/hookForm.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/framer-motion.png")} alt='' />
                </TechImage>
              </TechList>
            </div>
            <div>
              <Subheading>- framework</Subheading>
              <TechList>
                <TechImage>
                  <img src={require("../img/nextjs.png")} alt='' />
                </TechImage>
              </TechList>
            </div>
            <div>
              <Subheading>- Others</Subheading>
              <TechList>
                <TechImage>
                  <img src={require("../img/github.png")} alt='' />
                </TechImage>
              </TechList>
            </div>
            {/* <div>
              <Subheading>- currently studying</Subheading>
              <TechList>
                <TechImage>
                  <img src={require("../img/node.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/express.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/js.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/typescript.png")} alt='' />
                </TechImage>
                <TechImage>
                  <img src={require("../img/mongo.png")} alt='' />
                </TechImage>
              </TechList>
            </div> */}
          </div>
        </AboutMe>
      </Wrapper>
    </Container>
  );
}

export default About;
