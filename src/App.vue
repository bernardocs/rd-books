<template>
  <main class="main-content">
    <section class="search-area">
      <h1 class="title">RD Books</h1>
      <div class="search">
        <input class="search-bar" type="search" @keypress.enter="getBooks()" v-model="query" placeholder="Search for books :)" />
        <button class="button" type="button" @click="getBooks()">Search</button>
      </div>
      <div class="books-index">
        <loader v-if="loading"></loader>
        <p v-if="!loading && searchedQuery && booksIsEmpty">No search results :(</p>
        <book :book="book"
          :favorites="favorites"
          :searched-query="searchedQuery"
          v-for="book in books"
          :key="book.id"
          @openBookModal="openBookModal">
        </book>
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
    <favbar :favorites="favorites" @openBookModal="openBookModal"></favbar>
    <book-modal v-if="modalInfo.active" :modal-info="modalInfo"></book-modal>
  </main>
</template>

<script>
import favbar from './components/FavBar'
import book from './components/Book'
import loader from './components/Loader'
import bookModal from './components/BookModal'
import bookService from './services/Book.service'

const APP_STORAGE_KEY = 'rd-books-favs'

export default {
  name: 'app',
  components: {
    favbar,
    book,
    loader,
    bookModal
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
      books: [],
      modalInfo: {
        active: false,
        bookId: ''
      }
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
    openBookModal (bookId) {
      this.modalInfo = {
        active: true,
        bookId
      }
    },
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
$primary: #2c3e50;

html,
body {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $primary;
}

.main-content {
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;
}

.search-area {
  flex: 1;
  padding-bottom: 1em;
  overflow: auto;

  > .title {
    margin: 0.5em 0 0.2em;
    text-align: center;
    font-weight: bold;
    font-size: 2.5em;
  }

  .search {
    display: flex;
    justify-content: center;

    .search-bar {
      margin-right: 0.25em;
      font-size: 1.75em;
      padding: 0.25em 0.5em;
      border: 1px solid #ccc;
      border-radius: 6px;
      color: $primary;
    }

    .button {
      padding: 0.5em;
      border: 0;
      border-radius: 6px;
      background: $primary;
      font-size: 1.75em;
      color: #fff;
      transition: background 200ms linear;

      &:hover {
        background: #476481;
        cursor: pointer;
      }
    }
  }

  .highlight {
    border-radius: 2px;
    background: #ccc;
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
      background: $primary;

      &:hover {
        cursor: auto;
        color: #fff;
        background: $primary;
      }
    }

    > button {
      display: block;
      width: 2em;
      padding: 0.5em 0;
      border: 1px solid $primary;
      border-radius: 6px;
      background: transparent;
      color: $primary;
      transition: background 200ms linear;

      &:hover {
        background: rgba(0, 0, 0, 0.15);
        cursor: pointer;
      }
    }
  }
}
</style>
