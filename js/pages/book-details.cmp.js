import longTxt from '../cmps/long-txt.cmp.js'
import addReview from '../cmps/add-review.cmp.js'
import reviewsList from '../cmps/reviews-list.cmp.js'
import { utilService } from '../services/util-service.js'
import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'


export default {
    template: `
    <section v-if="book" class="book-details">
        <div class="details-width-container common-width">

            <div class="details-container">
                <h1 class="details-title">{{capitalizedTitle}}</h1>
                <p class="price" :class="sortPrice">{{currencyPrice}}</p>
                <h3 class="sale" v-if="book.listPrice.isOnSale">on Sale!</h3>
                <p class="">Author: {{book.authors[0]}}</p>
                <ul class="" class="category-list">
                    <label class="categories">Categories:</label>
                    <li v-for="category in book.categories" :key="category">
                        {{category}}
                    </li>
                </ul>
                <p class="" class="desc" @click="toggleDesc" v-if="!showAllDesc"> {{slicedDesc}} <span class="read-more" title="Read more">read more...</span></p>
                <long-txt @close="toggleDesc" v-if="showAllDesc" :txt="book.description" />
                <p class="">Language: {{language}} </p>
                <p class="">Reading level: {{ pageCount }} </p>
                <p class="">Status: {{publishedDate}} </p>
                <p class="">Subtitle: {{book.subtitle}} </p>
                <div class="img-container">
                <img :src="book.thumbnail"/>
                </div>
            </div>
            <div class="reviews-container">
                <add-review @reviewed="addReview" />
                <reviews-list @deleteReview="deleteReview" :book="book" />
            </div>
          
        </div>
        <div class="btns-container">
            <router-link :to="prevBookLink">Previous Book</router-link>
            <router-link :to="nextBookLink">Next Book</router-link>
        </div>
      
    </section>
    `,
    data() {
        return {
            book: null,
            showAllDesc: false,
            nextBookId: null,
            prevBookId: null
        }
    },
    methods: {
        toggleDesc() {
            this.showAllDesc = !this.showAllDesc;
        },
        getBook() {
            const id = this.$route.params.bookId;
            bookService.getBookById(id)
                .then(book => {
                    this.book = book
                    bookService.getNextBookId(this.book.id)
                    .then (nextBookId => this.nextBookId = nextBookId)
                    bookService.getPrevBookId(this.book.id)
                    .then (prevBookId => this.prevBookId = prevBookId);
                });
        },
        deleteReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book;
                    const msg = {
                        txt: `Review deleted succesfully`,
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
        },
        addReview(review) {
            const id = this.$route.params.bookId;
            bookService.addReview(id, review)
                .then(book => {
                    this.book = book;
                    const msg = {
                        txt: `Review was added to book ${id} succesfully`,
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
    computed: {
        currencyPrice() {
            if (!this.book.listPrice.currencyCode) return 'Out of stock';
            return new Intl.NumberFormat(this.book.listPrice.currencyCode, {
                style: 'currency',
                currency: this.book.listPrice.currencyCode,
            }).format(this.book.listPrice.amount);
        },
        pageCount() {
            if (this.book.pageCount > 500) return 'Long reading';
            if (this.book.pageCount > 200) return 'Decent reading';
            if (this.book.pageCount < 100) return 'Light reading';
        },
        publishedDate() {
            if (((new Date().getFullYear()) - this.book.publishedDate) > 10) return 'Veteran Book';
            if (((new Date().getFullYear()) - this.book.publishedDate) > 1) return 'New Book';
        },
        sortPrice() {
            return {
                red: this.book.listPrice.amount >= 150,
                green: this.book.listPrice.amount <= 20,
                black: !this.book.listPrice.amount
            }
        },
        slicedDesc() {
            if (!this.book.description) return 'No description';
            return this.book.description.slice(0, 100);
        },
        language() {
            let languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
            return languageNames.of(this.book.language);
        },
        capitalizedTitle() {
            return utilService.titleCase(this.book.title);
        },
        nextBookLink() {
            return '/book/' + this.nextBookId;
        },
        prevBookLink() {
            return '/book/' + this.prevBookId;
        },

    },
    created() {
        this.getBook();
    },
    watch: {
        '$route.params.bookId'(id) {
            console.log('Changed to', id);
            this.getBook();
        }
    },
    components: {
        longTxt,
        reviewsList,
        addReview
    }
}