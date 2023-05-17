// カロリー計算
$("#calcu1btn").on("click", function () {
  $("#showKcal1").text(calcuKcal1());
});
// PFC計算
$("#calcu2btn").on("click", function () {
  $("#protein").text(calcProtein().toFixed());
  $("#fat").text(calcFat().toFixed());
  $("#carbo").text(calcCarbo().toFixed());
  $("#totalcarorie").text(modifiedCalorie().toFixed());
});
// カロリー計算関数
function calcuKcal1() {
  if (getGender() == 1) {
    // 男性基礎代謝
    return 10 * getWeight() + 6.25 * getHeight() - 5 * getAge() + 5;
  } else {
    // 女性基礎代謝
    return 10 * getWeight() + 6.25 * getHeight() - 5 * getAge() - 161;
  }
}
// 男女選択取得
// function getGender() {
//   return $('[name="radio"]:checked').val();
// }
const getGender = () => $('[name="radio"]:checked').val();
// 身長取得
// function getHeight() {
//   return Number($("#height").val());
// }
const getHeight = () => Number($("#height").val());
// 体重取得
// function getWeight() {
//   return Number($("#weight").val());
// }
const getWeight = () => Number($("#weight").val());
// 年齢取得
function getAge() {
  return Number($("#age").val());
}
// プロテイン摂取量(g)計算
function calcProtein() {
  return getWeight() * 2;
}
// 脂質摂取量(g)計算
function calcFat() {
  return fatCarorie() / 9; // グラム変換
}
// 炭水化物摂取量(g)計算
function calcCarbo() {
  return getCarbo() / 4;
}
// 炭水化物摂取カロリー
function getCarbo() {
  return modifiedCalorie() - proteinCarorie() - fatCarorie();
}
// プロテインカロリー変換
function proteinCarorie() {
  return calcProtein() * 4;
}
// 脂質割合
function fatCarorie() {
  return modifiedCalorie() * 0.25;
}
// カロリー計算（活動量の違い考慮）
function calorieActivityLevel() {
  // calcuKcal1
  const act = getActivityLevel();
  if (act == 1) {
    return calcuKcal1() * 1.2;
  } else if (act == 2) {
    return calcuKcal1() * 1.55;
  } else {
    return calcuKcal1() * 1.725;
  }
}
// 活動量取得
function getActivityLevel() {
  return $("#activity-level").val();
}
// 目的取得
function getPurpose() {
  return $("#purpose").val();
}
// カロリー計算（目的の違い考慮）
function modifiedCalorie() {
  const purpose = getPurpose();
  if (purpose == 1) {
    return calorieActivityLevel() * 0.8;
  } else if (purpose == 2) {
    return calorieActivityLevel() * 1;
  } else {
    return calorieActivityLevel() * 1.2;
  }
}
// DEBUGボタン
// $("#debug").on("click", function () {
//     alert($("#purpose").val());
// });
