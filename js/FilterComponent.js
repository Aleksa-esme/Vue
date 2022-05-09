const filtersearch = {
    data () {
        return {
            searchLine: '',
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(searchLine)">
                <input v-model="searchLine" type="text" class="search-field">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>  
    `
};
