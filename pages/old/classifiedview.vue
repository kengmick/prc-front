<template>
  <div>
    <section v-if="classified">
      <div class="container mx-auto my-10">
        <p class="pb-4">
          Posted on :
          {{ moment(String(classified.created_at)).format('MMM Do YY') }}
        </p>
        <h2 class="text-2xl">Title :{{ classified.title }}</h2>
        <div v-if="classified.description" class="pb-6">
          <p>
            {{ classified.description }}
          </p>
        </div>

        <p class="pb-1">Contact Info: {{ classified.contact }}</p>
        <p v-if="classified.phone" class="pb-1">
          Cell Phone {{ classified.phone }}
        </p>
        <p v-if="classified.city && classified.state" class="pb-1">
          {{ classified.city }}, {{ classified.state }}
        </p>
        <!-- <p v-if="article.phone" class="pb-1">Phone: {{ classified.phone }}</p> -->
        <p>Username : {{ classified.users_permissions_user.username }}</p>
        <div v-if="classified.image">
          <img class="object-cover" :src="classified.image.url" alt="" />
        </div>
      </div>
    </section>
    <section class="container mx-auto">
      <h2 class="text-3xl">Posts</h2>

      <section class="my-10">
        <!-- profileImg.url username, image -->
        <div v-for="(post, index) in posts" :key="post + index">
          <div
            v-if="post.users_permissions_user"
            class="mb-6 flex justify-center"
          >
            <div v-if="post.users_permissions_user.profileImg" class="flex">
              <div class="w-[75px] h-[75px]">
                <img
                  class="rounded-full h-full sm:w-[200px] object-cover"
                  :src="post.users_permissions_user.profileImg.url"
                  alt=""
                />
              </div>
            </div>
            <div class="w-full px-2 sm:w-3/4 sm:px-0 ml-10">
              <h3>
                {{ post.users_permissions_user.username }}
                <span>{{ post.created_at }}</span>
              </h3>
              <p class="speech-bubble text-white w-full sm:w-3/4 p-6">
                {{ post.data }}
                <span v-if="post.image"
                  ><img
                    class="max-w-[200px] max-h-[200px]"
                    :src="post.image.url"
                    alt=""
                /></span>
              </p>
            </div>
          </div>
        </div>
        <!-- add post bod  -->
        <div class="w-full mx-auto">
          <p class="text-red-500">{{ postError }}</p>
          <div class="w-full flex justify-center items-center px-4 sm:px-0">
            <textarea
              class="w-full sm:w-3/4 p-4 border-[1px] border-gray-400 mx-auto focus-visible:border-black post_input"
              placeholder="type something here to share ..."
              @change="postValue = $event.target.value"
            >
            </textarea>
          </div>
          <div
            class="border-[1px] border-gray-400 w-full sm:w-3/4 mx-auto flex"
          >
            <div
              class="flex items-center justify-center p-6 border-r-[.5px] border-black cursor-pointer"
              @click="sendPost(postValue)"
            >
              <h3><span class="pr-2">💬</span> Send</h3>
            </div>
            <div
              class="flex items-center justify-center p-6 border-[.5px] border-black cursor-pointer"
              @click="popupToggle"
            >
              <img
                class="h-4 inline pr-2"
                src="~/static/imageIcon.svg"
                alt=""
              />
              <h3>Add Image</h3>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section
      v-if="popup"
      class="h-screen w-screen bg-black bg-opacity-10 fixed top-0 flex items-center justify-center"
    >
      <!-- upload form  -->
      <div
        class="w-1/4 h-2/5 bg-gray-100 shadow-sm flex justify-center items-center relative"
      >
        <!-- form goes here -->
        <FormulateInput
          type="image"
          label="Select an image to upload"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png,image/gif"
          input-class="w-full sm:w-96 "
          wrapper-class="w-full sm:w-96 "
          element-class="w-full sm:w-96 "
          @change="postImage = $event.target.files[0]"
        />
        <!-- close icon -->
        <div class="absolute top-3 right-3" @click="popupToggle">
          <img class="h-6 w-6" src="~/static/close_black.svg" alt="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      classified: '',
      comments: [],
      // user data
      user: null,
      // post data
      popup: false,
      posts: [],
      post: '',
      postValue: false,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
    }
  },
  async mounted() {
    try {
      this.user = this.$strapi.user.id
    } catch (error) {
      console.log('no user')
    }
    const classified = await this.$strapi.findOne(
      'classifieds',
      this.$route.query.article
    )
    this.classified = classified
    const posts = await this.$strapi.find('posts', {
      classified: classified.id,
    })
    this.posts = posts
  },

  methods: {
    moment,
    setVal: function (val) {
      this.postValue = val
    },
    popupToggle() {
      this.popup = !this.popup
    },
    async sendPost(val) {
      console.log('sending post ')
      try {
        if (this.postValue && !this.postImage) {
          console.log('user ', this.$strapi.user)
          if (!this.$strapi.user) {
            console.log('this is the first no logged in message ')
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            classified: this.classified.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            classified: this.classified.id,
          })
          // clears the post value box
          this.postValue = ''
          this.posts = posts
        }
        // will try to create post with an image uploadd
        if (this.postValue && this.postImage) {
          // check to see if user is logged in
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // image upload
          const formData = new FormData()
          await formData.append('files', this.postImage)
          const [img] = await this.$strapi.create('upload', formData)
          this.finalPostImage = img

          await this.$strapi.create('posts', {
            // tells where to assign the post
            classified: this.classified.id,
            // sets the post message
            data: this.postValue,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          // fix the post value in the form after creating post ... it should clear out
          this.postValue = ''
          const posts = await this.$strapi.find('posts', {
            classified: this.classified.id,
          })

          this.posts = posts
        }
      } catch (error) {
        if (!this.$strapi.user) {
          this.postError = 'you must be logged in to comment '
        }
        console.log('error saving post ', error)
      }
    },
  },
}
</script>

<style scoped>
.size {
  min-height: 200px;
}

.speech-bubble {
  position: relative;
  background: #000;
  border-radius: 0.4em;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  width: 0;
  height: 0;
  border: 21px solid transparent;
  border-right-color: #000;
  border-left: 0;
  border-top: 0;
  margin-top: -10.5px;
  margin-left: -21px;
}
</style>
