<template>
  <div>
    <section v-if="superman">
      <h1 class="text-center text-main-red">Admin</h1>

      <section class="flex justify-center items-center w-full my-10">
        <FormulateForm v-model="formValues" @submit="submit">
          <FormulateInput
            name="live"
            type="text"
            outer="w-full"
            label="Live stream Id"
            placeholder="Sample placeholder"
            help="Put the id of live stream here"
            input-class="w-full sm:w-96 "
            wrapper-class="w-full sm:w-96 "
            element-class="w-full sm:w-96 "
            error-behavior="live"
          />
          <FormulateInput
            type="submit"
            label="Create Live Stream"
            wrapper-class="flex justify-center mt-6"
          />
        </FormulateForm>
        <p v-if="updated">Your video has been updated</p>
      </section>
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
export default {
  data() {
    return {
      superman: false,
      formValues: {},
      loading: false,
      errorMessage: '',
      liveStream: 'default',
      updated: false,
    }
  },
  async mounted() {
    if (this.$strapi.user) {
      this.liveStream = (await this.$strapi.find('live-stream')).streamLink
      if (this.$strapi.user.username === 'superman') {
        this.superman = true
      } else {
        this.$router.push('/')
      }
    }
  },
  methods: {
    async submit() {
      this.loading = true

      try {
        const liveStream = await this.$strapi.update('live-stream', {
          streamLink: this.formValues.live,
        })
        this.liveStream = liveStream.streamLink
        if (liveStream) {
          this.updated = true
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        this.errorMessage = 'Sorry there was an error'
      }
    },
  },
}
</script>
