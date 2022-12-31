<template>
  <div>
    <h2 class="text-center">Create Team Member</h2>
    <section class="container mx-auto w-11/12 md:w-3/4 my-6">
      <FormulateForm v-model="formValues" @submit="submitForm">
        <FormulateInput
          name="name"
          label="Name"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
        />
        <FormulateInput
          name="title"
          label="title"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
        />

        <div class="flex flex-col w-full justify-center items-center">
          <h2 class="text-center mb-10 mt-4">Add team member photo</h2>
          <FormulateInput
            type="image"
            name="photo"
            label="Select an image to upload"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png,image/gif,image/webp"
            input-class="w-full sm:w-96 "
            wrapper-class="w-full sm:w-96 "
            element-class="w-full sm:w-96 "
            @change="image = $event.target.files[0]"
          />
        </div>

        <FormulateInput
          type="submit"
          label="Create"
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
      venue: '',
      image: '',
    }
  },
  async mounted() {
    this.venue = await this.$strapi.findOne('venues', this.$route.query.venue)
  },
  methods: {
    async submitForm() {
      try {
        const formData = new FormData()
        await formData.append('files', this.image)
        const [image] = await this.$strapi.create('upload', formData)
        this.image = image
        this.formValues.photo = image
        console.log(image)
      } catch (error) {
        console.log(error)
        this.errorMessage =
          'Sorry we could not upload your profile image ... please try again '
        this.loading = false
      }
      try {
        const updated = await this.$strapi.update(
          'venues',
          this.$route.query.venue,
          {
            venueTeam: [...this.venue.venueTeam, this.formValues],
          }
        )

        if (updated) {
          this.$router.push({
            path: '/venues/venueprofile',
            query: { venue: this.venue.id },
          })
        }
      } catch (error) {
        console.log(error, 'there is an error with the update')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
