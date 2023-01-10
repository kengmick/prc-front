<template>
  <div v-if="band">
    <style v-if="addPhotoBox">
      html {
        overflow: hidden;
      }
    </style>
    <!-- <pre>{{ JSON.stringify(band) }}</pre> -->
    <div class="container flex justify-center items-center mt-6 mx-auto">
      <FullCard
        class="mb-10"
        :band="band"
        :user="band.users_permissions_user"
        :isFeatured="true"
        :isHome="true"
        @addFeaturedToBandCard="addCard"
        @startChat="startChatNow(band.users_permissions_user)"
      />
    </div>
    <!-- edit band features  -->
    <NuxtLink
      :to="{ path: '/bands/edit', query: { band: band.id } }"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center"
    >
      Edit Band Details
    </NuxtLink>

    <div
      v-if="permission"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center my-4"
      @click="deleteAll(band.id)"
    >
      Delete Band
    </div>
    <!-- button to remove featured card  -->
    <section class="container flex justify-center items-center mt-6 mx-auto">
      <div
        v-if="band.hasFeaturedCard"
        @click="removeCard(band)"
        class="px-4 py-2 bg-black text-white chedder"
      >
        Remove Featured Card
      </div>
    </section>
    <section
      v-if="allBands"
      class="container mx-auto flex flex-col md:flex-row justify-center items-center"
    >
      <h2>Pick a card to feature</h2>
      <div>
        <ais-instant-search :search-client="searchClient" index-name="bands">
          <section class="flex justify-center items-center">
            <ais-search-box id="a" />
          </section>
          <ais-hits> </ais-hits>
        </ais-instant-search>
      </div>
    </section>
    <!-- container for all information of profile  -->

    <section class="container mx-auto px-4">
      <!-- showz -->
      <section class="my-2">
        <h2 id="showz" class="chedder text-2xl my-4">Showz</h2>
        <NuxtLink
          v-if="permission"
          :to="{ path: '/events/createevent', query: { band: band.id } }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Add Showz</h3>
          </div>
        </NuxtLink>
        <div v-if="band.events.length > 0" class="flex gap-4 overflow-y-scroll">
          <div v-for="event in band.events" :key="event.title" class="my-6">
            <CardsShowCard :event="event" />
            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white mt-4"
            >
              <p class="chedder mr-6" @click="deleteData(event.id, 'events')">
                Delete
              </p>
              <NuxtLink
                :to="{ path: '/events/edit', query: { event: event.id } }"
              >
                <p class="chedder">edit</p></NuxtLink
              >
            </div>
          </div>
        </div>
      </section>
      <!-- discography -->
      <section class="my-4">
        <h2 id="releases" class="chedder text-2xl my-4">Discography</h2>
        <!-- add releases button  -->
        <NuxtLink
          v-if="permission"
          :to="{ path: '/releases/create', query: { band: band.id } }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Add to discography</h3>
          </div>
        </NuxtLink>
        <div>
          <div v-if="band.releases" class="flex gap-4 overflow-y-scroll">
            <!-- <pre>{{ band.releases }}</pre> -->
            <div v-for="release in band.releases" :key="release.title">
              <NuxtLink
                :to="{
                  path: '/releases',
                  query: { releaseId: release.id, bandId: band.id },
                }"
              >
                <div class="my-6 w-[300px]">
                  <div>
                    <NuxtImg
                      class=""
                      :src="release.mainImage.url"
                      alt=""
                      height="300"
                      width="300"
                    />
                  </div>
                  <div
                    class="w-full bg-black text-white px-2 py-4 flex items-center"
                  >
                    <div>
                      <p>{{ release.title }} ({{ release.date }})</p>
                    </div>
                  </div>
                </div>
              </NuxtLink>
              <div
                v-if="permission"
                class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
                @click="deleteData(release.id, 'releases')"
              >
                <p class="chedder">Delete</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- songs -->
      <section class="my-2">
        <h2 id="songs" class="chedder text-2xl my-6">Songs</h2>
        <NuxtLink
          v-if="permission"
          :to="{ path: '/songs/create', query: { band: band.id } }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Add a song</h3>
          </div>
        </NuxtLink>
        <div class="my-6">
          <ul v-if="band.bandSongs">
            <li v-for="song in band.bandSongs" :key="song.id" class="mt-6">
              <div class="flex items-center">
                <h3 class="pr-4">{{ song.title }}</h3>
                <p>({{ song.date }})</p>
                <div class="grow">
                  <p
                    class="text-right"
                    @click="deleteData(song.id, 'bandSongs')"
                  >
                    X Delete Song
                  </p>
                </div>
              </div>
              <h4 class="my-2">Song Writers</h4>
              <ul v-if="song.songWriters">
                <li v-for="writer in song.songWriters" :key="writer.id">
                  <p>{{ writer.name }}</p>
                </li>
              </ul>
              <h4 v-if="song.lyricWriter.length > 0" class="my-2">
                Lyric Writers
              </h4>
              <ul v-if="song.lyricWriter.length > 0">
                <li v-for="writer in song.lyricWriter" :key="writer.id">
                  <p>{{ writer.name }}</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
      <!-- videos -->
      <section class="my-2">
        <h2 id="videos" class="chedder text-2xl">Videos</h2>
      </section>
      <!-- bio -->
      <section class="my-2">
        <h2 id="bio" class="chedder text-2xl">Biography</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/bio',
            query: { band: band.id, action: bioAction, dataType: 'band' },
          }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 v-if="band.bio" class="text-3xl pl-2 text-center">
              Edit Biography
            </h3>
            <h3 v-else class="text-3xl pl-2 text-center">Add Biography</h3>
          </div>
        </NuxtLink>
        <div v-if="band.bio">
          {{ band.bio }}
        </div>
      </section>
      <!-- Members -->
      <section class="my-2">
        <h2 id="members" class="chedder text-2xl my-6">Performers</h2>
        <NuxtLink
          v-if="permission"
          :to="{ path: '/performer/create', query: { band: band.id } }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Add a performer</h3>
          </div>
        </NuxtLink>
        <div class="my-6">
          <ul>
            <li v-for="performer in band.members" :key="performer.id">
              <NuxtImg
                v-if="performer.image"
                :src="performer.image.url"
                alt=""
                height="200"
                width="200"
              />
              <p>
                <span class="text-xl"> {{ performer.name }}</span>
                <span class="text-sm">
                  ( {{ performer.dateStart }} - {{ performer.dateEnd }})</span
                >
              </p>
              <ul>
                <li
                  v-for="instrument in performer.instruments"
                  :key="instrument.id"
                >
                  <p>{{ instrument.name }}</p>
                </li>
              </ul>
              <div
                v-if="permission"
                class="w-[200px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
                @click="deleteData(performer.id, 'members')"
              >
                <p class="chedder">Delete</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!-- Pictures -->
      <section class="my-2">
        <h2 id="pictures" class="chedder text-2xl my-6">Pictures</h2>
        <!-- add photo button  -->
        <div
          v-if="permission"
          @click="addPhotoModal"
          class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <h3 class="text-3xl pl-2 text-center">Add Photos</h3>
        </div>
        <div v-if="band.pictures" class="flex gap-6 overflow-x-scroll my-6">
          <div v-for="pic in band.pictures" :key="pic.id">
            <NuxtImg :src="pic.url" height="300" width="300" />
            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
              @click="deleteData(pic.id, 'pictures')"
            >
              <p class="chedder">Delete</p>
            </div>
          </div>
        </div>
      </section>
      <!-- Merch -->
      <section class="my-2">
        <h2 id="merch" class="chedder text-2xl my-6">Merch</h2>
      </section>
      <!-- Links -->
      <section class="my-2">
        <h2 id="links" class="chedder text-2xl my-6">Links</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/links/create',
            query: { band: band.id, dataType: 'bands' },
          }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Add Links</h3>
          </div>
        </NuxtLink>
        <div v-if="band.links">
          <ul>
            <li v-for="link in band.links" :key="link.id" class="my-4">
              <a :href="link.link">{{ link.link }} </a>
              <p class="mt-4" @click="deleteData(link.id, 'links')">X Delete</p>
            </li>
          </ul>
        </div>
      </section>
      <!-- Chat Room -->
      <section class="my-2">
        <h2 id="chatroom" class="chedder text-2xl my-6">Chat Room</h2>
        <PostsPost :postType="'bands'" :postId="band.id" />
      </section>
    </section>
    <Loading />
    <!-- addPhotoBox -->
    <div
      v-if="addPhotoBox"
      class="fixed top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30"
      style="z-index: 999"
    >
      <div
        class="w-full h-full bg-white flex flex-col justify-center items-center"
        style="z-index: 9999999999999999999"
      >
        <p
          class="absolute top-[20px] left-[20px] chedder"
          @click="addPhotoModal"
        >
          x
        </p>
        <h3 class="text-3xl text-center">Add A Photo</h3>
        <div class="my-6">
          <FormulateInput
            v-model="imageAdd"
            type="image"
            name="photo"
            label="Select an image to upload"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png,image/gif,image/webp"
            input-class="w-full sm:w-96 "
            wrapper-class="w-full sm:w-96 "
            element-class="w-full sm:w-96 "
            @change="photo = $event.target.files[0]"
          />
          <div
            v-if="photo"
            class="flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full"
            @click="addPhoto"
          >
            <h3 class="text-3xl pl-2 text-center">Add Image</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else></div>
