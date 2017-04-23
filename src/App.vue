<template>
  <main class="main-content">
    <section class="search-area">
      <h1>RD Books</h1>
      <div class="search">
        <input type="search" @keypress.enter="getBooks()" v-model="query" placeholder="Search for books :)" />
        <button type="button" @click="getBooks()">Search</button>
      </div>
      <div class="books-index">
        <loader v-if="loading"></loader>
        <p v-if="!loading && searchedQuery && booksIsEmpty">No search results :(</p>
        <book :book="book" :favorites="favorites" :searched-query="searchedQuery" v-for="book in books" :key="book.id"></book>
        <ul class="pagination" v-if="!loading && searchedQuery && !booksIsEmpty">
          <li class="page" :class="{'active': currentPage === 0}">
            <button @click="getBooks(0, searchedQuery)" :disabled="currentPage === 0">1</button>
          </li>
          <li class="page" v-if="currentPage > 3">...</li>
          <li class="page" v-for="page in totalPages" :class="{'active': currentPage === page}" v-if="Math.abs(page - currentPage) < 3">
            <button @click="getBooks(page, searchedQuery)" :disabled="currentPage === page">{{ page + 1 }}</button>
          </li>
          <li class="page" v-if="Math.abs(currentPage - totalPages) > 4">...</li>
          <li class="page" v-if="totalPages > 4" :class="{'active': currentPage === totalPages - 1}">
            <button @click="getBooks(totalPages - 1, searchedQuery)" :disabled="currentPage === totalPages - 1">{{ totalPages - 1}}</button>
          </li>
        </ul>
      </div>
    </section>
    <favbar :favorites="favorites"></favbar>
  </main>
</template>

<script>
import favbar from './components/FavBar'
import book from './components/Book'
import loader from './components/Loader'
import bookService from './services/Book.service'

const APP_STORAGE_KEY = 'rd-books-favs'

export default {
  name: 'app',
  components: {
    favbar,
    book,
    loader
  },
  data () {
    return {
      query: '',
      searchedQuery: '',
      currentPage: 0,
      totalItems: 0,
      itemsPerPage: 15,
      loading: false,
      favorites: JSON.parse(localStorage.getItem(APP_STORAGE_KEY) || '[]'),
      books: []
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    booksIsEmpty () {
      return !this.books || !this.books.length
    }
  },
  methods: {
    getBooks (selectedPage = 0, query) {
      this.books = []
      this.currentPage = selectedPage
      this.searchedQuery = query || this.query
      this.loading = true
      bookService.searchBooks(this.query, this.currentPage * this.itemsPerPage).then((res) => {
        this.books = res.data.items
        this.totalItems = res.data.totalItems
        this.loading = false
      }).catch((res) => {
        console.error('Error on searchBooks', res)
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

.pagination {
  display: flex;
  justify-content: center;

  > .page {
    display: flex;
    align-items: center;
    margin: 0.25em;

    &.active > button {
      border-color: transparent;
      color: #fff;
      background: #2c3e50;

      &:hover {
        cursor: auto;
        color: #fff;
        background: #2c3e50;
      }
    }

    > button {
      display: block;
      width: 2em;
      padding: 0.5em 0;
      border: 1px solid #2c3e50;
      border-radius: 6px;
      background: transparent;
      color: #2c3e50;
      transition: background 200ms linear;

      &:hover {
        background: rgba(0, 0, 0, 0.15);
        cursor: pointer;
      }
    }
  }
}
</style>
