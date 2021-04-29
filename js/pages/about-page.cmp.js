export default {
    template: `
    <section class="about-page common-width">
        <nav>
            <router-link to="/about/me">My Self</router-link>
            <router-link to="/about/vue">Vue.js</router-link>
        </nav>
        <router-view />
    </section>
    `,
    created() {
        // this.$router.push('/about/');
    }
}