import { booksAPI } from '../services/google-api.service.js'
import { bookService } from '../services/book-service.js'
import googleBookList from '../cmps/google-book-list.cmp.js'
import { eventBus } from '../services/event-bus-service.js'


export default {
    template: `
    <section class="add-books-container common-width">
            <form class="google-search-form" @submit.prevent="searchBook">
                <label for="book-search">Search a book: 
                    <input v-model="bookName" placeholder="Book Name" type="search">
                </label>
                <button>Search</button>
            </form>
            <google-book-list @addGoogleBook="saveGoogleBook" :googleBooks="googleBooks" />
    </section>
    `,
    data() {
        return {
            bookName: null,
            googleBooks: null
        }
    },
    methods: {
        searchBook() {
            booksAPI.getNewBooks(this.bookName)
            .then (books => {
                // console.log(books)
                this.googleBooks = books.items;
            });
        },
        saveGoogleBook(bookIdx) {
            const chosenBook = this.googleBooks[bookIdx];
            bookService.addGoogleBook(chosenBook)
            .then (res => {
                const msg = {
                    txt: 'Book added succesfully',
                    type: 'success'
                }
                eventBus.$emit('show-msg', msg);
            })
            .catch(err => {
                console.log(err);
                const msg = {
                    txt: 'Error, please try again later',
                    type: 'error'
                }
                eventBus.$emit('show-msg', msg);
            });
        }
    },
    components: {
        googleBookList,
    }
}