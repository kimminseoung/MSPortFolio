import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { DarkModeValue } from "../../etc/atom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { fetchBoard } from "../../etc/firebase";
import { DocumentData } from "firebase/firestore";
import { Iboard } from "../../pages/Board";

const Contaienr = styled.div`
  margin-top: 4.375rem;
`;
const Wrapper = styled.div<{ isDark: boolean }>`
  width: 60rem;
  margin: 0 auto;
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
  @media ${props => props.theme.mobile} {
    width: 100%;
    padding: 1rem;
  }
`;
const Title = styled.div`
  margin-top: 80px;
  margin-bottom: 30px;
  h3 {
    font-size: 32px;
  }
  b {
    font-size: 1rem;
    margin-left: 20px;
    color: ${props => props.theme.textColor};
  }
  @media ${props => props.theme.mobile} {
    b {
      margin-left: 0;
      margin-top: 0.813rem;
      display: block;
    }
  }
`;
const Text = styled.p<{ isDark: boolean }>`
  color: ${props => (props.isDark ? "#333" : "#fff")};
  background-color: ${props => (props.isDark ? "#Fff" : "#333")};
  border-radius: 0.75rem;
  padding: 1.875rem;
  height: 18.75rem;
  min-height: 18.75rem;
  @media ${props => props.theme.mobile} {
  }
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
    <Contaienr>
      {posts
        .filter(ele => ele.id === Number(id))
        .map(ele => (
          <Wrapper isDark={isDark} key={ele.id}>
            <Link to='/board' className='linkBoard'>
              <HiArrowNarrowLeft className='backBoard' />
            </Link>
            <Title>
              <h3>
                {ele.title}
                <b>작성자: {ele.name}</b>
                <b>{ele.time}</b>
              </h3>
            </Title>
            <Text isDark={isDark}>{ele.text}</Text>
          </Wrapper>
        ))}
    </Contaienr>
  );
}

export default BoardDetail;
