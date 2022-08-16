<template>
  <div v-if="show">
    <FormulateForm
      v-if="!loading"
      v-model="formValues"
      @submit="submitSongForm"
    >
      <FormulateInput
        name="title"
        label="Title of song "
        validation="required"
        wrapper-class="m-auto sm:w-4/5 "
        element-class="w-full"
        errors-class="sm:w-4/5 m-auto"
      />
      <FormulateInput
        name="track"
        type="file"
        label="upload audio file"
        wrapper-class="sm:w-4/5 m-auto"
        element-class="w-full"
        errors-class="sm:w-4/5 m-auto"
        @change="audioFile = $event.target.files[0]"
      />
      <div
        v-if="!loading"
        class="w-full bg-black p-[.9em] flex justify-center items-center text-white text-lg mt-12"
        @click="submitSongForm"
      >
        Submit
      </div>
    </FormulateForm>
    <section
      v-if="loading"
      class="h-full w-full right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <Spinner />
    </section>
    <section
      v-if="errorMessage"
      class="h-full w-full right-0 flex justify-center items-center top-0 bg-white z-50"
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
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      },
    },
    band: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValues: {},
      errorMessage: '',
      audioFile: '',
      audioFileFinal: '',
      loading: false,
    }
  },
  methods: {
    async submitSongForm() {
      this.loading = true
      console.log(this.formValues)
      try {
        const formData = new FormData()
        await formData.append('files', this.audioFile)
        const [audioFileFinal] = await this.$strapi.create('upload', formData)
        this.audioFileFinal = audioFileFinal
        this.formValues.track = audioFileFinal
        console.log(this.formValues, 'in the set hook ')
        const updatedTracks = this.band.tracks
        updatedTracks.push(this.formValues)
        console.log('update tracts ', updatedTracks)
        const updatedBand = await this.$strapi.update('bands', this.band.id, {
          tracks: updatedTracks,
        })
        this.loading = false
        this.$emit('submitSongForm', updatedBand, 'good')
      } catch (error) {
        this.loading = false
        this.errorMessage = 'Could not upload audio file ... please try again '
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
