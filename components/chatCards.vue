<template>
  <div class="flex items-center min-h-[55px] pb-5">
    <img class="rounded-full h-[55px] w-[55px] mr-4" :src="chatWithImg" />
    <div class="w-full">
      <p class="chedder">{{ chatWithName }}</p>
      <!-- <p>{{ lastMessage }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatWithImg: {
      type: String,
      default: 'https://ui-avatars.com/api/?name=u',
    },
    chatWithName: {
      type: String,
      default: 'Unknown',
    },
    lastMessage: {
      type: String,
      default: 'No Messages ...',
    },
  },
}
</script>
