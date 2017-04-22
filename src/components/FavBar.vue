<template>
  <nav class="fav-navbar">
    Favs:
    <ul class="list">
      <li class="items" v-for="fav in favorites"><a href="#">{{ fav.name }}</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'favbar',
  props: ['favorites'],
};
</script>

<style lang="scss">
.fav-navbar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 15em;
  border-left: 1px solid #ccc;
}
</style>
