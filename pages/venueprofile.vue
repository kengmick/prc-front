<template>
  <!-- get gallery working  -->
  <div>
    <section
      v-if="venue"
      class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0"
    >
      <div
        v-if="venue.logo"
        class="flex flex-col sm:flex-row items-center mb-4"
      >
        <img class="h-16 pr-6" :src="venue.logo.url" alt="" />
        <h1 class="main_red_text chedder">{{ venue.name }}</h1>
      </div>
      <div v-else>
        <h1 class="main_red_text chedder text-center">{{ venue.name }}</h1>
      </div>
      <div v-if="venue.venueImg" class="max-h-[500px]">
        <img
          class="h-[500px] w-full object-cover"
          :src="venue.venueImg.url"
          alt=""
        />
      </div>

      <div
        v-if="permission"
        class="flex items-center justify-center p-[.8em] w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mt-4 bg-black"
      >
        <NuxtLink
          :to="{
            path: 'venueedit',
            query: { venue: venue.id },
          }"
          class="border-2 border-black px-6 ml-2 w-full"
          ><div class="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
            <p class="pl-2 text-white font-bold">Edit Venue</p>
          </div></NuxtLink
        >
      </div>
      <div>
        <h2>Announcements</h2>
      </div>
      <section v-if="venue.announcements">
        <Announcement
          v-if="venue.announcements.length > 0"
          profileType="venue"
          :profileName="venue.name"
          :profileId="venue.id"
          :announcements="venue.announcements"
        />
      </section>
      <section class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0">
        <div
          v-if="permission"
          class="flex-grow flex items-center my-12 w-full cursor-pointer bg-black"
        >
          <div
            class="border-2 border-black px-6 p-[.8em] ml-2 w-full shadow-sm"
            @click="addAnnouncements"
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
              <p class="pl-2 text-lg font-bold text-white">
                Create Announcement
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- gallery  -->
      <!-- media Gallery -->
      <section v-if="venue.photos">
        <h3 class="my-6 text-3xl">Pictures</h3>
        <section
          v-if="venue.photos.length > 0"
          class="mx-2 flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-10"
        >
          <div v-for="(img, index) in venue.photos" :key="img.pic.url + index">
            <img
              class="h-[350px] object-cover w-full"
              :src="img.pic.url"
              alt=""
            />
          </div>
        </section>
      </section>
    </section>
    <section class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0">
      <!-- bio -->
      <h2 class="mt-4 text-3xl">History/Bio/Message</h2>
      <div
        v-if="venue.description && venue.description.split('\n')"
        class="mt-6"
      >
        <p
          v-for="(description, index) in venue.description.split('\n')"
          :key="description + index"
          class="mt-4 ext-lg px-2 md:text-2xl"
        >
          {{ description }}
        </p>
      </div>
      <p v-else class="text-lg px-2 md:text-2xl">{{ venue.description }}</p>
      <!-- date started , genre(if applicable ) location streetNumber zip streetName contact -->
      <h3 class="text-3xl my-4">Location</h3>
      <p v-if="venue.streetAddress && venue.city && venue.state">
        {{ venue.streetAddress }} {{ venue.city }}, {{ venue.state }}
        {{ venue.zip }}
      </p>
      <div v-else>
        <p>No Location Provided</p>
      </div>
      <!-- <div v-if="venue.genre" class="mt-4">
        <h3 class="text-3xl mb-4">Genre</h3>
        <p class="text-xl">
          {{ venue.genre }}
        </p>
      </div> -->
      <div v-if="venue.dateOpened" class="mt-4">
        <h3 class="text-3xl mb-4">Date Opened</h3>
        <p class="text-xl">
          {{ venue.dateOpened }}
        </p>
      </div>
      <div v-if="venue.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Contact</h3>
        <p class="text-xl">
          {{ venue.contact }}
        </p>
      </div>
      <div v-if="events" class="container mx-auto">
        <h3 class="text-3xl my-4">Showz</h3>
        <!-- add show button -->
        <div v-if="user">
          <div
            class="inline-flex items-center border-2 border-black px-4 py-2 cursor-pointer p-[.8em] w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mt-4 bg-black"
            @click="addEventForm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
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
            <p class="text-2xl sm:text-xl font-bold pl-2 text-white">
              Add Show To Venue
            </p>
          </div>
        </div>
        <section v-if="eventForm" class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
          <div class="w-full mt-6 mb-6">
            <FormulateForm v-model="formValues" @submit="addEvents">
              <div class="flex-col sm:flex sm:flex-row">
                <div class="w-full px-4 sm:w-1/2">
                  <FormulateInput
                    name="title"
                    label="Title"
                    wrapper-class="m-auto sm:w-4/5 "
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                  />

                  <!-- <FormulateInput
                  v-if="userBands"
                  type="select"
                  name="bandName"
                  label="Pick Your Band Optional?"
                  :options="userBands"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                /> -->
                  <FormulateInput
                    name="date"
                    type="date"
                    label="Date of event"
                    wrapper-class="sm:w-4/5 m-auto"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                  />
                  <FormulateInput
                    name="timeStarts"
                    type="time"
                    label="Time Event Begins"
                    wrapper-class="sm:w-4/5 m-auto"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                    @change="
                      formValues.timeStarts = $event.target.value += ':00'
                    "
                  />
                  <FormulateInput
                    name="venueName"
                    type="text"
                    label="Event Venue"
                    wrapper-class="sm:w-4/5 m-auto"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                  />
                </div>
                <div class="w-full px-4 sm:w-1/2">
                  <FormulateInput
                    v-if="
                      !formValues.country ||
                      formValues.country === 'United States'
                    "
                    name="streetAddress"
                    type="text"
                    label="Street Address and Name"
                    placeholder="5555 wolf ave"
                    wrapper-class="sm:w-4/5 m-auto mb-4"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                  />
                  <FormulateInput
                    name="country"
                    label="Country other than the USA"
                    wrapper-class="sm:w-4/5 m-auto"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                    @change="formValues.country = $event.target.values"
                  />
                  <FormulateInput
                    v-if="
                      !formValues.country &&
                      formValues.country !== 'United States'
                    "
                    name="state"
                    label="State"
                    wrapper-class="m-auto sm:w-4/5 "
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                  />
                  <FormulateInput
                    name="city"
                    label="City"
                    wrapper-class="sm:w-4/5 m-auto"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
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
        <!-- Events list section  -->
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
                <p v-if="event.streetAddress" class="text-xl">
                  <span v-if="event.venueName"> {{ event.venueName }}</span>
                  {{ event.streetAddress }} /
                  {{ moment(String(event.date)).format('MMMM Do YYYY') }}
                  {{ moment(event.timeStarts, 'h').format('LT') }}
                  <!-- {{ moment(String(event.date)).format('LT') }} -
                {{ moment(event.timeEnds, 'h').format('LT') }} -->
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
                  v-if="user.id === userPermission"
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
      </div>
      <div v-if="venue.altContacts" class="mt-4">
        <h3 class="text-3xl mb-4">Contacts</h3>
        <div v-for="(l, index) in venue.altContacts" :key="l + index">
          <p class="text-xl">{{ l.contact }}</p>
        </div>
      </div>
      <div v-if="venue.contact && !venue.altContacts" class="mt-4">
        <h3 class="text-3xl mb-4">Contact</h3>
        <p class="text-xl">{{ venue.contact }}</p>
      </div>
      <div v-if="venue.links" class="mt-4">
        <h3 class="text-3xl mb-4">Links</h3>
        <div v-for="(l, index) in venue.links" :key="l + index">
          <a :href="l.link" class="text-xl">{{ l.link }}</a>
        </div>
      </div>
      <div v-if="venue.link && !venue.links" class="mt-4">
        <h3 class="text-3xl mb-4">Links</h3>
        <a :href="venue.link" class="text-xl">{{ venue.link }}</a>
      </div>
    </section>

    <!-- comment box -->
    <section class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0">
      <h2>Posts</h2>
      <section class="my-10">
        <!-- profileImg.url username, image -->
        <div v-for="(post, index) in posts" :key="post + index">
          <div
            v-if="post.users_permissions_user"
            class="mb-6 flex justify-center"
          >
            <div v-if="post.users_permissions_user.profileImg" class="flex">
              <img
                class="max-w-[200px]"
                :src="post.users_permissions_user.profileImg.url"
                alt=""
              />
            </div>
            <div class="w-3/4 ml-10">
              <h3>
                {{ post.users_permissions_user.username }}
                <span>{{ post.created_at }}</span>
              </h3>
              <p class="speech-bubble text-white w-3/4 p-6">
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
          <div class="w-full flex justify-center items-center px-4 sm:px-0">
            <textarea
              v-model="postValue"
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
    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white"
    >
      <Spinner />
    </section>
    <!-- end of popup form for image post  -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      venue: {},
      image: '',
      venueImages: [],
      events: [],
      user: null,
      eventForm: false,
      formValues: {},
      // posts data
      posts: [],
      popup: false,
      post: '',
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      permission: false,
    }
  },

  async mounted() {
    try {
      const venue = await this.$strapi.findOne(
        'venues',
        this.$route.query.venue
      )
      this.venue = venue
      if (this.$strapi.user.id === venue.users_permissions_user.id) {
        this.user = this.$strapi.user.id
        this.permission = true
      }

      this.events = venue.events
      // this.image = venue.venueImg.url
      // this.venueImages = venue.venueImages
    } catch (error) {
      console.log(error)
    }
    try {
      console.log(this.$route.query.venue)
      const posts = await this.$strapi.find('posts', {
        venue: this.$route.query.venue,
      })
      this.posts = posts
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    moment,
    popupToggle() {
      this.popup = !this.popup
    },
    addAnnouncements(val) {
      this.$router.push({
        path: 'announcementcreate',
        query: { user: this.user, venueId: this.venue.id, type: 'venue' },
      })
    },
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
          await this.$strapi.update('venues', this.venue.id, {
            events: [...this.venue.events, event],
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
          await this.$strapi.update('venues', this.venue.id, {
            events: [...this.venue.events, event],
          })
          await this.events.push(event)
          this.eventForm = false
        } catch (error) {
          console.log('adding event ', error)
        }
      }
    },
    setVal: function (val) {
      this.postValue = val
    },
    addEventForm: function () {
      this.eventForm = true
    },
    async sendPost(val) {
      this.loading = true
      try {
        if (this.postValue && !this.postImage) {
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            venue: this.venue.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            venue: this.venue.id,
          })
          // clears the post value box
          this.postValue = ''
          this.posts = posts
          this.loading = false
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
            venue: this.venue.id,
            // sets the post message
            data: this.postValue,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          // fix the post value in the form after creating post ... it should clear out
          this.postValue = ''
          const posts = await this.$strapi.find('posts', {
            venue: this.venue.id,
          })

          this.posts = posts
          this.postImage = null
          this.loading = false
        }
      } catch (error) {
        this.postError = 'you must be logged in to comment '
        console.log('error saving post ', error)
      }
    },
  },
}
</script>

<style scoped>
.back {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
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
</style>
