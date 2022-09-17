import styled from "styled-components";
import { motion } from "framer-motion";
import TitleForm from "../components/Title";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ModalText } from "../etc/atom";
import { DocumentData } from "firebase/firestore";
import { fetchProject } from "../etc/firebase";

const Container = styled(motion.section)`
  padding: 5.75rem 3.25rem 0;
  @media ${props => props.theme.mobile} {
    padding: 5.75rem 20px 0;
  }
`;
const ContentBox = styled(motion.div)`
  margin-top: 1.875rem;
  display: grid;
  overflow-y: scroll;
  grid-template-columns: repeat(2, 1fr);
  @media ${props => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ProjectBox = styled(motion.div)`
  height: 27.25rem;
  background-color: #3e3e3e;
  margin: 1.563rem;
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
  .title {
    position: absolute;
    bottom: 0;
    border-radius: 8px;
    text-transform: capitalize;
    width: 95%;
    height: 80px;
    line-height: 80px;
    padding-left: 20px;
    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.bgColor};
    font-size: 1rem;
    left: 50%;
    border: 1px solid ${props=>props.theme.bgColor};
    transform: translate(-50%, -20%);
    transition: 0.3s;
    opacity: 0;
    visibility: hidden;
  }
  &:hover .title {
    bottom: 3%;
    opacity: 1;
    visibility: visible;
  }
  @media ${props => props.theme.mobile} {
    margin: 1rem;
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
    return () => {
      fetchProject();
    };
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
              <h3 className="title">{element.name}</h3>
            </ProjectBox>
          ))}
        </ContentBox>
      </div>
    </Container>
  );
}

export default Project;
