<template>
  <div class="border-2 border-black p-6">
    <div class="flex">
      <h2 class="text-3xl mb-4 grow">{{ announcement.title }}</h2>
      <div class="flex">
        <img
          v-if="index !== 0"
          src="~/static/left.svg"
          alt=""
          class="h-10"
          @click="back"
        />
        <img
          v-if="index !== announcements.length - 1"
          src="~/static/right.svg"
          alt=""
          class="h-10"
          @click="forward"
        />
      </div>
    </div>

    <div class="flex gap-3 mb-4">
      <div v-if="announcement.image" class="h-[144px] w-[186px]">
        <img
          :src="announcement.image.url"
          alt=""
          class="h-[144px] max-w-[186px]"
        />
      </div>
      <div v-else>
        <img class="max-w-[186px]" src="~/static/punk-background.png" alt="" />
      </div>
      <div class="flex items-center">
        <p>{{ announcement.text }}</p>
      </div>
    </div>
    <div class="bg-black flex justify-center items-center p-[.8em]">
      <NuxtLink
        :to="{
          path: 'announcement',
          query: {
            profileId: profileId,
            announcementId: announcement.id,
            profileType: profileType,
            profileName: profileName,
          },
        }"
      >
        <p class="text-white">View Announcements</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    announcements: {
      type: Array,
      default() {
        return []
      },
    },
    profileType: {
      type: String,
      default() {
        return ''
      },
    },
    profileId: {
      type: Number || String,
      default() {
        return ''
      },
    },
    profileName: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      index: 0,
    }
  },
  computed: {
    announcement() {
      return this.announcements[this.index]
    },
  },
  methods: {
    forward() {
      if (this.index !== this.announcements.length - 1) {
        this.index++
      }
    },
    back() {
      if (this.index !== 0) {
        this.index--
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
