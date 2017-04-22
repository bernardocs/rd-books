<template>
  <main class="main-content">
    <favbar :favorites="favorites"></favbar>

    <h1>RD Books</h1>
    <input type="search" v-model="query" placeholder="Search for books :)" />
    <div class="books-index">
      <div class="book" v-for="book in filteredBooks">
        <p>{{ book.id }} - {{ book.name }}</p>
        <input type="checkbox" :value="book" v-model="favorites">
      </div>
    </div>
  </main>
</template>

<script>
import favbar from './components/FavBar';

const APP_STORAGE_KEY = 'rd-books-favs';

export default {
  name: 'app',
  data() {
    return {
      query: '',
      favorites: JSON.parse(localStorage.getItem(APP_STORAGE_KEY) || '[]'),
      books: [
        { id: 1, name: 'Book 1' },
        { id: 2, name: 'Book 2' },
        { id: 3, name: 'Book 3' },
        { id: 4, name: 'Book 4' },
        { id: 5, name: 'Book 5' },
        { id: 6, name: 'Book 6' },
      ],
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book =>
        book.id.toString().indexOf(this.query) !== -1 ||
        book.name.indexOf(this.query) !== -1);
    },
  },
  components: {
    favbar,
  },
  watch: {
    favorites: {
      handler(favorites) {
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(favorites));
      },
    },
  },
};
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
  height: 100%;
}
</style>
