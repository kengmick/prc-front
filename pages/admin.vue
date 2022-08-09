<template>
  <div>
    <section v-if="superman">
      <h1 class="text-center text-main-red">Admin</h1>
      <p>Admin page</p>
      <FormulateForm v-model="formValues" @submit="submitForm">
        <FormulateInput
          type="text"
          label="Video Id"
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
      superman: false,
    }
  },
  mounted() {
    if (this.$strapi.user) {
      if (this.$strapi.user.username === 'superman') {
        this.superman = true
      } else {
        this.$router.push('/')
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
