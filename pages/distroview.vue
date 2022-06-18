<template>
  <div>
    <section v-if="distro && image" class="container mx-auto mt-6">
      <div
        v-if="distro.logo"
        class="flex flex-col items-center mb-4 sm:flex-row"
      >
        <img class="h-16 pr-6" :src="distro.logo.url" alt="" />
        <h1 class="main_red_text chedder text-4xl">{{ distro.name }}</h1>
      </div>
      <div v-else>
        <h1 class="main_red_text chedder text-center">{{ distro.name }}</h1>
      </div>
      <div
        class="h-[500px] back"
        :style="`background-image: url(${image})`"
      ></div>
      <!-- gallery  -->
      <!-- media Gallery -->
      <section v-if="distroImages" class="container mx-auto px-2 sm:px-0">
        <h2 class="my-6">Pictures</h2>
        <section
          class="mx-6 my-10 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10"
        >
          <div v-for="(img, index) in distroImages" :key="img.id + index">
            <img :src="img.formats.medium.url" alt="" />
          </div>
        </section>
      </section>
      <!-- description -->
      <h2 class="mt-4 text-3xl px-2 sm:px-0">History/Bio/Message</h2>
      <div v-if="distro.description.split('\n')" class="my-6 px-2 sm:px-0">
        <p
          v-for="(description, index) in distro.description.split('\n')"
          :key="description + index"
          class="mt-4 ext-lg px-2 md:text-2xl"
        >
          {{ description }}
        </p>
      </div>
      <p v-else class="text-lg px-2 md:text-2xl">{{ distro.description }}</p>
    </section>
    <section class="container mx-auto px-2 sm:px-0">
      <!-- date started , genre(if applicable ) location streetNumber zip streetName contact -->
      <h3 class="text-3xl mb-4">Location</h3>
      <!-- change streeNumber to street Number ... missing the letter t  -->
      <p v-if="distro.streeNumber" class="text-xl">
        {{ distro.streetNumber }} {{ distro.streetName }}, {{ distro.city }},
        {{ distro.state }} {{ distro.zip }}
      </p>
      <!-- <div v-if="distro.genre" class="mt-4">
        <h3 class="text-3xl mb-4">Genre</h3>
        <p class="text-xl">
          {{ distro.genre }}
        </p>
      </div> -->
      <div v-if="distro.dateOpened" class="mt-4">
        <h3 class="text-3xl mb-4">Date Started</h3>
        <p class="text-xl">
          {{ distro.dateOpened }}
        </p>
      </div>
      <div v-if="distro.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Contact</h3>
        <p class="text-xl">
          {{ distro.contact }}
        </p>
      </div>
      <div v-if="distro.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Links</h3>
        <p class="text-xl">
          {{ distro.contact }}
        </p>
      </div>
      <div v-if="distro.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Merch</h3>
        <p class="text-xl">
          {{ distro.contact }}
        </p>
      </div>
    </section>
    <!-- comments  -->
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
export default {
  data() {
    return {
      distro: {},
      image: '',
      distroImages: [],
      posts: [],
      postValue: false,
    }
  },
  async mounted() {
    try {
      const distro = await this.$strapi.findOne(
        'record-labels',
        this.$route.query.distro
      )
      this.distro = distro
      this.image = distro.distroImage.url
      this.distroImages = distro.distroImages
    } catch (error) {
      console.log(error)
    }
    try {
      const posts = await this.$strapi.find('posts', {
        record_label: this.$route.query.distro,
      })
      this.posts = posts
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    setVal: function (val) {
      this.postValue = val
    },
    async sendPost(val) {
      try {
        if (this.postValue) {
          await this.$strapi.create('posts', {
            record_label: this.distro.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          const posts = await this.$strapi.find('posts', {
            record_label: this.distro.id,
          })
          const ele = document.getElementById('inputVal')
          ele.value = ''
          this.postValue = false
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
.back {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
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
