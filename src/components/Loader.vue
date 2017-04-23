<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'loader'
}
</script>

<style lang="scss">
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.loader {
  position: relative;
  width: 8em;
  height: 8em;
  margin: 2em auto;
  border: 10px solid #ccc;
  border-radius: 50%;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 10px solid transparent;
    border-top-color: #2c3e50;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: spin 1.2s ease infinite;
    content: '';
  }
}
</style>
