<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
    <h1 class="main_red_text text-center">Create Your Band Profile</h1>
    <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
      <div class="w-full mt-6 mb-6">
        <FormulateForm v-model="formValues" @submit="submitFormTest">
          <div>
            <FormulateInput
              type="date"
              label="date"
              name="date"
              wrapper-class="w-full mt-10 px-4 sm:mx-10"
              grouping-class="bg-black"
              element-class="w-full"
            />

            <FormulateInput
              type="submit"
              label="Next"
              wrapper-class="w-full mt-10 px-4 sm:mx-10"
              grouping-class="bg-black"
              element-class="w-full"
            />
          </div>
        </FormulateForm>
        <FormulateForm v-model="formValues" @submit="submitForm">
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
                required="true"
                wrapper-class="w-full"
                element-class="w-full"
              />
              <FormulateInput
                type="date"
                name="dateStart"
                label="Add band member first and last name"
                required="true"
                wrapper-class="w-full"
                element-class="w-full"
                @change="log($event.target.value)"
              />
              <FormulateInput
                type="image"
                name="image"
                label="Select an image to upload"
                help="Select a png, jpg or gif to upload."
                validation="mime:image/jpeg,image/png,image/gif"
                input-class="w-full sm:w-96 "
                wrapper-class="w-full sm:w-96 "
                element-class="w-full sm:w-96 "
              />
            </div>
          </FormulateInput>
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
        <div v-if="members">
          <pre>{{ members }}</pre>
        </div>

        <div @click="log()">Clicker</div>
      </div>
    </section>
    <div v-if="m">
      <pre>{{ m }}</pre>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  data() {
    return {
      formValues: {},
      errorMessage: '',
      band: {},
      created: false,
      venueImage: '',
      image: '',
      images: [],
      members: [],
      m: {},
    }
  },
  methods: {
    // Test Date
    async submitFormTest() {
      const d = await this.$strapi.create('testings', {
        date: this.formValues.date,
      })
      console.log(d)
    },
    log(val) {
      console.log(val)
    },
    async submitForm() {
      // const members = []
      // for (let index = 0; index < this.formValues.members.length; index++) {
      //   const formData = new FormData()
      //   formData.append(
      //     'files',
      //     this.formValues.members[index].image.files[0].file
      //   )
      //   const [image] = await this.$strapi.create('upload', formData)
      //   members.push({
      //     image: image,
      //     name: this.formValues.members[index].name,
      //   })
      // }
      // this.formValues.members = members
      // const member = await this.$strapi.create('members', {
      //   bm: this.formValues.members,
      // })
      // this.m = member
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
