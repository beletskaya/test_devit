<template>
  <div class="location">
   <p class="location__text">Location:</p>
    <div class="location__input" >
      <input type="text" v-model="city" placeholder="Enter city" />
    </div>
    <div class="location__btn">
      <button>Search</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      city: null
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

  &__input {
    position: relative;
    display: flex;
    min-height: 30px;
    max-width: 410px;
    width: 100%;
    padding: 4px 5px;
    margin-left: 20px;
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
    display: flex;
    align-items: center;
    margin-left: 15px;

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
      &:hover {
        background: #275fa0;
      }
    }
  }
}
</style>
