<template>
  <div>
    <h1 class="main_red_text text-center">Edit Band</h1>
    <section v-if="band" class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitForm">
          <div class="flex-col flex">
            <div class="w-full px-4">
              <FormulateInput
                name="bandName"
                label="What is the band name"
                validation="required"
                wrapper-class="m-auto  "
                element-class="w-full"
                errors-class=" m-auto"
              />
              <FormulateInput
                name="genreAlt"
                :value="band.genreAlt || ''"
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
                wrapper-class="m-auto  "
                element-class="w-full"
                errors-class=" m-auto"
              />
              <!-- if edit genre clear out the old value  -->
              <FormulateInput
                v-if="formValues.genreAlt === 'other'"
                name="genre"
                label="What is the genre"
                validation="required"
                wrapper-class="m-auto  "
                element-class="w-full"
                errors-class=" m-auto"
              />

              <FormulateInput
                v-if="acc < 2"
                name="contact"
                label="Band contact?"
                wrapper-class="m-auto  "
                element-class="w-full"
                errors-class=" m-auto"
              />
              <FormulateInput
                name="country"
                label="Country other than USA?"
                wrapper-class="w-full m-auto"
                element-class="w-full"
              />

              <div class="w-full">
                <FormulateInput
                  name="city"
                  label="City that the band is from?"
                  validation="required"
                  wrapper-class="m-auto  "
                  element-class="w-full"
                  errors-class=" m-auto"
                />
                <FormulateInput
                  v-if="
                    !formValues.country ||
                    formValues.country === 'United States'
                  "
                  name="state"
                  label="Home state?"
                  wrapper-class="w-full"
                  element-class="w-full"
                />

                <FormulateInput
                  name="recordLabel"
                  label="Record label?"
                  wrapper-class="m-auto  "
                  element-class="w-full"
                  errors-class=" m-auto"
                />
              </div>
            </div>
            <section class="px-4 mt-10 sm:m-20">
              <div v-if="acc === 2">
                <h2>Add Contacts</h2>
                <FormulateInput
                  type="group"
                  name="altContacts"
                  :repeatable="true"
                  label="Add Contacts"
                  add-label="+ Add Contact"
                  wrapper-class="w-full"
                  element-class="w-full"
                >
                  <FormulateInput
                    name="contact"
                    label="Add Contact"
                    input-class="w-full sm:w-96 "
                    wrapper-class="w-full sm:w-96 "
                    element-class="w-full sm:w-96 "
                  />
                </FormulateInput>
              </div>
              <h2 v-if="acc === 2">Add Band Members</h2>
              <FormulateInput
                v-if="acc === 2"
                type="group"
                name="members"
                :repeatable="true"
                label="Band Members"
                add-label="+ Add members"
                wrapper-class="w-full"
                element-class="w-full"
                @change="changeMembers"
              >
                <div>
                  <FormulateInput
                    name="name"
                    label="Add band member first and last name"
                    wrapper-class="w-full"
                    element-class="w-full"
                    @change="changeMembers"
                  />
                  <FormulateInput
                    name="instrument"
                    label="Add Instrument"
                    wrapper-class="w-full"
                    element-class="w-full"
                    @change="changeMembers"
                  />
                  <FormulateInput
                    type="date"
                    name="dateStart"
                    label="Date members started"
                    wrapper-class="w-full"
                    element-class="w-full"
                    @change="changeMembers"
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
                    @change="changeMembers"
                  />
                  <!-- <div v-if="formValues.members && formValues.members[0].image">
                    <img
                      class="h-[300px]"
                      :src="formValues.members[0].image.url"
                      alt=""
                    />
                  </div> -->
                </div>
              </FormulateInput>
              <h2 v-if="acc === 2">Add Links</h2>
              <FormulateInput
                v-if="acc === 2"
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
              <h2 v-if="acc === 2">Add Photos</h2>
              <FormulateInput
                v-if="acc === 2"
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
                    name="picture"
                    label="Select an logo to upload"
                    help="Select a png, jpg or gif to upload."
                    validation="mime:image/jpeg,image/png,image/gif"
                    input-class="w-full sm:w-96 "
                    wrapper-class="w-full sm:w-96 "
                    element-class="w-full sm:w-96 "
                    @change="addPic($event.target.files[0])"
                  />
                </div>
              </FormulateInput>
              <h2
                v-if="acc === 2"
                class="text-center main_red_text text-2xl mb-10 mt-4"
              >
                {{ band.bandName }} profile image
              </h2>
              <div v-if="currentImage && !changeProfile">
                <img
                  class="mx-auto"
                  :src="currentImage"
                  alt="this is the band profile image"
                />
                <div class="btn_custom" @click="toggleImage">
                  Edit Profile Image
                </div>
              </div>
              <h2
                v-if="changeProfile"
                class="text-center main_red_text text-2xl mb-10 mt-4"
              >
                Add Band Profile Image
              </h2>
              <div v-if="changeProfile" class="flex w-full justify-center">
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
              <div v-if="changeProfile" class="btn_custom" @click="toggleImage">
                Cancel
              </div>

              <!-- <div v-if="image">
              <img :src="image[0].url" alt="fdsfadsf" />
            </div> -->
              <h2
                v-if="acc === 2"
                class="text-center main_red_text text-2xl mb-10 mt-4"
              >
                Add Band Bio
              </h2>
              <div v-if="acc === 2" class="flex w-full justify-center">
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
            <div class="px-4">
              <FormulateInput
                type="submit"
                label="Next"
                wrapper-class="w-full mt-10 px-4 sm:mx-10"
                grouping-class="bg-black"
                element-class="w-full"
              />
              <div class="btn_custom" @click="cancel">Cancel</div>
            </div>
          </div>
        </FormulateForm>
      </div>
    </section>
    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <Spinner />
    </section>
    <section
      v-if="errorMessage"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <div>
        <h2>{{ errorMessage }}</h2>
        <h3
          class="text-center text-2xl cursor-pointer"
          @click="errorMessage = null"
        >
          Close X
        </h3>
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
      image: '',
      changeProfile: false,
      currentImage: '',
      acc: 0,
      pictures: [],
      changePics: false,
      changeMem: false,
      members: [],
      loading: false,
    }
  },
  async mounted() {
    try {
      const user = await this.$strapi.findOne('users', this.$strapi.user.id)
      this.acc = user.acc || 1
    } catch (error) {
      this.$nuxt.error({ statusCode: 404, message: error })
    }
    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      this.band = band
      this.formValues = band
      // this.formValues.genreAlt = band.genreAlt
      if (band.bandProfileImg) {
        this.currentImage = band.bandProfileImg.url
      }
      this.formValues.members = band.members
      this.pictures = band.pictures || []
    } catch (error) {
      this.$nuxt.error({ statusCode: 404, message: error })
    }
  },
  methods: {
    addPic: function () {
      this.changePics = true
    },
    changeMembers: function () {
      this.changeMem = true
    },
    toggleImage: function () {
      this.changeProfile = !this.changeProfile
    },
    cancel: function () {
      this.$router.push({
        path: '/bandprofile',
        query: { band: this.band.id },
      })
    },
    async submitForm() {
      this.loading = true
      // uploading bandProfileImg
      if (this.changeMem) {
        const members = []
        if (this.formValues.members.length > 0) {
          for (let index = 0; index < this.formValues.members.length; index++) {
            if (this.formValues.members[index].image.files) {
              console.log('add file to form data ')
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
            } else {
              members.push({
                ...this.band.members[index],
              })
            }
          }
        }
        this.formValues.members = members
        console.log(members)
      }

      const pictures = []
      if (this.changePics) {
        for (let index = 0; index < this.formValues.photos.length; index++) {
          if (this.formValues.photos[index].picture) {
            console.log('the photos ', this.formValues.photos)
            const formData = new FormData()
            formData.append(
              'files',
              this.formValues.photos[index].picture.files[0].file
            )
            const [image] = await this.$strapi.create('upload', formData)

            pictures.push({ pic: image })
            console.log('image', image)
          } else if (this.band.photos[index].pic) {
            console.log('this is the else block for the photos')
            pictures.push({ pic: this.band.photos[index].pic })
          }
        }
        this.pictures = pictures
        this.formValues.photos = pictures
        console.log('form photos', this.formValues.photos)
      }
      try {
        if (this.profileImage) {
          const formData = new FormData()
          await formData.append('files', this.profileImage)
          const [image] = await this.$strapi.create('upload', formData)
          this.image = image
          this.formValues.bandProfileImg = image
        }
      } catch (error) {
        console.log(error)
      }
      // making post band to strapi
      try {
        // update band below
        const { members, bandProfileImg, photos, ...rest } = this.formValues
        if (bandProfileImg) {
          const band = await this.$strapi.update(
            'bands',
            this.$route.query.band,
            {
              members,
              bandProfileImg,
              rest,
              users_permissions_user: this.$strapi.user.id,
            }
          )
          this.band = band
          this.loading = false
        }
        // updating band
        const band = await this.$strapi.update(
          'bands',
          this.$route.query.band,
          {
            members,
            photos,
            rest,
            users_permissions_user: this.$strapi.user.id,
          }
        )
        this.band = band
        this.loading = false
      } catch (error) {
        this.errorMessage = 'Sorry ... please try again'
        console.log('there was a problem', error)
        this.loading = false
      }
      try {
        // updating band
        const band = await this.$strapi.update(
          'bands',
          this.$route.query.band,
          {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          }
        )
        this.band = band
        this.loading = false
      } catch (error) {
        console.log('error in creating band', error)
        this.loading = false
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

.btn_custom {
  padding: 0.5em 1.5em;
  border: 1px solid black;
  background: black;
  color: white;
  text-align: center;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
}
</style>
