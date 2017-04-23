<template>
  <div class="book-modal">
    <div class="modal" v-if="!bookIsEmpty">
      <div class="top-info">
        <figure class="thumb">
          <img :src="book.volumeInfo.imageLinks.thumbnail" alt="Book Thumb">
        </figure>
        <div class="main-info">
          <h3 class="title">{{ book.volumeInfo.title }}</h3>
          <span class="authors">{{ authors }}</span>
          <span class="publisher">Published by <strong>{{ book.volumeInfo.publisher }}</strong> in <strong>{{ book.volumeInfo.publishedDate }}</strong></span>
          <span class="isbn">ISBN {{ book.volumeInfo.industryIdentifiers[0].identifier }}</span>
          <span class="rating">Avarage Rating of {{ book.volumeInfo.avarageRating }} ({{ book.volumeInfo.ratingsCount }} votes)</span>
        </div>
      </div>
      <p class="description-label">Full description:</p>
      <p class="description" v-html="book.volumeInfo.description"></p>
    </div>
    <div class="mask" @click="closeModal()"></div>
  </div>
</template>

<script>
import bookService from '../services/Book.service'
import _ from 'lodash'

export default {
  name: 'bookModal',
  props: ['modalInfo'],
  data () {
    return {
      book: {}
    }
  },
  mounted () {
    bookService.getBook(this.modalInfo.bookId).then((res) => {
      this.book = res.data
    }).catch((res) => {
      console.error('Error', res)
    })
  },
  methods: {
    closeModal () {
      this.modalInfo.bookId = ''
      this.modalInfo.active = false
    }
  },
  computed: {
    bookIsEmpty () {
      return _.isEmpty(this.book)
    },
    authors () {
      return (this.book.volumeInfo.authors)
        ? this.book.volumeInfo.authors.join(', ') : ''
    }
  }
}
</script>

<style lang="scss">
.book-modal {
  > .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    max-height: 95%;
    padding: 1em;
    border-radius: 6px;
    background: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.16);
    overflow: auto;
    z-index: 2;

    > .top-info {
      display: flex;
      margin-bottom: 0.5em;

      > .thumb {
        margin-right: 1em;
      }

      > .main-info {
        display: flex;
        flex-direction: column;
        flex: 1;

        > span {
          margin-bottom: 0.5em;

          > strong {
            font-weight: bold;
          }
        }

        > .title {
          margin-bottom: 0.25em;
          font-size: 2em;
          font-weight: bold;
        }

        > .authors {
          font-style: italic;
        }
      }
    }

    > .description-label {
      margin-bottom: 0.5em;
      font-weight: bold;
    }

    > .description {
      font-size: 0.9em;
    }
  }

  > .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
}
</style>
