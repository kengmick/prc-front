<template>
  <div>
    <h3>Edit Classified</h3>
    <section class="container mx-auto px-2 my-4">
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
          label="Update"
          wrapper-class="w-full mt-10 px-4 sm:mx-10"
          grouping-class="bg-black"
          element-class="w-full"
        />
      </FormulateForm>
    </section>
    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <Spinner />
    </section>
    <section
      v-if="errorMessage"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <div>
        <h2>{{ errorMessage }}</h2>
        <h3
          class="text-center text-2xl cursor-pointer"
          @click="errorMessage = null"
        >
          Close X
        </h3>
      </div>
    </section>
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
      loading: false,
    }
  },
  async mounted() {
    try {
      const article = await this.$strapi.findOne(
        'classifieds',
        this.$route.query.article
      )
      this.classified = article
      this.formValues = article
    } catch (error) {
      this.$nuxt.error({ statusCode: 404, message: error })
    }
  },
  methods: {
    moment,
    async submitForm() {
      this.loading = true
      try {
        const article = await this.$strapi.update(
          'classifieds',
          this.$route.query.article,
          {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          }
        )
        this.classified = article
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log('there was an error ')
        this.errorMessage = 'Sorry, something went wrong ... please try again'
        this.$nuxt.error({ statusCode: 404, message: error })
      }
      // after creation take user to band admin
      if (this.classified) {
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
