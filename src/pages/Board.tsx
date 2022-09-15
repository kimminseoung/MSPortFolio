import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Pagination from "../components/Board/Pagination";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "./../etc/atom";
import { fetchBoard } from "../etc/firebase";
import { DocumentData } from "firebase/firestore";
export interface Iboard {
  createdDate: number;
  id: number | string | undefined;
  name: string;
  text: string;
  title: string;
  time: string;
}

interface isDark {
  isdark: boolean;
}
const Board = styled.div<isDark>`
  background-color: ${props => (props.isdark ? props.theme.bgColor : "#f6fffb")};
  height: 100%;
  padding: 0 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  #title h3 {
    color: ${props => (props.isdark ? "#fff" : "#333")};
  }
  .wrapper {
    width: 100%;
    height: 31.25rem;
  }
  header {
    display: flex;
    padding: 0 1.25rem;
    justify-content: space-between;
    margin-bottom: 2.188rem;
    /* #Btns {
      span {
        margin: 0 12px;
        cursor: pointer;
        padding: 3px;
        &:not(:nth-child(1)) {
          color: ${props => (props.isdark ? "#fff" : "#333")};
        }
      }
    } */
    .writeBtn {
      background-color: dodgerblue;
      border-radius: 8px;
      color: #fff;
      transition: 0.5s;
      padding: 0.625rem 1.25rem;
      &:hover {
        background-color: orangered;
      }
    }
  }
`;
const BoardList = styled.ul<isDark>`
  .textTitle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: calc(100% - 7.5rem);
    padding-left: 0.313rem;
    border-right: 1px solid #ddd;
  }
  .titleName {
    width: 7.5rem;
    text-align: center;
  }
  li {
    padding: 0.5rem;
    border-radius: 0.313rem;
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
    border: ${props => (props.isdark ? "1px solid #ffffff81" : "1px solid #00000058")};
    span {
      display: inline-block;
      font-size: 0.875rem;
    }
  }
`;

function Etc() {
  const isDark = useRecoilValue(DarkModeValue); // 다크모드 상태
  const [page, setPage] = useState(1); // 페이지 번호
  const limit = useRef<number>(10); //화면에 보여줄 게시판 글 수
  const [posts, setPosts] = useState<Iboard[]>([]); // DB에 저장한 글

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
  const offset = (page - 1) * limit.current;
  return (
    <Board isdark={isDark}>
      <div className='wrapper'>
        <header>
          <div id='title'>
            <h3>게시판</h3>
          </div>
          <div id='Btns'>
            <span className='writeBtn'>
              <Link to={"WriteBoard"}>글쓰기</Link>
            </span>
            {/*             <span>
              <HiChevronDoubleDown />
            </span>
            <span>
              <HiChevronDoubleUp />
            </span> */}
          </div>
        </header>
        <main>
          <BoardList isdark={isDark}>
            {posts.slice(offset, offset + limit.current).map(ele => (
              <Link
                key={ele.id}
                to={{
                  pathname: `/board/${ele.id}`,
                }}
              >
                <li style={{ marginBottom: "8px" }}>
                  <span className='textTitle'>{ele.title}</span>
                  <span className='titleName'>{ele.name}</span>
                </li>
              </Link>
            ))}
          </BoardList>
        </main>
        <footer>
          <Pagination total={posts.length} limit={limit.current} page={page} setPage={setPage} />
        </footer>
      </div>
      <Outlet />
    </Board>
  );
}

export default Etc;
