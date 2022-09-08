// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, addDoc, doc, Timestamp, setDoc, increment } from "firebase/firestore";
import { DocumentData, getDoc } from "firebase/firestore/lite";

// const firebaseConfig = {
//   apiKey: "AIzaSyC7-regJUKfR7ymXIM0UorPIBC8aiuDHCA",
//   authDomain: "poopaul-589c7.firebaseapp.com",
//   projectId: "poopaul-589c7",
//   storageBucket: "poopaul-589c7.appspot.com",
//   messagingSenderId: "816400273351",
//   appId: "1:816400273351:web:78f99779c0abb188a653e2",
//   measurementId: "G-E9HD7H3YM6",
// };

const firebaseConfig = {
  apiKey: "AIzaSyC5QcrObmQD5Wie02q-liEXKAJebK7svr4",
  authDomain: "test-eb8aa.firebaseapp.com",
  projectId: "test-eb8aa",
  storageBucket: "test-eb8aa.appspot.com",
  messagingSenderId: "129505771974",
  appId: "1:129505771974:web:8b681fb9ea836bfda172c7",
};
const app = initializeApp(firebaseConfig); // firebase 초기화
export const db = getFirestore(app);

/*
export const getBoardDetail = async (boardId: any): Promise<DocumentData> => {
  const proDB = await getDocs(collection(db, "users/", boardId));
  return proDB;
};
 */

// export const getBoard = async (): Promise<DocumentData> => {
//   const BoardDb = await getDocs(collection(db, "users"));
//   return BoardDb;
// };

// 게시판 데이터 저장하기
interface saveData {
  title: string;
  text: string;
  name: string;
  createdDate: number;
  boardId: number;
}
export const saveData = async ({ title, text, name, createdDate, boardId }: saveData) => {
  const docRef = await setDoc(
    doc(db, "boards", `${boardId}`),
    {
      title,
      text,
      name,
      createdDate,
      id: increment(boardId),
    },
    { merge: true }
  );
};

// 게시판 읽어오기
export const fetchBoard = async (): Promise<DocumentData> => {
  const proDB = await getDocs(collection(db, "boards"));
  return proDB;
};

// export const fetchBoardDetail = async (id: string) => {
//   const userRef = doc(db, "users", `${id}`);
//   const userSnap = await getDoc(userRef);
//   return userSnap;
// /*   if (userSnap.exists()) {
//     return userSnap.data();
//   } else {
//     return null;
//   } */
// };
