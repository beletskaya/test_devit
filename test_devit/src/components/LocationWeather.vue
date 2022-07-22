<template>
  <div class="location">
    <p class="location__text">Location:</p>
    <div class="location__input" :class="$v.city.$error ? 'error' : ''">
      <input type="text" v-model="city" placeholder="Enter city" />
      <div v-if="(!$v.city.required || !$v.city.minLength) && $v.city.$dirty" class="location__input-error">Field must be filled</div>
      <div v-if="incorrectCity" class="location__input-error location__input-error-name">Incorrect name</div>
    </div>
    <div class="location__btn">
      <button @click="applyLocation">Search</button>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength }from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  data() {
    return {
      city: null
    }
  },
  props: {
    incorrectCity: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    city: {
      required,
      minLength: minLength(1)
    }
  },
  methods: {
    applyLocation() {
      this.$v.city.$touch()
      if(!this.$v.city.$error) {
        this.$emit('get-weather-city', this.city)
        this.$emit('check-reload', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.location {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 25px;
  margin-bottom: 50px;

  @media(max-width: 450px) {
    flex-wrap: wrap;
  }

  &__input {
    @media(min-width: 450px) {
      margin-left: 20px;
    }
    position: relative;
    display: flex;
    min-height: 30px;
    max-width: 410px;
    width: 100%;
    padding: 4px 5px;
    font-size: 14px;
    background-color: #f6f6f8;
    border: 0;
    border-radius: 8px;
    color: #000;

    &.error {
      border: 1px solid #e51111;
    }

    input {
      width: 100%;
      background-color: transparent;
      border-width: 0;
      outline: none;
      color: inherit;
      font-size: 14px;
      cursor: pointer;
      padding-left: 10px;
    }

    &-error {
      position: absolute;
      bottom: -6px;
      transform: translateY(100%);
      color: #e51111;
    }
  }
  &__btn {
    @media(min-width: 450px) {
      margin-left: 15px;
    }
    display: flex;
    align-items: center;

    button {
      display: block;
      padding: 6px 14px;
      cursor: pointer;
      outline: none;
      width: 100px;
      line-height: 1.15;
      background: #0072f5;
      border: 1px solid #f5000000;
      color: #fff;
      height: auto;
      border-radius: 16px;
      transition: background 0.3s;

      @media (max-width: 450px) {
        margin-top: 20px;
        width: 200px;
      }
      &:hover {
        background: #275fa0;
      }
    }
  }
}
</style>
