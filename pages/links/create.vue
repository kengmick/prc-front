<template>
  <div>
    <h2 class="text-center">Add Links</h2>
    <section
      v-if="distro || band || event"
      class="container mx-auto w-11/12 md:w-3/4 my-6"
    >
      <div
        v-for="(link, index) in links"
        :key="index"
        class="sm:w-4/5 m-auto my-4"
      >
        <div class="my-6">
          <label for="link" class="label">Add Link</label>
          <input
            v-model="links[index].link"
            class="formElement"
            name="links"
            placeholder="link"
          />
        </div>
        <div
          @click="addLink"
          class="px-4 py-2 bg-black text-white my-4 sm:w-4/5 m-auto"
        >
          + Add another link
        </div>
        <div
          v-if="index >= 1 && links[index]"
          @click="removeLink(index)"
          class="px-4 py-2 bg-black text-red-600 my-4 w-full m-auto"
        >
          - Remove Link
        </div>
      </div>
      <div
        class="px-6 py-2 border-2 border-black flex items-center justify-center"
        @click="submitForm"
      >
        <span class="chedder">Submit</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      band: '',
      distro: '',
      event: '',
      links: [{ link: '' }],
    }
  },
  async mounted() {
    try {
      if (this.$route.query.dataType === 'bands') {
        this.band = await this.$strapi.findOne('bands', this.$route.query.band)
      }
      if (this.$route.query.dataType === 'events') {
        this.event = await this.$strapi.findOne(
          'events',
          this.$route.query.event
        )
      }
      if (this.$route.query.dataType === 'distro') {
        this.distro = await this.$strapi.findOne(
          'record-labels',
          this.$route.query.distro
        )
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.band) {
          const updated = await this.$strapi.update(
            'bands',
            this.$route.query.band,
            {
              links: [...this.band.links, ...this.links],
            }
          )

          if (updated) {
            this.$router.push({
              path: '/bands/bandprofile',
              query: { band: 81 },
            })
          }
        } else if (this.distro) {
          const updated = await this.$strapi.update(
            'record-labels',
            this.$route.query.distro,
            {
              distroLinks: [...this.distro.distroLinks, ...this.links],
            }
          )

          if (updated) {
            this.$router.push({
              path: '/distros/distroview',
              query: { distro: this.distro.id },
            })
          }
        } else if (this.event) {
          const updated = await this.$strapi.update(
            'events',
            this.$route.query.event,
            {
              eventLinks: [...this.event.eventLinks, ...this.links],
            }
          )

          if (updated) {
            this.$router.push({
              path: '/events/eventview',
              query: { event: this.event.id },
            })
          }
        }
      } catch (error) {
        console.log(error, 'there is an error with the update')
      }
    },

    addLink() {
      this.links.push({ link: '' })
    },
    removeLink(index) {
      this.links.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped></style>
