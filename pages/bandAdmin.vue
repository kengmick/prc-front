<template>
  <div>
    <div>
      <h1>Put the data here for the admin.</h1>
      <p>before going forward think about what you are doing !!!!!!!!!!</p>
    </div>
  </div>
</template>

//
<script>
export default {
  data() {
    return {
      band: {},
      user: '',
      editImg: false,
      profileImage: '',
      isComplete: false,
      image: null,
      isLoading: false,
      editDetails: false,
      genre: '',
      bandNameForm: '',
      bandEmailForm: '',
      bandManagerForm: '',
      hometownForm: {},
      recordLabelForm: '',
      updateReady: false,
      bandBio: '',
      editBio: false,
      bioUpdateReady: false,
      addType: null,
      albumTitle: '',
      albumCover: '',
      albumImage: '',
      albumImageForm: '',
      songFile: '',
      songTitle: '',
      songs: [],
    }
  },
  computed: {
    bio() {
      return this.bandBio.split('\n')
    },
    adminName() {
      return (
        this.band.users_permissions_user.firstName +
        ' ' +
        this.band.users_permissions_user.lastName
      )
    },
    hometown() {
      return this.band.city + ', ' + this.band.state
    },
  },
  async mounted() {
    try {
      this.band = await this.$strapi.findOne('bands', this.$strapi.user.band)
    } catch (error) {
      console.log(error)
      this.$nuxt.error({ statusCode: 404, message: error })
    }
  },

  methods: {
    async submitAlbum() {
      try {
        const formData = new FormData()
        await formData.append('files', this.albumCover)
        const [albumImage] = await this.$strapi.create('upload', formData)
        this.albumImage = albumImage
        this.albumImageForm = albumImage
        console.log('album image', albumImage)
      } catch (error) {
        console.log(error, 'in upload image')
      }
      try {
        const formData = new FormData()
        await formData.append('files', this.songFile)
        const [songFile] = await this.$strapi.create('upload', formData)
        this.songFile = songFile
      } catch (error) {
        console.log(error, 'in upload song')
      }
      const song = {
        ...(this.songFile && {
          songTitle: this.songTitle,
          songFile: this.songFile,
        }),
      }
      const data = {
        ...(this.albumImage && { albumCover: this.albumImage }),
        ...(this.albumTitle && { title: this.albumTitle }),
        ...(song.songTitle && { songs: [{ ...song }] }),
      }
      console.log(data, 'data')
      try {
        console.log(this.$strapi.user.band)
        await this.$strapi.update('bands', 6, {
          album: [...this.band.album, data],
        })
      } catch (error) {
        console.log('error could not update', error)
      }
      await this.$nuxt.refresh()
      this.addType = null
    },
    add(type) {
      this.addType = type
    },
    toggleEditDetails() {
      this.editDetails = !this.editDetails
      if (this.editDetails === false) {
        this.updateReady = false
      }
    },
    async submitDetails() {
      await this.$strapi.update('bands', this.$strapi.user.band, {
        ...(this.bandEmailForm && { bandEmail: this.bandEmailForm }),
        ...(this.bandNameForm && { bandName: this.bandNameForm }),
        ...(this.genre && { genre: this.genre }),
        ...(this.bandManagerForm && { bandManager: this.bandManagerForm }),
        ...(this.recordLabelForm && { recordLabel: this.recordLabelForm }),
        ...(this.hometownForm.city && { city: this.hometownForm.city }),
        ...(this.hometownForm.state && { city: this.hometownForm.state }),
      })
      this.band = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.toggleEditDetails()
    },
    async submitBio() {
      await this.$strapi.update('bands', this.$strapi.user.band, {
        ...(this.bandBio && { bio: this.bandBio }),
      })
      this.band = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.toggleBioDetails()
    },
    toggleBioDetails() {
      this.editBio = !this.editBio
      if (this.edit === false) {
        this.bioUpdateReady = false
      }
    },
    canUpdate() {
      return (this.updateReady = true)
    },
    viewProfile() {
      console.log('view profile router')
      this.$router.push(`/bandprofile/${this.band[0].id}`)
    },
    toggleEditImg(isEdit) {
      if (isEdit) {
        this.isComplete = false
      }
      this.editImg = !this.editImg
    },
    complete() {
      this.isComplete = !this.isComplete
      console.log(this.profileImage)
    },
    async submitProfileImg() {
      console.log(this.$strapi.user.band, 'band id', this.$strapi.user, ' user')
      try {
        // loading
        this.isLoading = true
        const formData = new FormData()
        await formData.append('files', this.profileImage)
        const [image] = await this.$strapi.create('upload', formData)
        this.image = image
        await this.$strapi.update('bands', 3, {
          bandProfileImg: this.image,
        })
        this.band[0].bandProfileImg = await this.image
        this.toggleEditImg(true)
        // not Loading
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<script></script>

<style scoped>
.button {
  padding: 1.3em 6em;
  color: white;
  text-align: center;
}
.para {
  background-size: cover;
  object-fit: fill;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}
.padding-extra-large {
  padding-left: 20%;
  padding-right: 20%;
}
.extraLarge {
  padding-left: 5em;
  padding-right: 5em;
}
.formulate-input[data-classification='file'] .formulate-input-upload-area {
  height: 500px !important;
}
.spinner {
  width: 60px;
  height: 60px;
  position: relative;
  margin: auto;
}
.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: red;
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2s infinite ease-in-out;
}
.double-bounce2 {
  animation-delay: -0.5s;
}
@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
@media (min-width: 1700px) {
  .extraLarge {
    padding-left: 25em;
    padding-right: 25em;
  }
  .bioPaddinglarge {
    padding-left: 7em;
    padding-right: 7em;
  }
}
@media (min-width: 2200px) {
  .bioPaddinglarge {
    padding-left: 15em;
    padding-right: 15em;
  }
  .largeTop {
    margin-left: 8em;
  }
}
@media (max-width: 450px) {
  .bioPaddinglarge {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  .extraLarge {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
}
@media only screen and (max-width: 600px) and (min-width: 400px) {
  .top-section-padding {
    padding-left: 10em;
  }
}
</style>
