/* Vue.js */

// Vue.js
const { createApp, ref } = Vue
createApp({
    setup() {
        const message = ref('Hello vue!')
        return {
            message
        };
    },
}).mount('#vue_unit');


const MyVuePhotos = {
    Photos: [],
    
    setup() {
        var self = this;
        // console.log("MyVuePhotos : setup");
    },

    // setupよりdataが先に処理される!
    data() {
        // var Photos = [
        //     {
        //         path: 'img/img01.jpg',
        //         name: 'sansaisan',
        //         caption: 'こっちは貫禄ありすぎ',
        //         date: 'sansaisan',
        //         memo: 'こっちは貫禄ありすぎ'
        //     },
        //     {
        //         path: 'img/img02.jpg',
        //         name: 'yukky_13dream',
        //         caption: '年明け富士山',
        //         date: 'yukky_13dream',
        //         memo: '年明け富士山'
        //     },
        //     {
        //         path: 'img/img03.jpg',
        //         name: 'maako',
        //         caption: '空と大地の境界線って、どのあたり？',
        //         date: 'maako',
        //         memo: '空と大地の境界線って、どのあたり？'
        //     }
        // ];
        
        var self = this;

        $.getJSON("https://h2o-space.com/htmlbook/images.php", function (data) {
            self.Photos = data; // jQueryのAjax通信で取得したデータをVueの変数に格納
            console.log('getJSON -> ', self.Photos);
        });

        console.log('data -> ', self.Photos);
        const Photos = ref(self.Photos);
        return {
            Photos
        }
    }
};

createApp(MyVuePhotos).mount('#img_unit');