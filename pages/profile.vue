<template>
  <div>
    <div v-if="$strapi.user" class="container mx-auto my-10 flex gap-10">
      <div>
        <p class="text-2xl mb-6">Welcome {{ $strapi.user.username }}</p>
        <img
          src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
          alt=""
        />
        <p class="text-2xl mt-6">Email : {{ $strapi.user.email }}</p>
      </div>
      <div class="flex-grow">
        <p class="text-2xl mb-6">Profiles</p>
        <table class="w-full">
          <tr>
            <th>Profile Type</th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>

          <tr v-for="(band, index) in bands" :key="band.bandName + index">
            <td>Band Profile</td>
            <td>{{ band.bandName }}</td>
            <td>{{ moment(String(band.created_at)).format('MMM Do') }}</td>
            <td>
              <div class="flex gap-6">
                <nuxtLink :to="{ path: '/createband' }" class="btn_custom"
                  >add</nuxtLink
                >
                <nuxtLink
                  :to="{ path: '/bandprofile', query: { band: band.id } }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/bandadmin',
                    query: { band: band.id },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
          <tr v-for="article in classifieds" :key="article.name">
            <td>Classified Article</td>
            <td>{{ article.title }}</td>
            <td>{{ moment(String(article.created_at)).format('MMM Do') }}</td>
            <td>
              <div class="flex gap-6">
                <nuxtLink :to="{ path: '/classifiedcreate' }" class="btn_custom"
                  >add</nuxtLink
                >
                <nuxtLink
                  :to="{
                    path: '/classifiedview',
                    query: { article: article.id },
                  }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/classifiededit',
                    query: { article: article.id },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
          <tr v-for="(venue, index) in venues" :key="venue.name + index">
            <td>venue Profile</td>
            <td>{{ venue.name }}</td>
            <td>{{ moment(String(venue.created_at)).format('MMM Do') }}</td>
            <td>
              <div class="flex gap-6">
                <nuxtLink :to="{ path: '/createVenue' }" class="btn_custom"
                  >add</nuxtLink
                >
                <nuxtLink
                  :to="{ path: '/venueprofile', query: { venue: venue.id } }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/venueedit',
                    query: { venue: venue.id },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else>
      {{ error }}
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      bands: [],
      venues: [],
      classifieds: [],
      error: '',
    }
  },
  async mounted() {
    try {
      this.bands = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong'
    }
    try {
      this.venues = await this.$strapi.find('venues', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong'
    }
    try {
      this.classifieds = await this.$strapi.find('classifieds', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong'
    }
  },
  methods: {
    moment,
  },
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th,
td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.btn_custom {
  padding: 0.5em 1em;
  border: 1px solid black;
}
</style>
