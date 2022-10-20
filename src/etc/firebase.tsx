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
    skill: ["React", "TypeScript", "framer-motion", "styled-components", "Recoil", "react - router", "swiper"],
    text: "React,TypeScript를 활용한 넷플릭스 클론코딩 입니다. Movie,Tv,Search 페이지로 으로 구성 되어있습니다. 반응형으로 만들었습니다.",
  });

  await setDoc(doc(citiesRef, "2"), {
    id: "2",
    name: "나의 포트폴리오",
    state: "2022.08~2022.09",
    gitCode: "https://github.com/kimminseoung/PortFolio",
    gitLink: "https://kimminseoung.github.io/portfolio/",
    img: "myhome",
    skill: ["React", "TypeScript", "framer-motion", "styled-components", "Recoil", "react - router"],
    text: "React로 만들어진 포트폴리오 사이트입니다. 주요 페이지는 About,Project,Board(게시판)으로 구성되어 있고 게시판 페이지는 파이어베이스를 활용하여 누구에게나 로그인을 안하고 이용 할 수 있도록 만들어봤습니다.",
  });

  await setDoc(doc(citiesRef, "3"), {
    id: "3",
    name: "코인정보 사이트",
    state: "2022.06",
    gitCode: "https://github.com/kimminseoung/World-ALL-Coin",
    gitLink: "https://kimminseoung.github.io/World-ALL-Coin/",
    img: "coininfo",
    skill: ["React", "TypeScript", "framer-motion", "styled-components", "Recoil", "react - router"],
    text: "React와 코인파프리카 API를 활용하여 만든 코인사이트 입니다. 타입스크립트와 상태관리 라이브러리 Recoil를 활용한 다크모드, 코인파프리카 API를 활용하여 만든 Chart가 있습니다.",
  });
  await setDoc(doc(citiesRef, "4"), {
    id: "4",
    name: "Lottery",
    state: "2022.08",
    gitCode: "https://github.com/kimminseoung/Lottery",
    gitLink: "https://kimminseoung.github.io/Lottery/",
    img: "lottery",
    skill: ["HTML", "CSS", "JavaScript"],
    text: "자바스크립트로 공부하다가 재미로 만들어 본 로또 추첨기입니다.",
  });
  await setDoc(doc(citiesRef, "5"), {
    id: "5",
    name: "todoList",
    state: "2022.06",
    gitCode: "https://github.com/kimminseoung/ToyApp",
    gitLink: "https://kimminseoung.github.io/ToyApp/",
    img: "todolist",
    skill: ["HTML", "CSS", "JavaScript"],
    text: "자바스크립트 처음 공부하면서 만든 크롬 APP 입니다. 날씨 API이용하여 만든 그날의 날씨와 Geolocation API를 이용한 내가 있는 위치를 알려줍니다.",
  });

  await setDoc(doc(citiesRef, "6"), {
    id: "6",
    name: "카드 짝 맞추기",
    state: "2022.08",
    gitCode: "https://github.com/kimminseoung/Card-matching-Game",
    gitLink: "https://kimminseoung.github.io/Card-matching-Game",
    img: "cardgame",
    skill: ["HTML", "CSS", "JavaScript"],
    text: "",
  });
};

fetchBoard2();  */