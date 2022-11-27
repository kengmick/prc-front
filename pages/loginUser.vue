<template class="h-full">
  <section class="container m-auto h-full mt-28 mb-36">
    <h1 class="text-center main_red_text">Log In</h1>
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
          <div class="relative">
            <FormulateInput
              :type="hideOrShow"
              name="password"
              label="Enter Your password"
              validation="required"
              wrapper-class="m-auto sm:w-4/5 "
              element-class="w-full flex-grow"
              errors-class="sm:w-4/5 m-auto"
            />
            <div class="passwordIcon" @click="togglePassword">
              <img src="view.svg" alt="" />
            </div>
          </div>
        </div>
        <FormulateInput
          type="submit"
          label="Sign In"
          wrapper-class="flex justify-center mt-6"
        />
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </FormulateForm>
    </div>
    <section
      v-if="loading"
      class="h-screen w-screen absolute right-0 flex justify-center items-center top-0 bg-white"
    >
      <Spinner />
    </section>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      loading: false,
      formValues: {},
      errorMessage: '',
      hideOrShow: 'password',
    }
  },
  methods: {
    togglePassword() {
      if (this.hideOrShow === 'password') {
        console.log('this is the conditional')
        this.hideOrShow = 'text'
      } else {
        this.hideOrShow = 'password'
      }
    },
    async login() {
      this.loading = true
      try {
        const user = await this.$strapi.login({
          identifier: this.formValues.identifier,
          password: this.formValues.password,
        })
        if (this.formValues.identifier === 'superman') {
          this.$router.push('/admin')
          this.loading = false
        }
        console.log(user)
        this.loading = false
        if (this.$route.query.addCard === 'true') {
          console.log('do something here')
          this.$router.push('addcardpage')
          this.loading = false
        } else {
          this.$router.push('profile')
        }
      } catch (error) {
        this.loading = false
        this.formValues = {}
        this.errorMessage = 'sorry ... please try loging in again '
      }
    },
  },
}
</script>

<style scoped>
.passwordIcon {
  position: absolute;
  top: 35px;
  right: 50px;
}
</style>
