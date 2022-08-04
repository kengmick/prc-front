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

    if (this.$route.query.profileType === 'bands') {
      console.log('this is the band annoucement')
      const band = await this.$strapi.find(this.profileType, {
        id: this.$route.query.profileId,
      })
      const announcement = band[0].announcements.filter((a) => {
        if (this.$route.query.title) {
          return a.title === this.$route.query.title
        } else {
          return a.id === parseInt(this.$route.query.announcementId)
        }
      })
      this.announcement = announcement[0]
      console.log(announcement, 'for band ')
    }
    if (this.$route.query.profileType === 'venue') {
      console.log('finding venue ann')
      const venue = await this.$strapi.find('venues', {
        id: this.$route.query.profileId,
      })
      console.log(venue)
      const announcement = venue[0].announcements.filter((a) => {
        if (this.$route.query.title) {
          return a.title === this.$route.query.title
        } else {
          return a.id === parseInt(this.$route.query.announcementId)
        }
      })
      this.announcement = announcement[0]
      console.log(announcement)
    }
  },
}
</script>

<style lang="scss" scoped></style>
