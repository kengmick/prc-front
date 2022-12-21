<template>
  <div>
    <h2 class="text-center">Create Performer</h2>
    <section class="container mx-auto w-11/12 md:w-3/4 my-6">
      <FormulateForm v-model="formValues" @submit="submitForm">
        <FormulateInput
          name="name"
          label="Name"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
        />
        <FormulateInput
          name="dateStart"
          label="date started"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
          type="date"
        />
        <FormulateInput
          name="dateEnd"
          label="date ended"
          wrapper-class="mx-auto w-full "
          element-class="w-full"
          errors-class="w-full mx-auto"
          type="date"
        />
        <div
          v-for="(instrument, index) in instruments"
          :key="index"
          class="sm:w-4/5 m-auto my-4"
        >
          <div class="my-6">
            <label for="link" class="label">Instrument Played</label>
            <input
              v-model="instruments[index].name"
              class="formElement"
              name="name"
              placeholder="Name of instrument"
            />
          </div>
          <div
            @click="addInstrument"
            class="px-4 py-2 bg-black text-white my-4 sm:w-4/5 m-auto"
          >
            + Add another instrument
          </div>
          <div
            v-if="index >= 1 && instrument[index]"
            @click="removeInstrument(index)"
            class="px-4 py-2 bg-black text-red-600 my-4 w-full m-auto"
          >
            - Remove Instrument
          </div>
        </div>
        <div class="flex flex-col w-full justify-center items-center">
          <h2 class="text-center mb-10 mt-4">Add performer photo</h2>
          <FormulateInput
            type="image"
            name="image"
            label="Select an image to upload"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png,image/gif,image/webp"
            input-class="w-full sm:w-96 "
            wrapper-class="w-full sm:w-96 "
            element-class="w-full sm:w-96 "
            @change="image = $event.target.files[0]"
          />
        </div>

        <FormulateInput
          type="submit"
          label="Create"
          wrapper-class="w-full mt-10 px-4 sm:mx-10"
          grouping-class="bg-black"
          element-class="w-full"
        />
      </FormulateForm>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValues: {},
      band: '',
      image: '',
      instruments: [{ name: '' }],
    }
  },
  mounted() {
    this.band = this.$strapi.findOne('bands', this.$route.query.band)
    console.log(this.$route.query.band)
  },
  methods: {
    async submitForm() {
      this.formValues.instruments = this.instruments
      try {
        const formData = new FormData()
        await formData.append('files', this.image)
        const [image] = await this.$strapi.create('upload', formData)
        this.image = image
        this.formValues.image = image
        console.log(image)
      } catch (error) {
        console.log(error)
        this.errorMessage =
          'Sorry we could not upload your profile image ... please try again '
        this.loading = false
      }
      console.log(this.formValues, 'this is whait is getting updated')
      try {
        const updated = await this.$strapi.update(
          'bands',
          this.$route.query.band,
          {
            members: [this.formValues],
          }
        )

        if (updated) {
          this.$router.push({
            path: '/bands/bandprofile',
            query: { band: 81 },
          })
        }
      } catch (error) {
        console.log(error, 'there is an error with the update')
      }
    },

    addInstrument() {
      this.instruments.push({ name: '' })
    },
    removeInstrument(index) {
      this.instruments.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped></style>