</template>
<script>
import moment from 'moment'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { AisInstantSearch, AisSearchBox, AisHits } from 'vue-instantsearch'
export default {
  components: {
    AisInstantSearch,
    AisSearchBox,
    AisHits,
  },
  data() {
    return {
      // band and events
      searchClient: instantMeiliSearch(
        'https://prcsearch.net',
        'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      ),
      addPhotoBox: false,
      allBands: null,
      imageAdd: '',
      photo: '',
      band: null,
      events: [],
      bandEvents: [],
      // loading data
      load: false,
      hide: false,
      // userpermission helper
      userPermission: null,
      user: null,
      videos: [],
      formValues: {},
      // event data
      eventPosterFile: '',
      eventForm: false,
      formValuesEvent: {},
      // post data
      posts: [],
      popup: false,
      post: '',
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      errorMessage: null,
      permission: false,
      editVideo: false,
      video1: null,
      video2: null,
      video3: null,
      addRelease: false,
      releaseImg: null,
      releaseImgFinal: '',
      annImageFile: '',
      annImageFinal: '',
      releaseFormValues: {},
      editRelease: false,
      // test rel
      editReleaseFormValues: {},
      re: '',
      trackForm: false,
      bioAction: 'create',
      favs: null,
    }
  },
  computed: {
    announcement() {
      return this.band.announcements[this.index] || ''
    },
    announcements() {
      return this.band.announcements || ''
    },
  },

  async mounted() {
    if (this.$strapi.user) {
      console.log('this is user')
      const f = await this.$strapi.find('favs', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.favs = f.sort((a, b) => {
        if (a.type < b.type) {
          return -1
        }
        if (a.type > b.type) {
          return 1
        }
        return 0
      })
    }
    // get bands
    console.log('this is the query', this.$route.query.band)
    // check if user is logged in and owns the band
    try {
      this.band = await this.$strapi.findOne('bands', this.$route.query.band)

      // const id = [...this.band.events]
      // const ids = await id.map((e) => {
      //   return ['id', e.id]
      // })

      const posts = await this.$strapi.find('posts', {
        bands: this.band.id,
      })
      this.posts = posts
      console.log(posts, ' this is post ')
      if (this.band.bio) {
        this.bioAction = 'edit'
      }
      // if (this.band.video1) {
      //   this.video1 = band.video1
      //   this.videos.push(this.band.video1)
      // }
      // if (this.band.video2) {
      //   this.video2 = band.video2
      //   this.videos.push(this.band.video2)
      // }
      // if (this.band.video3) {
      //   this.video3 = band.video3
      //   this.videos.push(this.band.video3)
      // }
      const events = this.band.events
      console.log(events, ' this is events ')
      // this means that the events are upcoming
      // const upcomingEvents = events.filter((e) => {
      //   console.log(moment(e.date).toISOString())
      //   return moment(e.date).toISOString() >= moment().toISOString()
      // })

      // this.events = upcomingEvents.sort((a, b) => {
      //   return moment.utc(a.date).diff(moment.utc(b.date))
      // })
    } catch (error) {
      console.log(error, 'there was an error ')
    }
    try {
      console.log('last try')
      if (this.user) {
        console.log('this is user bottomt ')
        // compare userid to userpermission in front
        if (this.user === this.band.users_permissions_user.id) {
          console.log('do something herer')
          this.permission = true
        }
      }
    } catch (error) {
      console.log(error, ' this is error ')
      this.user = null
    }
    // get events
  },
  created() {
    const backButtonRouteGuard = this.$router.beforeEach((to, from, next) => {
      if (this.addPhotoBox === true) {
        next(false)
        this.addPhotoBox = false
      } else {
        next(true)
      }
    })

    this.$once('hook:destroyed', () => {
      this.addPhotoBox = false
      backButtonRouteGuard()
    })
  },
  methods: {
    moment,
    favCheck(type, id) {
      if (this.favs) {
        const check = this.favs.filter((f) => {
          console.log('fav checkc ')
          return f.data.id === id
        })
        if (check.length > 0) {
          return true
        }
        console.log(check, ' this is check ')
      }
    },
    addPhotoModal() {
      this.addPhotoBox = !this.addPhotoBox
    },
    async deleteAll(id) {
      const del = await this.$strapi.delete('bands', id)
      if (del) {
        this.$router.push('/profile')
      }
    },
    async deleteData(id, dataType) {
      if (
        dataType === 'pictures' ||
        dataType === 'releases' ||
        dataType === 'songs' ||
        dataType === 'bandSongs' ||
        dataType === 'members' ||
        dataType === 'links' ||
        dataType === 'events'
      ) {
        const updated = this.band[dataType].filter((data) => {
          return data.id !== id
        })
        console.log(updated, 'this is the updated and this is the id ', id)
        try {
          const updatedBand = await this.$strapi.update('bands', this.band.id, {
            [dataType]: [...updated],
          })
          this.band = updatedBand
        } catch (error) {
          console.log('could not delete the data')
        }
      }
    },
    async addPhoto() {
      try {
        const formData = new FormData()
        await formData.append('files', this.photo)
        const [image] = await this.$strapi.create('upload', formData)
        this.photo = image
      } catch (error) {
        this.errorMessage =
          'Sorry we could not upload your profile image ... please try again '
        this.loading = false
      }
      const updated = await this.$strapi.update('bands', this.band.id, {
        pictures: [...this.band.pictures, this.photo],
      })
      this.band = updated
      this.addPhotoBox = false
    },
    async addCard(band) {
      // list all bands so user can pick what card to add to thire card
      try {
        const allBands = await this.$strapi.find('bands')
        this.allBands = allBands
        // list all the cards as poster card with button
      } catch (error) {
        console.log(error)
      }
    },
    async addCardNow(bandToAdd) {
      try {
        const updated = await this.$strapi.update('bands', this.band.id, {
          hasFeaturedCard: true,
          cardData: JSON.stringify(bandToAdd),
          cardType: 'band',
        })
        this.band = updated
        this.allBands = null
      } catch (error) {
        console.log(error)
      }
    },
    cancelAddCard() {
      this.allBands = null
    },
    async removeCard(band) {
      try {
        console.log(band.id)
        const updated = await this.$strapi.update('bands', band.id, {
          hasFeaturedCard: false,
          cardData: {},
        })
        this.band = updated
      } catch (error) {
        console.log(error)
      }
    },
    // called on updatedSongList emit from trackForm
    updateSongList(data, status) {
      if (status === 'good') {
        this.band = data
        console.log(data)
        this.trackForm = false
      }
      this.trackForm = false
    },
    toggleTrackForm() {
      this.trackForm = !this.trackForm
    },
    closeEditRelease() {
      this.editRelease = false
    },
    async deleteRelease(rId) {
      try {
        const releasesUpdated = this.band.releases.filter((r) => {
          return r.id !== rId
        })
        const band = await this.$strapi.update('bands', this.band.id, {
          releases: releasesUpdated,
        })
        this.band = band
        this.loading = false
        this.editRelease = false
      } catch (error) {
        this.errorMessage = 'Sorry could not delete the release'
        this.loading = false
      }
    },

    editReleaseFunction(rId) {
      this.editRelease = true
      // get the release and log it
      const re = this.band.releases.filter((rel) => {
        return rel.id === rId
      })
      this.re = re[0]
    },
    async submitEditReleaseForm() {
      this.loading = true
      if (this.annImageFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.annImageFile)
          const [annImageFinal] = await this.$strapi.create('upload', formData)
          this.annImageFinal = annImageFinal
          this.editReleaseFormValues.image = annImageFinal
        } catch (error) {
          console.log(error)
          this.loading = false
          this.errorMessage =
            'Could not update the release Image ... please try again '
        }
        try {
          console.log('trying to update ')
          const releasesUpdated = this.band.releases.filter((r) => {
            console.log(r.id, this.re.id, 'the id of re to be filtered out ')
            return r.id !== this.re.id
          })
          console.log(this.editReleaseFormValues)
          releasesUpdated.push(this.editReleaseFormValues)
          console.log(releasesUpdated)
          const band = await this.$strapi.update('bands', this.band.id, {
            releases: releasesUpdated,
          })
          this.band = band
          console.log('set the band', band)
          this.loading = false
          this.editRelease = false
        } catch (error) {
          console.log(error)
          this.errorMessage = 'Sorry could not create the release'
          this.loading = false
        }
      } else {
        try {
          const releasesUpdated = this.band.releases.filter((r) => {
            return r.id !== this.re.id
          })
          const band = await this.$strapi.update('bands', this.band.id, {
            releases: releasesUpdated,
          })
          this.band = band
          this.loading = false
          this.editRelease = false
        } catch (error) {
          console.log(error)
          this.errorMessage = 'Sorry could not create the release'
          this.loading = false
        }
      }

      this.loading = false
    },
    addReleaseForm() {
      this.addRelease = !this.addRelease
    },
    async submitReleaseForm() {
      this.loading = true
      if (this.annImageFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.annImageFile)
          const [annImageFinal] = await this.$strapi.create('upload', formData)
          this.annImageFinal = annImageFinal
          this.releaseFormValues.image = annImageFinal
        } catch (error) {
          console.log(error)
          this.loading = false
          this.errorMessage =
            'Could not upload the release Image ... please try again '
        }
        try {
          console.log('trying to create ')
          const releasesUpdated = this.band.releases
          console.log(this.releaseFormValues)
          releasesUpdated.push(this.releaseFormValues)
          const band = await this.$strapi.update('bands', this.band.id, {
            releases: releasesUpdated,
          })
          this.band = band
          console.log('set the band', band)
          this.loading = false
        } catch (error) {
          console.log(error)
          this.errorMessage = 'Sorry could not create the release'
          this.loading = false
        }
      }

      this.loading = false
    },
    addVideo() {
      console.log('add video function ')
    },
    async updateVideo(video, videoId) {
      console.log(video, videoId)

      try {
        const band = await this.$strapi.update('bands', this.band.id, {
          [videoId]: video,
        })
        console.log(band.video1, 'updated band video')
        this.band = band
      } catch (error) {
        console.log('there was an error updating the videos')
      }
    },
    async deleteVideo(video, videoId) {
      console.log(videoId, 'id of video')
      try {
        const band = await this.$strapi.update('bands', this.band.id, {
          [videoId]: null,
        })
        this.band = band
      } catch (error) {
        console.log('there was an error deleting the video')
      }
    },
    closeEventForm() {
      console.log('this is the close event form')
      this.eventForm = false
    },
    editAddVideo() {
      this.editVideo = !this.editVideo
    },
    // add events
    async submitForm() {
      // uploading bandProfileImg
      this.loading = true
      if (this.formValues.timeStarts) {
        this.formValues.timeStarts = this.formValues.timeStarts += ':00.000'
      }
      try {
        const formData = new FormData()
        await formData.append('files', this.eventPosterFile)
        const [eventPosterFinal] = await this.$strapi.create('upload', formData)
        this.eventPosterFinal = eventPosterFinal
        this.formValues.eventPoster = eventPosterFinal
      } catch (error) {
        console.log(error)
        this.loading = false
        this.errorMessage =
          'Could not upload the event poster ... please try again '
      }
      try {
        const event = await this.$strapi.create('events', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        // put band id and update the band
        const updatedEvents = await this.$strapi.update('bands', this.band.id, {
          events: [...this.band.events, event],
        })
        const upcomingEvents = updatedEvents.events.filter((e) => {
          return moment(e.date).toISOString() >= moment().toISOString()
        })

        this.events = upcomingEvents.sort((a, b) => {
          return moment.utc(a.date).diff(moment.utc(b.date))
        })
        this.loading = false
        this.eventForm = false
      } catch (error) {
        console.log(error, 'there was an error ')
        this.loading = false
        this.eventForm = false
        this.errorMessage = 'Sorry, something went wrong ... please try again '
      }
      // after creation take user to band admin
      if (this.event) {
        this.$router.push({
          path: '/events/eventview',
          query: { event: this.event.id },
        })
      }
    },
    addAnnouncements(val) {
      this.$router.push({
        path: 'announcementcreate',
        query: { user: this.user, bandId: this.band.id, type: 'band' },
      })
    },
    addEventForm: function () {
      this.eventForm = true
    },
    setVal: function (val) {
      this.postValue = val
    },
    popupToggle() {
      this.popup = !this.popup
    },

    async sendPost(val) {
      this.loading = true
      try {
        if (this.postValue && !this.postImage) {
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            bands: this.band.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            bands: this.band.id,
          })
          // clears the post value box
          this.postValue = ''
          this.posts = posts
          this.loading = false
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
            bands: this.band.id,
            // sets the post message
            data: this.postValue,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          this.postValue = ''
          this.postImage = null
          const posts = await this.$strapi.find('posts', {
            bands: this.band.id,
          })

          this.posts = posts
          this.loading = false
        }
        if (this.postImage && !this.postValue) {
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
            bands: this.band.id,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          this.postValue = ''
          this.postImage = null
          this.loading = false
          const posts = await this.$strapi.find('posts', {
            bands: this.band.id,
          })

          this.posts = posts
        }
      } catch (error) {
        this.loading = false
        this.postError = 'you must be logged in to comment '
        console.log('error saving post ', error)
      }
    },
  },
}
</script>

<style land="scss" scoped>
.btn_custom {
  padding: 0.5em 1.5em;
  border: 2px solid black;
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
}
.custom_border {
  border: 0.5px solid rgba(128, 128, 128, 0.814);
  border-radius: 10%;
  padding: 1em;
}
.background_custom {
  background-position: center center;
  background-size: fill;
  background-repeat: no-repeat;
}
.text-background {
  background: url('~/static/live_background.png');
  background-clip: text;
  color: transparent;
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
textarea {
  resize: none;
}
textarea:focus-visible {
  outline-color: rgba(128, 128, 128, 0.797);
}

.post_input {
  outline: none;
}

/* video */
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  max-width: 250px;
  overflow: hidden;
}
.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.customBtn {
  border-radius: 0.3em;
  box-sizing: border-box;
  font-size: 0.9em;
  padding: 0.75em;
  line-height: 1.2em;
  margin: 0;
  color: #fff;
  min-width: 0;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  background: black;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
