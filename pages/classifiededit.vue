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
    }
  },
  methods: {
    moment,
    async submitForm() {
      this.formValues.category = 'jam'
      try {
        const article = await this.$strapi.create('classifieds', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        console.log('created')
        this.classified = article
      } catch (error) {
        console.log('there was an error ')
        this.errorMessage = 'Sorry ... please try again'
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
