<template>
  <div
    v-if="JSON.stringify(cardData) !== '{}'"
    class="relative w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px] scaleDown"
  >
    <NuxtLink :to="{ path: '/bandprofile', query: { band: cardData.id } }">
      <nuxt-img
        class="absolute top-0 negetive-index blur-xl object-fill"
        format="webp"
        :src="cardData.bandProfileImg.url"
        width="300"
        height="400"
        preload
      />
      <!-- header -->
      <section
        class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
      >
        <h2 class="chedder text-[36px] text-white leading-none">
          {{ cardData.bandName }}
        </h2>
      </section>
      <!-- info box  -->
      <section
        class="w-full flex justify-between px-[8px] [bg-blue-500 mb-[8px]"
      >
        <div
          class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
        >
          <p class="text-[12px] chedder">Punk/{{ cardData.genre || '' }}</p>
          <p class="text-[12px] chedder">
            {{ cardData.dateStarted || 'Jan 1 2020' }}
          </p>
        </div>
        <div
          class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
        >
          <p class="text-[12px] chedder">
            {{ cardData.city }}, {{ cardData.state }}
          </p>
          <p class="text-[12px] chedder">Internal Message</p>
        </div>
      </section>

      <!-- logo and card  -->
      <section class="w-full flex justify-between px-[4px] mb-[8px]">
        <div class="relative w-[141px] h-[186px] shadow-xl">
          <nuxt-img
            class="absolute top-0 negetive-index object-cover"
            format="webp"
            :src="cardData.bandProfileImg.url"
            alt=""
            width="141"
            height="186"
            preload
          />
        </div>
        <!-- second featured Card  -->
        <div class="w-[141px] h-[186px] bg-[#27ED5E] shadow-xl">
          <div
            class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px] scaleDownThree"
          >
            <nuxt-img
              format="webp"
              class="absolute top-0 negetive-index object-cover"
              :src="cardData.bandProfileImg.url"
              alt=""
              width="300"
              height="400"
              preload
            />
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
                <nuxt-img
                  format="webp"
                  class="h-full object-cover"
                  :src="cardData.bandProfileImg.url"
                  alt=""
                  width="141"
                  height="186"
                  preload
                />
              </div>
              <!-- no card thrid item   -->
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
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.scaleDown {
  transform: scale(30%);
  margin-left: -105px;
  margin-top: -140px;
}

.scaleDownThree {
  transform: scale(47.4%);
  margin-left: -80px;
  margin-top: -105px;
}
.negetive-index {
  z-index: -999;
}

.blur {
  filter: blur(4px);
}
</style>
