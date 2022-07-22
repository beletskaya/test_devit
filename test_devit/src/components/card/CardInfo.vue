<template>
  <div class="card-info">
    <card-indicator v-for="(item, index) in dataInfo" :key="index"
                    :indicator="item.indicator" :value="item.value"></card-indicator>
  </div>

</template>

<script>

import CardIndicator from "@/components/card/CardIndicator";

export default {
  components: {CardIndicator},
  data() {
    return {
      dataInfo: [
        {indicator: 'Wind, km/h', value: 12.4},
        {indicator: 'Visibility', value: 0},
        {indicator: 'Pressure', value: 0},
        {indicator: 'Humidity', value: 0}]
    }
  }
}
</script>

<style scoped>
.card-info{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 50%;
  align-items: center;
}

</style>
