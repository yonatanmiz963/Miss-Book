export default {
    props: ['txt'],
    template: `
    <section class="long-txt">
        <p class="long-txt-desc"> {{txt}} <span @click="close" class="read-less" title="show less">show less...</span></p>
    </section>
    `,
    methods: {
        close() {
            this.$emit('close');
            console.log('clicked');
        }
    }
}