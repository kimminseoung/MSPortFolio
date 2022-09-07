import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { putData } from "../etc/firebase";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "./../etc/atom";
const Board = styled.div<{ isDark: boolean }>`
  background-color: dodgerblue;
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
    color: #fff;
  }
`;
const Form = styled.form`
  margin-top: 60px;
  #text {
    display: flex;
  }
  input,
  textarea {
    border: none;
    &:focus {
      outline: none;
    }
  }
  textarea {
    margin: 20px 0;
    border-radius: 3px;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 250px;
    min-height: 250px;
  }
  input {
    width: 250px;
    height: 30px;
    border-radius: 3px;
    &:nth-child(2) {
      width: 100px;
      margin-left: 10px;
    }
  }
  #btns {
    float: right;
    button {
      border: none;
      background-color: #fff;
      color: #000;
      padding: 5px;
      border-radius: 8px;
      &:first-child {
        margin-right: 5px;
        background-color: #000;
        color: #fff;
      }
      &:last-child {
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
      boardId:Date.now()
    };
    console.log(boardObj)
    putData(boardObj);
  };
  return (
    <Board isDark={isDark}>
      <Link to='/board' className='linkBoard'>
        <HiArrowNarrowLeft className='backBoard' />
      </Link>
      <Form onSubmit={formSubmit}>
        <input value={title} type={"text"} onChange={titleChange} placeholder=' 이곳에 글 제목을 넣어주세요 ^^ ' />
        <input value={name} type={"text"} onChange={nameChange} placeholder='이름' />
        <textarea value={text} onChange={inputText} placeholder=' 이곳에 글 내용을 넣어주세요 ^^' />
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
