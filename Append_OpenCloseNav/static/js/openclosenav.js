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


$(function () {

    // show/hidden
    $(document).ready(function() {
        $('.submenu h3').on('click', function() {
            $(this).next().toggleClass('hidden');
        });
    });

    

    // cookie
    $('#btn_cookie_agree').click(function () {
        Cookies.set('cookie-agree', 'yes', { expires: 3 });
        // window.location.reload(); // htmlページをリロード

        const cookie_panel = document.getElementById('cookie_panel');
        document.body.removeChild(cookie_panel);
    });

    // cookie
    $('#btn_cookie_remove').click(function () {
        Cookies.remove('cookie-agree');
        alert('Cookieを削除しました');
    });

});