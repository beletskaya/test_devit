<template>
  <div :class="['card']">
    <card-city></card-city>
    <card-info></card-info>
    <span class="card__close">X</span>
  </div>

</template>

<script>

import CardCity from "@/components/card/CardCity";
import CardInfo from "@/components/card/CardInfo";
export default {
  components: {CardInfo, CardCity},
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  align-items: flex-start;
  border: 1px solid #dad5d5;
  border-radius: 15px;
  margin-top: 50px;
  padding: 15px;

  &__close {
     cursor: pointer;
     margin-left: auto;
     color: #939393;
   }

  &__default {
    background-color: #0072f50f;
    border: 1px solid #0072f5;
  }
}
</style>
