<template>
  <nav class="fav-navbar" :class="{'active': active}">
    <button class="toggle" @click="active = !active">&#9733;</button>
    <h3 class="title">Favorites</h3>
    <ul class="list">
      <li class="item" v-for="fav in favorites">
        <a class="title" @click="openBookModal(fav.id)">{{ fav.title }}</a>
        <span title="Un-favorite book" class="remove" @click="removeFav(fav)">&times;</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'favbar',
  props: ['favorites'],
  data () {
    return {
      active: false
    }
  },
  methods: {
    openBookModal (bookId) {
      this.$emit('openBookModal', bookId)
    },
    removeFav (fav) {
      this.favorites.splice(_.findIndex(this.favorites, { id: fav.id }), 1)
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #2c3e50;

.fav-navbar {
  position: relative;
  flex: 0;
  width: 0;
  border-left: 1px solid #ccc;
  transition: flex-basis 200ms ease;
  box-shadow: -1px 0px 10px 0px rgba(0,0,0,0.16);

  &.active {
    flex-basis: 15em;
    width: auto;
  }

  > .toggle {
    position: absolute;
    top: 0;
    right: 100%;
    padding: 0.5em;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-right: none;
    border-radius: 0 0 0 6px;
    font-size: 1.5em;
    color: $primary;
    box-shadow: -3px 3px 10px -2px rgba(0, 0, 0, 0.16);
    outline: none;
    transition: box-shadow 200ms linear;

    &:hover {
      cursor: pointer;
      box-shadow: none;
    }
  }

  > .title {
    margin: 1em 0;
    text-align: center;
    font-size: 1.2em;
    font-weight: 500;
  }

  > .list {
    display: flex;
    flex-direction: column;

    > .item {
      display: flex;
      margin: 0 0.5em 0.5em;
      padding: 0.5em;
      border: 1px solid #ccc;
      border-radius: 6px;

      > .title {
        &:hover {
          cursor: pointer;
        }
      }

      > .remove {
        margin-left: auto;
        transition: opacity 200ms linear;

        &:hover {
          cursor: pointer;
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
