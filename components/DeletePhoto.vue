<template>
  <!-- component to delete photos on any profile page with photos  -->
  <div @click="deletePhoto">
    <p>delete component</p>
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
      dataType: {
        type: String,
        defalut: () => {
          return ''
        },
      },
    },
  },
  methods: {
    // shows the popup for the @photoRemoveFunction
    removePhoto() {
      this.popUp = true
    },
    // take a data type for the db and the photo Id to be removed
    async removePhotoFuction(photoId, dataType) {
      await this.$strapi.delete(dataType, photoId)
      this.$emit('removedBand', 'bands')
      this.popUp = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
