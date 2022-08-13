<template>
  <div v-if="show">
    <FormulateForm v-model="formValues">
      <FormulateInput
        name="title"
        label="Title of song "
        validation="required"
      />

      <button @click="submit">Submit</button>
    </FormulateForm>
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
  },
  data() {
    return {
      formValues: {},
    }
  },
  methods: {
    submit() {
      // write form logic here
      this.$emit('submit', this.formValues)
    },
  },
}
</script>

<style lang="scss" scoped></style>
