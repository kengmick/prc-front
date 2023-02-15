<template>
  <div>
    <section v-if="superman">
      <h1 class="text-center text-main-red">Admin</h1>
      <section class="container mx-auto mt-8">
        <h3 class="text-2xl">current video {{ liveStream }}</h3>
      </section>
      <section class="flex container mx-auto items-center w-full my-10">
        <FormulateForm v-model="formValues" @submit="submit">
          <div class="flex flex-col w-full justify-center items-center">
            <h2 class="text-center mb-10 mt-4">Add Weekly video</h2>
            <FormulateInput
              type="file"
              name="weeklyVideo"
              label="Select an image to upload"
              help="Select a mp4"
              validation="mime:video/mp4"
              input-class="w-full sm:w-96 "
              wrapper-class="w-full sm:w-96 "
              element-class="w-full sm:w-96 "
              @change="weeklyVideoFile = $event.target.files[0]"
            />
          </div>

          <!-- <FormulateInput
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
          /> -->
          <FormulateInput
            type="submit"
            label="Next"
            wrapper-class="w-full mt-10 px-4 sm:mx-10"
            grouping-class="bg-black"
            element-class="w-full"
          />
        </FormulateForm>

        <p v-if="updated">Your video has been updated</p>
      </section>
      <section class="container flex-col items-center justify-center mx-auto">
        <h3>Members</h3>
        <div v-if="users">
          <p v-for="user in users" :key="user.username">
            {{ user.username }} : member id : {{ user.id }}
          </p>
        </div>
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
      users: null,
      weeklyVideoFile: null,
      video: null,
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
    const allUsers = await this.$strapi.find('users')
    console.log(allUsers)
    this.users = allUsers
  },
  methods: {
    async submit() {
      this.loading = true
      try {
        const storageRef = this.$fireModule.storage().ref()
        const videoRef = storageRef.child(`videos/${this.weeklyVideoFile.name}`)
        console.log(videoRef, ' this is the reference')
        let videoUrl = null
        await videoRef.put(this.weeklyVideoFile).then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((url) => {
            videoUrl = url
            this.loading = false
            return url
          })
        })
        console.log(videoUrl)
        if (videoUrl) {
          const vid = await this.$strapi.update('vid', {
            id: 1,
            url: videoUrl,
          })

          console.log('this is the video', vid)
        }
        this.loading = false
        // console.log(formData)
      } catch (error) {
        console.log(error)
        this.errorMessage =
          'Sorry we could not upload your video ... please try again '
        this.loading = false
      }

      // try {
      //   const liveStream = await this.$strapi.update('live-stream', {
      //     streamLink: this.formValues.live,
      //   })
      //   this.liveStream = liveStream.streamLink
      //   if (liveStream) {
      //     this.updated = true
      //   }
      //   this.loading = false
      // } catch (error) {
      //   this.loading = false
      //   this.errorMessage = 'Sorry there was an error'
      // }
    },
  },
}
</script>
