<template>
  <div>
    <h1 v-if="!loading" class="text-2xl text-center my-6 text-main-red">
      {{ pageTitle }} Biography
    </h1>
    <section v-if="!loading" class="container mx-auto w-11/12 md:w-3/4 my-6">
      <pre>{{ data.description }}</pre>
      <FormulateForm v-model="formValues" @submit="submitForm">
        <FormulateInput
          v-if="data.bio && !data.eventDescription"
          name="bio"
          label="History/Description"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
          :value="data.bio"
        />

        <FormulateInput
          v-if="!data.bio && !data.description && !data.eventDescription"
          name="bio"
          label="History/Description"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
          :value="data.bio"
        />

        <FormulateInput
          v-if="data.description && !data.eventDescription && !data.bio"
          name="bio"
          label="History/Description"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
          :value="data.description"
        />
        <FormulateInput
          v-if="data.eventDescription && !data.bio"
          name="bio"
          label="History/Description"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
          :value="data.eventDescription"
        />

        <FormulateInput
          type="submit"
          :label="$route.query.action === 'edit' ? 'Update' : 'Create'"
          wrapper-class="w-full mt-10 px-4 sm:mx-10"
          grouping-class="bg-black"
          element-class="w-full"
        />
      </FormulateForm>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      loading: true,
      data: '',
      bio: '',
      pageTitle: '',
      dataType: '',
    }
  },
  async mounted() {
    try {
      this.pageTitle = this.$route.query.action
      if (this.$route.query.dataType === 'distro') {
        const data = await this.$strapi.findOne(
          'record-labels',
          this.$route.query.distro
        )
        console.log(data, 'this is the data')
        if (this.$route.query.action === 'edit') {
          this.bio = data.bio
        }
        this.data = data
      }

      if (this.$route.query.dataType === 'venue') {
        const data = await this.$strapi.findOne(
          'venues',
          this.$route.query.venue
        )
        console.log(data, 'this is the data')
        if (this.$route.query.action === 'edit') {
          this.bio = data.bio
        }
        this.data = data
      }

      if (this.$route.query.dataType === 'event') {
        const data = await this.$strapi.findOne(
          'events',
          this.$route.query.event
        )
        console.log(data, 'this is the data')
        if (this.$route.query.action === 'edit') {
          this.bio = data.bio
        }
        this.data = data
      }
      if (this.$route.query.dataType === 'tours') {
        const data = await this.$strapi.findOne('tours', this.$route.query.tour)
        console.log(data, 'this is the data')
        if (this.$route.query.action === 'edit') {
          this.bio = data.description
        }
        this.data = data
      }
      if (this.$route.query.dataType === 'band') {
        const data = await this.$strapi.findOne('bands', this.$route.query.band)
        console.log(data, 'this is the data')
        if (this.$route.query.action === 'edit') {
          this.bio = data.description
        }
        this.data = data
      }
      this.loading = false
    } catch (error) {
      this.loading = false
      console.log(error)
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.$route.query.dataType === 'distro') {
          console.log(
            this.dataType.id,
            'this is the id ',
            this.formValues.bio,
            'this is the form'
          )
          console.log('formValues', this.formValues.bio)
          const update = await this.$strapi.update(
            'record-labels',
            this.data.id,
            {
              bio: this.formValues.bio,
            }
          )
          console.log('updated the bio ', update)
          this.$router.push({
            path: '/distros/distroview',
            query: { distro: this.data.id },
          })
        }

        if (this.$route.query.dataType === 'venue') {
          console.log(
            this.dataType.id,
            'this is the id ',
            this.formValues.bio,
            'this is the form'
          )
          await this.$strapi.update('venue', this.data.id, {
            description: this.formValues.bio,
          })
          this.$router.push({
            path: '/venues/venueprofile',
            query: { venue: this.data.id },
          })
        }

        if (this.$route.query.dataType === 'event') {
          console.log(
            this.dataType.id,
            'this is the id ',
            this.formValues.bio,
            'this is the form'
          )
          await this.$strapi.update('events', this.data.id, {
            eventDescription: this.formValues.bio,
          })
          this.$router.push({
            path: '/events/eventview',
            query: { event: this.data.id },
          })
        }

        if (this.$route.query.dataType === 'band') {
          console.log(
            this.dataType.id,
            'this is the id ',
            this.formValues.bio,
            'this is the form'
          )
          await this.$strapi.update('bands', this.data.id, {
            bio: this.formValues.bio,
          })
          this.$router.push({
            path: '/bands/bandprofile',
            query: { band: this.data.id },
          })
        }

        if (this.$route.query.dataType === 'tours') {
          console.log(
            this.dataType.id,
            'this is the id ',
            this.formValues.bio,
            'this is the form'
          )
          await this.$strapi.update('tours', this.data.id, {
            description: this.formValues.bio,
          })
          this.$router.push({
            path: '/tours/tourview',
            query: { tour: this.data.id },
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
