<template>
  <div>
    <!-- getting rid of firstName, lastName, -->
    <h1 class="main_red_text text-center">Create Free User Account</h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="username"
                label="username"
                validation="required"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="password"
                label="Create a password"
                validation="required"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
            </div>
            <div class="flex-grow mb-6">
              <FormulateInput
                name="email"
                label="Email"
                validation="required"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
            </div>
          </div>
          <FormulateInput
            type="submit"
            label="Sign up"
            wrapper-class="flex justify-center mt-6"
          />
        </FormulateForm>
        <div v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      errorMessage: '',
    }
  },
  methods: {
    async submitForm() {
      try {
        const user = await this.$strapi.register({
          email: this.formValues.email,
          username: this.formValues.username,
          password: this.formValues.password,
        })
        if (user) {
          this.$router.push('/')
        }
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
      }
    },
  },
}
</script>
