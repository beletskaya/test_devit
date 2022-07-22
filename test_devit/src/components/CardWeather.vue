<template>
  <div :class="['card', {'card__default' : data.isDefault}]">
    <card-city :dataCity="filterDataCity"/>
    <card-info :dataInfo="filterDataInfo"/>
    <span class="card__close" @click="closeCard" v-if="!data.isDefault">X</span>
  </div>

</template>

<script>

import CardCity from "@/components/card/CardCity";
import CardInfo from "@/components/card/CardInfo";
export default {
  components: {CardInfo, CardCity},
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    closeCard() {
      this.$emit('delete-card')
    }
  },
  computed: {
    filterDataCity() {
      const {
        name,
        weather,
          main: {
            temp,
            feels_like
          }
      } = this.data;
      return {
        'city': name,
        'temp': temp - 273,
        'weather': weather[0].main,
        'feels_like': feels_like - 273,
      }
    },
    filterDataInfo() {
      const {
        wind,
        visibility,
        main: {
          pressure,
          humidity
        }
      } = this.data;
      return [
        {indicator: 'Wind, km/h', value: wind.speed},
        {indicator: 'Visibility', value: visibility},
        {indicator: 'Pressure', value: pressure},
        {indicator: 'Humidity', value: humidity}]
    }
  }
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

    @media(max-width: 700px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
