// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, addDoc } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC7-regJUKfR7ymXIM0UorPIBC8aiuDHCA",
  authDomain: "poopaul-589c7.firebaseapp.com",
  projectId: "poopaul-589c7",
  storageBucket: "poopaul-589c7.appspot.com",
  messagingSenderId: "816400273351",
  appId: "1:816400273351:web:78f99779c0abb188a653e2",
  measurementId: "G-E9HD7H3YM6",
};

const app = initializeApp(firebaseConfig); // firebase 초기화
const db = getFirestore(app);

export const getDB = async (): Promise<DocumentData> => {
  const proDB = await getDocs(collection(db, "projectInfo"));
  return proDB;
}; // 내가 지정한 db경로에서 꺼내오기

export const getBoard = async (): Promise<DocumentData> => {
  const proDB = await getDocs(collection(db, "users"));
  return proDB;
};
export const putData = async ({ title, text, name, createdDate, boardId }: any) => {
  await addDoc(collection(db, "users"), {
    id: boardId,
    title,
    text,
    name,
    createdDate,
  });
};
