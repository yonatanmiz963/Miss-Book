import { utilService } from '../services/util-service.js'

export default {
    props: ['book'],
    template: `
    <section class="book-preview">
        <img class="preview-img" :src="book.thumbnail"/>
        <h3 class="preview-title">{{capitalizedTitle}}</h3>
        <p>{{currencyPrice}}</p>
    </section>
    `,
    computed: {
        currencyPrice() {
            if (!this.book.listPrice.currencyCode) return 'Out of stock';
            return new Intl.NumberFormat(this.book.listPrice.currencyCode, {
                style: 'currency',
                currency: this.book.listPrice.currencyCode,  
            }).format(this.book.listPrice.amount);
        },
        capitalizedTitle() {
            return utilService.titleCase(this.book.title);
        }
    },
    created() {
    }
}