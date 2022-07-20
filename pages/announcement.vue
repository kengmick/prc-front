<template>
  <div class="my-6 w-full sm:container sm:mx-auto">
    <h1 class="text-center">Announcement</h1>
    <div v-if="announcement.image" class="w-screen">
      <img :src="announcement.image.url" alt="" />
    </div>

    <h2>
      {{ announcement.title }} <span class="text-2xl"><em>Posted by</em></span>
      <span class="text-2xl chedder">{{ profileName }}</span>
    </h2>
    <p class="text-xl">{{ announcement.text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcement: '',
      profileType: '',
      profileId: '',
      profileName: '',
    }
  },
  async mounted() {
    this.profileType = this.$route.query.profileType
    this.profileName = this.$route.query.profileName
    const band = await this.$strapi.find(this.profileType, {
      id: this.$route.query.profileId,
    })

    const announcement = band[0].announcements.filter((a) => {
      console.log(parseInt(this.$route.query.announcementId))
      return a.id === parseInt(this.$route.query.announcementId)
    })
    this.announcement = announcement[0]
    console.log(announcement)
  },
}
</script>

<style lang="scss" scoped></style>
// query: { profileId: profileId, announcementId: announcement.id },
