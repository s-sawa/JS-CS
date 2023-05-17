import {
  //   auth,
  firestore,
  ref,
  db,
  Timestamp,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "./firebase.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// 複数のクエリを用いた取得（絞り込み、並び替え、ページ
let selectedDate = "";
async function executeQuery() {
  console.log("yobareta");

  const snapShot = await firestore
    .collection("fitlog")
    .where("date", "==", selectedDate)
    .get();
  const log = snapShot.docs.map((doc) => ({
    id: doc.id,
    body: doc.data().body,
    exercise: doc.data().exercise,
    rep: doc.data().rep,
    weight: doc.data().weight,
    date: doc.data().date,
  }));
  $("#exercise-log table tbody tr").remove();

  // console.log(log.length);
  for (let i = 0; i < log.length; i++) {
    // console.log(log[i].body);
    let h;
    // if (change.type === "added") {
    h =
      '<tr class="bg-white  hover:bg-gray-100" data-body= "' +
      log[i].body +
      '">';
    h += '<td class="px-2 py-2 whitespace-nowrap">' + log[i].exercise + "</td>";
    h +=
      '<td class="px-2 py-2 whitespace-nowrap">' +
      log[i].weight +
      "kg" +
      "</td>";
    h +=
      '<td class="px-2 py-2 whitespace-nowrap">' + log[i].rep + "rep" + "</td>";
    h +=
      '<td class="flex justify-center text-center px-6 py-4 whitespace-nowrap">' +
      '<img class="delete-button w-5" src="./imgs/deletebtn.svg" data-id="' +
      log[i].id +
      '">';
    ("</td>");
    $("#exercise-log table tbody").append(h);
  }
}
// カレンダー
$(document).ready(function () {
  // カレンダーを初期化
  $("#calendar").datepicker({
    dateFormat: "yy-mm-dd",
    onSelect: function (dateText, inst) {
      console.log("calendarおした");
      // 日付欄がクリックされたときの処理
      selectedDate = dateText;
      $("#event-date").val(dateText);
      $("#event-modal").show();
      console.log(selectedDate); // 選択した日付が表示される
      executeQuery();
    },
  });

  // イベントモーダルを閉じる
  $("#close-modal").click(function () {
    $("#event-modal").hide();
    // $("#exercise-log").children().children().remove().children();
    afterRemoveText();
    $("#exercise-log table tbody tr").empty();
    // console.log($("#exercise-log table tbody tr"));
  });

  const afterRemoveText = () => {
    $("#exercise-log table tbody tr").empty();
  };
  // モーダルの表示リセット

  // メニュー選択
  $("#select-body-part").on("change", function () {
    let selected = $("#select-body-part").val();
    if (selected == "chest") {
      $("#select-chest").removeClass("hidden");
      $("#select-back").addClass("hidden");
      $("#select-leg").addClass("hidden");
    } else if (selected == "back") {
      $("#select-chest").addClass("hidden");
      $("#select-back").removeClass("hidden");
      $("#select-leg").addClass("hidden");
    } else {
      $("#select-chest").addClass("hidden");
      $("#select-back").addClass("hidden");
      $("#select-leg").removeClass("hidden");
    }
  });

  // DB送信
  $("#send").on("click", function () {
    const ob = {
      body: $("#select-body-part").val(),
      exercise: getSelectedExercise(),
      weight: $("#weight-input").val(),
      rep: $("#rep-input").val(),
      date: $("#event-date").val(),
    };
    const docRef = addDoc(ref, ob);
    $("#event-modal").hide();
  });
});

function test(change, day) {
  let h;
  if (change.type === "added") {
    if (change.doc.data().date == day) {
      h =
        '<tr class="bg-white  hover:bg-gray-100" data-body= "' +
        change.doc.data().body +
        '">';
      h +=
        '<td class="text-center px-2 py-2 whitespace-nowrap">' +
        change.doc.data().date +
        "</td>";
      h +=
        '<td class="text-center px-2 py-2 whitespace-nowrap">' +
        change.doc.data().exercise +
        "</td>";
      h +=
        '<td class="text-center px-2 py-2 whitespace-nowrap">' +
        change.doc.data().weight +
        "kg" +
        "</td>";
      h +=
        '<td class="text-center px-2 py-2 whitespace-nowrap">' +
        change.doc.data().rep +
        "rep" +
        "</td>";
      h +=
        '<td class="flex justify-center px-6 py-4 whitespace-nowrap">' +
        '<img class="delete-button cursor-pointer  w-8"  src="./imgs/deletebtn.svg" data-id="' +
        change.doc.id +
        '">';
      ("</td>");
    }

    // 選択部位で出力先変更
    if (change.doc.data().body == "chest") {
      $("#output-chest table").append(h);
      $("#output-chest").scrollTop($("#output-chest")[0].scrollHeight);
    } else if (change.doc.data().body == "back") {
      $("#output-back table").append(h);
      $("#output-back").scrollTop($("#output-back")[0].scrollHeight);
    } else {
      $("#output-leg table").append(h);
      $("#output-leg").scrollTop($("#output-leg")[0].scrollHeight);
    }
  } else if (change.type === "removed") {
    // 削除の場合は該当する要素を削除する
    const docId = change.doc.id;
    $("#" + docId).remove();
  }
}

// dbのデータ表示
const q = query(ref, orderBy("date", "desc"));
onSnapshot(q, function (snapshot) {
  snapshot.docChanges().forEach((change) => {
    test(change, getDate());
  });
});

$(document).on("click", ".delete-button", function () {
  var id = $(this).data("id");
  console.log(id);
  firestore.collection("fitlog").doc(id).delete();
  // クリックした要素から１番近いtr要素を見つける
  let row = $(this).closest("tr");
  row.remove();
});

// トレーニング部位
function getSelectedExercise() {
  let selected = $("#select-body-part").val();
  if (selected == "chest") {
    return $("#select-chest").val();
  } else if (selected == "back") {
    return $("#select-back").val();
  } else {
    return $("#select-leg").val();
  }
}
// 今日の日付取得
function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  //取得文字が1桁の場合2桁に変換
  const month = ("0" + Number(date.getMonth() + 1)).slice(-2);
  const day = ("0" + Number(date.getDate())).slice(-2);
  return `${year}-${month}-${day}`; //yyyy-mm-dd
}

$(document).on("click", function () {
  let element = document.getElementById("switch");
  let mode = element.checked;
  localStorage.setItem("mode", mode);
});
