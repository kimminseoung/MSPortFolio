// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, doc, Timestamp, setDoc, increment } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC5QcrObmQD5Wie02q-liEXKAJebK7svr4",
  authDomain: "test-eb8aa.firebaseapp.com",
  projectId: "test-eb8aa",
  storageBucket: "test-eb8aa.appspot.com",
  messagingSenderId: "129505771974",
  appId: "1:129505771974:web:8b681fb9ea836bfda172c7",
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
export const saveData = async ({ title, text, name, createdDate, boardId }: saveDataProps) => {
  await setDoc(
    doc(db, "boards", `${boardId}`),
    {
      time: Timestamp.fromDate(new Date()),
      title,
      text,
      name,
      createdDate,
      id: increment(boardId),
    },
    { merge: true }
  );
};

// 게시판 목록 읽어오기
export const fetchBoard = async (): Promise<DocumentData> => {
  const proDB = await getDocs(collection(db, "boards"));
  return proDB;
};


// 프로젝트 읽어오기
export const fetchProject = async (): Promise<DocumentData> => {
  const proDB = await getDocs(collection(db, "Projects"));
  return proDB;
};

/* export const fetchBoard2 = async () => {
  const citiesRef = collection(db, "Projects");

  await setDoc(doc(citiesRef, "1"), {
    id: "1",
    name: "나의 포트폴리오",
    state: "2022.08~2022.09",
    gitCode: "https://github.com/kimminseoung/PortFolio",
    gitLink: "https://kimminseoung.github.io/portfolio/",
    img: "mypage",
    skill: ["React", "TypeScript", "framer-motion", "styled-components", "Recoil", "react - router"],
  });

  await setDoc(doc(citiesRef, "2"), {
    id: "2",
    name: "Lottery",
    state: "2022.08",
    gitCode: "https://github.com/kimminseoung/Lottery",
    gitLink: "https://kimminseoung.github.io/Lottery/",
    img: "lottery",
    skill: ["HTML", "CSS", "JavaScript"],
  });

  await setDoc(doc(citiesRef, "3"), {
    id: "3",
    name: "코인정보 사이트",
    state: "2022.06",
    gitCode: "https://kimminseoung.github.io/K_Coin/",
    gitLink: "https://kimminseoung.github.io/K_Coin/",
    img: "coininfo",
    skill: ["React", "TypeScript", "framer-motion", "styled-components", "Recoil", "react - router"],
  });

  await setDoc(doc(citiesRef, "4"), {
    id: "4",
    name: "todoList",
    state: "2022.06",
    gitCode: "https://github.com/kimminseoung/ToyApp",
    gitLink: "https://kimminseoung.github.io/ToyApp/",
    img: "todoList",
    skill: ["HTML", "CSS", "JavaScript"],
  });

  await setDoc(doc(citiesRef, "5"), {
    id: "5",
    name: "카드 짝 맞추기",
    state: "2022.08",
    gitCode: "https://github.com/kimminseoung/Card-matching-Game",
    gitLink: "https://kimminseoung.github.io/Card-matching-Game",
    img: "cardgame",
    skill: ["HTML", "CSS", "JavaScript"],
  });
};
 */
