import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { DarkModeValue } from "../../etc/atom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { fetchBoard } from "../../etc/firebase";
import { DocumentData } from "firebase/firestore";
import { Iboard } from "../../pages/Board";

const Contaienr = styled.div<{ isDark: boolean }>`
  margin-top: 70px;
  color: ${props => (props.isDark ? "#Fff" : "#333")};
  background-color: ${props => props.theme.bgColor};
  .linkBoard {
    position: relative;
    &:hover::after {
      opacity: 1;
      bottom: -5px;
    }
    &::after {
      position: absolute;
      opacity: 0;
      right: -60px;
      transition: 0.45s;
      bottom: -10px;
      content: "뒤로가기";
      width: 70px;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: #fff;
      border-radius: 8px;
      z-index: 1111;
    }
    .backBoard {
      margin-top: 24px;
      font-size: 36px;
    }
  }
`;
const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
`;
const Title = styled.div`
  margin-top: 80px;
  margin-bottom: 30px;
  h3 {
    font-size: 32px;
  }
  b {
    font-size: 16px;
    margin-left: 20px;
    color: #ddd;
  }
`;
const Text = styled.p<{ isDark: boolean }>`
  color: ${props => (props.isDark ? "#333" : "#fff")};
  background-color: ${props => (props.isDark ? "#Fff" : "#333")};
  border-radius: 12px;
  padding: 30px;
  height: 300px;
  min-height: 300px;
`;

function BoardDetail() {
  const isDark = useRecoilValue(DarkModeValue);
  const [posts, setPosts] = useState<Iboard[]>([]); // DB에 저장한 글
  const { id } = useParams();
  useEffect(() => {
    fetchBoard().then(data => {
      const context = data.docs.map((doc: DocumentData) => ({
        ...doc.data(),
      }));
      setPosts(context);
    });
    return () => {
      fetchBoard();
    };
  }, []);
  return (
    <>
      {posts
        // eslint-disable-next-line eqeqeq
        .filter(ele => ele.id == id)
        .map(ele => (
          <Contaienr isDark={isDark} key={ele.id}>
            <Link to='/board' className='linkBoard'>
              <HiArrowNarrowLeft className='backBoard' />
            </Link>
            <Wrapper>
              <Title>
                <h3>
                  {ele.title}
                  <b>작성자: {ele.name}</b>
                  <b>{ele.time}</b>
                </h3>
              </Title>
              <Text isDark={isDark}>{ele.text}</Text>
            </Wrapper>
          </Contaienr>
        ))}
    </>
  );
}

export default BoardDetail;
