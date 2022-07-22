<template>
  <div class="card-indicator">
    <p class="card-indicator__name">{{ indicator }}</p>
    <p class="card-indicator__val"><strong>{{ value }}</strong></p>
  </div>

</template>

<script>

export default {
  props: {
    indicator: {
      type: String,
      default: 'Wind'
    },
    value: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
.card-indicator{
  background-color: #fefefe;
  border-radius: 25px;
  padding: 5px 10px;
  box-shadow: 1px 1px 3px rgb(90 90 90 / 14%);
  width: 45%;
  margin-bottom: 15px;

  p {
    margin: 7px 0;
  }

  &__name {
    font-size: 12px;
    color: #9d938f;
  }
  &__val {
    font-size: 17px;
  }
}

</style>
