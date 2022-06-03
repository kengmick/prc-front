<template>
  <div>
    <section v-if="classified">
      <div class="container mx-auto my-10">
        <p class="pb-4">
          Posted on :
          {{ moment(String(classified.created_at)).format('MMM Do YY') }}
        </p>
        <h2 class="text-2xl">{{ classified.title }}</h2>
        <div v-if="classified.description.split('\n')" class="pb-6">
          <p
            v-for="(description, index) in classified.description.split('\n')"
            :key="description + index"
            class="my-4"
          >
            {{ description }}
          </p>
        </div>
        <p v-else>
          {{ classified.description }}
        </p>
        <p class="pb-1">Contact Info: {{ classified.contact }}</p>
        <p v-if="classified.phone" class="pb-1">
          Cell Phone {{ classified.phone }}
        </p>
        <!-- <p v-if="article.phone" class="pb-1">Phone: {{ classified.phone }}</p> -->
        <p>Username : {{ classified.users_permissions_user.username }}</p>
      </div>
    </section>
    <!-- comment box -->
    <section class="container mx-auto my-10">
      <h2 class="text-center text-2xl">Comments</h2>
      <div class="container shadow-2xl size p-10 my-10">
        <div v-if="posts">
          <div v-for="post in posts" :key="post.data">
            <p>
              <span class="main_red_text chedder"
                >{{ post.users_permissions_user.username }} ...
              </span>
              {{ post.data }}
            </p>
          </div>
          <!-- <pre>{{ classified.comments }}</pre> -->
        </div>
        <div v-else>
          <p>There are no comments on this classified add</p>
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
  },
}
</script>

<style scoped>
.size {
  min-height: 200px;
}
</style>
