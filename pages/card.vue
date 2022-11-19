<template>
  <div
    class="container mx-auto flex flex-col justify-center mt-6 h-full items-center mb-6"
  >
    <FullCard class="mb-8" />
    <PosterCard />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.card_image {
  background-image: url('static/fixed_back_phone.png');
}

.f_card {
  background-image: url('static/flatfoot.jpeg');
}

.down {
  width: 300px;
  height: 300px;
  transform: scale(0.2);
  transform-origin: left top;
  margin-bottom: -150px;
  margin-right: -150px;
}

.very_small {
  font-size: 5px;
}
</style>
