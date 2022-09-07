import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import styled from "styled-components";
import { useState } from "react";
import { putData } from "../../etc/firebase";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "../../etc/atom";
const Board = styled.div<{ isDark: boolean }>`
  background-color: ${props => props.theme.bgColor};
  height: 100%;
  padding: 0 20px;
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
  }
  .backBoard {
    margin-top: 24px;
    font-size: 36px;
    color: ${props => (props.isDark ? "#Fff" : "#333")};
  }
`;
const Form = styled.form<{ isDark: boolean }>`
  margin-top: 30px;
  .formPart {
    margin-bottom: 10px;
    input {
      width: 100%;
      height: 30px;
    }
    b {
      display: block;
      margin-bottom: 10px;
      font-size: 14px;
      color: ${props => (props.isDark ? "#Fff" : "#333")};
    }
    input,
    textarea {
      border: 1px solid #ddd;
      border-radius: 3px;
    }
    textarea {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      height: 250px;
      min-height: 250px;
    }
  }

  #btns {
    float: right;
    button {
      border: none;
      background-color: #fff;
      color: #333;
      padding: 5px;
      border-radius: 8px;
      border: 1px solid #ddd;
      &:first-child {
        margin-right: 5px;
        background-color: #333;
        color: #fff;
      }
    }
  }
`;
export default function WriteBoard() {
  const isDark = useRecoilValue(DarkModeValue);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setName(value);
  };
  const inputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setText(value);
  };
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const boardObj = {
      title,
      text,
      name,
      createdDate: Date.now(),
      boardId: Date.now(),
    };
    console.log(boardObj);
    putData(boardObj);
  };
  return (
    <Board isDark={isDark}>
      <Link to='/board' className='linkBoard'>
        <HiArrowNarrowLeft className='backBoard' />
      </Link>
      <Form onSubmit={formSubmit} isDark={isDark}>
        <p className='formPart'>
          <b>제목</b>
          <input value={title} type={"text"} onChange={titleChange} placeholder=' 이곳에 글 제목을 넣어주세요 ^^ ' />
        </p>
        <p className='formPart'>
          <b>작성자</b>
          <input value={name} type={"text"} onChange={nameChange} placeholder='이름' />
        </p>
        <p className='formPart'>
          <textarea value={text} onChange={inputText} placeholder=' 이곳에 글 내용을 넣어주세요 ^^' />
        </p>
        <div id='btns'>
          <button>
            <Link to='/board'>등록</Link>
          </button>
          <button>
            <Link to='/board'>취소</Link>
          </button>
        </div>
      </Form>
    </Board>
  );
}
