<template>
  <div class="h-auto lg:h-[373px] w-full grayBlack py-10">
    <p class="text-xl text-white text-center">
      Sign Up For PRC <span class="main_red_text">Newsletter</span>
    </p>
    <div class="flex flex-col lg:flex-row justify-center mt-14">
      <input
        class="px-4 py-4 mb-4 mx-4 lg:mb-0 lg:mr-4 rounded-sm"
        type="text"
        placeholder="name"
      />
      <input
        class="px-4 py-4 mx-4 rounded-sm"
        type="email"
        placeholder="email"
      />
    </div>
    <div class="btnn w-[200px] mx-auto mt-14">Subscribe!</div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.grayBlack {
  background: #282a2e;
}
.btnn {
  background: black;
  padding: 1em 2em;
  text-align: center;
  color: white;
}
</style>
