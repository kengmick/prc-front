<template>
  <div>
    <!-- messages created by user put on the right  -->
    <div
      v-if="messageData.users_permissions_user === $strapi.user.id"
      class="flex justify-end"
    >
      <div>
        <div class="flex items-center pb-1">
          <p class="chedder mr-2">{{ $strapi.user.username }} fdsfdsf here</p>
          <p class="text-gray-500">
            {{ moment(String(messageData.published_at)).format('h:mm a') }}
          </p>
        </div>
        <p class="message-to bg-blue-300 p-6 mb-4 rounded-l-lg rounded-tr-lg">
          {{ messageData.text }}
        </p>
      </div>
    </div>
    <!-- put on the left  -->
    <div v-else>
      <div class="flex">
        <div>
          <div class="flex items-center pb-1">
            <img
              :src="fromAvatar"
              alt=""
              class="h-[30px] w-[30px] rounded-full mr-4"
            />
            <p class="chedder mr-2">{{ username }}</p>
            <p class="text-gray-500">
              {{ moment(String(messageData.published_at)).format('h:mm a') }}
            </p>
          </div>
          <p class="bg-[#f5f5f5] p-6 mb-4 rounded-r-lg rounded-tl-lg">
            {{ messageData.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    username: {
      type: String,
      default: '',
    },
    userId: {
      type: Number,
      default: 0,
    },
    message: {
      type: String,
      default: '',
    },
    messageData: {
      type: Object || Array,
      default: {} || [],
    },
    fromAvatar: {
      type: String,
      default: '',
    },
    userImage: {
      type: String,
      default: '',
    },
  },
  methods: {
    moment,
  },
}
</script>

<style scoped>
.speech-bubble {
  position: relative;
  background: #000;
  border-radius: 0.4em;
}
</style>
