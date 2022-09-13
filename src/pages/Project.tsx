import styled from "styled-components";
import { motion } from "framer-motion";
import TitleForm from "../components/Title";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ModalText } from "../etc/atom";
import { DocumentData } from "firebase/firestore";
import { fetchProject } from "../etc/firebase";

const Container = styled(motion.section)`
  background-color: ${props => (props.theme.bgColor)};
  padding: 65px 20px 20px;
`;
const ContentBox = styled(motion.div)`
  display: grid;
  overflow-y: scroll;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
  flex-wrap: wrap;
`;

const ProjectBox = styled(motion.div)`
  height: 400px;
  background-color: #3e3e3e;
  margin: 5px;
  overflow: hidden;
  position: relative;
  color: #fff;
  .imgBox {
    height: 100%;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      transition: 0.3s;
    }
  }
  & > h3 {
    position: absolute;
    bottom: 0;
    border-radius: 8px;
    text-transform: capitalize;
    width: 250px;
    background-color: #fff;
    font-size: 22px;
    padding: 15px;
    opacity: 0;
    left: 50%;
    transform: translate(-50%, -20%);
    color: #333;
    transition: 0.3s;
    visibility: hidden;
  }
  &:hover h3 {
    bottom: 3%;
    opacity: 1;
    visibility: visible;
  }
  &:hover img {
    transform: scale(1.3);
  }
`;

export interface projectState {
  id: string;
  name: string;
  state: string;
  skill: string[];
  gitLink: string;
  gitCode: string;
  img: string;
}

function Project() {
  const setId = useSetRecoilState(ModalText);

  const [DB, setDB] = useState([]);

  useEffect(() => {
    fetchProject().then(data => {
      const context = data.docs.map((doc: DocumentData) => ({
        ...doc.data(),
      }));
      setDB(context);
    });
  }, []);

  return (
    <Container>
      <div>
        <TitleForm titleName='Project' />
        <ContentBox>
          {DB.map((element: projectState) => (
            <ProjectBox
              key={element.name}
              layoutId={element.name}
              onClick={() => {
                setId(element.id);
              }}
            >
              <div className='imgBox'>
                <img src={require(`../img/${element.img}.png`)} alt={`${element.img}`} />
              </div>
              <h3>{element.name}</h3>
            </ProjectBox>
          ))}
        </ContentBox>
      </div>
    </Container>
  );
}

export default Project;
