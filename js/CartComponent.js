Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `
                <div v-show="visibility" class="cart-block">
                    <p v-if="cartItems == 0">В корзине еще нет товаров</p>
                    <cart-item 
                        v-else="cartItems > 0" 
                        v-for="item of cartItems" 
                        :key="item.id_product"
                        :img="img"
                        :cart-item="item"
                    >
                    </cart-item>
                </div>
    `
});

// при использовании атрибута с дефисом ":cart-item" - этот атрибут в пропсе дочернего элемента пишется в стиле camelCase без дефиса
Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">{{cartItem.quantity}} шт.</p>
                            <p class="product-single-price">{{cartItem.price}} $</p>
                        </div>    
                        <div class="right-block">
                            <p class="product-price">{{cartItem.quantity * cartItem.price}} $</p>
                            <button @click="$root.addProduct(cartItem)" class="cart-btn">+</button>
                            <button @click="$root.decreaseProduct(cartItem)" class="cart-btn">-</button>
                            <button @click="$root.removeProduct(cartItem)" class="cart-btn">&times;</button>
                        </div>
                    </div>
                </div>
    `
});