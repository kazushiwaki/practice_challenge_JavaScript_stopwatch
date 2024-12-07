$(document).ready(function(){
  // 数値の格納
  const ZERO_TIME = 0;
  const HUNDRED_MILLISECONDS = 100;

  // 扱いやすいように変数に格納
  let get_text = $(".timer");
  let start_btn = $(".start_btn");
  let stop_btn = $(".stop_btn");
  let reset_btn = $(".reset_btn");

  let elapsedTime = 0; // タイマーの値(ms)
  let timerInterval; // タイマーのインターバル
  let timerRunningFlag = false; // タイマー実行フラグ
  let buttonState; //タイマーの状態

  // 文字の書き換え処理
  // 1秒ごとに文字を増やす
  // 増やした文字を返す
  function timerFormat(time) {
    console.log(time);
    let times = Math.floor(time / 3600000); // 時
    let minutes = Math.floor(time / 60000); // 分
    let seconds = Math.floor((time % 60000) / 1000); // 秒
    let centiseconds = Math.floor((time % 1000) / 100); // ミリ秒

    return times.toString().padStart(2, '0') + ' : ' + minutes.toString().padStart(2, '0') + ' : ' + seconds.toString().padStart(2, '0') + ' : ' + centiseconds.toString();
  }

  // ボタン権限の管理処理
  function buttonAuthorityProcess(buttonState) {
    switch (buttonState) {
      case 'start':
        start_btn.prop('disabled', true);
        start_btn.addClass('disabled_btn');
        stop_btn.prop('disabled', false);
        stop_btn.removeClass('disabled_btn');
        if (reset_btn.hasClass('disabled_btn')) {
          reset_btn.prop('disabled', false);
          reset_btn.removeClass('disabled_btn');
        }
        break;

      case 'stop':
        console.log(buttonState);
        start_btn.prop('disabled', false);
        start_btn.removeClass('disabled_btn');
        stop_btn.prop('disabled', true);
        stop_btn.addClass('disabled_btn');
        break;

        case 'reset':
          if (elapsedTime === ZERO_TIME && stop_btn.hasClass('disabled_btn')){
            reset_btn.prop('disabled', true);
            reset_btn.addClass('disabled_btn');
          } else {
            stop_btn.removeClass('disabled_btn');
            reset_btn.prop('disabled', false);
            reset_btn.removeClass('disabled_btn');
          }
          break;

      default:
        console.error('不正な状態: ' + buttonState);
        break;
    }
  }

  // スタートボタンの処理
  start_btn.click(function() {
    buttonState = "start";
    timerRunningFlag = true;

    timerInterval = setInterval(function() {
      elapsedTime += HUNDRED_MILLISECONDS;
      get_text.text(timerFormat(elapsedTime));
    }, HUNDRED_MILLISECONDS);

    buttonAuthorityProcess(buttonState);
  });

  // ストップボタンの処理
  stop_btn.click(function() {
    clearInterval(timerInterval);
    buttonState = "stop";
    timerRunningFlag = false;
    console.log("停止ボタンがおされたので、タイマーを停止しました。");

    buttonAuthorityProcess(buttonState);
  });

  // リセットボタンの処理
  reset_btn.click(function() {
    buttonState = "reset";
    elapsedTime = ZERO_TIME;
    get_text.text(timerFormat(elapsedTime));
    console.log("タイマーをリセットしました。");

    buttonAuthorityProcess(buttonState);
  });
});
