const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/50x100',
        searchLine: '',
        showProduct: true,
        isVisibleCart: false,
        cartItems: [],
        error: false,
    },
    methods: {
        
        filter() {
         const regexp = new RegExp(this.searchLine, 'i');
         this.filtered = this.products.filter(product => regexp.test(product.product_name));
         this.products.forEach(el => {
            if (!this.filtered.includes(el)) {
                el.showProduct = !this.showProduct;
            }
         })
        },
        
        async getJson(url) {
            try {
                const result = await fetch(url);
                return await result.json();
            } catch (error) {
                console.log(error);
                this.error = !this.error;
            }
        },

        showCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        
        addProduct(product) {
            // Во Vue нельзя динамически добавлять новые корневые реактивные свойства в уже существующий экземпляр.
            // Можно добавить реактивное свойство во вложенные объекты, используя метод Vue.set(object, propertyName, value)
            product.quantity ? product.quantity : Vue.set(product, 'quantity', 0);
            if (!this.cartItems.includes(product)) {
                product.quantity = 1;
                this.cartItems.push(product);
            } else {
                let cartItemId = this.cartItems.indexOf(product);
                this.cartItems[cartItemId].quantity++;
            }
        },

        decreaseProduct(product) {
            if (product.quantity == 1) {
                this.removeProduct(product);
            } else {
                product.quantity--; // не нужно Vue.set(), тк свойство уже стало реактивным в addProduct
            }
        },

        removeProduct(product) {
            //Для обновления отрисовки корзины исп. this.cartItems = this.cartItems.filter()
            this.cartItems = this.cartItems.filter(item => {
                return item !== product;
            })
        },
    },
    
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
                   this.filtered.push(el);
               }
           });
    }
})

