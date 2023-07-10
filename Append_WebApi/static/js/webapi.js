'use strict';

// geolocation
function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    console.log("coords", pos.coords);

    $('#loc').text(`緯度:${lat} 軽度:${lng}`);
    $('#accuracy').text(accuracy);


    ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

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
}

navigator.geolocation.getCurrentPosition(success, fail);

// UTFをミリ秒に変換
function utcToJSTime(utcTime) {
    return utcTime * 1000;
}

// データ取得
function ajaxRequest(lat, long) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = '020d59df74be4e57676a1d23c7c2ea67'; // WebApi Key

    $.ajax({
        url: url,
        data: {
            lat: lat,
            lon: long,
            units: 'metric', // メートル法, 摂氏°
            lang: 'ja',
            appid: appId
        }
    }).done(function(data) {
        console.log(data);

        // 都市名、国名
        $('#place').text(data.city.name + ', ' + data.city.country);


        // 都市名, 国名
        console.log('都市名:', data.city.name);
        console.log('国名:', data.city.country);

        // 天気予報データ
        data.list.forEach(function(forecast, index) {
            const dateTime = new Date(utcToJSTimeforecast.dt);
            const month = dateTime.getMonth() + 1;
            const date = dateTime.getDate();
            const hours = dateTime.getHours();
            const min = String(dateTime.getMinutes()).padStart(2, '0');
            const temperature = Math.round(forecast.main.temp);
            const description = forecast.weather[0].description;
            const iconPath = `../static/images/${forecast.weather[0].icon}.svg`;

            console.log(`日時: ${month}/${date} ${hours}:${min}`);
            console.log(`気温: ${temperature}`);
            console.log(`天気: ${description}`);
            console.log(`画像パス: ${iconPath}`);

            // 現在の天気とそれ以外で出力を変える
            if (index === 0) {
                const currentWeather = `
                <div class="icon"><img src="${iconPath}"></div>
                <div class="info">
                    <p>
                        <span class="description">現在の天気：${description}</span>
                        <span class="temp">${temperature}</span>°C
                    </p>
                </div>`;
                $('#weather').html(currentWeather);
            } else {
                const tableRow = `
                <tr>
                    <td class="info">
                        ${month}/${date} ${hours}:${min}
                    </td>
                    <td class="icon"><img src="${iconPath}"></td>
                    <td><span class="description">${description}</span></td>
                    <td><span class="temp">${temperature}°C</span></td>
                </tr>`;
                $('#forecast').append(tableRow);
            }
        });

    }).fail(function() {
        console.log('$.ajax failed');
    });
}