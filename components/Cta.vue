<template>
  <div class="bg-black flex lg:min-h-[700px]">
    <!-- component -->
    <script
      src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
      defer
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>

    <style>
      @import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css');
    </style>

    <!-- <div class="flex items-center justify-center px-5 py-5 w-4/5 mx-auto">
      <div class="bg-white text-gray-500 shadow-xl w-full overflow-hidden">
        <div class="md:flex w-full">
          <div>
            <img class="h-full object-cover" src="~/static/pit.jpg" alt="" />
            <h1>Test</h1>
            <h1>Test</h1>
          </div>
        </div>
      </div>
    </div> -->
    <div class="w-full sm:w-1/2 py-10 px-5 lg:px-[10em] md:px-10 bg-white">
      <div class="text-center mb-10">
        <h1 class="font-bold text-3xl text-gray-900 chedder">Sign Up</h1>
      </div>
      <div>
        <div class="flex -mx-3">
          <div class="w-full px-3 mb-5">
            <label for="" class="text-xs font-semibold px-1">Username</label>
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              >
                <i class="mdi mdi-account-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="text"
                name="username"
                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="crazyhorse"
                @change="username = $event.target.value"
              />
            </div>
          </div>
        </div>
        <div class="flex -mx-3">
          <div class="w-full px-3 mb-5">
            <label for="" class="text-xs font-semibold px-1">Email</label>
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              >
                <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="email"
                name="email"
                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="johnsmith@example.com"
                @change="email = $event.target.value"
              />
            </div>
          </div>
        </div>
        <div class="flex -mx-3">
          <div class="w-full px-3 mb-12">
            <label for="" class="text-xs font-semibold px-1">Password</label>
            <div class="flex">
              <div
                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
              >
                <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="password"
                name="password"
                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder="************"
                @change="password = $event.target.value"
              />
            </div>
          </div>
        </div>
        <div class="flex -mx-3">
          <div class="w-full px-3 mb-5">
            <button
              class="block w-full max-w-xs mx-auto main_red_background hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
              @click="submitForm"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- grid of pictures -->
    <div class="hidden sm:grid grid-cols-3 gap-2 w-1/2 bg-white">
      <img class="h-full object-cover" src="~/static/image_a.jpeg" alt="" />
      <img class="h-full object-cover" src="~/static/image_b.jpeg" alt="" />
      <img class="h-full object-cover" src="~/static/image_c.jpeg" alt="" />
      <img class="h-full object-cover" src="~/static/image_e.jpeg" alt="" />
      <img class="h-full object-cover" src="~/static/imagef.jpeg" alt="" />
      <img class="h-full object-cover" src="~/static/pit.jpg" alt="" />
    </div>

    <!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      errormessage: '',
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async submitForm() {
      try {
        // creates user and setting tier to the number 2 .... full access
        const user = await this.$strapi.register({
          email: this.email,
          username: this.username,
          password: this.password,
          acc: 1,
        })
        if (user) {
          this.$router.push({ path: 'profile', query: { user: user.id } })
        }
      } catch (error) {
        console.log(error)
        this.errorMessage = error
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
