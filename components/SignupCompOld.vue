<template>
  <div>
    <div class="message-container flex flex-col">
      <h1 class="title pb-10">{{ title }}</h1>
      <p class="message">{{ message }}</p>
      <p class="hidden lg:block pt-4 message">
        This is some more text about what the app provides for it's users
      </p>
      <div
        v-if="!$strapi.user"
        class="flex flex-grow items-end pb-8 justify-around"
      >
        <NuxtLink class="shadow-lg btn-home text-center" to="signUp"
          >Signup</NuxtLink
        >
        <NuxtLink class="shadow-lg btn-home text-center" to="loginUser"
          >Login</NuxtLink
        >
      </div>
      <div
        v-if="$strapi.user"
        class="flex flex-grow items-end pb-8 justify-around"
      >
        <div
          class="shadow-lg btn-home text-center cursor-pointer"
          @click="logout"
        >
          Logout
        </div>
        <NuxtLink
          class="shadow-lg btn-home text-center"
          :to="{ path: 'profile' }"
          >View Profile</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
