<template>
  <div class="container mx-auto flex justify-center flex-col px-2 py-2">
    <h1>Free Membership and become a Guest</h1>
    <section>
      <FormulateForm :values="formValues">
        <FormulateInput type="text" name="name" label="Your name" />
        <FormulateInput type="email" name="email" label="Your email" />
        <FormulateInput type="submit" label="Save account" />
      </FormulateForm>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
