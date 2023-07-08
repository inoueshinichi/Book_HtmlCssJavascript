'use strict';

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    console.log("coords", pos.coords);

    $('#loc').text(`緯度:${lat} 軽度:${lng}`);
    $('#accuracy').text(accuracy);
};

function fail(error) {
    var status;

    if (error.code == 1) {
        status = 'パーミッションエラー';
    } else if (error.code == 2) {
        status = '何かのエラー';
    } else {
        status = 'タイムアウト';
    }
    console.log(status);

    alert('位置情報の取得に失敗しました。エラーコード:[' + error.code + '] ', status);
};

navigator.geolocation.getCurrentPosition(success, fail);