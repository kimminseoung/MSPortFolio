import { Link, useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import styled from "styled-components";
import { saveData } from "../../etc/firebase";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "../../etc/atom";
import { useForm } from "react-hook-form";
const Board = styled.div<{ isdark: boolean }>`
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
    color: ${props => (props.isdark ? "#Fff" : "#333")};
  }
`;
const Form = styled.form<{ isdark: boolean }>`
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
      color: ${props => (props.isdark ? "#Fff" : "#333")};
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
      cursor: pointer;
      color: #333;
      padding: 15px 70px;
      border-radius: 8px;
      transition: 0.3s;
      border: 1px solid #ddd;
      &:first-child {
        margin-right: 5px;
        background-color: #333;
        color: #fff;
        &:hover {
          background-color: dodgerblue;
          font-weight: bold;
        }
      }
      &:last-child {
        color: #333;
        &:hover {
          background-color: crimson;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
`;
type FormValues = {
  boardId: number;
  title: string;
  text: string;
  name: string;
  time: string;
  createdDate: number;
};
export default function WriteBoard() {
  const navigate = useNavigate();
  const isDark = useRecoilValue(DarkModeValue);

  const formSubmit = ({ text, name, title }: FormValues) => {
    const Board = {
      boardId: Date.now(),
      title,
      text,
      name,
      time: new Date().toLocaleString(),
      createdDate: Date.now(),
    };
    saveData(Board);
    navigate("/board");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <Board isdark={isDark}>
      <Link to='/board' className='linkBoard'>
        <HiArrowNarrowLeft className='backBoard' />
      </Link>
      <Form onSubmit={handleSubmit(formSubmit)} isdark={isDark}>
        <p className='formPart'>
          <b>제목</b>
          <input {...register("title", { required: "제목 입력은 필수입니다." })} />
          <small style={{ color: "Red", marginLeft: "15px" }}>{errors.title?.message}</small>
        </p>
        <p className='formPart'>
          <b>작성자</b>
          <input {...register("name", { required: "작성자 이름 입력은 필수입니다." })} />
          <small style={{ color: "Red", marginLeft: "15px" }}>{errors.name?.message}</small>
        </p>
        <p className='formPart'>
          <textarea {...register("text", { required: "내용을 적어주세요 ^^" })} />
          <small style={{ color: "Red" }}>{errors.text?.message}</small>
        </p>
        <div id='btns'>
          <button>등록</button>
          <button
            onClick={() => {
              navigate("/board");
            }}
          >
            취소
          </button>
        </div>
      </Form>
    </Board>
  );
}
