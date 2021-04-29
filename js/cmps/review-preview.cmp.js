
export default {
    props: ['review'], 
    template: `
    <section v-if="review" class="review-preview">
        <p for="">Name: {{review.readerName}} </p>
        <p for="">Rating: {{review.rating}} </p>
        <p for="">Date: {{review.date}} </p>
        <p class="review-txt" for="">Text: {{review.txt}} </p>
        <button class="review-delete-btn" @click="remove(review.id)">Delete</button>
    </section>
    `,  
    methods: {
        remove(reviewId) {
            this.$emit('removeReview', reviewId)
        }       
    },
    created() {
    },
}