<template>
  <div class="w-screen h-screen bg-white fixed top-0 right-0 overflow-scroll">
    <div
      class="fixed top-0 h-[80px] w-full flex items-center px-4 border-b-[1px] bg-white z-50"
    >
      <div class="bg-gray-200 rounded-sm" @click="close">
        <img src="~/static/left.svg" class="h-[20px] w-[20px]" alt="" />
      </div>
    </div>

    <div v-if="users" class="pt-[100px] px-4">
      <div
        v-for="user in users"
        :key="user.users_permissions_user"
        class="flex items-center min-h-[55px] pb-5"
        @click="startChat(user)"
      >
        <span v-if="user.profileImg">
          <img
            class="rounded-full h-[55px] w-[55px] mr-4"
            :src="user.profileImg.url"
          />
        </span>
        <div class="w-full">
          <p class="chedder">{{ user.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: null,
    }
  },
  async fetch() {
    try {
      this.users = await this.$strapi.find('users')
    } catch (error) {
      console.log(error)
    }
  },

  mounted() {},

  methods: {
    close() {
      this.$emit('closeCreateChat')
    },
    startChat(user) {
      console.log('this is the start chat in create Chat ', user)
      this.$emit('startChat', user)
    },
  },
}
</script>
