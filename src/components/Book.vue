<template>
  <div class="book">
    <a href="#"><span>{{ book.id }}</span> - <span v-html="highlightSearch(book.volumeInfo.title)"></span> - <span v-html="highlightSearch(bookAuthors)"></span></a>
    <p v-html="highlightSearch(book.volumeInfo.description)"></p>
    <button type="button" class="fav" @click="toggleFavBook()" :class="{ 'active': isFav }">&#9733;</button>
  </div>
</template>

<script>
import _ from 'lodash'

function escapeForRegex (str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export default {
  name: 'book',
  props: ['book', 'favorites', 'searchedQuery'],
  methods: {
    toggleFavBook () {
      if (this.isFav) {
        this.favorites.splice(_.findIndex(this.favorites, { id: this.book.id }), 1)
      } else {
        this.favorites.push(this.bookObj)
      }
    },
    highlightSearch (text) {
      if (text) {
        const regexString = this.searchedQuery.trim()
          .split(' ')
          .map(s => escapeForRegex(s))
          .join('|')
        return text.replace(new RegExp(regexString, 'ig'), (matchedTxt) => '<span class=\'highlight\'>' + matchedTxt + '</span>')
      }

      return text
    }
  },
  computed: {
    bookObj () {
      return { id: this.book.id, title: this.book.volumeInfo.title }
    },
    bookAuthors () {
      return (this.book.volumeInfo.authors)
        ? this.book.volumeInfo.authors.join(', ') : ''
    },
    isFav () {
      return !!_.find(this.favorites, { id: this.book.id })
    }
  }
}
</script>

<style lang="scss">
.book {
  margin: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 6px;

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
