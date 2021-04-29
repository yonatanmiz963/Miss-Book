

export default { 
    template: `
    <section class="book-filter">
        <form class="search-bar" @submit.prevent="setFilter">
            <input @input="setFilter" placeholder="Name" v-model="filterBy.bookName">
            <input @input="setFilter" placeholder="Price" v-model.number="filterBy.bookPrice">
            <button>Search</button>
        </form>
    </section>
    `,
    data() {
        return {
            filterBy: {
                bookName: '',
                bookPrice: ''
            }
        }
    },
    methods: {
        select(bookId) {
            this.$emit('selected', bookId);
        },
        setFilter() {
            this.$emit('filtered', this.filterBy)
        }
    },
}