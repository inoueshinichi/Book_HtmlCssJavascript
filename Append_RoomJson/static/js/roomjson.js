'use strict';

$(document).ready(function () {
    // ファイルの読み込み
    $.ajax({
        url: '../static/data/data.json',
        dataType: 'json'
    }).done(function(data) {
        data.forEach(function(item, index) {
            // console.log(item);
            if (item.crowded === 'yes') {
                const idName = '#' + item.id;
                $(idName).find('.check').addClass('crowded');
                // console.log(item.id)
            }
        });
    }).fail(function(data) {
        alert("読み込みエラー");
    });
})


$(function () {

    $('.check').click(function () {
        if ($(this).hasClass('crowded')) {
            $(this).text('座席わずか').addClass('red');
        } else {
            $(this).text('お席あります').addClass('green');
        }
        console.log('clicked ', $(this).prev().text());
    });

});