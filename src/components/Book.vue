<template>
  <div class="book">
    <a href="#"><span>{{ book.id }}</span> - <span v-html="highlightSearch(book.volumeInfo.title)"></span> - <span v-html="highlightSearch(book.volumeInfo.authors.join(', '))"></span></a>
    <p v-html="highlightSearch(book.volumeInfo.description)"></p>
    <button type="button" class="fav" @click="favBook(book)" :class="{ 'active': isFav(book) }">&#9733;</button>
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
    favBook () {
      this.favorites.push({ id: this.book.id, title: this.book.volumeInfo.title })
    },
    isFav () {
      return !!_.find(this.favorites, { id: this.book.id })
    },
    highlightSearch (text) {
      const regexString = this.searchedQuery.trim()
        .split(' ')
        .map(s => escapeForRegex(s))
        .join('|')
      return text.replace(new RegExp(regexString, 'ig'), (matchedTxt) => '<span class=\'highlight\'>' + matchedTxt + '</span>')
    }
  }
}
</script>

<style lang="scss">
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
