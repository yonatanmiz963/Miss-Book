
export default {
    template: `
    <section class="add-review">
       <form class="review-form" @submit.prevent="saveReview">
            <label>Your name: <input v-model="review.readerName" ref="readerName" type="text" placeHolder="Name" value="Books Reader"></label>
            <label for="rating">Rate This Book: 
                <select v-model="review.rating" placeHolder="Rate Book">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>
            <label for="start">Date: 
                <input v-model="review.date" type="date">
            </label>
            <div class="text-form">
                <label>Free Text: </label>
                    <textarea v-model="review.txt" name="free-text" rows="3" cols="40">Share your thoughts with us!
                    </textarea>
            </div>
            <button>Save Review</button>
       </form>
        <div class="reviews"></div>
    </section>
    `,
    data() {
        return {
            review: {
                readerName: null,
                rating: null,
                date: new Date().toISOString().slice(0, 10),
                txt: null
            }
        }
    },
    methods: {
        saveReview() {
            const sentReview = Object.assign({}, this.review);
            this.$emit('reviewed', sentReview);
            this.review = null;
            this.review = {
                readerName: null,
                rating: null,
                date: new Date().toISOString().slice(0, 10),
                txt: null
            }

        },
        mounted() {
            this.$refs.readerName.focus()
        }
    }
}