import { Link, useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import styled from "styled-components";
import { useState } from "react";
import { saveData } from "../../etc/firebase";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "../../etc/atom";
const Board = styled.div<{ isDark: boolean }>`
  background-color: ${props => props.theme.bgColor};
  margin-top: 100px;
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
  const navigate = useNavigate();
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
    const boardObj = {
      boardId: Date.now(),
      title,
      text,
      name,
      time:"",
      createdDate: Date.now(),
    };
    if (boardObj.text === "" || boardObj.name === "" || boardObj.text === "") {
      console.log("빈칸입니다.");
      return;
    }
    saveData(boardObj);
    navigate("/board");
  };

  return (
    <Board isDark={isDark}>
      <Link to='/board' className='linkBoard'>
        <HiArrowNarrowLeft className='backBoard' />
      </Link>
      <Form onSubmit={formSubmit} isDark={isDark}>
        <p className='formPart'>
          <b>제목</b>
          <input value={title} type={"text"} onChange={titleChange} />
        </p>
        <p className='formPart'>
          <b>작성자</b>
          <input value={name} type={"text"} onChange={nameChange} />
        </p>
        <p className='formPart'>
          <textarea value={text} onChange={inputText} />
        </p>
        <div id='btns'>
          <button>등록</button>
          <button>취소</button>
        </div>
      </Form>
    </Board>
  );
}
