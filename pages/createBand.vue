<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="text-center my-4">Create Your Band Profile</h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="w-full px-4 sm:w-1/2">
              <FormulateInput
                name="bandName"
                label="What is the band name"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="genreAlt"
                :options="{
                  oldPunk: 'Old Punk',
                  hardCore: 'HardCore',
                  streetSkate: 'Street/Skate',
                  oi: 'Oi!',
                  skaSurf: 'Ska/Surf',
                  thrash: 'thrash',
                  crust: 'crust',
                  melodicPop: 'Melodic/Pop',
                  anarchoPeace: 'Anarcho/Peace',
                  other: 'Other',
                }"
                type="select"
                label="What is the genre"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-if="formValues.genreAlt === 'other'"
                name="genre"
                label="What is the genre"
                placeholder="Add Your band genre"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="dateStarted"
                type="date"
                label="Date Band Started"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="bandEmail"
                label="Band email?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
            </div>
            <div class="w-full px-4 sm:w-1/2">
              <!-- Tier 2 contact list  -->
              <div v-if="acc < 2">
                <FormulateInput
                  name="linkOne"
                  label="Add a Link"
                  placeholder="https://somelink.com"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
              </div>

              <FormulateInput
                v-if="acc < 2"
                name="contact"
                label="Band contact"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="country"
                label="Country other than USA?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                name="city"
                label="City that the band is from?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-if="
                  !formValues.country || formValues.coutry !== 'United States'
                "
                name="state"
                label="Home state?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />

              <FormulateInput
                name="recordLabel"
                label="Record label?"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
            </div>
          </div>
          <section class="px-4 mt-10 sm:m-20">
            <!-- altContact and links -->
            <h2 class="my-4">Add Contacts</h2>
            <div v-if="acc === 2">
              <FormulateInput
                type="group"
                name="altContacts"
                :repeatable="true"
                label="Contacts"
                add-label="+ Add contact"
                wrapper-class="w-full"
                element-class="w-full"
              >
                <FormulateInput
                  name="contact"
                  label="Countact Info"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
              </FormulateInput>
              <h2 class="my-4">Add Links</h2>
              <FormulateInput
                type="group"
                name="links"
                :repeatable="true"
                label="Links"
                add-label="+ Add link"
                wrapper-class="w-full"
                element-class="w-full"
              >
                <FormulateInput
                  name="link"
                  label="https://somelink.com"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
              </FormulateInput>
            </div>
            <!-- end of links and contacts repeatable  -->
            <h2 class="my-4">Add Band Members</h2>
            <FormulateInput
              type="group"
              name="members"
              :repeatable="true"
              label="Band Members"
              add-label="+ Add members"
              wrapper-class="w-full"
              element-class="w-full"
            >
              <div>
                <FormulateInput
                  name="name"
                  label="Add band member first and last name"
                  wrapper-class="w-full"
                  element-class="w-full"
                />
                <FormulateInput
                  name="instrument"
                  label="Add Instrument"
                  wrapper-class="w-full"
                  element-class="w-full"
                />
                <FormulateInput
                  type="date"
                  name="dateStart"
                  label="Date members started"
                  wrapper-class="w-full"
                  element-class="w-full"
                />
                <FormulateInput
                  type="image"
                  name="image"
                  label="Add image of member"
                  help="Select a png, jpg or gif to upload."
                  validation="mime:image/jpeg,image/png,image/gif"
                  input-class="w-full sm:w-96 "
                  wrapper-class="w-full sm:w-96 "
                  element-class="w-full sm:w-96 "
                />
              </div>
            </FormulateInput>
            <h2 class="text-center mb-10 mt-4">Add Profile Image</h2>
            <div class="flex w-full justify-center">
              <FormulateInput
                type="image"
                name="bandProfileImg"
                label="Select an image to upload"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                input-class="w-full sm:w-96 "
                wrapper-class="w-full sm:w-96 "
                element-class="w-full sm:w-96 "
                @change="profileImage = $event.target.files[0]"
              />
            </div>
            <!-- logo -->
            <h2 class="text-center mb-10 mt-4">Add Your band Logo</h2>
            <div class="flex w-full justify-center">
              <FormulateInput
                type="image"
                name="logo"
                label="Select an logo to upload"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                input-class="w-full sm:w-96 "
                wrapper-class="w-full sm:w-96 "
                element-class="w-full sm:w-96 "
                @change="logoImage = $event.target.files[0]"
              />
            </div>
            <!-- <div v-if="image">
              <img :src="image[0].url" alt="fdsfadsf" />
            </div> -->
            <h2 class="text-center mb-10 mt-4">
              Add Previous Shows Played (optional)
            </h2>
            <FormulateInput
              type="group"
              name="oldShows"
              :repeatable="true"
              label="Previous Shows Played"
              add-label="+ Add Show"
              wrapper-class="w-full"
              element-class="w-full"
            >
              <div>
                <FormulateInput
                  name="title"
                  label="Name of Show"
                  wrapper-class="w-full"
                  element-class="w-full"
                />
                <FormulateInput
                  name="city"
                  label="city of event"
                  wrapper-class="w-full"
                  element-class="w-full"
                />
                <FormulateInput
                  name="state"
                  label="state of event"
                  wrapper-class="w-full"
                  element-class="w-full"
                />

                <FormulateInput
                  name="venueName"
                  label="Venue Name"
                  wrapper-class="w-full"
                  element-class="w-full"
                />
              </div>
            </FormulateInput>
            <h2>Add Photos</h2>
            <FormulateInput
              type="group"
              name="photos"
              :repeatable="true"
              label="Add Photos"
              add-label="+ Add Photo"
              wrapper-class="w-full"
              element-class="w-full"
            >
              <div>
                <FormulateInput
                  type="image"
                  name="pic"
                  label="add photos"
                  help="Select a png, jpg or gif to upload."
                  validation="mime:image/jpeg,image/png,image/gif"
                  input-class="w-full sm:w-96 "
                  wrapper-class="w-full sm:w-96 "
                  element-class="w-full sm:w-96 "
                  @change="addPic($event.target.files[0])"
                />
              </div>
            </FormulateInput>

            <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
              Add Band Bio
            </h2>
            <div class="flex w-full justify-center">
              <FormulateInput
                name="bio"
                type="textarea"
                label="Enter your band bio here"
                input-class="w-full sm:w-96 h-72"
                wrapper-class="w-full sm:w-96 h-72"
                element-class="w-full sm:w-96 h-72"
              />
            </div>
          </section>
          <div>
            <FormulateInput
              type="submit"
              label="Next"
              wrapper-class="w-full mt-10 px-4 sm:mx-10"
              grouping-class="bg-black"
              element-class="w-full"
            />
          </div>
        </FormulateForm>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      errorMessage: '',
      band: {},
      created: false,
      profileImage: '',
      logoImage: '',
      logoImageFinal: '',
      image: '',
      showPosters: [],
      pictures: [],
      acc: 0,
    }
  },
  async mounted() {
    const user = await this.$strapi.findOne('users', this.$strapi.user.id)
    this.acc = user.acc
  },
  methods: {
    addPic(val) {
      console.log(val)
    },
    async submitForm() {
      // uploading bandProfileImg
      const members = []
      if (this.formValues.members) {
        for (let index = 0; index < this.formValues.members.length; index++) {
          const formData = new FormData()
          formData.append(
            'files',
            this.formValues.members[index].image.files[0].file
          )
          const [image] = await this.$strapi.create('upload', formData)

          members.push({
            image: image,
            name: this.formValues.members[index].name,
            instrument: this.formValues.members[index].instrument,
            dateStart: this.formValues.members[index].dateStart,
          })
        }
      }
      this.formValues.members = members
      // getting pictures uploaded
      const pictures = []
      if (this.formValues.photos.length > 0) {
        for (let index = 0; index < this.formValues.photos.length; index++) {
          const formData = new FormData()
          formData.append(
            'files',
            this.formValues.photos[index].pic.files[0].file
          )
          const [image] = await this.$strapi.create('upload', formData)

          pictures.push({ pic: image })
          console.log('adding pictures ', pictures)
        }
        this.pictures = pictures
        this.formValues.photos = pictures
      }
      try {
        const formData = new FormData()
        await formData.append('files', this.profileImage)
        const [image] = await this.$strapi.create('upload', formData)
        this.image = image
        this.formValues.bandProfileImg = image
      } catch (error) {
        console.log(error)
      }
      try {
        const formData = new FormData()
        await formData.append('files', this.logoImage)
        const [logoImageFinal] = await this.$strapi.create('upload', formData)
        this.logoImageFinal = logoImageFinal
        this.formValues.logo = logoImageFinal
      } catch (error) {
        console.log(error)
      }
      // old shows array
      // making post band to strapi
      try {
        console.log('form values ===', this.formValues)
        const band = await this.$strapi.create('bands', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.band = band
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        console.log(error, 'creating band')
      }
      // after creation take user to band admin
      if (this.band) {
        this.$router.push({
          path: '/bandprofile',
          query: { band: this.band.id },
        })
      }
    },
  },
}
</script>

<style scoped>
.center-custom {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
