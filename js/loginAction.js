import {
  firestore,
  ref,
  refHistory,
  db,
  Timestamp,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "./firebase.js";

// greetの実行可否取得
let greet = localStorage.getItem("greet");
console.log(greet);

// 今日の年月日取得
const getToday = () => {
  let today = new Date();
  const year = today.getFullYear();
  //取得文字が1桁の場合2桁に変換
  const month = ("0" + Number(today.getMonth() + 1)).slice(-2);
  const day = ("0" + Number(today.getDate())).slice(-2);
  return `${year}-${month}-${day}`; //yyyy-mm-dd
};

// ログイン後だけ処理させる
if (greet == "execution") {
  logined();
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: "aaa",
      });
    }, 1000);
  });

  await Swal.fire({
    title: "こんにちは!!!",
    // text: "radio",
    inputOptions: inputOptions,
    preConfirm: () => {
      // const test = localStorage.getItem("history");
      // const arry2 = JSON.parse(test);
      // console.log(arry2[0]);
      return 1; //1日目ログイン固定
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        text: `連続ログイン${result.value}日目です`,
      });
    }
  });
  localStorage.setItem("greet", "non-execution");
}

async function logined() {
  let today = getToday();
  const snapShot = await firestore
    .collection("login")
    .where("date", "==", "2023-05-16")
    // .where("date", "==", "2023-05-16")
    .get();
  console.log(snapShot);
  const log = snapShot.docs.map((doc) => ({
    date: doc.data().date,
  }));
  console.log(log[0].date);
  // for (let i = 0; i < log.length; i++) {
  //   if (log[i].date != today) {
  //     const ob = {
  //       date: today,
  //     };
  //     const docRef = addDoc(refHistory, ob);
  //   }
  // }
  const ob = {
    date: today,
  };
  const docRef = addDoc(refHistory, ob);
}
