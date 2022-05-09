const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        error: false,
    },
    components: {products, cart, filtersearch, errormessage},
    methods: {
        async getJson(url) {
            try {
                const result = await fetch(url);
                return await result.json();
            } catch (error) {
                console.log(error);
                this.error = !this.error;
            }
        },
    },
})

