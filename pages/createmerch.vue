<template>
  <div>
    <h2>Create Merch</h2>
    <section class="container mx-auto">
      <h2>Pick Your Band</h2>
      <ul v-if="bands.length > 0 && band == null">
        <li v-for="band in bands" :key="band.id" class="underline chedder">
          <div @click="selectband(band.id, band)">
            {{ band.bandName }}
          </div>
          <hr />
        </li>
      </ul>
    </section>
    <section v-if="band !== null" class="container mx-auto px-2 my-4">
      <FormulateForm v-model="formValues" @submit="submitForm">
        <FormulateInput
          name="productName"
          label="Product Name"
          wrapper-class="m-auto sm:w-4/5 "
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput
          name="description"
          type="textarea"
          label="description"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <FormulateInput
          name="productLink"
          type="text"
          label="link to merch"
          wrapper-class="sm:w-4/5 m-auto"
          element-class="w-full"
          errors-class="sm:w-4/5 m-auto"
        />
        <h3 class="text-center">Add Image</h3>
        <div class="flex w-full justify-center">
          <FormulateInput
            type="image"
            name="productImage"
            label="Add merch image"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png,image/gif"
            input-class="w-full sm:w-96 "
            wrapper-class="w-full sm:w-96 "
            element-class="w-full sm:w-96 "
            @change="productImageFile = $event.target.files[0]"
          />
        </div>
        <div @click="back" class="btn_custom">Back</div>
        <FormulateInput
          type="submit"
          label="Create"
          wrapper-class="w-full mt-10 px-4 sm:mx-10"
          grouping-class="bg-black"
          element-class="w-full"
        />
      </FormulateForm>
    </section>
    <div v-if="errorMessage">
      <pre>{{ errorMessage }}</pre>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      formValues: {},
      errorMessage: '',
      classified: {},
      merch: '',
      band: null,
      bands: [],
      created: false,
      productImageFile: '',
      productImageFinal: '',
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
  },
  methods: {
    moment,
    selectband: function (id, band) {
      this.band = band
      this.merch = band.merch
    },
    back: function () {
      this.band = null
    },
    async submitForm() {
      try {
        const formData = new FormData()
        await formData.append('files', this.productImageFile)
        const [productImageFinal] = await this.$strapi.create(
          'upload',
          formData
        )
        this.productImageFinal = productImageFinal
        this.formValues.productImage = productImageFinal
      } catch (error) {
        console.log(error)
      }
      try {
        const merch = await this.$strapi.update('bands', this.band.id, {
          merch: [{ ...this.merch, ...this.formValues }],
        })
        if (merch) {
          this.created = true
          this.merch = merch
        }
        console.log('created')
      } catch (error) {
        console.log('there was an error ')
        this.errorMessage = { error }
      }
      // after creation take user to band admin
      if (this.created) {
        this.$router.push({
          path: '/merchview',
          query: { merch: this.merch.id, band: this.band.id },
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
  appearance: none;
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
  margin-top: 2em;
}
</style>
