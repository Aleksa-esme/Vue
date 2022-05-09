const product = {
    props: ['product', 'img'],
    template: `
                <div class="product-item">
                    <img :src="img" alt="Some img">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}} $</p>
                        <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                    </div>
                </div>
    `
};

const products = {
    components: { product },
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/200x150',
        }
    },
    mounted () {
        this.$parent.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
                   this.filtered.push(el);
               }
           });
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
    },
    template: `
                <div class="products">
                    <product 
                    v-for="product of filtered" 
                    :key="product.id_product"
                    :img="imgCatalog"
                    :product="product"
                    >
                    </product>
                </div>
    `
};