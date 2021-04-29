import reviewPreview from './review-preview.cmp.js'

export default {
    props: ['book'], 
    template: `
    <section v-if="book" class="reviews-list-container">
        <ul class="reviews-list">
            <li v-for="review in book.reviews" :key="review.id">
                <review-preview :review="review" @removeReview="deleteReview"></review-preview>
            </li>
        </ul>
    </section>
    `,  
    methods: {
        deleteReview(reviewId) {
            this.$emit('deleteReview', reviewId);
        },
    },
    created() {
    },
    components: {
        reviewPreview
    },
}