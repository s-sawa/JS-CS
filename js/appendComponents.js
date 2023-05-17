// ヘッダー
function appendHeader() {
  $.ajax({
    url: "header.html",
    dataType: "html",
    success: function (html) {
      $("#header").append(html); // id=footerにfooter.htmlの内容書き込む
    },
    error: function () {
      console.log(" ヘッダーの読み込みに失敗しました。");
    },
  });
}
// ヘッダー追加
appendHeader();
