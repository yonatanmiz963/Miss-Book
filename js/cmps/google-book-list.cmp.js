
export default {
    props: ['googleBooks'],
    template: `
    <section v-if="googleBooks" class="google-book-list">
        <ul class="google-list">
            <li v-for="(googleBook, idx) in googleBooks" :key="googleBook.id">
                <div class="google-list-item">
                    <h4>{{googleBook.volumeInfo.title}}</h4>
                    <button @click="addBook(idx)">Add Book</button>
                </div>
            </li>
        </ul>
    </section>
    `,
    methods: {
        addBook(bookIdx) {
            // console.log(this.googleBooks);
            // console.log('book chosen idx', bookIdx);
            this.$emit('addGoogleBook', bookIdx)
        }
    },
    created() {
        
    },
    mounted() {
    },
    components: {
    },
}