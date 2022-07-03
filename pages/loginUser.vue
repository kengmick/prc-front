<template class="h-full">
  <section class="container m-auto h-full mt-28 mb-36">
    <h1 class="text-center main_red_text">Sign In</h1>
    <div class="px-4 w-full sm:w-96 m-auto">
      <FormulateForm v-model="formValues" @submit="login">
        <div>
          <FormulateInput
            name="identifier"
            label="Enter your username"
            validation="required"
            wrapper-class="m-auto sm:w-4/5 "
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
          />
          <FormulateInput
            name="password"
            label="Enter Your password"
            validation="required"
            wrapper-class="m-auto sm:w-4/5 "
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
          />
        </div>
        <FormulateInput
          type="submit"
          label="Sign In"
          wrapper-class="flex justify-center mt-6"
        />
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </FormulateForm>
    </div>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      formValues: {},
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$strapi.login({
          identifier: this.formValues.identifier,
          password: this.formValues.password,
        })
        this.$router.push('/profile')
      } catch (error) {
        this.formValues = {}
        this.errorMessage = 'sorry ... please try loging in again '
      }
    },
  },
}
</script>
