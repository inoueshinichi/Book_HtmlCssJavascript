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
        var self = this;

        // $.getJSON("http://localhost:4248/images.json", function (data) {
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