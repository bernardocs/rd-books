<template>
  <div class="book">
    <figure class="thumb">
      <img :src="book.volumeInfo.imageLinks.smallThumbnail" alt="Book Thumbnail" />
    </figure>
    <div class="data">
      <strong class="title" v-html="highlightSearch(book.volumeInfo.title)"></strong>
      <span class="authors" v-html="highlightSearch(bookAuthors)"></span>
      <p class="description" v-html="highlightSearch(book.volumeInfo.description)"></p>
      <button type="button" class="fav" @click="toggleFavBook()" :class="{ 'active': isFav }">&#9733;</button>
    </div>
    <a class="more-info" @click="openBookModal()">More info</a>
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
    openBookModal () {
      this.$emit('openBookModal', this.book.id)
    },
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
  position: relative;
  display: flex;
  margin: 1em;
  padding: 1em 2.5em 1em 1em;
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 8em;

  &:hover > .more-info {
    opacity: 1;
  }

  > .thumb {
    height: 100%;
    margin-right: 1em;

    > img {
      height: 100%;
    }
  }

  > .more-info {
    position: absolute;
    bottom: 0.5em;
    left: 50%;
    font-size: 0.8em;
    font-weight: bold;
    opacity: 0;
    transform: translateX(-50%);
    transition: opacity 200ms linear;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }

  > .data {
    display: flex;
    flex-direction: column;

    > .title {
      font-weight: bold;
      font-size: 1.4em;
    }

    > .authors {
      margin-bottom: 1em;
      font-style: italic;
      font-size: 0.8em;
    }

    > .description {
      position: relative;
      flex: 1;
      font-size: 0.8em;
      overflow: hidden;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #fff, transparent);
        content: '';
      }
    }

    > .fav {
      position: absolute;
      top: 0;
      right: 0;
      color: #ccc;
      transition: color 100ms linear;
      border: 0;
      background: none;
      font-size: 2.5em;
      outline: none;
      transition: transform 200ms linear;

      &:active {
        transform: scale(0.8);
      }

      &.active {
        color: #e4e40e;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
