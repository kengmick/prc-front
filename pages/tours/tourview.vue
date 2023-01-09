<template>
  <div>
    <div v-if="tour" class="container mx-auto flex justify-center mt-6">
      <CardsFullTourCard
        :tour="tour"
        @startChat="startChatNow(tour.users_permissions_user)"
        :isFav="favCheck('tours', tour.id)"
      />
    </div>
    <NuxtLink
      :to="{ path: '/tours/edit', query: { tour: tour.id } }"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center my-4"
    >
      Edit Tour Details
    </NuxtLink>
    <div
      v-if="permission"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center"
      @click="deleteAll(tour.id)"
    >
      Delete Tour
    </div>
    <section class="container mx-auto px-4">
      <section class="my-2">
        <h2 id="showz" class="chedder text-2xl my-4">Showz</h2>
        <NuxtLink
          v-if="permission"
          :to="{ path: '/tours/createevent', query: { tour: tour.id } }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
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
            <h3 class="text-3xl pl-2 text-center">Add Showz</h3>
          </div>
        </NuxtLink>
        <div v-if="tour.events" class="flex gap-4 overflow-y-scroll">
          <div v-for="event in tour.events" :key="event.title" class="my-6">
            <CardsShowCard :event="event" />

            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white mt-4"
            >
              <p class="chedder mr-6" @click="deleteData(event.id, 'events')">
                Delete
              </p>
              <NuxtLink
                :to="{ path: '/events/edit', query: { event: event.id } }"
              >
                <p class="chedder">edit</p></NuxtLink
              >
            </div>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="videos" class="chedder text-2xl">Videos</h2>
      </section>
      <section class="my-2">
        <h2 id="bio" class="chedder text-2xl">Bio</h2>
        <div>
          <NuxtLink
            v-if="permission"
            :to="{
              path: '/bio',
              query: {
                tour: tour.id,
                action: bioAction,
                dataType: 'tours',
              },
            }"
          >
            <div
              class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
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
              <h3 v-if="tour.description" class="text-3xl pl-2 text-center">
                Edit Bio
              </h3>
              <h3 v-else class="text-3xl pl-2 text-center">Add Bio</h3>
            </div>
          </NuxtLink>
          <div v-if="tour.description">
            <p>{{ tour.description }}</p>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="Pictures" class="chedder text-2xl">Pictures</h2>
        <div
          v-if="permission"
          @click="addPhotoModal"
          class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full my-4 sm:w-3/5 md:w-1/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
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
          <h3 class="text-3xl pl-2 text-center">Add Photos</h3>
        </div>
        <div v-if="tour.tourPhotos" class="flex gap-6 overflow-x-scroll my-6">
          <div v-for="pic in tour.tourPhotos" :key="pic.id">
            <div class="h-[300px] overflow-hidden">
              <NuxtImg :src="pic.pic.url" width="300" class="object-contain" />
            </div>
            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 flex items-center bg-black text-white"
              @click="deleteData(pic.id, 'tourPhotos')"
            >
              <p class="chedder">Delete</p>
            </div>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="members" class="chedder text-2xl">Members</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/tours/team',
            query: { tour: tour.id, action: 'create' },
          }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer my-4 w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
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
            <h3 class="text-3xl pl-2 text-center">Add Team Member</h3>
          </div>
        </NuxtLink>
        <div v-if="tour.tourTeam" class="flex gap-6 overflow-x-scroll my-6">
          <div v-for="member in tour.tourTeam" :key="member.id">
            <div class="h-[300px] overflow-hidden">
              <NuxtImg :src="member.photo.url" height="300" width="300" />
            </div>
            <div
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
            >
              <p class="chedder">{{ member.title }} {{ member.name }}</p>
              <div v-if="permission" class="grow">
                <p
                  class="chedder text-right"
                  @click="deleteData(member.id, 'tourTeam')"
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="merch" class="chedder text-2xl">Merch</h2>
      </section>

      <section class="my-2">
        <h2 id="links" class="chedder text-2xl">Links</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/links/create',
            query: { tour: tour.id, dataType: 'tours' },
          }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
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
            <h3 class="text-3xl pl-2 text-center">Add Links</h3>
          </div>
        </NuxtLink>
        <div v-if="tour.links">
          <ul>
            <li v-for="link in tour.links" :key="link.id" class="my-4">
              <a :href="link.link">{{ link.link }} </a>
              <p class="mt-4" @click="deleteData(link.id, 'links')">X Delete</p>
            </li>
          </ul>
        </div>
      </section>
      <section v-if="tour.id" class="my-2">
        <h2 id="chatroom" class="chedder text-2xl">Chat Room</h2>
        <PostsPost :postType="'tours'" :postId="tour.id" />
      </section>
    </section>
    <!-- events -->
    <!-- <div v-if="events && tour" class="container mx-auto"> -->
    <!-- <h3 class="text-3xl my-6">Showz</h3> -->
    <!-- <div v-if="permission" class="px-2 my-6">
        <div
          class="flex justify-center sm:inline-flex items-center border-2 border-black px-4 py-2 cursor-pointer"
          @click="addEventForm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
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
          <h3 class="text-2xl pl-2 w-auto">Add Show To Tour</h3>
        </div>
      </div> -->
    <!-- <section v-if="eventForm" class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
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

                <FormulateInput
                  v-if="userBands"
                  type="select"
                  name="bandName"
                  label="Pick Your Band Optional?"
                  :options="userBands"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
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
                  @change="formValues.timeStarts = $event.target.value += ':00'"
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
                  name="streetName"
                  type="text"
                  label="Street Name"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
                <FormulateInput
                  name="steetAddress"
                  type="number"
                  label="Street Number"
                  wrapper-class="sm:w-4/5 m-auto"
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
              <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
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
              </FormulateInput>
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
            <div>
              <FormulateInput
                type="submit"
                label="Next"
                wrapper-class="w-full mt-10 px-4 sm:mx-10"
                grouping-class="bg-black"
                element-class="w-full"
              />
            </div>
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
      </section> -->
    <!-- event list  -->
    <!-- <section class="container mx-auto">
        <div v-if="events" class="container mx-auto">
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
                  <p v-if="event.streetAddress" class="text-xl">
                    The Vic, {{ event.streetAddress }} /
                    {{ moment(String(event.date)).format('MMMM Do YYYY') }}
                    @{{ moment(event.timeStarts, 'h').format('LT') }}
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
        </div>
      </section> -->
    <!-- </div> -->
    <!-- post box -->

    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <Spinner />
    </section>
    <section
      v-if="errorMessage"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <div>
        <h2>{{ errorMessage }}</h2>
        <h3
          class="text-center text-2xl cursor-pointer"
          @click="errorMessage = null"
        >
          Close X
        </h3>
      </div>
    </section>
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
    <div
      v-if="addPhotoBox"
      class="fixed top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30"
      style="z-index: 999"
    >
      <div
        class="w-full h-full bg-white flex flex-col justify-center items-center"
        style="z-index: 9999999999999999999"
      >
        <p
          class="absolute top-[20px] left-[20px] chedder"
          @click="addPhotoModal"
        >
          x
        </p>
        <h3 class="text-3xl text-center">Add A Photo</h3>
        <div class="my-6">
          <FormulateInput
            type="image"
            name="photo"
            label="Select an image to upload"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png,image/gif,image/webp"
            input-class="w-full sm:w-96 "
            wrapper-class="w-full sm:w-96 "
            element-class="w-full sm:w-96 "
            @change="photo = $event.target.files[0]"
          />
          <div
            v-if="photo"
            class="flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full"
            @click="addPhoto"
          >
            <h3 class="text-3xl pl-2 text-center">Add Image</h3>
          </div>
        </div>
      </div>
    </div>
    <section v-if="chat">
      <Chat
        :chatInfo="chat"
        :chatWithId="chat.chatWith.id"
        class="z-[9999999]"
        @closeChat="renderChatComp"
      />
    </section>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tour: {},
      touringPoster: '',
      events: [],
      inputVal: '',
      user: {},
      eventForm: false,
      eventsToAdd: [],
      formValues: {},
      eventPosterFile: null,
      eventPosterFinal: '',
      // post data
      popup: false,
      posts: [],
      post: '',
      postValue: false,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      errorMessage: null,
      permission: false,
      addPhotoBox: false,
      photo: '',
      bioAction: 'create',
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
      chatSelf: false,
      favs: null,
    }
  },
  async mounted() {
    const f = await this.$strapi.find('favs', {
      users_permissions_user: this.$strapi.user.id,
    })
    this.favs = f.sort((a, b) => {
      if (a.type < b.type) {
        return -1
      }
      if (a.type > b.type) {
        return 1
      }
      return 0
    })
    // try {
    //   const bands = await this.$strapi.find('bands', {
    //     users_permissions_user: this.$strapi.user.id,
    //   })
    //   this.bands = bands
    //   const o = {}
    //   bands.forEach((b) => {
    //     o[b.bandName] = b.bandName
    //   })
    //   this.userBands = o
    // } catch (error) {
    //   this.userBands = null
    //   console.log(error)
    // }
    try {
      this.loading = true
      const tour = await this.$strapi.findOne('tours', this.$route.query.tour)
      this.tour = tour

      const posts = await this.$strapi.find('posts', {
        tour: tour.id,
      })
      this.user = this.$strapi.user.id
      const id = [...this.tour.events]
      this.events = tour.events
      console.log(id, ' this is the id used to get tour events ')
      const ids = await id.map((e) => {
        return ['id', e.id]
      })
      console.log(ids, 'this is all the ids of the events ')
      // I need to find events that are tied to a tour
      // const events = await this.$strapi.find('events')
      // console.log('this is all events 520', events)
      // this.events = events
      // console.log(events, 'events')
      this.posts = posts
      this.loading = false
    } catch (error) {
      this.loading = false
      console.log(error)
    }

    try {
      if (this.user) {
        // compare userid to userpermission in front
        if (this.user === this.tour.users_permissions_user.id) {
          console.log('do something herer')
          this.permission = true
        }
      }
    } catch (error) {
      this.user = null
    }
  },
  methods: {
    moment,
    favCheck(type, id) {
      if (!this.favs) {
        return false
      }
      const check = this.favs.filter((f) => {
        console.log('fav checkc ')
        return f.data.id === id
      })
      if (check.length > 0) {
        return true
      }
      console.log(check, ' this is check ')
    },
    async renderChatComp(chat) {
      this.chatComp = false
      if (this.chatComp === false) {
        this.chat = await chat
        this.chatComp = true
      } else {
        this.chatComp = false
      }
    },

    async startChatNow(val) {
      try {
        // find all chat that you have
        const [hasChat] = await this.$strapi.find('chats', {
          users_permissions_user: val.id,
        })
        console.log(hasChat)
        // return { ...c, chatWith: this.chatWith }

        // render the chat comp with the chat that we already have read y

        if (hasChat) {
          console.log('the start of has chat ')
          if (
            hasChat.users_permissions_user.id === this.$strapi.user.id &&
            hasChat.users_permissions_users.length > 1
          ) {
            console.log('the start of has chat 1 ')
            const [chatWith] = hasChat.users_permissions_users.filter((u) => {
              return u.id !== this.$strapi.user.id
            })
            console.log('the start of has chat 1 render ')
            this.renderChatComp({
              ...hasChat,
              chatWith: chatWith,
            })
          } else if (
            hasChat.users_permissions_user.id !== this.$strapi.user.id
          ) {
            console.log('the start of has chat 2 ')
            this.renderChatComp({
              ...hasChat,
              chatWith: hasChat.users_permissions_user,
            })
          } else if (
            hasChat.users_permissions_user.id === this.$strapi.user.id &&
            hasChat.users_permissions_users.length === 1
          ) {
            console.log('the start of has chat 2 ')
            this.renderChatComp({
              ...hasChat,
              chatWith: hasChat.users_permissions_user,
            })
          }
        } else if (this.$strapi.user.id !== val.id) {
          console.log('the start of has chat 3 ')
          const chat = await this.$strapi.create('chats', {
            users_permissions_user: val.id,
            users_permissions_users: [this.$strapi.user.id],
          })
          console.log(chat)
          this.renderChatComp({
            ...chat,
            chatWith: chat.users_permissions_user,
          })
        } else {
          console.log('the start of has chat 4 ')
          const chat = await this.$strapi.create('chats', {
            users_permissions_user: val.id,
            users_permissions_users: [val.id, this.$strapi.user.id],
          })
          console.log('this is the chat now ', chat)
          this.renderChatComp({
            ...chat,
            chatWith: chat.users_permissions_user,
          })
        }
      } catch (error) {
        console.log('does not have a chat with this band error  ', error)
      }
    },
    addPhotoModal() {
      this.addPhotoBox = !this.addPhotoBox
    },
    async deleteAll(id) {
      const del = await this.$strapi.delete('tours', id)
      if (del) {
        this.$router.push('/profile')
      }
    },
    async addPhoto() {
      try {
        const formData = new FormData()
        await formData.append('files', this.photo)
        const [image] = await this.$strapi.create('upload', formData)
        this.photo = image
      } catch (error) {
        this.errorMessage =
          'Sorry we could not upload your profile image ... please try again '
        this.loading = false
      }
      const updated = await this.$strapi.update('tours', this.tour.id, {
        tourPhotos: [...this.tour.tourPhotos, { pic: this.photo }],
      })
      this.tour = updated
      this.addPhotoBox = false
    },
    async deleteData(id, dataType) {
      if (
        dataType === 'tourPhotos' ||
        dataType === 'releases' ||
        dataType === 'eventTeam' ||
        dataType === 'eventLinks' ||
        dataType === 'events' ||
        dataType === 'team' ||
        dataType === 'links'
      ) {
        const updated = this.tour[dataType].filter((data) => {
          return data.id !== id
        })
        try {
          const updatedEvent = await this.$strapi.update(
            'tours',
            this.tour.id,
            {
              [dataType]: [...updated],
            }
          )
          this.tour = updatedEvent
        } catch (error) {
          console.log('could not delete the data')
        }
      }
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
          await this.$strapi.update('tours', this.tour.id, {
            events: [...this.tour.events, event],
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
          await this.$strapi.update('tours', this.tour.id, {
            events: [...this.tour.events, event],
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
    popupToggle() {
      this.popup = !this.popup
    },
    async sendPost(val) {
      console.log('sending post ')
      try {
        if (this.postValue && !this.postImage) {
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            tour: this.tour.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            tour: this.tour.id,
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
            tour: this.tour.id,
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
            tour: this.tour.id,
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

<style scoped>
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
