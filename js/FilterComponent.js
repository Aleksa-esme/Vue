Vue.component('filtersearch', {
    template: `
            <form action="#" class="search-form" @submit.prevent="$parent.filter">
                <input v-model="$parent.searchLine" type="text" class="search-field">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>  
    `
});
