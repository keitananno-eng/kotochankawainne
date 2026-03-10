// クイズの正誤判定
function checkAnswer(option) {
    const result = document.getElementById('quiz-result');
    if (option === 2) {
        result.style.color = "#ff4757";
        result.innerText = "正解！🎉 もうそれしか考えてません！";
    } else {
        result.style.color = "#555";
        result.innerText = "それもそうだけど、今は2番かな！😏";
    }
}

// スクロールアニメーション（しおりページと同じ仕組み）
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));