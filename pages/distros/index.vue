<template>
  <div class="container mx-auto">
    <h1 class="text-center text-3xl main_red_text mt-10">Distros/Labels</h1>
    <section class="px-4">
      <Search index="record-labels" />
    </section>
    <section
      v-if="distros"
      class="mx-6 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10"
    >
      <CardsDistroCard
        v-for="distro in distros"
        :key="distro.name"
        :distro="distro"
      />
    </section>
    <div v-else>{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distros: [],
      errorMessage: '',
    }
  },
  async mounted() {
    try {
      const distros = await this.$strapi.find('record-labels')
      this.distros = distros
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },
}
</script>
