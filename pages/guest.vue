<template>
  <div class="container mx-auto flex justify-center flex-col px-2 py-2">
    <h1>Free Membership and become a Guest</h1>
    <section>
      <FormulateForm v-model="formValues" @submit="submitForm">
        <FormulateInput
          name="username"
          label="Username"
          validation="required"
          wrapper-class="m-auto sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput
          type="email"
          name="email"
          label="Your email"
          validation="required"
        />
        <FormulateInput
          name="password"
          label="Create a password"
          validation="required"
          wrapper-class="m-auto sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput type="submit" label="Save account" />
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
    async submitForm() {
      try {
        console.log(this.formValues)
        const user = await this.$strapi.register({
          email: this.formValues.email,
          username: this.formValues.username,
          password: this.formValues.password,
          acc: 1,
        })
        if (user) {
          this.$router.push({ path: 'membercard', query: { user: user.id } })
        }
      } catch (error) {
        this.errorMessage = error
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
