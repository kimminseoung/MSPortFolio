import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Pagination from "../components/Board/Pagination";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "./../etc/atom";
import { fetchBoard } from "../etc/firebase";
import { DocumentData } from "firebase/firestore";

interface isDark {
  isdark: boolean;
}
const Board = styled.div<isDark>`
  background-color: ${props => (props.isdark ? props.theme.bgColor : "#f6fffb")};
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  #title h3 {
    color: ${props => (props.isdark ? "#fff" : "#333")};
  }
  .wrapper {
    width: 100%;
    height: 500px;
  }
  header {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    margin-bottom: 35px;
    #Btns {
      span {
        margin: 0 12px;
        cursor: pointer;
        padding: 3px;
        &:not(:nth-child(1)) {
          color: ${props => (props.isdark ? "#fff" : "#333")};
        }
      }
    }
    .writeBtn {
      background-color: dodgerblue;
      border-radius: 8px;
      padding: 3px;
      color: #fff;
      transition: 0.5s;
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
  }
  li {
    padding: 8px;
    border-radius: 5px;
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
    border: ${props => (props.isdark ? "1px solid #ffffff81" : "1px solid #00000058")};
    span {
      display: inline-block;
      font-size: 14px;
    }
  }
`;
export interface Iboard {
  createdDate: number;
  id: number | string | undefined;
  name: string;
  text: string;
  title: string;
}

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
  }, [posts]);
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
            <span>
              <HiChevronDoubleDown />
            </span>
            <span>
              <HiChevronDoubleUp />
            </span>
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
                  <span className='textTitle' style={{ width: "calc(100% - 120px)", paddingLeft: "5px", borderRight: "1px solid #ddd" }}>
                    {ele.title}
                  </span>
                  <span style={{ width: "120px", textAlign: "center" }}>{ele.name}</span>
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
