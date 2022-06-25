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
    <!-- comment box -->
    <section class="container mx-auto">
      <h2>Posts</h2>
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
              </p>
            </div>
          </div>
        </div>
        <!-- add post bod  -->
        <div class="w-full mx-auto">
          <div class="w-full flex justify-center items-center">
            <textarea
              id="inputVal"
              name="inputVal"
              class="w-3/4 p-4 border-[1px] border-gray-400 mx-auto focus-visible:border-black post_input"
              placeholder="type something here to share ..."
              @change="postValue = $event.target.value"
            >
            </textarea>
          </div>
          <div class="border-[1px] border-gray-400 w-3/4 mx-auto flex">
            <div
              class="flex items-center justify-center p-6 border-r-2 border-black"
              @click="sendPost"
            >
              <h3><span class="pr-2">💬</span> Send</h3>
            </div>
            <div
              class="flex items-center justify-center p-6 border-r-2 border-black"
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
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      classified: '',
      comments: [],
      posts: [],
    }
  },
  async mounted() {
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
    async sendPost(val) {
      try {
        if (this.postValue) {
          await this.$strapi.create('posts', {
            classified: this.classified.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          const posts = await this.$strapi.find('posts', {
            classified: this.classified.id,
          })
          this.postValue = ''
          const ele = document.getElementById('inputVal')
          ele.value = ''
          this.posts = posts
        }
      } catch (error) {
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
