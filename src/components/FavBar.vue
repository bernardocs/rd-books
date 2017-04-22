<template>
  <nav class="fav-navbar">
    Favs:
    <ul class="list">
      <li class="items" v-for="fav in favorites"><a href="#">{{ fav.title }}</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'favbar',
  props: ['favorites']
}
</script>

<style lang="scss">
.fav-navbar {
  flex: 0 0 15em;
  border-left: 1px solid #ccc;
}
</style>
