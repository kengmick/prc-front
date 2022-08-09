<template>
  <div>
    <!-- getting rid of firstName, lastName, -->
    <!-- currently defaults to free account -->
    <h1 class="text-center">
      Create <span class="main_red_text">Free </span>Membership
    </h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="w-full px-4 pb-[1.5em] sm:pb-0 sm:w-1/2">
              <FormulateInput
                name="username"
                label="Username"
                validation="required"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                type="password"
                name="password"
                label="Create a password"
                validation="required"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                type="image"
                name="profileImg"
                label="Select an profile image to upload"
                validation="mime:image/jpeg,image/png,image/gif,image/webp"
                input-class="w-full  "
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="profileImage = $event.target.files[0]"
              />
            </div>
            <div class="flex-grow mb-6 px-4">
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
          <div class="px-4 sm:px-10">
            <FormulateInput
              type="submit"
              label="Sign up"
              wrapper-class="flex justify-center mt-6"
              element-class="w-full"
              errors-class="sm:w-4/5 m-auto"
            />
          </div>
        </FormulateForm>
        <div v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </div>
    </section>
    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <Spinner />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      errorMessage: '',
      profileImage: '',
      loading: false,
    }
  },
  methods: {
    async submitForm() {
      if (this.formValues.profileImg) {
        this.loading = true
        const formData = new FormData()
        await formData.append('files', this.profileImage)
        const [image] = await this.$strapi.create('upload', formData)
        this.image = image
        this.formValues.profileImg = image
      }
      try {
        if (this.formValues.username === 'superman') {
          return 'error'
        }
        const user = await this.$strapi.register({
          email: this.formValues.email,
          username: this.formValues.username,
          password: this.formValues.password,
          profileImg: this.formValues.profileImg || null,
          acc: 1,
        })
        if (user) {
          this.loading = false
          this.$router.push({ path: 'profile', query: { user: user.id } })
        }
      } catch (error) {
        this.errorMessage = 'Sorry ... something went wrong '
      }
    },
  },
}
</script>
