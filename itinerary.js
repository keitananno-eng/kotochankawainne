document.getElementById('open-btn').addEventListener('click', function() {
    document.getElementById('cover-screen').style.display = 'none';
    
    // 表示させたいメッセージのリスト（いくつでも増やせます）
    const messages = [
        "誕生日おめでとう！",
        "誕生日おめでとう！",
        "誕生日おめでとう！",
        "誕生日おめでとう！",
        "おっぱい"
    ];
    
    // リストの中からランダムに1つ選ぶ計算
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // 選ばれたメッセージをHTMLにセットする
    document.getElementById('loading-text').innerText = randomMessage;
    
    // ローディング画面を表示
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';
    
    // 2秒（2000ミリ秒）後にローディングを消して、しおりを表示
    setTimeout(function() {
        loadingScreen.style.display = 'none';
        document.getElementById('itinerary-content').style.display = 'block';
    }, 2000);
});

// ※これより下のコード（ハンバーガーメニューやスクロールアニメーション）はそのまま残してください

// 以下のハンバーガーメニューやスクロールアニメーションのコードはそのまま残してください
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

document.getElementById('letter-btn').addEventListener('click', function() {
    const letter = document.getElementById('secret-letter');
    letter.classList.toggle('open');
    
    if (letter.classList.contains('open')) {
        this.innerText = "メッセージを閉じる";
    } else {
        this.innerText = "open";
    }
});