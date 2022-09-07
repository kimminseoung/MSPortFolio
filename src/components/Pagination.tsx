import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { DarkModeValue } from "./../etc/atom";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 12px;
`;
const Button = styled.button<{ isDark: boolean }>`
  border: none;
  border-radius: 8px;
  box-shadow: ${props => (props.isDark ? "0 0 5px rgba(255, 255, 255, 0.2)" : "0 0 5px rgba(0, 0, 0, 0.2)")};
  padding: 10px;
  margin: 0;
  background: ${props => (props.isDark ? "#333" : "#fff")};
  color: ${props => (props.isDark ? "#fff" : "#333")};
  font-size: 1rem;
  transition: 0.5s;
  cursor: pointer;
  &[disabled] {
    cursor: revert;
    transform: revert;
    background-color: ${props => (props.isDark ? "#ffffffa0" : "#333333a0")};
    color: ${props => (props.isDark ? "#333" : "#fff")};
  }
  &[aria-current] {
    font-weight: bold;
    background-color: dodgerblue;
    color: #fff;
    cursor: revert;
    transform: revert;
  }
  &:not(:first-child, :last-child, [aria-current]):hover {
    background: ${props => (props.isDark ? "#ffffffae" : "#333")};
    color: #fff;
    transform: translateY(-2px);
  }
`;
interface paging {
  total: number;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function Pagination({ total, limit, page, setPage }: paging) {
  const numPages: number = Math.ceil(total / limit);
    const isDark = useRecoilValue(DarkModeValue);
  return (
    <Nav>
      <Button isDark={isDark} className='btn' onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill(0)
        .map((ele, i) => (
          <Button isDark={isDark} key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? "page" : undefined}>
            {i + 1}
          </Button>
        ))}
      <Button isDark={isDark} className='btn' onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
}

export default Pagination;
