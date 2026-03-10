// HTMLの要素を取得
const wrapper = document.getElementById('slider-wrapper');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('dots-container');

// 現在何枚目を表示しているか（0からスタート）
let currentIndex = 0;
// 写真の総枚数
const totalSlides = slides.length;

// ドットを写真の枚数分だけ自動作成する
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active'); // 最初のドットをアクティブに
    dot.addEventListener('click', () => goToSlide(i)); // クリックしたらその写真へ
    dotsContainer.appendChild(dot);
}

// ドットの要素をリストとして取得
const dots = document.querySelectorAll('.dot');

// 指定した番号の写真へ移動する関数
function updateSlider() {
    // 横にずらす計算（例: 2枚目なら -100% ずらす）
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // ドットの表示を更新
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 次の写真へ移動する関数
function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
        currentIndex = 0; // 最後の次は最初に戻る
    }
    updateSlider();
}

// 前の写真へ移動する関数
function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // 最初の前は最後に行く
    }
    updateSlider();
}

// 任意の写真へ移動する関数
function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

// ボタンのクリックイベント（PC用）
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);


// ▼ スワイプ動作（指でシュッとする動き）の実装 ▼

let startX = 0; // タッチし始めた横位置
let isDragging = false; // ドラッグ中かどうか

// 指が画面に触れたとき
wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX; // 最初の位置を記録
});

// 指が画面から離れたとき（スワイプの判定）
wrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.changedTouches[0].pageX; // 離れたときの位置
    const diffX = startX - endX; // どれくらい動いたか
    
    const swipeThreshold = 50; // スワイプと判定する最低限の距離（ピクセル）

    // 左にスワイプした場合（次の写真へ）
    if (diffX > swipeThreshold) {
        nextSlide();
    } 
    // 右にスワイプした場合（前の写真へ）
    else if (diffX < -swipeThreshold) {
        prevSlide();
    }
});

// 指が動いている間（ブラウザのデフォルトのスクロールを止めるため）
wrapper.addEventListener('touchmove', (e) => {
    if (isDragging) {
        // スワイプ中は上下スクロールを無効化して動きをスムーズにする
        e.preventDefault();
    }
}, { passive: false });