import styled from "styled-components";
import { useEffect, useState } from "react";
import Pagination from "../components/Board/Pagination";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "./../etc/atom";
import { getBoard } from "../etc/firebase";
import { DocumentData } from "firebase/firestore";

interface isDark {
  isDark: boolean;
}
const Board = styled.div<isDark>`
  background-color: ${props => (props.isDark ? props.theme.bgColor : "#f6fffb")};
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  #title h3 {
    color: ${props => (props.isDark ? "#fff" : "#333")};
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
          color: ${props => (props.isDark ? "#fff" : "#333")};
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
    border: ${props => (props.isDark ? "1px solid #ffffff81" : "1px solid #00000058")};
    span {
      display: inline-block;
      font-size: 14px;
    }
  }
`;
function Etc() {
  const isDark = useRecoilValue(DarkModeValue);
  const [DB, setDB] = useState([]);
  useEffect(() => {
    getBoard().then(data => {
      const make = data.docs.map((doc: DocumentData) => ({
        ...doc.data(),
      }));
      setDB(make);
    });
  }, []);
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then(res => res.json())
  //     .then(data => setPosts(data));
  // }, []);
  const [page, setPage] = useState(1); // 페이지 번호
  const [limit, setLimit] = useState(10); //화면에 보여줄 게시판 글 수
  const [posts, setPosts] = useState([]); // DB에 저장한 글
  const offset = (page - 1) * limit; // 1. 10*0 = 0  2. 10*1=10
  console.log(DB);
  return (
    <Board isDark={isDark}>
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
          <BoardList isDark={isDark}>
            {DB.slice(offset, offset + limit).map(
              (
                { id, title, body, name } // posts.slice(0,8)
              ) => (
                <Link to={id}>
                  <li key={id} style={{ marginBottom: "8px" }}>
                    <span className='textTitle' style={{ width: "calc(100% - 120px)", paddingLeft: "5px", borderRight: "1px solid #ddd" }}>
                      {title}
                    </span>
                    <span style={{ width: "120px", textAlign: "center" }}>{name}</span>
                  </li>
                </Link>
              )
            )}
          </BoardList>
        </main>
        <footer>
          <Pagination total={posts.length} limit={limit} page={page} setPage={setPage} />
        </footer>
      </div>
      <Outlet />
    </Board>
  );
}

export default Etc;
