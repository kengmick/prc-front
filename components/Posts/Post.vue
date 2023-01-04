<template>
  <div>
    <div v-if="posts && !loading">
      <div v-for="post in posts" :key="post.id">
        <div class="flex items-center">
          <div v-if="post.users_permissions_user">
            <NuxtImg
              :src="post.users_permissions_user.profileImg.url"
              height="50"
              width="50"
            />
          </div>
          <div v-if="post.image">
            <NuxtImg :src="post.image.url" height="100" width="100" />
          </div>
          <p>{{ post.data }}</p>
        </div>
        <div class="flex items-center my-4">
          <NuxtImg
            v-if="post.flag"
            @click="flag(post.id)"
            src="redflag.svg"
            height="20"
            width="20"
            class="mr-4"
          />
          <NuxtImg
            v-else
            @click="flag(post.id)"
            src="flag.svg"
            height="20"
            width="20"
            class="mr-4"
          />
          <p>Flag as inappropriate</p>
        </div>
      </div>
    </div>
    <section class="w-full flex justify-center items-center">
      <Spinner v-if="loading" />
    </section>
    <div class="my-4">
      <div
        v-if="addPhoto"
        class="flex flex-col w-full justify-center items-center"
      >
        <FormulateInput
          type="image"
          name="bandProfileImg"
          label="Select an image to upload"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png,image/gif,image/webp"
          input-class="w-full sm:w-96 "
          wrapper-class="w-full sm:w-96 "
          element-class="w-full sm:w-96 "
          @change="image = $event.target.files[0]"
        />
        <pre>{{ image[0] }}</pre>
      </div>
      <input
        v-model="postData"
        class="formElement"
        type="text"
        name="postData"
        placeholder="Type your message "
      />

      <div class="bg-black text-white mt-4 px-6 py-2" @click="toggelAddPhoto">
        <p class="chedder text-center">Add Image To Post</p>
      </div>

      <div class="bg-black text-white mt-4 px-6 py-2" @click="createPost">
        <p class="chedder text-center">Create Post test</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      default: () => {
        return null
      },
    },
    postType: {
      type: String,
      default: () => {
        return null
      },
    },
  },
  data() {
    return {
      joined: '',
      socket: null,
      posts: [],
      loading: false,
      postData: '',
      image: '',
      addPhoto: false,
    }
  },
  async mounted() {
    const posts = await this.$strapi.find('posts', {
      [this.postType]: this.postId,
    })
    this.posts = posts
    this.socket = this.$nuxtSocket({
      name: 'post',
    })
    if (posts) {
      this.socket.emit('join', { room: posts.id })
    }

    this.socket.on('joinedRoom', (data) => {
      this.joined = 'you joined '
    })
    this.socket.on('messageSent', async (data) => {
      this.loading = true
      this.posts = await this.$strapi.find('posts', {
        [this.postType]: this.postId,
      })

      this.loading = false
    })
    // this.sc()
  },
  methods: {
    toggelAddPhoto() {
      this.addPhoto = !this.addPhoto
    },

    async flag(id) {
      try {
        await this.$strapi.update('posts', id, { flag: true })
        this.posts = await this.$strapi.find('posts', {
          [this.postType]: this.postId,
        })
      } catch (error) {}
    },

    async createPost() {
      if (this.image) {
        try {
          console.log('profile image ')
          const formData = new FormData()
          await formData.append('files', this.image)
          const [image] = await this.$strapi.create('upload', formData)
          this.image = image
        } catch (error) {
          console.log(error)
          this.errorMessage =
            'Sorry we could not upload your profile image ... please try again '
        }
      }
      this.loading = true
      try {
        console.log('user id ', this.$strapi.user.id)
        const post = await this.$strapi.create('posts', {
          bands: 84,
          data: this.postData,
          image: this.image,
          users_permissions_user: this.$strapi.user.id,
        })
        this.postData = ''
        this.socket.emit('sendMessage', { post }, (resp) => {
          console.log(resp, 'something happening in the socket')
        })
      } catch (error) {
        console.log(error, 'this is the create ')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
