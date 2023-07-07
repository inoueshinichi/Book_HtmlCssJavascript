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

    $('#btn_cookie_agree').click(function() {
        Cookies.set('cookie-agree', 'yes', {expires: 3});
        window.location.reload(); // htmlページをリロード

        const cookie_panel = document.getElementById('cookie_panel');
        document.body.removeChild(cookie_panel);
        // const cookie_panel = $('#cookie_panel');
        // document.body.removeChild(cookie_panel);
    });

    $('#btn_cookie_remove').click(function() {
        Cookies.remove('cookie-agree');
        alert('Cookieを削除しました');
    });

});