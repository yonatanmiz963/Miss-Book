import { bookService } from '../services/book-service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookPreview from '../cmps/book-preview.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'


export default {
        template: `
        <section class="book-app">
                <book-filter v-if="!selectedBook" @filtered="setFilter"></book-filter>
                <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook"></book-list>
        </section>
        `,
        data() {
                return {
                        books: null,
                        filterBy: null,
                        selectedBook: null
                }
        },
        methods: {
                selectBook(bookId) {
                        bookService.getBookById(bookId)
                                .then(book => this.selectedBook = book);
                },
                setFilter(filterBy) {
                        this.filterBy = filterBy;
                }
        },
        computed: {
                booksToShow() {
                        if (!this.filterBy) return this.books;
                        let filteredBooks = this.books;
                        const searchStr = this.filterBy.bookName.toLowerCase();
                        if (this.filterBy.bookName) filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchStr));
                        if (this.filterBy.bookPrice) filteredBooks = filteredBooks.filter(book => book.listPrice.amount <= this.filterBy.bookPrice);
                        return filteredBooks;
                }

        },
        created() {
                bookService.query()
                        .then(books => {
                                this.books = books;
                                console.log(this.books);
                        })
        },
        components: {
                bookList,
                bookPreview,
                bookFilter
        }
}