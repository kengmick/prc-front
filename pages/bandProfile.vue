<template>
  <div>
    <div v-if="band">
      <div v-if="band.bandProfileImg">
        <!-- image here  -->
        <div class="w-full h-[40vh] z-0">
          <img
            class="object-cover h-[40vh] w-full z-0"
            :src="band.bandProfileImg.url"
            alt=""
          />
        </div>
      </div>
      <div v-else>
        <h1 class="text-2xl sm:text-4xl text-center">
          {{ band.bandName }}
        </h1>
      </div>
      <section v-if="band.bio" class="mx-auto w-full z-50">
        <div
          :class="load ? '-mt-24' : 'mt-0'"
          class="px-6 w-11/12 sm:w-3/4 xl:w-3/4 bg-black lg:px-16 py-10 mx-auto transition-all duration-500 z-50 translate-y-[-100px]"
        >
          <h2
            class="text-white text-2xl sm:text-4xl text-center sm:text-left mb-14"
          >
            {{ band.bandName }}
          </h2>
          <h2
            class="text-white text-2xl sm:text-4xl text-center sm:text-left mb-14"
          >
            History/Bio/Message
          </h2>
          <div class="pb-24">
            <p class="text-white text-base sm:text-xl">{{ band.bio }}</p>
          </div>
          <!-- <div v-if="band.logo" class="m-4 max-w-[200px]">
            <img :src="band.logo.url" alt="" />
          </div> -->
        </div>
      </section>
      <!-- details section -->
      <div
        class="flex items-center gap-10 w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mt-4"
      >
        <nuxtLink
          v-if="$strapi.user !== null && userPermission === $strapi.user.id"
          :to="{
            path: '/bandadmin',
            query: { band: band.id },
          }"
          class="btn_custom text-lg font-medium"
          >EDIT</nuxtLink
        >
      </div>
      <!-- photo section -->
      <div class="md:container mx-auto w-full sm:w-full md:w-1/2">
        <h2 v-if="band.photos">Band Photos</h2>
      </div>
      <section
        v-if="band.photos"
        class="flex flex-col sm:grid sm:grid-cols-3 sm:container sm:mx-auto w-full md:w-1/2 sm:gap-4"
      >
        <div v-for="(pic, index) in band.photos" :key="pic + index">
          <img
            class="h-[400px] w-screen object-cover"
            :src="pic.pic.url"
            alt=""
          />
        </div>
      </section>

      <section class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0">
        <!-- logo here -->

        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->
          <div class="w-full mb-6 sm:w-3/4 flex">
            <div v-if="band.genre">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Genre
              </h2>
              <p>{{ band.genre }}</p>
            </div>
            <div v-if="band.genreAlt && !band.genre" class="w-full">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Genre
              </h2>
              <p>{{ band.genreAlt }}</p>
            </div>
            <div v-if="!band.genre && !band.genreAlt">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Genre
              </h2>
              <p>No Genre</p>
            </div>
          </div>
          <!-- col two of details  -->
          <div class="w-full mb-6 sm:w-3/4 flex">
            <div class="w-full">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Location
              </h2>
              <div v-if="band.city && band.state">
                <p>{{ band.city }}, {{ band.state }}</p>
              </div>
              <div v-if="band.country && band.city">
                <p>{{ band.country }}, {{ band.city }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->

          <!-- col two of details  -->
          <div v-if="band.recordLabel" class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Record Label
              </h2>
              <p>{{ band.recordLabel }}</p>
            </div>
          </div>
        </div>

        <div
          v-if="band.members"
          class="flex flex-col sm:flex-row items-center mb-4"
        >
          <!-- col one of details  -->
          <!-- col two of details  -->
          <div class="w-full flex">
            <div class="w-full mb-6">
              <div>
                <h2
                  class="text-3xl chedder main_red_text mb-6 underline underline-offset-4 pb-2"
                >
                  Members
                </h2>
              </div>

              <div class="block">
                <div
                  v-for="(member, index) in band.members"
                  :key="index + member.id"
                  class="mr-4"
                >
                  <div v-if="member.image" class="w-full mb-6">
                    <div class="w-full flex flex-col sm:flex-row">
                      <img
                        class="object-cover pb-6 h-[120px] min-w-[100px] max-w-[100px] sm:w-[200px] sm:h-[150px] sm:max-w-[200px] pr-2"
                        :src="member.image.url"
                        alt=""
                      />
                      <div class="flex-grow flex flex-col w-full">
                        <div>
                          <p class="text-xl font-bold">{{ member.name }}</p>
                          <div v-if="member.dateStart" class="text-gray-500">
                            started
                            {{
                              moment(String(member.dateStart)).format(
                                'MMMM Do YYYY'
                              )
                            }}
                          </div>
                        </div>
                        <div v-if="member.instrument" class="pt-2">
                          <p>Playing {{ member.instrument }}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div flex flex-col sm:flex-row items-center mb-4>
          <div
            v-if="band.contact && !band.altContacts"
            class="w-full sm:w-3/4 flex"
          >
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Contacts
              </h2>
              <p>{{ band.contact }}</p>
            </div>
          </div>
          <div v-if="band.altContacts" class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Band Contact
              </h2>
              <p
                v-for="(contact, index) in band.altContacts"
                :key="contact.contact + index"
              >
                {{ contact.contact }}
              </p>
            </div>
          </div>
          <div v-if="band.dateStarted" class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Date Started
              </h2>
              <p>{{ band.dateStarted }}</p>
            </div>
          </div>
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Links
              </h2>

              <div v-if="band.links">
                <a
                  v-for="link in band.links"
                  :key="link"
                  class="underline-offset-2 underline block"
                  :href="link.link"
                  target="_blank"
                  >{{ link.link }}
                </a>
              </div>
              <h3 v-else>No Links Added ...</h3>
            </div>
          </div>
        </div>
      </section>
      <!-- shows, releases(historic information): photos, title, reacord label, date released, album, song(playable ) | merch  -->
      <!-- edit component -->

      <section class="container w-full px-4 sm:px-0 xl:w-1/2 mx-auto mt-6">
        <h2 class="text-3xl main_red_text underline underline-offset-2 pb-6">
          Showz
        </h2>
        <section v-if="user && band" class="container mx-auto">
          <div class="flex-grow flex items-center my-12 w-full cursor-pointer">
            <div
              class="border-2 border-black px-6 py-4 ml-2 w-full shadow-sm"
              @click="addEventForm"
            >
              <div class="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="red"
                  class="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
                <p class="pl-2 text-lg font-bold">Add Event</p>
              </div>
            </div>
          </div>
        </section>

        <section v-if="eventForm" class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
          <div class="w-full mt-6 mb-6">
            <h3 class="text-3xl">Add Event Details</h3>
            <FormulateForm v-model="formValues" @submit="addEvents">
              <div class="">
                <div class="w-full px-4">
                  <FormulateInput
                    name="title"
                    label="Title"
                    wrapper-class="m-auto  "
                    element-class="w-full"
                    errors-class=" m-auto"
                  />

                  <!-- <FormulateInput
                  v-if="userBands"
                  type="select"
                  name="bandName"
                  label="Pick Your Band Optional?"
                  :options="userBands"
                  wrapper-class=" m-auto"
                  element-class="w-full"
                  errors-class=" m-auto"
                /> -->
                  <FormulateInput
                    name="date"
                    type="date"
                    label="Date of event"
                    wrapper-class=" m-auto"
                    element-class="w-full"
                    errors-class="m-auto"
                  />
                  <FormulateInput
                    name="timeStarts"
                    type="time"
                    label="Time Event Begins"
                    wrapper-class=" m-auto"
                    element-class="w-full"
                    errors-class=" m-auto"
                    @change="
                      formValues.timeStarts = $event.target.value += ':00'
                    "
                  />
                  <FormulateInput
                    name="venueName"
                    type="text"
                    label="Event Venue"
                    wrapper-class=" m-auto"
                    element-class="w-full"
                    errors-class=" m-auto"
                  />
                </div>
                <div class="w-full px-4">
                  <FormulateInput
                    name="streetName"
                    type="text"
                    label="Street Name"
                    wrapper-class=" m-auto"
                    element-class="w-full"
                    errors-class=" m-auto"
                  />
                  <FormulateInput
                    name="steetAddress"
                    type="number"
                    label="Street Number"
                    wrapper-class=" m-auto"
                    element-class="w-full"
                    errors-class=" m-auto"
                  />
                  <FormulateInput
                    name="country"
                    label="Country other than the USA"
                    wrapper-class=" m-auto"
                    element-class="w-full"
                    errors-class=" m-auto"
                    @change="formValues.country = $event.target.values"
                  />
                  <FormulateInput
                    v-if="
                      !formValues.country &&
                      formValues.country !== 'United States'
                    "
                    name="state"
                    label="State"
                    wrapper-class="m-auto  "
                    element-class="w-full"
                    errors-class=" m-auto"
                  />
                  <FormulateInput
                    name="city"
                    label="City"
                    wrapper-class=" m-auto"
                    element-class="w-full"
                    errors-class=" m-auto"
                  />
                </div>
              </div>

              <section class="px-4 mt-10 sm:m-20">
                <!-- <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
                List Bands Playing
              </h2>
              <FormulateInput
                type="group"
                name="bandsPlaying"
                :repeatable="true"
                label="Band Playing"
                add-label="+ Add bands"
                wrapper-class="w-full"
                element-class="w-full"
              >
                <div>
                  <FormulateInput
                    name="BandName"
                    label="Add band name"
                    required="true"
                    wrapper-class="w-full"
                    element-class="w-full"
                  />
                </div>
              </FormulateInput> -->
                <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
                  Add Event Poster
                </h2>
                <div class="flex w-full justify-center">
                  <FormulateInput
                    type="image"
                    name="eventPoster"
                    label="Add Event Poster"
                    help="Select a png, jpg or gif to upload."
                    validation="mime:image/jpeg,image/png,image/gif"
                    input-class="w-full sm:w-96 "
                    wrapper-class="w-full sm:w-96 "
                    element-class="w-full sm:w-96 "
                    @change="eventPosterFile = $event.target.files[0]"
                  />
                </div>
                <div class="flex w-full justify-center">
                  <FormulateInput
                    name="eventDescription"
                    type="textarea"
                    label="Add a description of event"
                    input-class="w-full sm:w-96 h-72"
                    wrapper-class="w-full sm:w-96 h-72"
                    element-class="w-full sm:w-96 h-72"
                  />
                </div>
              </section>
              <!-- <div>
              <FormulateInput
                type="submit"
                label="Next"
                wrapper-class="w-full mt-10 px-4 sm:mx-10"
                grouping-class="bg-black"
                element-class="w-full"
              />
            </div> -->
              <div
                class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full"
                @click="addEvents"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#08f2a8"
                  class="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
                <h3 class="text-3xl pl-2 text-center">Create Event</h3>
              </div>

              <div
                class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full mt-6"
                @click="eventForm = false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="red"
                  class="bi bi-x-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <h3 class="text-3xl pl-2 text-center">Cancel Event</h3>
              </div>
            </FormulateForm>
          </div>
        </section>

        <!-- <div v-if="events" class="container mx-auto">
          fsdafsdafsdafdsafsadfsdfadsf
          <section v-if="events.length > 0" class="container mx-auto">
            <div
              v-for="(event, index) in events"
              :key="event.title + index"
              class="shadow-md w-full min-h-64 my-12 mx-auto flex flex-col sm:flex-row transition-all duration-200 hover:scale-105"
            >
              <div v-if="event.eventPoster" class="w-full sm:w-1/2 h-64">
                <img
                  class="h-full w-full object-cover"
                  :src="event.eventPoster.url"
                  alt=""
                />
              </div>
              <div class="p-6">
                <p class="chedder text-xl text-center inline-block sm:block">
                  {{ moment(String(event.date)).format('MMM') }}
                </p>
                <p class="chedder text-xl text-center inline-block sm:block">
                  {{ moment(String(event.date)).format('Do') }}
                </p>
              </div>
              <div class="flex flex-col flex-grow p-6">
                <div>
                  <p v-if="event.title" class="chedder text-2xl">
                    {{ event.title }}
                  </p>
                  <p v-if="event.headlinerOne" class="text-xl font-black pb-2">
                    Featuring {{ event.headlinerOne }}
                  </p>
                  <p
                    v-if="event.streetAddress && event.streetName"
                    class="text-xl"
                  >
                    The Vic, {{ event.streetAddress }} {{ event.streetName }} /
                    {{ moment(String(event.date)).format('LT') }} -
                    {{ moment(event.timeEnds, 'h').format('LT') }}
                  </p>
                  <p v-if="event.city && event.state" class="text-xl">
                    {{ event.city }}, {{ event.state }}
                  </p>
                </div>
                <div class="flex-grow flex items-center mt-6 sm:mt-2">
                  <NuxtLink
                    :to="{
                      path: 'eventview',
                      query: { event: event.id },
                    }"
                    class="border-2 border-black px-4 py-2"
                    >View Event</NuxtLink
                  >
                </div>
              </div>
            </div>
          </section>
          <section v-else class="container mx-auto">
            <h3>No Showz Added</h3>
          </section>
        </div> -->
        <!-- <div v-if="band.events" class="mb-6">
          <div v-if="band.events.length > 0">
            <section class="mx-auto">
              <div
                v-for="(event, index) in band.events"
                :key="event.title + index"
                class="w-full h-full mx-auto flex flex-col ms:h-64 sm:mx-auto sm:flex-row transition-all duration-200 hover:scale-105"
              >
                <NuxtLink
                  :to="{ path: 'eventview', query: { event: event.id } }"
                >
                  <div v-if="event.eventPoster" class="w-full h-44 sm:h-64">
                    <img
                      class="h-full w-full"
                      :src="event.eventPoster.url"
                      alt=""
                    />
                  </div>
                </NuxtLink>

                <div class="flex flex-col flex-grow py-4 px-6 sm:p-6 bg-black">
                  <NuxtLink
                    :to="{ path: 'eventview', query: { event: event.id } }"
                  >
                    <div class="text-white">
                      <p v-if="event.title" class="chedder text-xl">
                        {{ event.title }}
                        {{ moment(String(event.date)).format('MMM') }}
                        {{ moment(String(event.date)).format('Do') }}
                      </p>
                      <p>
                        {{ moment(String(event.date)).format('LT') }} -
                        {{ moment(event.timeEnds, 'h').format('LT') }}
                      </p>
                      <p
                        v-if="event.headlinerOne"
                        class="text-lg font-black pb-2"
                      >
                        Featuring {{ event.headlinerOne }}
                      </p>
                      <p
                        v-if="event.streetAddress && event.streetName"
                        class="text-lg"
                      >
                        The Vic, {{ event.streetAddress }}
                        {{ event.streetName }}
                      </p>
                      <p v-if="event.city && event.state" class="text-lg">
                        {{ event.city }}, {{ event.state }}
                      </p>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div v-else class="my-6"><h3>No Upcoming Showz</h3></div> -->

        <section v-if="events" class="container mx-auto">
          <div
            v-for="(event, index) in events"
            :key="event.title + index"
            class="shadow-md w-full h-64 my-12 mx-auto flex transition-all duration-200 hover:scale-105"
          >
            <div v-if="event.eventPoster" class="w-1/3 h-64">
              <img
                class="h-full w-full object-cover"
                :src="event.eventPoster.url"
                alt=""
              />
            </div>
            <div class="p-6">
              <p class="chedder text-xl text-center">
                {{ moment(String(event.date)).format('MMM') }}
              </p>
              <p class="chedder text-xl text-center">
                {{ moment(String(event.date)).format('Do') }}
              </p>
            </div>
            <div class="flex flex-col flex-grow p-6">
              <div>
                <p v-if="event.title" class="chedder text-2xl">
                  {{ event.title }}
                </p>
                <p v-if="event.headlinerOne" class="text-xl font-black pb-2">
                  Featuring {{ event.headlinerOne }}
                </p>
                <p
                  v-if="event.streetAddress && event.streetName"
                  class="text-xl"
                >
                  The Vic, {{ event.streetAddress }} {{ event.streetName }} /
                  {{ moment(String(event.date)).format('LT') }} -
                  {{ moment(event.timeEnds, 'h').format('LT') }}
                </p>
                <p v-if="event.city && event.state" class="text-xl">
                  {{ event.city }}, {{ event.state }}
                </p>
              </div>
              <div class="flex-grow flex items-center">
                <NuxtLink
                  :to="{
                    path: 'eventview',
                    query: { event: event.id },
                  }"
                  class="border-2 border-black px-6 py-4"
                  ><div class="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                      />
                      <path
                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                      />
                    </svg>
                    <p class="pl-2">View Event</p>
                  </div></NuxtLink
                >
                <NuxtLink
                  v-if="user"
                  :to="{
                    path: 'eventedit',
                    query: { event: event.id },
                  }"
                  class="border-2 border-black px-6 py-4 ml-2"
                  ><div class="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                      />
                    </svg>
                    <p class="pl-2">Edit Event</p>
                  </div></NuxtLink
                >
              </div>
            </div>
          </div>
        </section>

        <!-- <section v-if="band.oldShows" class="container mx-auto">
          <h2>Historic Shows</h2>
          <div v-for="(show, index) in band.oldShows" :key="show + index">
            <p>
              {{ show.date }} {{ show.title }}, @{{ show.venueName }},{{
                show.city
              }},{{ show.state }}
            </p>
          </div>
        </section> -->
        <!-- shows, releases(historic information): photos, title, reacord label, date released, album, song(playable ) | merch  -->
        <section>
          <h2
            class="text-3xl chedder main_red_text chedder underline underline-offset-4 pb-2"
          >
            Releases
          </h2>
          <div v-if="band.releases">
            <section v-if="band.releases.length > 0" class="mb-6">
              <div class="flex flex-col sm:grid-cols-3 sm:grid">
                <div
                  v-for="(r, index) in band.releases"
                  :key="r + index"
                  class="max-w-[350px] hover:scale-110 duration-200 transition-all ease-linear"
                >
                  <a :href="r.link" target="_blank">
                    <div
                      v-if="r.title"
                      class="py-4 px-2 border-2 border-black bg-black"
                    >
                      <h3 class="text-white">{{ r.title }}</h3>
                    </div>
                    <div v-if="r.image">
                      <img :src="r.image.url" alt="" />
                    </div>
                    <div class="p-2 bg-black text-white">
                      <div v-if="r.date">
                        <h3>{{ r.date }}</h3>
                      </div>
                      <div v-if="r.link">
                        <h3>
                          <a :href="r.link" target="_blank">{{ r.link }}</a>
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>
          <h3 v-else>No Releases</h3>
        </section>
        <section v-if="band.album === 'hello'">
          <h2 class="text-3xl main_red_text mb-4">Albums</h2>
          <!-- <SliderContainer v-if="band.album" id="main-container" class="py-10">
            <AlbumCard
              v-for="(album, index) in band.album"
              :key="index"
              :album="album"
              :band="band.id"
              :class="band.album.length <= 1 ? 'w-screen' : ''"
            />
          </SliderContainer> -->
          <!-- album -->
          <!-- <pre>{{ band.album }}</pre> -->
          <!-- add picture, title, dateReleased -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <tr>
                <th v-if="band.album[0].albumCover" class="text-left chedder">
                  Image
                </th>
                <th class="text-left chedder">Title</th>
                <th class="text-left chedder">Release Date</th>
                <th class="text-left chedder">Link</th>
              </tr>
              <tr
                v-for="(album, index) in band.album"
                :key="album.title + index"
              >
                <td v-if="album.albumCover">
                  <img
                    v-if="album.albumCover"
                    class="w-[100px] h-[66px] object-cover"
                    :src="album.albumCover.formats.thumbnail.url"
                    alt=""
                  />
                  <div
                    v-else
                    class="w-[100px] h-[66px] bg-black flex items-center justify-center"
                  >
                    <img src="~/static/imageIcon.svg" alt="" />
                  </div>
                </td>
                <td v-if="album.title">{{ album.title }}</td>
                <td v-if="album.dateReleased">{{ album.dateReleased }}</td>
                <td v-else>No Date</td>
                <td v-if="album.link"><a :href="album.link">View Song</a></td>
                <td v-else>No Link</td>
              </tr>
            </table>
          </div>
        </section>
        <div v-if="band.merch" class="mb-6">
          <h2
            v-if="band.merch.length > 0"
            class="text-3xl chedder main_red_text my-4 chedder"
          >
            Merch
          </h2>
        </div>
        <!-- merch goes here  -->
        <div v-if="band.merch">
          <section v-if="band.merch.length > 0">
            <div class="flex flex-col gap-4 sm:grid-cols-3 sm:grid sm:gap-4">
              <div
                v-for="(m, index) in band.merch"
                :key="m + index"
                class="w-full sm:w-[300px] hover:scale-110 transition-all ease-linear duration-200"
              >
                <a :href="`${m.productLink}`" target="_blank">
                  <div v-if="m.productImage">
                    <div
                      v-if="m.productName"
                      class="py-4 px-2 border-2 border-black bg-black"
                    >
                      <h3 class="text-white">{{ m.productName }}</h3>
                    </div>
                    <div class="flex justify-center items-center">
                      <img
                        class="object-cover h-[300px]"
                        :src="m.productImage.url"
                        alt=""
                      />
                    </div>
                    <div class="p-2 bg-black text-white">
                      <div v-if="m.productLink">
                        <h3>
                          <a :href="m.productLink" target="_blank">{{
                            m.productLink
                          }}</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <!-- <table class="w-full">
                <tr>
                  <th
                    v-if="band.merch[0].productImage"
                    class="text-left chedder"
                  >
                    Image
                  </th>
                  <th class="text-left chedder">Description</th>
                  <th class="text-left chedder">Link</th>
                </tr>
                <tr v-for="(m, index) in band.merch" :key="m.title + index">
                  <td v-if="m.productImage">
                    <img
                      v-if="m.productImage"
                      class="w-[100px] h-[66px] object-cover"
                      :src="m.productImage.url"
                      alt=""
                    />
                    <div
                      v-else
                      class="w-[100px] h-[66px] bg-black flex items-center justify-center"
                    >
                      <img src="~/static/imageIcon.svg" alt="" />
                    </div>
                  </td>
                  <td v-if="m.productName">{{ m.productName }}</td>
                  <td v-else>No Description</td>
                  <td v-if="m.productLink">
                    <a :href="m.productLink">View Merch</a>
                  </td>
                  <td v-else>No Link</td>
                </tr>
              </table> -->
            </div>
          </section>
        </div>
        <h2
          class="text-3xl chedder main_red_text chedder underline underline-offset-4 pb-2 mt-6"
        >
          Songs
        </h2>
        <!-- songs -->

        <div v-if="band.singles">
          <section v-if="band.singles.length > 0">
            <div class="overflow-x-auto">
              <table class="w-full">
                <tr>
                  <th class="text-left chedder">Title</th>
                  <th class="text-left chedder">Release Date</th>
                  <th class="text-left chedder">Link</th>
                </tr>
                <tr
                  v-for="(song, index) in band.singles"
                  :key="song.songTitle + index"
                >
                  <td v-if="song.songTitle">
                    <a :href="song.link" target="_blank" class="underline">{{
                      song.songTitle
                    }}</a>
                  </td>
                  <td v-else>No Title</td>
                  <td v-if="song.date">{{ song.date }}</td>
                  <td v-else>No Release Date</td>
                  <td v-if="song.link">
                    <a :href="song.link" target="_blank">View Song</a>
                  </td>
                  <td v-else>No Link</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
        <div v-else class="my-4"><h3>No Songs Uploaded</h3></div>
      </section>
      <!-- posts  -->
      <section class="container mx-auto">
        <h2>Posts</h2>
        <section class="mt-10 sm:mb-10">
          <!-- profileImg.url username, image -->
          <div v-for="(post, index) in posts" :key="index">
            <div
              v-if="post.users_permissions_user"
              class="mb-6 flex justify-center"
            >
              <div
                v-if="post.users_permissions_user.profileImg"
                class="flex rounded-full w-20 h-20"
              >
                <img
                  class="max-w-[200px] object-cover h-12 w-12 sm:w-20 sm:h-20 rounded-full"
                  :src="post.users_permissions_user.profileImg.url"
                  alt=""
                />
              </div>
              <div class="w-full sm:1/2 ml-10">
                <h3>
                  {{ post.users_permissions_user.username }}
                  <span>{{ post.created_at }}</span>
                </h3>
                <p class="speech-bubble text-white p-2">
                  {{ post.data }}
                  <span v-if="post.image"
                    ><img
                      class="max-w-[200px] max-h-[200px]"
                      :src="post.image.url"
                      alt=""
                  /></span>
                </p>
              </div>
            </div>
          </div>
          <!-- add post bod  -->
          <div class="w-full mx-auto">
            <p class="text-red-500">{{ postError }}</p>
            <div class="w-full flex justify-center items-center sm:px-0">
              <textarea
                class="w-full sm:w-3/4 p-4 border-[1px] border-gray-400 mx-auto focus-visible:border-black post_input"
                placeholder="type something here to share ..."
                @change="postValue = $event.target.value"
              >
              </textarea>
            </div>
            <div
              class="border-[1px] border-gray-400 w-full sm:w-3/4 mx-auto flex"
            >
              <div
                class="flex items-center justify-center p-6 border-r-[.5px] border-black cursor-pointer"
                @click="sendPost(postValue)"
              >
                <h3><span class="pr-2">💬</span> Send</h3>
              </div>
              <div
                class="flex items-center justify-center p-6 border-[.5px] border-black cursor-pointer"
                @click="popupToggle"
              >
                <img
                  class="h-4 inline pr-2"
                  src="~/static/imageIcon.svg"
                  alt=""
                />
                <h3>Add Image</h3>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
    <!-- pop up upload image to post  ======= -->
    <section
      v-if="popup"
      class="h-screen w-screen bg-black bg-opacity-10 fixed top-0 flex items-center justify-center"
    >
      <!-- upload form  -->
      <div
        class="w-1/4 h-2/5 bg-gray-100 shadow-sm flex justify-center items-center relative"
      >
        <!-- form goes here -->
        <FormulateInput
          type="image"
          label="Select an image to upload"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png,image/gif"
          input-class="w-full sm:w-96 "
          wrapper-class="w-full sm:w-96 "
          element-class="w-full sm:w-96 "
          @change="postImage = $event.target.files[0]"
        />
        <!-- close icon -->
        <div class="absolute top-3 right-3" @click="popupToggle">
          <img class="h-6 w-6" src="~/static/close_black.svg" alt="" />
        </div>
      </div>
    </section>
    <!-- end of popup form for image post  -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      // band and events
      band: null,
      events: [],
      bandEvents: [],
      // loading data
      load: false,
      hide: false,
      // userpermission helper
      userPermission: null,
      user: null,
      videos: [],
      formValues: {},
      // event data
      eventPosterFile: '',
      eventForm: false,
      formValuesEvent: {},
      // post data
      posts: [],
      popup: false,
      post: '',
      postValue: false,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
    }
  },
  async mounted() {
    // get bands

    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      this.band = band
      this.user = band.id
      // not sure what this is doinig
      this.userPermission = band.users_permissions_user.id
      // const id = [...this.band.events]
      // const ids = await id.map((e) => {
      //   return ['id', e.id]
      // })

      this.events = this.band.events
    } catch (error) {
      console.log(error, 'there was an error ')
    }
    // get events

    const posts = await this.$strapi.find('posts', {
      bands: this.band.id,
    })
    this.posts = posts
  },
  methods: {
    moment,
    // add events
    async addEvents(val) {
      if (this.eventPosterFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.eventPosterFile)
          // upload to strapi here
          const [eventPosterFinal] = await this.$strapi.create(
            'upload',
            formData
          )
          this.eventPosterFinal = eventPosterFinal
          this.formValues.eventPoster = eventPosterFinal

          const event = await this.$strapi.create('events', {
            users_permissions_user: this.$strapi.user.id,
            ...this.formValues,
          })
          await this.events.push(event)
          await this.$strapi.update('bands', this.band.id, {
            events: [...this.band.events, event],
          })
          this.eventForm = false
        } catch (error) {
          this.message = 'Sorry we could not create the event'
          console.log('uploading image ', error)
        }
      } else {
        try {
          const event = await this.$strapi.create('events', {
            users_permissions_user: this.$strapi.user.id,
            ...this.formValues,
          })
          await this.$strapi.update('bands', this.band.id, {
            events: [...this.band.events, event],
          })
          await this.events.push(event)
          this.eventForm = false
        } catch (error) {
          console.log('adding event ', error)
        }
      }
    },
    addEventForm: function () {
      this.eventForm = true
    },
    setVal: function (val) {
      console.log(val, 'val')
      this.postValue = val
    },
    popupToggle() {
      this.popup = !this.popup
    },

    async sendPost(val) {
      try {
        if (this.postValue && !this.postImage) {
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            bands: this.band.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            bands: this.band.id,
          })
          // clears the post value box
          this.postValue = ''
          this.posts = posts
        }
        // will try to create post with an image uploadd
        if (this.postValue && this.postImage) {
          // check to see if user is logged in
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // image upload
          const formData = new FormData()
          await formData.append('files', this.postImage)
          const [img] = await this.$strapi.create('upload', formData)
          this.finalPostImage = img

          await this.$strapi.create('posts', {
            // tells where to assign the post
            bands: this.band.id,
            // sets the post message
            data: this.postValue,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          this.postValue = ''
          const posts = await this.$strapi.find('posts', {
            bands: this.band.id,
          })

          this.posts = posts
        }
      } catch (error) {
        this.postError = 'you must be logged in to comment '
        console.log('error saving post ', error)
      }
    },
  },
}
</script>

<style land="scss" scoped>
.btn_custom {
  padding: 0.5em 1.5em;
  border: 2px solid black;
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
}
.custom_border {
  border: 0.5px solid rgba(128, 128, 128, 0.814);
  border-radius: 10%;
  padding: 1em;
}
.background_custom {
  background-position: center center;
  background-size: fill;
  background-repeat: no-repeat;
}
.text-background {
  background: url('~/static/live_background.png');
  background-clip: text;
  color: transparent;
}

.speech-bubble {
  position: relative;
  background: #000;
  border-radius: 0.4em;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  width: 0;
  height: 0;
  border: 21px solid transparent;
  border-right-color: #000;
  border-left: 0;
  border-top: 0;
  margin-top: -10.5px;
  margin-left: -21px;
}
textarea {
  resize: none;
}
textarea:focus-visible {
  outline-color: rgba(128, 128, 128, 0.797);
}

.post_input {
  outline: none;
}
</style>
