import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
// import { getBoardDetail } from "../../etc/firebase";
// import { fetchBoardDetail } from "../../etc/firebase";

const Contaienr = styled.div`
  height: 100%;
  background-color: #fff;
`;

function BoardDetail() {
  const state = useLocation();
  const id = state.pathname.slice(7);
  // fetchBoardDetail(id)
  return <Contaienr>{id}</Contaienr>;
}

export default BoardDetail;
