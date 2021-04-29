import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'], 
    template: `
    <section class="list-container">

        <ul class="book-list common-width">
            <li v-for="book in books" :key="book.id" class="book-preview-container">
                <book-preview :book="book" @click.native="select(book.id)"></book-preview>
            </li>
        </ul>
    </section>
    `,  
    methods: {
        select(bookId) {
            this.$router.push(`book/${bookId}`)
        }
    },
    created() {
    },
    components: {
        bookPreview
    },
}