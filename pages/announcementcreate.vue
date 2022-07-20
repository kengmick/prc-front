<template>
  <div>
    <h1 class="text-center">Create Announcement</h1>
    <section class="container mx-auto mb-6">
      <FormulateForm v-model="formValues" @submit="createBandAnn">
        <FormulateInput
          name="title"
          label="title"
          wrapper-class="m-auto sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />

        <FormulateInput
          name="text"
          label="Announcement"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <h2 class="text-center">Add Image</h2>
        <FormulateInput
          type="image"
          name="image"
          label="Upload an Image"
          validation="mime:image/jpeg,image/png,image/gif"
          input-class="w-full sm:w-96 "
          wrapper-class="m-auto sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
          @change="logoImgFile = $event.target.files[0]"
        />

        <div class="flex justify-center items-center">
          <FormulateInput
            type="submit"
            label="Next"
            wrapper-class="w-full mt-10 px-4 sm:mx-10"
            grouping-class="bg-black"
            element-class="w-1/2"
          />
        </div>
      </FormulateForm>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
    }
  },

  methods: {
    async createBandAnn() {
      const b = await this.$strapi.findOne('bands', 28)

      b.announcements.push({
        title: 'hello',
        text: 'this is some filler text for now',
      })
      console.log(b.announcements, this.$strapi.user.id)
      const band = await this.$strapi.update('bands', 28, {
        announcements: [...b.announcements, this.formValues],
      })
      console.log(band)
    },
  },
}
</script>

<style lang="scss" scoped></style>
