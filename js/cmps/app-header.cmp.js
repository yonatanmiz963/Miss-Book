export default {
    template: `
    <section class="books-header">
        <div class="header-container common-width">
            <div class="logo">
                <h1>MissBook</h1>
            </div>
            <nav class="nav-bar">
                <router-link to="/book">Books</router-link> |
                <router-link to="/addBooks">Add Books</router-link> |
                <router-link to="/about/me">About</router-link> |
                <router-link to="/" exact>Home</router-link> 

            </nav>
        </div>
    </section>
    `
}