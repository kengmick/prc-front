<template>
  <div>
    <div v-if="posts && !loading">
      <div v-for="post in posts" :key="post.id" class="flex items-center">
        <div v-if="post.users_permissions_user">
          <NuxtImg
            :src="post.users_permissions_user.profileImg.url"
            height="50"
            width="50"
          />
        </div>
        <p>{{ post.data }}</p>
      </div>
    </div>
    <section class="w-full flex justify-center items-center">
      <Spinner v-if="loading" />
    </section>
    <div>
      <h3 class="bg-black text-white" @click="createPost">Create Post test</h3>
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
      console.log('this is the data', data.post)
      this.posts = await this.$strapi.find('posts', {
        [this.postType]: this.postId,
      })
      this.loading = false
      console.log(this.posts, 'posts')
    })
    // this.sc()
  },
  methods: {
    async createPost() {
      this.loading = true
      try {
        console.log('user id ', this.$strapi.user.id)
        const post = await this.$strapi.create('posts', {
          bands: 84,
          data: 'hello world ',
          users_permissions_user: this.$strapi.user.id,
        })
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
