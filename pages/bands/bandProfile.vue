<template>
  <div v-if="band" class="absolute top-[48px] h-auto">
    <MobileBand
      :band="band"
      :user="band.users_permissions_user"
      :isFeatured="true"
      :isHome="true"
      @updatedFavs="updatedFavs('bands', band.id)"
      :isFav="favCheck('bands', band.id)"
      @addFeaturedToBandCard="addCard"
      @startChat="startChatNow(band.users_permissions_user)"
      @removeFeaturedFromSimple="removeFeaturedCard"
    />
    <section v-if="chat">
      <Chat
        :chatInfo="chat"
        :chatWithId="chat.chatWith.id"
        class="z-[999999999999999999999999999999999]"
        @closeChat="renderChatComp"
      />
    </section>
  </div>
  <div v-else class="h-screen w-screen fixed top-0 left-0">
    <div class="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
export default {
  asyncData({ error }) {
    if (error) {
      console.log(error)
      const band = null
      return {
        band,
      }
    }
  },
  // async asyncData(context) {
  //   const query = await context.route.query
  //   try {
  //     if (context.error) {
  //       console.log('there was an error ', query, context.error)
  //     }
  //   } catch (e) {
  //     if (context.error) {
  //       console.log('there was an error ')
  //     }
  //     console.log(e)
  //     context.error(e, 'this is an error ') // Show the nuxt error page with the thrown error
  //   }
  // },
  data() {
    return {
      // band and events
      searchClient: instantMeiliSearch(
        'https://prcsearch.net',
        'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      ),
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
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

  async mounted() {
    try {
      if (this.$strapi) {
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
      }
    } catch (error) {
      console.log('your not logged in')
    }

    try {
      console.log('this is the hook ')
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
  computed: {
    announcement() {
      return this.band.announcements[this.index] || ''
    },
    announcements() {
      return this.band.announcements || ''
    },
  },
  watch: {
    async '$route.query'() {
      this.band = await this.$strapi.findOne('bands', this.$route.query.band)
    },
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
    async removeFeaturedCard(val) {
      const fillterdCards = this.band.cardData.cards.filter((c) => {
        return c.id !== val
      })
      this.band = await this.$strapi.update('bands', this.band.id, {
        cardData: JSON.stringify({ cards: fillterdCards }),
      })
    },
    async updatedFavs(type, id) {
      console.log(
        'this is the updated favs event emited from the parent component'
      )
      if (this.$strapi.user) {
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

        if (this.favs !== null) {
          const check = this.favs.filter((f) => {
            console.log('fav checkc ')
            return f.data.id === id
          })
          if (check.length > 0) {
            return true
          }
          console.log(check, ' this is check ')
        }
      }
    },
    favCheck(type, id) {
      console.log('emited from the child component')
      if (this.favs !== null) {
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
    async renderChatComp(chat) {
      console.log('this is the render chat comp')
      this.chatComp = false
      if (this.chatComp === false) {
        this.chat = await chat
        this.chatComp = true
      } else {
        this.chatComp = false
      }
    },
    async startChatNow(val) {
      try {
        // find all chat that you have
        const [hasChat] = await this.$strapi.find('chats', {
          users_permissions_user: val.id,
        })
        console.log(hasChat)
        // return { ...c, chatWith: this.chatWith }

        // render the chat comp with the chat that we already have read y

        if (hasChat) {
          console.log('the start of has chat ')
          if (
            hasChat.users_permissions_user.id === this.$strapi.user.id &&
            hasChat.users_permissions_users.length > 1
          ) {
            console.log('the start of has chat 1 ')
            const [chatWith] = hasChat.users_permissions_users.filter((u) => {
              return u.id !== this.$strapi.user.id
            })
            console.log('the start of has chat 1 render ')
            this.renderChatComp({
              ...hasChat,
              chatWith: chatWith,
            })
          } else if (
            hasChat.users_permissions_user.id !== this.$strapi.user.id
          ) {
            console.log('the start of has chat 2 ')
            this.renderChatComp({
              ...hasChat,
              chatWith: hasChat.users_permissions_user,
            })
          } else if (
            hasChat.users_permissions_user.id === this.$strapi.user.id &&
            hasChat.users_permissions_users.length === 1
          ) {
            console.log('the start of has chat 2 ')
            this.renderChatComp({
              ...hasChat,
              chatWith: hasChat.users_permissions_user,
            })
          }
        } else if (this.$strapi.user.id !== val.id) {
          console.log('the start of has chat 3 ')
          const chat = await this.$strapi.create('chats', {
            users_permissions_user: val.id,
            users_permissions_users: [this.$strapi.user.id],
          })
          console.log(chat)
          this.renderChatComp({
            ...chat,
            chatWith: chat.users_permissions_user,
          })
        } else {
          console.log('the start of has chat 4 ')
          const chat = await this.$strapi.create('chats', {
            users_permissions_user: val.id,
            users_permissions_users: [val.id, this.$strapi.user.id],
          })
          console.log('this is the chat now ', chat)
          this.renderChatComp({
            ...chat,
            chatWith: chat.users_permissions_user,
          })
        }
      } catch (error) {
        console.log('does not have a chat with this band error  ', error)
      }
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

<style scoped>
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
