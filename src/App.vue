<template>
  <main class="main-content">
    <section class="search-area">
      <h1>RD Books</h1>
      <div class="search">
        <input type="search" @keypress.enter="getBooks()" v-model="query" placeholder="Search for books :)" />
        <button type="button" @click="getBooks()">Search</button>
      </div>
      </form>
      <div class="books-index">
        <div class="book" v-for="book in books">
          <a href="#"><span>{{ book.id }}</span> - <span v-html="highlightSearch(book.volumeInfo.title)"></span> - <span v-html="highlightSearch(book.volumeInfo.authors.join(', '))"></span></a>
          <p v-html="highlightSearch(book.volumeInfo.description)"></p>
          <button type="button" class="fav" @click="favBook(book)" :class="{ 'active': isFav(book) }">&#9733;</button>
        </div>
      </div>
    </section>
    <favbar :favorites="favorites"></favbar>
  </main>
</template>

<script>
import _ from 'lodash'
import favbar from './components/FavBar'
import bookService from './services/Book.service'

const APP_STORAGE_KEY = 'rd-books-favs'

function escapeForRegex (str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export default {
  name: 'app',
  components: {
    favbar
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
    },
    favBook (book) {
      this.favorites.push({ id: book.id, title: book.volumeInfo.title })
    },
    isFav (book) {
      return !!_.find(this.favorites, { id: book.id })
    },
    highlightSearch (text) {
      const regexString = this.searchedQuery.trim()
        .split(' ')
        .map(s => escapeForRegex(s))
        .join('|')
      return text.replace(new RegExp(regexString, 'ig'), (matchedTxt) => '<span class=\'highlight\'>' + matchedTxt + '</span>')
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

.book {
  margin: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;

  > .fav {
    color: #ccc;
    transition: color 100ms linear;

    &.active {
      color: #e4e40e;
    }

    &:hover {
      cursor: pointer;
    }

  }
}
</style>
