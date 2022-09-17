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
  height: 100%;
  top: 0;
  left: 0;
  z-index: 11111;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${props => props.theme.mobile} {
    padding: 0 1.875rem;
  }
`;
const Contents = styled(motion.div)`
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 1.25rem;
  box-shadow: 0 2px 3px rgba(255, 255, 255, 0.1), 0 10px 20px rgba(255, 255, 255, 0.06);
  display: flex;
  padding: 1.25rem;
  & > div {
    width: 50%;
    h3 {
      font-size: 1.75rem;
    }
    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    a {
      display: block;
      padding-left: 1.375rem;
      margin-top: 0.938rem;
      font-size: 0.875rem;
      cursor: pointer;
      color: dodgerblue;
    }
  }
  .text {
    padding-left: 0.938rem;
    padding-top: 0.938rem;
    & > div {
      margin-bottom: 1.875rem;
    }
  }
  .skillList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-top: 10px;
  }
  @media ${props => props.theme.mobile} {
    padding: 6px;
    & > div {
      width: 100%;
    }
    flex-direction: column-reverse;
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
              <div className='text'>
                <div>
                  <h3>{ele.name}</h3>
                </div>
                <div>◆ 개발기간: {ele.state}</div>
                <div>
                  <span style={{ paddingBottom: "5px" }}>◆ 기술</span>
                  <ul className='skillList'>
                    {ele.skill.map((ele, index) => (
                      <li key={index}>- {ele}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  ◆ GitPage
                  <a href={ele.gitLink}>{ele.gitLink}</a>
                </div>
                <div>
                  ◆ GitCode
                  <a href={ele.gitLink}>{ele.gitCode}</a>
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
