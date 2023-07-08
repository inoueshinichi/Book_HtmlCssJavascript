/* jQuery, js.cookie */

'use strict';

/* 
クッキーを動かすにはサーバー環境が必要です。
ファイルスキーム(file:///)では動きません。
*/
const agree = Cookies.get('cookie-agree');
console.log('agree ', agree);
if (agree === 'yes') {
    alert('Cookieを受け入れました');
} else {
    alert('Cookieを確認できません');
}

// 画像配列
const images = [
    "../static/images/壁紙1.JPG",
    "../static/images/壁紙2.jpg",
    "../static/images/壁紙3.jpg",
    "../static/images/壁紙4.jpeg"
];
let current = 0;

images.forEach(function(item, index) {
    preloadImage(item);
});

function preloadImage(path) {
    let imgTag = document.createElement('img');
    imgTag.src = path;
};

function changeImage(num) {
    
    if (current + num >= 0 && current + num < images.length) {
        current += num;
        console.log("current", current);
        // $('#main_image').src = images[current];
        document.getElementById('main_image').src = images[current];
        // window.location.reload();
        pageNum();
    }
};

function pageNum() {
    document.getElementById('page').textContent = `${current + 1}/${images.length}`;
};

pageNum();

$(function() {

    $.getJSON("https://h2o-space.com/htmlbook/images.php", function(data) {
        // alert('データを受信しました');

        for (var i = 0; i < data.length; i++) {
            $('<div class="photo"></div>')
                .append('<img src="' + data[i].path + '">')
                .append('<div class="inner"><p>' + data[i].caption + '<span>' + data[i].name +
                 '</span></p></div>')
                 .appendTo('#img_unit');
        }
    });

    // slide
    $('#prev').click(function() {
        changeImage(-1);
    });

    // slide
    $('#next').click(function() {
        changeImage(1);
    })

    // cookie
    $('#btn_cookie_agree').click(function() {
        Cookies.set('cookie-agree', 'yes', {expires: 3});
        // window.location.reload(); // htmlページをリロード

        const cookie_panel = document.getElementById('cookie_panel');
        document.body.removeChild(cookie_panel);
    });

    // cookie
    $('#btn_cookie_remove').click(function() {
        Cookies.remove('cookie-agree');
        alert('Cookieを削除しました');
    });

});