<template>
  <div class="card-info">
    <card-indicator
      v-for="item in dataInfo"
      :key="item.id"
      :indicator="item.indicator"
      :value="item.value"
    />
  </div>

</template>

<script>

import CardIndicator from "@/components/card/CardIndicator";

export default {
  components: {CardIndicator},
  props: {
    dataInfo: {
      type: Array,
      default() {
        return [
          {indicator: 'Wind, km/h', value: 12.4},
          {indicator: 'Visibility', value: 0},
          {indicator: 'Pressure', value: 0},
          {indicator: 'Humidity', value: 0}
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card-info{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 50%;
  align-items: center;

  @media (max-width: 1150px) {
    width: 70%;
  }
  @media(max-width: 700px) {
    width: 100%;
    margin-top: 20px;
  }
  @media(max-width: 550px) {
    flex-direction: column;
  }
}

</style>
