<template>
  <div>
    <h1 class="text-center">This is the test page</h1>
    <section class="w-screen mb-10 flex items-center justify-center">
      <!-- 328 -->
      <div
        class="w-[432px] h-[734px] border-2 border-main-red"
        style="background-image: url('/test-logo.png')"
      >
        <!-- header of card -->
        <div
          class="h-[58px] w-full bg-black flex items-center justify-center mb-[16px]"
        >
          <p class="chedder text-center card_header_size text-white">
            <!-- add band.bandName -->
            Band Name
          </p>
        </div>
        <!-- end header of card -->
        <!-- innder container for card info -->
        <section class="p-[16px]">
          <!-- basic info component -->
          <section class="flex gap-[16px]">
            <div
              class="w-[238px] h-[160px] border-2 p-[16px] border-black bg-white flex flex-col justify-center"
            >
              <p class="card_basic_info_text chedder">Punk/Ska</p>
              <p class="card_basic_info_text chedder">Chicago, IL</p>
              <p class="card_basic_info_text chedder">Jan 1 2020</p>
              <p class="card_basic_info_text chedder">555-555-5555</p>
            </div>
            <!-- secondary info box -->
            <div
              class="w-[144px] h-[160px] border-2 p-[16px] border-black bg-white flex flex-col justify-center"
            >
              <p class="text-[16px] chedder underline text-main-red">Showz</p>
              <p class="text-[16px] chedder underline text-main-red">Tour</p>
              <p class="text-[16px] chedder underline text-main-red">
                Classified
              </p>
              <p class="text-[16px] chedder underline text-main-red">
                Releases
              </p>
              <p class="text-[16px] chedder underline text-main-red">Songs</p>
              <p class="text-[16px] chedder underline text-main-red">
                Chat Room
              </p>
            </div>
          </section>
          <!-- end of basic info component -->
          <!-- Logo Box and Add Box -->
          <section class="flex gap-[16px] mt-[16px]">
            <!-- logo -->
            <div class="h-[240px] w-[240px]">
              <img
                class="object-cover w-full h-full border-2 border-black"
                src="~/static/test-logo.png"
                alt=""
              />
            </div>
            <!-- addvertisement box -->
            <div class="h-[245px] w-[144px] border-2 border-main-red bg-white">
              <!-- create action to take user to create add page ... think  -->
              <p class="underline chedder card_basic_info_text text-center">
                Create Add
              </p>
            </div>
          </section>
          <!-- end of logo box and add box  -->
        </section>
        <!-- end basic info card -->
        <!-- annoucement card container -->
        <section class="pl-[16px] pr-[16px]">
          <!-- end of context -->
          <!-- this is the container of the content -->
          <div
            class="h-[187px] border-2 border-black p-[16px] bg-white flex flex-col justify-around"
          >
            <h2 class="text-[13px]">Latest Announments !!!</h2>
            <!-- this data is an array and a slider ... content will change on click -->
            <div class="flex gap-2">
              <!-- placeholder image box -->
              <div class="h-[72px] w-[72px] bg-slate-400 flex-grow"></div>
              <div class="w-10/12 flex items-center">
                <p class="text-[12px]">
                  This is some really cool announcement about our new show or
                  band
                </p>
              </div>
            </div>
            <!-- button -->
            <div class="bg-black pt-2 pb-2">
              <p class="text-white text-center text-[13px]">
                View Announcement
              </p>
            </div>
          </div>
          <!-- end of context -->
          <!-- This is the end of content container thing   -->
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.card_header_size {
  font-size: 56px;
}
.card_basic_info_text {
  font-size: 27px;
}
</style>
