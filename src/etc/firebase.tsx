// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 게시판 데이터 저장하기
interface saveDataProps {
  title: string;
  text: string;
  name: string;
  createdDate: number;
  boardId: number;
  time: string;
}
export const saveData = async ({ title, text, name, createdDate, boardId, time }: saveDataProps) => {
  await setDoc(
    doc(db, "boards", `${boardId}`),
    {
      time,
      title,
      text,
      name,
      createdDate,
      id: boardId,
    },
    { merge: true }
  );
};

// 게시판 목록 읽어오기
export const fetchBoard = async (): Promise<DocumentData> => {
  const BoardDB = await getDocs(collection(db, "boards"));
  return BoardDB;
};

// 프로젝트 읽어오기
export const fetchProject = async (): Promise<DocumentData> => {
  const ProDB = await getDocs(collection(db, "Projects"));
  return ProDB;
};

/* export const fetchBoard2 = async () => {
  const citiesRef = collection(db, "Projects");
    await setDoc(doc(citiesRef, "1"), {
      id: "1",
      name: "넷플릭스 클론코딩",
      state: "2022.09",
      gitCode: "https://github.com/kimminseoung/NetFlix_clone",
      gitLink: " https://kimminseoung.github.io/NetFlix_clone/",
      img: "netflix",
      skill: ["React", "TypeScript", "framer-motion", "styled-components", "Recoil", "react - router","swiper"],
    });

  // await setDoc(doc(citiesRef, "1"), {
  //   id: "1",
  //   name: "나의 포트폴리오",
  //   state: "2022.08~2022.09",
  //   gitCode: "https://github.com/kimminseoung/PortFolio",
  //   gitLink: "https://kimminseoung.github.io/portfolio/",
  //   img: "myhome",
  //   skill: ["React", "TypeScript", "framer-motion", "styled-components", "Recoil", "react - router"],
  // });

  // await setDoc(doc(citiesRef, "2"), {
  //   id: "2",
  //   name: "Lottery",
  //   state: "2022.08",
  //   gitCode: "https://github.com/kimminseoung/Lottery",
  //   gitLink: "https://kimminseoung.github.io/Lottery/",
  //   img: "lottery",
  //   skill: ["HTML", "CSS", "JavaScript"],
  // });

  // await setDoc(doc(citiesRef, "3"), {
  //   id: "3",
  //   name: "코인정보 사이트",
  //   state: "2022.06",
  //   gitCode: "https://kimminseoung.github.io/K_Coin/",
  //   gitLink: "https://kimminseoung.github.io/K_Coin/",
  //   img: "coininfo",
  //   skill: ["React", "TypeScript", "framer-motion", "styled-components", "Recoil", "react - router"],
  // });

  // await setDoc(doc(citiesRef, "4"), {
  //   id: "4",
  //   name: "todoList",
  //   state: "2022.06",
  //   gitCode: "https://github.com/kimminseoung/ToyApp",
  //   gitLink: "https://kimminseoung.github.io/ToyApp/",
  //   img: "todolist",
  //   skill: ["HTML", "CSS", "JavaScript"],
  // });

  // await setDoc(doc(citiesRef, "5"), {
  //   id: "5",
  //   name: "카드 짝 맞추기",
  //   state: "2022.08",
  //   gitCode: "https://github.com/kimminseoung/Card-matching-Game",
  //   gitLink: "https://kimminseoung.github.io/Card-matching-Game",
  //   img: "cardgame",
  //   skill: ["HTML", "CSS", "JavaScript"],
  // });
}; */
