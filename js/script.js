// ヘッダーのスクロール効果
let lastScrollTop = 0; // 最後のスクロール位置を保存する変数

window.addEventListener("scroll", function() {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;
    // 現在のスクロール位置を取得する（スマホ、デスクトップ対応）

    if (currentScroll > lastScrollTop && currentScroll > 0) {
        // 下方向にスクロールしており、画面の最上部ではない場合
        document.getElementById('header').classList.add('fixed');
        // ヘッダーを固定表示にする
    } else if (currentScroll <= 0) {
        // スクロールが最上部に達した場合
        document.getElementById('header').classList.remove('fixed');
        // ヘッダーの固定表示を解除する
    }

    lastScrollTop = currentScroll; // 現在のスクロール位置を保存する
}, false);

// トップに戻るボタン
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const button = document.getElementById('scroll-to-top');
    const halfPageHeight = document.documentElement.scrollHeight / 2;

    if (scrollTop >= halfPageHeight) {
        button.classList.add('show');
    } else {
        button.classList.remove('show');
    }
    });

    document.getElementById('scroll-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ヘッダーのナビゲーションメニューの効果
document.querySelectorAll('.nav-item').forEach(item => {
    // 全ての.nav-item要素に対して処理を行う
    item.addEventListener('click', () => {
        // クリックされた時の処理を設定する
        item.classList.toggle('rotated');
        // 該当する.nav-item要素の回転状態を切り替える
    });
});

// ハンバーガーメニューがクリックされたときoverlay要素を表示・非表示する
document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.querySelector('.menu-icon');
    var overlay = document.querySelector('.overlay');

    // ☰アイコンをクリックしたとき
    menuIcon.addEventListener('click', function() {
        overlay.classList.toggle('show');
        // overlay要素の表示状態を切り替える（showクラスを追加・削除）
        
        if (overlay.classList.contains('show')) {
            menuIcon.innerHTML = '&#10005;'; // バツマーク (×) を表示
        } else {
            menuIcon.innerHTML = '&#9776;'; // ハンバーガーアイコン (☰) を表示
        }
    });

    // ×アイコン、もしくはオーバーレイよりも前面になっている要素以外をクリックしたとき
    overlay.addEventListener('click', function() {
        overlay.classList.remove('show');
        // overlay要素の表示を非表示にする
        menuIcon.innerHTML = '&#9776;'; // ハンバーガーアイコン (☰) に戻す
    });
});


// スクロールするとふわっと下から出てくる効果
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".fade-in-section");
    // .fade-in-sectionクラスを持つ全ての要素を取得

    const observer = new IntersectionObserver(entries => {
        // IntersectionObserverを使用して要素の表示状態を監視する
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 要素が画面内に入った場合
                entry.target.classList.add("is-visible");
                // 要素に.is-visibleクラスを追加して表示する
            }
        });
    }, {
        threshold: 0.2 // 0.1あたり10%、画面内に数値分要素が入ったら処理を実行する
    });

    sections.forEach(section => {
        // 全ての.fade-in-section要素に対して処理を行う
        observer.observe(section);
        // IntersectionObserverで要素の監視を開始する
    });
});

// 一文字ずつ文字が落ちてくる効果
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".flying-text");
    // .flying-textクラスを持つ全ての要素を取得

    const observer = new IntersectionObserver(entries => {
        // IntersectionObserverを使用して要素の表示状態を監視する
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 要素が画面内に入った場合
                const element = entry.target;
                const speed = parseFloat(element.getAttribute("data-speed")) || 0.1;
                // 要素のdata-speed属性を取得し、速度を設定する。設定忘れの場合は0.1sで設定。

                const characters = element.textContent.split(""); // 要素を一文字ずつchar配列に格納
                element.textContent = ""; // 要素のテキストを空にする

                characters.forEach((char, index) => {
                    // 文字ごとにspan要素を作成し、遅延時間を設定して要素に追加する
                    const span = document.createElement("span");
                    span.textContent = char;
                    span.style.animationDelay = `${index * speed}s`;
                    element.appendChild(span);
                });

                observer.unobserve(element); // アニメーションを1度だけ実行するため、監視を解除する
            }
        });
    }, {
        threshold: 0.8 
        /*
            0.1あたり10%、画面内に数値分要素が入ったら処理を実行する
            他要素との兼ね合いなので多めに設定している。他を弄ったら動作要確認。
        */
    });

    elements.forEach(element => {
        // 全ての.flying-text要素に対して処理を行う
        observer.observe(element);
        // IntersectionObserverで要素の監視を開始する
    });
});

let currentIndex = 0; // 現在の画像インデックスを追跡

// ギャラリーをスクロールする関数
function scrollGallery(direction) {
    const gallery = document.querySelector('.gallery');
    const images = document.querySelectorAll('.gallery img');
    const imageWidth = images[0].clientWidth + 20; // 画像の幅 + マージン

    // インデックスを更新
    currentIndex = Math.max(0, Math.min(currentIndex + direction, images.length - 1));
    
    // ギャラリーをスクロール
    gallery.scrollTo({
        left: currentIndex * imageWidth,
        behavior: 'smooth' // スムーズなスクロール
    });

    updateComment(); // コメントを更新
    updateButtons(); // ボタンの表示状態を更新
}

// コメントを更新する関数
function updateComment() {
    const images = document.querySelectorAll('.gallery img');
    const comment = images[currentIndex].getAttribute('data-comment');
    document.getElementById('image-comment').textContent = comment;
}

// ボタンの表示状態を更新する関数
function updateButtons() {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.gallery img');

    prevButton.classList.toggle('hidden', currentIndex === 0); // 最初の画像の時は非表示
    nextButton.classList.toggle('hidden', currentIndex === images.length - 1); // 最後の画像の時は非表示
}

// マウスホイールイベントを追加
document.querySelector('.gallery-container').addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollGallery(e.deltaY > 0 ? 1 : -1); // マウスホイールの方向に応じてスクロール
});

// 初期状態でコメントとボタンを更新
document.addEventListener('DOMContentLoaded', () => {
    updateComment();
    updateButtons();
});