<template>
  <div>
    <h3>Classified Create Page</h3>
    <div
      v-if="loading"
      class="fixed top-0 left-0 h-screen w-screen z-50 bg-black flex justify-center items-center"
    >
      <Spinner class="mr-6" />
      <h3 class="text-white">Creating Classified</h3>
    </div>
    <section v-if="!loading" class="container mx-auto px-2 my-4">
      <FormulateForm v-model="formValues" @submit="submitForm">
        <FormulateInput
          name="title"
          label="Classified Title"
          wrapper-class="m-auto sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput
          name="contact"
          type="text"
          label="Contact"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput
          name="phone"
          type="text"
          label="Phone"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput
          name="email"
          type="text"
          label="Email"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput
          name="city"
          type="text"
          label="city"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput
          name="state"
          type="text"
          label="State"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <h2 class="text-center mb-10 mt-4">Add An Image</h2>
        <div class="w-full flex justify-center">
          <FormulateInput
            type="image"
            name="image"
            label="Select an image to upload"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png,image/gif"
            input-class="w-full sm:w-96 "
            wrapper-class="w-full sm:w-96 "
            element-class="w-full sm:w-96 "
            @change="pic = $event.target.files[0]"
          />
        </div>
        <section>
          <FormulateInput
            name="description"
            type="textarea"
            label="Description"
            wrapper-class="sm:w-4/5 m-auto"
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
          />
        </section>

        <FormulateInput
          type="submit"
          label="Create"
          wrapper-class="w-full mt-10 px-4 sm:mx-10"
          grouping-class="bg-black"
          element-class="w-full"
        />
      </FormulateForm>
    </section>

    <div v-if="errorMessage">
      <pre>{{ errorMessage }}</pre>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      formValues: {},
      errorMessage: '',
      classified: {},
      pic: '',
      finalImage: '',
      loading: false,
    }
  },
  methods: {
    moment,

    async submitForm() {
      try {
        const formData = new FormData()
        await formData.append('files', this.pic)
        const [finalImage] = await this.$strapi.create('upload', formData)
        this.finalImage = finalImage
        this.formValues.image = finalImage
      } catch (error) {
        console.log(error)
      }
      try {
        console.log(this.formValues)
        const article = await this.$strapi.create('classifieds', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.classified = article
        console.log(this.classified, article, 'article ')
      } catch (error) {}
      if (this.classified) {
        this.loading = false
        this.$router.push({
          path: '/classifiedview',
          query: { article: this.classified.id },
        })
      }
    },
  },
}
</script>

<style scoped>
.center-custom {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
