Vue.component('products', {
    props: ['products', 'img'],
    template: `
                <div class="products" v-if="$parent.error===false">
                    <product v-for="item of products" 
                    :key="item.id_product"
                    :img="img"
                    :product="item"
                    >
                    </product>
                </div>
                <errormessage v-else="$parent.error===true"></errormessage>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
                <div class="product-item">
                    <img :src="img" alt="Some img">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}} $</p>
                        <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                    </div>
                </div>
    `
});

// работает с локальным компонентом. Как импортировать в этот файл компонент из ErrorComponent.js?
Vue.component('errormessage', {
    props: [],
    template: `
                <div>
                    <p>Не удалось выполнить запрос к серверу</p>
                </div>
    `
});

// @click="$parent.$emit('add-product', product)"
// @click="$parent.$emit('функция(с названием из верстки)', то что функция принимает на вход)

// первый метод быстрее и правильнее, но так же можно еще записать так:
// @click="root.addProduct(product)"