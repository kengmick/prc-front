<template>
  <div
    class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px] scaleDown"
    :style="{ backgroundImage: `url(/punk-background.png)` }"
  >
    <!-- header -->
    <section
      class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
    >
      <h2 class="chedder text-[36px] text-white leading-none">Poster Band</h2>
    </section>
    <!-- info box  -->
    <section class="w-full flex justify-between px-[8px] [bg-blue-500 mb-[8px]">
      <div
        class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
      >
        <p class="text-[12px] chedder">Punk/Ska</p>
        <p class="text-[12px] chedder">Jan 1 2020</p>
      </div>
      <div
        class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
      >
        <p class="text-[12px] chedder">Chicago, IL</p>
        <p class="text-[12px] chedder">Internal Message</p>
      </div>
    </section>

    <!-- logo and card  -->
    <section class="w-full flex justify-between px-[4px] mb-[8px]">
      <div class="w-[141px] h-[186px] shadow-xl">
        <img class="h-full object-cover" src="punk-background.png" alt="" />
      </div>
      <!-- second featured Card  -->
      <div class="w-[141px] h-[186px] bg-[#27ED5E] shadow-xl">
        <div
          class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px] scaleDownTwo"
          :style="{ backgroundImage: `url(/punk-background.png)` }"
        >
          <!-- header -->
          <section
            class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
          >
            <h2 class="chedder text-[36px] text-white leading-none">
              Poster Band
            </h2>
          </section>
          <!-- info box  -->
          <section
            class="w-full flex justify-between px-[8px] [bg-blue-500 mb-[8px]"
          >
            <div
              class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
            >
              <p class="text-[12px] chedder">Punk/Ska</p>
              <p class="text-[12px] chedder">Jan 1 2020</p>
            </div>
            <div
              class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
            >
              <p class="text-[12px] chedder">Chicago, IL</p>
              <p class="text-[12px] chedder">Internal Message</p>
            </div>
          </section>

          <!-- logo and card  -->
          <section class="w-full flex justify-between px-[4px] mb-[8px]">
            <div class="w-[141px] h-[186px] shadow-xl">
              <img
                class="h-full object-cover"
                src="punk-background.png"
                alt=""
              />
            </div>
            <!-- third featured Card  -->
            <div class="w-[141px] h-[186px] bg-[#27ED5E] shadow-xl"></div>
          </section>

          <!-- announcment box  -->
          <section
            class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px]"
          >
            <h2 class="text-[18px]">Title of Announcement</h2>
            <p class="text-[12px]">This is the body of the text ...</p>
          </section>

          <!-- buttons  -->
          <section class="flex justify-around mt-[8px]">
            <div
              class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
            >
              Save
            </div>
            <div
              class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
            >
              Copy
            </div>
            <div
              class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
            >
              QR
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- announcment box  -->
    <section
      class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px]"
    >
      <h2 class="text-[18px]">Title of Announcement</h2>
      <p class="text-[12px]">This is the body of the text ...</p>
    </section>

    <!-- buttons  -->
    <section class="flex justify-around mt-[8px]">
      <div
        class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
      >
        Save
      </div>
      <div
        class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
      >
        Copy
      </div>
      <div
        class="w-[90px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[12px] chedder"
      >
        QR
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>
<style scoped>
.scaleDown {
  transform: scale(47.4%);
  margin-left: -79px;
  margin-top: -108px;
}

.scaleDownTwo {
  transform: scale(47.4%);
  margin-left: -80px;
  margin-top: -105px;
}
</style>
