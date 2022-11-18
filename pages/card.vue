<template>
  <div class="w-full mx-auto p-2">
    <h1 class="text-center m-6">Card Page</h1>
    <!-- this is a new card for mobile   -->
    <section
      class="flex justify-center card_image max-w-[320px] mx-auto mt-6 mb-6"
    >
      <!-- Card Mobile -->
      <div class="w-[320px]">
        <!-- header -->
        <div class="h-[48px] bg-black flex items-center justify-center w-full">
          <h2 class="text-white chedder text-xl">Band Text</h2>
        </div>
        <!-- Info  -->
        <div class="py-6 flex w-full">
          <div class="flex-grow w-full p-4">
            <div class="bg-white p-2">
              <p class="chedder">Punk/Ska</p>
              <p class="chedder">Jan 1 2020</p>
            </div>
          </div>
          <div class="flex-grow w-full p-4">
            <div class="bg-white p-2">
              <p class="chedder">Chicago, IL</p>
              <p class="chedder">Internal message</p>
            </div>
          </div>
        </div>
        <!-- logo -->
        <div class="flex">
          <div class="flex-grow w-full p-4">
            <div class="w-full h-[200px] card_image shadow-lg"></div>
          </div>
          <!-- Container for the featured card -->
          <div class="flex-grow w-full p-4">
            <!-- nested card  ========================================================= -->
            <div class="w-full h-[200px] f_card shadow-lg">
              <!-- header -->
              <div class="w-full bg-black">
                <p class="chedder text-white text-center">Title Of Card</p>
              </div>
              <!-- Info of nester card -->
              <div class="py-2 flex w-full">
                <div class="flex-grow w-full p-2">
                  <div class="bg-white p-2">
                    <p class="chedder very_small">Punk/Ska</p>
                    <p class="chedder very_small">Jan 1 2020</p>
                  </div>
                </div>
                <div class="flex-grow w-full p-2">
                  <div class="bg-white p-2">
                    <p class="chedder very_small">Chicago, IL</p>
                    <p class="chedder very_small">Internal message</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="w-full h-[120px] bg-red-200"></div> -->
          </div>
        </div>
        <!-- announcements -->
        <div class="w-11/12 bg-white mx-auto mb-4 py-4 px-2">
          <h2 class="text-xl chedder mb-2">Title</h2>
          <p class="mb-2">This is the body text of the announcement</p>
          <div
            class="bg-black text-white py-2 px-4 w-[130px] flex justify-center"
          >
            <p>Read More</p>
          </div>
        </div>

        <!-- buttonds  -->
        <div class="w-11/12 mx-auto mb-4 py-4 px-2 flex justify-around gap-2">
          <div
            class="bg-black text-white py-2 px-4 w-[130px] flex justify-center"
          >
            <p>Favorite</p>
          </div>
          <div
            class="bg-black text-white py-2 px-4 w-[130px] flex justify-center"
          >
            <p>Copy</p>
          </div>
          <img src="qr1.svg" alt="" />
        </div>
      </div>
    </section>
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
