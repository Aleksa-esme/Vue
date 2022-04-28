const cartItem = {
    props: ['img', 'cartItem'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <p class="product-title">{{ cartItem.product_name }}</p>
                            <p class="product-quantity">{{ cartItem.quantity }} шт.</p>
                            <p class="product-single-price">{{ cartItem.price }} $</p>
                        </div>    
                        <div class="right-block">
                            <p class="product-price">{{ cartItem.quantity * cartItem.price }} $</p>
                            <button @click="$root.$refs.cart.addProduct(cartItem)" class="cart-btn">+</button>
                            <button @click="$root.$refs.cart.decreaseProduct(cartItem)" class="cart-btn">-</button>
                            <button @click="$root.$refs.cart.removeProduct(cartItem)" class="cart-btn">&times;</button>
                        </div>
                    </div>
                </div>
    `
};

const cart = {
    components: { cartItem },
    data () {
        return {
            cartUrl: '/getBasket.json',
            addToCartUrl: '/addToBasket.json',
            dltFromCartUrl: '/deleteFromBasket.json',
            imgCart: 'https://via.placeholder.com/50x100',
            isVisibleCart: false,
            cartItems: []
        }
    },
    methods: {
        showCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },

        addProduct(product) {      
            this.$parent.getJson(`${API + this.addToCartUrl}`)
            .then(data => {
                if (data.result) {
                    product.quantity ? product.quantity : Vue.set(product, 'quantity', 1);
                    let find = this.cartItems.find(el => el.id_product === product.id_product);
                    if(find){
                        find.quantity ++;
                    } else {
                        this.cartItems.push(product);
                    }
                }
            });
        },

        decreaseProduct(product) {
            this.$parent.getJson(`${API + this.dltFromCartUrl}`)
            .then(data => {
                if (data.result) {
                    if (product.quantity == 1) {
                        this.removeProduct(product);
                    } else {
                        product.quantity--; 
                    }
                }
            });
        },

        removeProduct(product) {
            this.$parent.getJson(`${API + this.dltFromCartUrl}`)
            .then(data => {
                if (data.result) {
                    this.cartItems = this.cartItems.filter(item => {
                        return item !== product;
                    })
                }
            });
        },
    },
    mounted () {
        this.$parent.getJson(`${API + this.cartUrl}`)
        .then(data => {
            for(let el of data.contents){
                this.cartItems.push(el);
            }
        });
    },
    template: `
                <div>
                    <button @click="showCart()" class="btn-cart" type="button">Корзина</button>
                    <div v-show="isVisibleCart" class="cart-block">
                        <p v-if="cartItems == 0">В корзине еще нет товаров</p>
                        <cart-item 
                            v-else="cartItems > 0" 
                            v-for="product of cartItems" 
                            :key="product.id_product"
                            :img="imgCart"
                            :cart-item="product"
                        >
                        </cart-item>
                    </div>
                </div>
    `
};
