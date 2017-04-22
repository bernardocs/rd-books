<template>
  <main class="main-content">
    <section class="search-area">
      <h1>RD Books</h1>
      <div class="search">
        <input type="search" @keypress.enter="getBooks()" v-model="query" placeholder="Search for books :)" />
        <button type="button" @click="getBooks()">Search</button>
      </div>
      <div class="books-index">
        <book :book="book" :favorites="favorites" :searched-query="searchedQuery" v-for="book in books"></book>
      </div>
    </section>
    <favbar :favorites="favorites"></favbar>
  </main>
</template>

<script>
import favbar from './components/FavBar'
import book from './components/Book'
import bookService from './services/Book.service'

const APP_STORAGE_KEY = 'rd-books-favs'

export default {
  name: 'app',
  components: {
    favbar,
    book
  },
  data () {
    return {
      query: '',
      searchedQuery: '',
      favorites: JSON.parse(localStorage.getItem(APP_STORAGE_KEY) || '[]'),
      books: []
    }
  },
  computed: {
    filteredBooks () {
      return this.books.filter(book =>
        book.id.toString().indexOf(this.query) !== -1 ||
        book.name.indexOf(this.query) !== -1)
    }
  },
  methods: {
    getBooks () {
      this.searchedQuery = this.query
      bookService.searchBooks(this.query).then((res) => {
        this.books = res.data.items
      })
    }
  },
  watch: {
    favorites: {
      handler (favorites) {
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(favorites))
      }
    }
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-content {
  position: relative;
  display: flex;
  height: 100%;
}

.search-area {
  flex: 1;

  .highlight {
    background: yellow;
  }
}
</style>
