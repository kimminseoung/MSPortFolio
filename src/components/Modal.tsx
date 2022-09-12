import styled from "styled-components";
import { useRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { ModalText } from "../etc/atom";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { projectState } from "../pages/Project";
import { fetchProject } from "../etc/firebase";

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 11111;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Contents = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(255, 255, 255, 0.1), 0 10px 20px rgba(255, 255, 255, 0.06);
  display: flex;
  padding: 20px;
  & > div {
    width: 50%;
    h3 {
      font-size: 28px;
    }
    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & > * {
      margin-bottom: 15px;
    }
  }
`;
const modalBackGround = {
  init: {
    backgroundColor: "rgba(0,0,0,0)",
    opacity: 0,
    visiBility: "hidden",
  },
  start: {
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    visiBility: "visible",
  },
  end: {
    opacity: 0,
    backgroundColor: "rgba(0,0,0,0)",
    visiBility: "hidden",
  },
};
const modalForm = {
  init: {
    width: 0,
    height: 0,
    y: 10,
    opacity: 0,
  },
  start: {
    width: 730,
    height: 500,
    opacity: 1,
    y: 0,
  },
  end: {
    width: 0,
    height: 200,
    opacity: 0,
    y: 10,
  },
};
function Modal() {
  const [id, setId] = useRecoilState(ModalText);
  const [DB, setDB] = useState([]);
  useEffect(() => {
    fetchProject().then(data => {
      const context = data.docs.map((doc: DocumentData) => ({
        ...doc.data(),
      }));
      setDB(context);
    });
    return () => {
      fetchProject();
    };
  }, []);
  return (
    <AnimatePresence>
      {id ? (
        <Overlay
          onClick={() => {
            setId("");
          }}
          variants={modalBackGround}
          initial='init'
          animate='start'
          exit={"end"}
        >
          {DB.filter((ele: any) => ele.id === id).map((ele: projectState) => (
            <Contents variants={modalForm} initial='init' animate='start' exit={"end"} key={ele.id} layoutId={id}>
              <div>
                <img src={require(`../img/${ele.img}.png`)} alt={`${ele.img}`} />
              </div>
              <div style={{ paddingLeft: "15px", paddingTop: "50px" }}>
                <h3>{ele.name}</h3>
                <div>◆ 개발기간: {ele.state}</div>
                <ul>
                  <li style={{ paddingBottom: "5px" }}>◆ 기술</li>
                  {ele.skill.map((ele, index) => (
                    <li key={index} style={{ paddingLeft: "20px", marginBottom: "5px" }}>
                      - {ele}
                    </li>
                  ))}
                </ul>
                <div>
                  ◆ GitPage
                  <br />
                  <a style={{ paddingLeft: "22px", fontSize: "14px", paddingTop: "5px" }} href={ele.gitLink}>
                    {ele.gitLink}
                  </a>
                </div>
                <div>
                  ◆ GitCode
                  <br />
                  <a style={{ paddingLeft: "22px", fontSize: "14px", paddingTop: "5px" }} href={ele.gitLink}>
                    {ele.gitCode}
                  </a>
                </div>
              </div>
            </Contents>
          ))}
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
}
export default Modal;
