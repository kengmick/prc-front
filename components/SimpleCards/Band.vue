<template>
  <div
    v-if="band"
    class="w-full h-full bg-slate-100 shadow-md rounded-b-md relative"
  >
    <NuxtLink
      :event="disabled ? '' : 'click'"
      :to="{ path: '/bands/bandprofile', query: { band: band.id } }"
    >
      <div
        v-if="band.bandProfileImg"
        class="h-[180px] md:h-[240px] w-full bg-black"
      >
        <NuxtImg
          class="object-cover h-[180px] w-full md:h-[240px]"
          :src="band.bandProfileImg.url"
          alt=""
        />
      </div>
    </NuxtLink>
    <NuxtLink
      :event="disabled ? '' : 'click'"
      :to="{ path: '/bands/bandprofile', query: { band: band.id } }"
    >
      <div>
        <p class="text-lg chedder p-2">{{ band.bandName }}</p>
      </div>
    </NuxtLink>
    <div class="p-2">
      <p class="lato text-sm">{{ band.city }}, {{ band.state }}</p>
      <span class="flex">
        <p class="lato text-sm grow">
          {{ moment(String(band.dateStarted)).format('MMMM Do YYYY') }}
        </p>
        <div v-if="canRemoveFeatured">
          <p class="cursor-pointer" @click="$emit('removeFeatured', band.id)">
            Remove Featured
          </p>
        </div>
        <div v-if="removeFav">
          <p class="cursor-pointer" @click="$emit('removeFavorite')">
            Unfavorite
          </p>
        </div>
        <div
          v-if="canDelete"
          class="mr-2 cursor-pointer"
          @click="$emit('removeBand', band.id, band.bandName)"
        >
          Delete
        </div>
        <NuxtLink :to="{ path: '/bands/edit', query: { band: band.id } }">
          <div v-if="canDelete" class="cursor-pointer">Edit</div>
        </NuxtLink>
      </span>
    </div>

    <section
      v-if="addingCard"
      class="flex justify-between items-center absolute w-full left-0 bottom-4 gap-4 px-2"
    >
      <div
        class="bg-black text-white flex justify-center items-center text-[14px] chedder mt-[4px] py-2 cursor-pointer grow w-full"
        @click="$emit('selectUsersCard', band)"
      >
        <span>Add to this Card !!!</span>
      </div>
      <NuxtLink
        class="bg-black text-white flex justify-center items-center text-[14px] chedder mt-[4px] py-2 cursor-pointer grow w-full"
        :to="{ path: '/bands/bandprofile', query: { band: band.id } }"
      >
        <span>View Profile</span>
      </NuxtLink>
    </section>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    band: {
      type: Object,
      default: () => {
        return null
      },
    },
    addingCard: {
      type: Boolean,
      default() {
        return false
      },
    },
    canDelete: {
      type: Boolean,
      default() {
        return false
      },
    },
    removeFav: {
      type: Boolean,
      default() {
        return false
      },
    },
    canRemoveFeatured: {
      type: Boolean,
      default() {
        return false
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  methods: {
    moment,
  },
}
</script>
