export function startCarousel() {
    // スライドショー: START ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    //////////////////////////// 【必要な変数を定義】////////////////////////////
    //////////  スライドリストの合計幅を計算→CSSでエリアに代入
    const carouselArea = document.querySelector(".carousel-area");
    const carouselItem = [...document.querySelectorAll('.carousel-item')];
    const btnNext = document.querySelector(".js-btn-next");
    const btnBack = document.querySelector(".js-btn-back");
    let width;
    let length;
    let slideArea;
    for (const item of carouselItem) {
        width = item.offsetWidth; // .carousel-listの1枚分の幅
        length = carouselItem.length; // .carousel-itemの数
        slideArea = width * length; // レール全体幅 = スライド1枚の幅 × スライド合計数
        item.setAttribute('width', slideArea); // カルーセルレールに計算した合計幅を指定
    }


    //////////  スライド現在値と最終スライド 
    let slideCurrent = 0; // スライド現在値（1枚目のスライド番号としての意味も含む）
    let lastCurrent = carouselItem.length - 1; // スライドの合計数＝最後のスライド番号

    ////////////////////////////【スライドの動き方+ページネーションに関する関数定義】////////////////////////////
    ////////// スライドの切り替わりを「changeslide」として定義 
    function changeSlide() {
        // carouselArea.scrollTo({
        //     left: slideCurrent * -width,
        //     behavior: "smooth"
        // })
        $('.carousel-area').stop().animate({ // stopメソッドを入れることでアニメーション1回毎に止める
            left: slideCurrent * -width // 代入されたスライド数 × リスト1枚分の幅を左に動かす
        });
    }


    /////////////////////////【自動スライド切り替えのタイマー関数定義】/////////////////////////
    let Timer;
    //////// 一定時間毎に処理実行する「startTimer」として関数を定義
    function startTimer() {
        // 変数Timerに下記関数内容を代入する
        Timer = setInterval(function () { // setInterval・・・指定した時間ごとに関数を実行
            if (slideCurrent === lastCurrent) { // 現在のスライドが最終スライドの場合
                slideCurrent = 0;
                changeSlide(); // スライド初期値の値を代入して関数実行（初めのスライドに戻す）
            } else {
                slideCurrent++;
                changeSlide(); // そうでなければスライド番号を増やして（次のスライドに切り替え）関数実行
            };
        }, 3000); // 上記動作を3秒毎に
    }

    ////////// 「startTimer」関数を止める「stopTimer」関数を定義
    function stopTimer() {
        clearInterval(Timer); // clearInterval・・・setIntervalで設定したタイマーを取り消す
    }
    //////// 自動スライド切り替えタイマーを発動
    startTimer();




    /////////////////////////【ボタンクリック時関数を呼び出し】/////////////////////////
    // NEXTボタン
    btnNext.addEventListener("click", () => { // 動いているタイマーをストップして再度タイマーを動かし直す（こうしないとページ送り後の秒間隔がズレる）
        stopTimer();
        startTimer();
        if (slideCurrent === lastCurrent) { // 現在のスライドが最終スライドの場合
            slideCurrent = 0;
            changeSlide(); // スライド初期値の値を代入して関数実行（初めのスライドに戻す）
        } else {
            slideCurrent++;
            changeSlide(); // そうでなければスライド番号を増やして（次のスライドに切り替え）関数実行
        };
    })


    // BACKボタン
    btnBack.addEventListener("click", () => {
        clearInterval(); // 動いているタイマーをストップして再度タイマーを動かし直す（こうしないとページ送り後の秒間隔がズレる）
        // changeSlide();
        if (slideCurrent === 0) { // 現在のスライドが初期スライドの場合
            slideCurrent = lastCurrent;
            changeSlide(); // 最終スライド番号を代入して関数実行（最後のスライドに移動）
        } else {
            slideCurrent--;
            changeSlide(); // そうでなければスライド番号を減らして（前のスライドに切り替え）関数実行
        };
    })
    ////////////////////////////////////////////////////////////////////////
    // スライドショー: END ////////////////////////////////////////////////////
}