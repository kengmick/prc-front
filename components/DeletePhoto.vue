<template>
  <!-- add error message on emit function -->
  <!-- component to delete photos on any profile page with photos  -->
  <div @click="removePhotoFunction">
    <p>delete Photo</p>
  </div>
</template>

<script>
export default {
  props: {
    photoId: {
      type: Number,
      default: () => {
        return null
      },
    },
    name: {
      type: String,
      default: () => {
        return ''
      },
    },
    dataType: {
      type: String,
      default: () => {
        return ''
      },
    },
    data: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  methods: {
    // shows the popup for the @photoRemoveFunction
    removePhoto() {
      this.popUp = true
    },

    // take a data type for the db and the photo Id to be removed
    async removePhotoFunction() {
      try {
        // get all photos and filter one out and return a new array of photos
        const filt = this.data[this.name].filter((p) => {
          console.log(p.id, 'this needs to be removed', this.photoId)
          return p.id !== this.photoId
        })
        console.log(filt)
        const venue = await this.$strapi.update('venues', this.data.id, {
          photos: filt,
        })
        const v = venue
        this.$emit('removePhoto', v)
        console.log(v, 'this is the updated venue')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
