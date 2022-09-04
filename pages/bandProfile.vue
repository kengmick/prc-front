<template>
  <div>
    <div v-if="band" class="px-2">
      <div v-if="band.bandProfileImg">
        <!-- image here  -->
        <div class="w-full h-[40vh] z-0 mt-6">
          <img
            class="object-contain h-[40vh] w-full z-0"
            :src="band.bandProfileImg.url"
            alt=""
          />
        </div>
      </div>
      <div>
        <h1 class="sm:text-4xl text-center mt-6">
          {{ band.bandName }}
        </h1>
      </div>
      <section class="container mx-auto">
        <section v-if="band.bio" class="mx-auto w-full z-50">
          <div
            class="px-6 mt-6 w-11/12 sm:w-3/4 xl:w-3/4 bg-black lg:px-16 py-10 mx-auto"
          >
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
      </section>
      <!-- details section -->
      <div
        v-if="permission"
        class="flex items-center justify-center p-[.8em] w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mt-4 bg-black"
      >
        <nuxtLink
          :to="{
            path: '/bandadmin',
            query: { band: band.id },
          }"
          class="text-lg font-medium text-white"
          >Edit Band</nuxtLink
        >
      </div>
      <!-- photo section -->
      <div
        v-if="band.photos.length !== 0"
        class="md:container mx-auto w-full sm:w-full md:w-1/2"
      >
        <h2 v-if="band.photos !== []" class="text-center sm:text-left">
          Band Photos
        </h2>
      </div>
      <section
        v-if="band.photos"
        class="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:container sm:mx-auto w-full md:w-1/2 sm:gap-4"
      >
        <div v-for="(pic, index) in band.photos" :key="pic + index">
          <img
            class="h-[250px] p-[1em] sm:h-[400px] sm:p-0 w-screen object-cover"
            :src="pic.pic.url"
            alt=""
          />
        </div>
      </section>
      <!-- The announcements component -->
      <div class="sm:container sm:mx-auto w-full md:w-1/2 mt-6">
        <h2 class="text-center sm:text-left">Announcements</h2>
      </div>
      <section
        v-if="band.announcements.length > 0 && $strapi.user.acc === 2"
        class="sm:container sm:mx-auto w-full md:w-1/2 mt-6"
      >
        <Announcement
          profileType="bands"
          :profileName="band.bandName"
          :profileId="band.id"
          :announcements="band.announcements"
        />
      </section>
      <section v-else class="sm:container sm:mx-auto w-full md:w-1/2 mt-6">
        <p>there are no announcements at this time</p>
      </section>
      <section
        v-if="permission"
        class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0"
      >
        <div
          v-if="$strapi.user.acc === 2"
          class="flex-grow flex items-center my-12 w-full cursor-pointer bg-black"
        >
          <div
            class="border-2 border-black px-6 py-4 ml-2 w-full shadow-sm"
            @click="addAnnouncements"
          >
            <div class="flex items-center justify-center text-white">
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
              <p class="pl-2 text-lg font-bold">Create Announcement</p>
            </div>
          </div>
        </div>
      </section>

      <section class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0">
        <!-- logo here -->
        <h2 class="text-center sm:text-left chedder text-black mb-6">
          Band Details
        </h2>
        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->
          <div class="w-full mb-6 sm:w-3/4 flex">
            <div v-if="band.genre">
              <h2 class="text-3xl chedder main_red_text pb-2">Genre</h2>
              <p>{{ band.genre }}</p>
            </div>
            <div v-if="band.genreAlt && !band.genre" class="w-full">
              <h2 class="text-3xl chedder main_red_text pb-2">Genre</h2>
              <p>{{ band.genreAlt }}</p>
            </div>
            <div v-if="!band.genre && !band.genreAlt">
              <h2 class="text-3xl chedder main_red_text pb-2">Genre</h2>
              <p>No Genre</p>
            </div>
          </div>
          <!-- col two of details  -->
          <div class="w-full mb-6 sm:w-3/4 flex">
            <div class="w-full">
              <h2 class="text-3xl chedder main_red_text pb-2">Location</h2>
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
          <div v-if="band.bandEmail" class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text pb-2">Band Email</h2>
              <p>{{ band.bandEmail }}</p>
            </div>
          </div>

          <!-- col two of details  -->
          <div v-if="band.dateStarted" class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text pb-2">Date Started</h2>
              <p>{{ band.dateStarted }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center mb-4">
          <div
            v-if="band.altContacts.length === 0 && band.contact"
            class="w-full sm:w-3/4 flex"
          >
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text pb-2">Band Contact</h2>
              <div v-if="band.contact.search('.com') > 1">
                <a
                  class="underline-offset-2 underline block"
                  :href="`https://${band.contact}`"
                  target="_blank"
                  >{{ band.contact }}
                </a>
              </div>
              <p v-else>{{ band.contact }}</p>
            </div>
          </div>
          <div
            v-if="band.altContacts.length !== 0"
            class="w-full sm:w-3/4 flex"
          >
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text pb-2">Band Contacts</h2>
              <p
                v-for="(contact, index) in band.altContacts"
                :key="contact.contact + index"
              >
                {{ contact.contact }}
              </p>
            </div>
          </div>
          <!-- add logic for links for account 2 -->
          <div v-if="band.links.length >= 1" class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text pb-2">Links</h2>

              <div v-if="band.links">
                <a
                  v-for="link in band.links"
                  :key="link"
                  class="underline-offset-2 underline block"
                  :href="`https://${link.link}`"
                  target="_blank"
                  >{{ link.link }}
                </a>
              </div>
              <h3 v-else>No Links Added ...</h3>
            </div>
          </div>
        </div>
        <div v-if="band.recordLabel" class="w-full sm:w-3/4 flex">
          <div class="w-full mb-6">
            <h2 class="text-3xl chedder main_red_text pb-2">Record Label</h2>
            <p>{{ band.recordLabel }}</p>
          </div>
        </div>
      </section>
      <!-- shows, releases(historic information): photos, title, reacord label, date released, album, song(playable ) | merch  -->
      <!-- edit component -->
      <!-- members -->
      <section class="container w-full px-4 sm:px-0 xl:w-1/2 mx-auto">
        <div
          v-if="band.members"
          class="flex flex-col sm:flex-row items-center mb-4"
        >
          <!-- col one of details  -->
          <!-- col two of details  -->
          <div class="w-full flex">
            <div class="w-full mb-6">
              <div>
                <h2 class="text-3xl chedder main_red_text pb-2">Members</h2>
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
                      <div class="flex-grow flex flex-col w-full md:pl-6">
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
                    <hr class="mt-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Songs  -->
      <section class="container mx-auto xl:w-1/2">
        <h2 class="text-center sm:text-left">Songs</h2>
      </section>

      <section class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0">
        <TrackList
          v-if="band.tracks.length > 0"
          class="mb-12"
          :tracks="band.tracks"
        />
        <p>No songs uploaded</p>
        <TrackForm
          :band="band"
          :show="trackForm"
          @submitSongForm="updateSongList"
        />
        <div
          class="flex-grow flex items-center my-4 w-full cursor-pointer bg-black"
        >
          <div
            v-if="permissions && $strapi.user.acc === 2"
            @click="toggleTrackForm"
            class="border-2 border-black px-6 py-4 ml-2 w-full shadow-sm"
          >
            <div
              v-if="!trackForm"
              class="flex items-center justify-center text-white"
            >
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
              <p class="pl-2 text-lg font-bold">Add Tracks</p>
            </div>
            <div
              v-if="trackForm"
              class="flex items-center justify-center text-white"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 56 56"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M56 5.64L50.36 0L28 22.36L5.64 0L0 5.64L22.36 28L0 50.36L5.64 56L28 33.64L50.36 56L56 50.36L33.64 28L56 5.64Z"
                  fill="white"
                />
              </svg>
              <p class="pl-2 text-lg font-bold">Close</p>
            </div>
          </div>
        </div>
      </section>
      <!-- end of songs  -->
      <!-- This is were videos live  -->
      <section class="container mx-auto xl:w-1/2">
        <h2 class="text-center sm:text-left">Videos</h2>
      </section>
      <section class="container w-full px-4 sm:px-0 mx-auto xl:w-1/2">
        <section
          class="flex flex-col gap-6 lg:flex-row flex-wrap lg:items-center lg:gap-2 my-6"
        >
          <div class="mx-auto sm:mx-0">
            <iframe
              v-if="band.video1"
              width="275"
              height="154"
              :src="`https://www.youtube.com/embed/${band.video1}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div
              v-if="editVideo && !band.video1"
              class="w-[275px] h-[154px]"
            ></div>
            <div v-if="editVideo">
              <FormulateInput
                v-model="video1"
                type="text"
                label="Edit Youtube video Id"
                :value="band.video1"
              />
              <div
                @click="updateVideo(video1, 'video1')"
                class="bg-black p-[.8em] text-center text-white mb-2"
              >
                Update This Video
              </div>
              <div
                @click="deleteVideo(video1, 'video1')"
                class="bg-main-red p-[.8em] text-center text-white"
              >
                Delete This Video
              </div>
            </div>
          </div>
          <div class="mx-auto sm:mx-0">
            <iframe
              v-if="band.video2"
              width="275"
              height="154"
              :src="`https://www.youtube.com/embed/${band.video2}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div
              v-if="editVideo && !band.video2"
              class="w-[275px] h-[154px]"
            ></div>
            <div v-if="editVideo">
              <FormulateInput
                v-model="video2"
                type="text"
                label="Edit Youtube video Id"
                :value="band.video2"
              />
              <div
                @click="updateVideo(video2, 'video2')"
                class="bg-black p-[.8em] text-center text-white mb-2"
              >
                Update This Video
              </div>
              <div
                @click="deleteVideo(video2, 'video2')"
                class="bg-main-red p-[.8em] text-center text-white"
              >
                Delete This Video
              </div>
            </div>
          </div>
          <div class="mx-auto sm:mx-0">
            <iframe
              v-if="band.video3"
              width="275"
              height="154"
              :src="`https://www.youtube.com/embed/${band.video3}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div
              v-if="editVideo && !band.video3"
              class="w-[275px] h-[154px]"
            ></div>
            <div v-if="editVideo">
              <FormulateInput
                v-model="video3"
                type="text"
                label="Edit Youtube video Id"
                :value="band.video3"
              />
              <div
                @click="updateVideo(video3, 'video3')"
                class="bg-black p-[.8em] text-center text-white mb-2"
              >
                Update This Video
              </div>
              <div
                @click="deleteVideo(video3, 'video3')"
                class="bg-main-red p-[.8em] text-center text-white"
              >
                Delete This Video
              </div>
            </div>
          </div>
        </section>
      </section>
      <!-- edit button  -->
      <section
        v-if="permission && $strapi.user.acc === 2"
        class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0"
      >
        <div
          class="flex-grow flex items-center my-12 w-full cursor-pointer bg-black"
        >
          <div
            class="border-2 border-black px-6 py-4 ml-2 w-full shadow-sm"
            @click="editAddVideo"
          >
            <div class="flex items-center justify-center text-white">
              <svg
                v-if="!editVideo"
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
              <p v-if="!editVideo" class="pl-2 text-lg font-bold">
                Edit/Add youtube videos
              </p>
              <p v-else>Close</p>
            </div>
          </div>
        </div>
      </section>

      <section class="container w-full px-4 sm:px-0 xl:w-1/2 mx-auto">
        <h2 class="text-center sm:text-left chedder text-black">Showz</h2>
        <p v-if="events.length === 0" class="text-center sm:text-left mb-6">
          No Showz Coming up
        </p>
        <section v-if="permission" class="container mx-auto mb-6">
          <div
            class="flex-grow flex items-center my-12 w-full cursor-pointer bg-black"
          >
            <div
              class="border-2 border-black px-6 py-4 ml-2 w-full shadow-sm text-white"
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
                <p class="pl-2 text-lg font-bold">Add Showz</p>
              </div>
            </div>
          </div>
        </section>

        <section class="container mx-auto">
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
                    <p
                      v-if="event.headlinerOne"
                      class="text-xl font-black pb-2"
                    >
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
        </section>

        <section v-if="eventForm">
          <h1 class="main_red_text text-center">Create Show</h1>

          <section class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
            <div class="w-full mt-6 mb-6">
              <FormulateForm v-model="formValues" @submit="submitForm">
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
                      value="null"
                      type="select"
                      name="bandName"
                      label="Add show to your band Optional?"
                      :options="userBands"
                      wrapper-class="sm:w-4/5 m-auto"
                      element-class="w-full"
                      errors-class="sm:w-4/5 m-auto"
                    />
                    <!-- <FormulateInput
                v-if="userDistros"
                value="null"
                type="select"
                name="distroName"
                label="Add show to your distro Optional?"
                :options="userDistros"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              /> -->
                    <FormulateInput
                      v-if="userTours"
                      value="null"
                      type="select"
                      name="tourName"
                      label="Add Show to your tour Optional?"
                      :options="userTours"
                      wrapper-class="sm:w-4/5 m-auto"
                      element-class="w-full"
                      errors-class="sm:w-4/5 m-auto"
                    />
                    <!-- <FormulateInput
                v-if="userVenues"
                value="null"
                type="select"
                name="venueName"
                label="Add Show to your Venue Optional?"
                :options="userVenues"
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
                      step="0.000"
                      label="Time Event Begins"
                      wrapper-class="sm:w-4/5 m-auto"
                      element-class="w-full"
                      errors-class="sm:w-4/5 m-auto"
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
                      validation="required"
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
                      validation="required"
                    />
                    <FormulateInput
                      name="city"
                      label="City"
                      wrapper-class="sm:w-4/5 m-auto"
                      element-class="w-full"
                      errors-class="sm:w-4/5 m-auto"
                      validation="required"
                    />
                  </div>
                </div>

                <section class="px-4 mt-10 sm:m-20">
                  <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
                    List Bands Playing
                  </h2>
                  <!-- list of bands playing optional  <FormulateInput
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
                <div>
                  <div class="customBtn text-white" @click="submitForm">
                    Next
                  </div>
                  <br />
                  <div class="customBtn text-white" @click="closeEventForm">
                    Close
                  </div>
                </div>
              </FormulateForm>
            </div>
          </section>
        </section>

        <!-- <section v-if="events" class="container mx-auto">
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
                  <span v-if="event.venueName"> {{ event.venueName }} </span>
                  <br />
                  {{ event.streetAddress }}
                  <br />
                  <span v-if="event.city && event.state" class="text-xl">
                    {{ event.city }}, {{ event.state }}
                  </span>
                  <br />
                  {{ moment(String(event.date)).format('MMMM Do YYYY') }}
                  @{{ moment(event.timeStarts, 'h').format('LT') }}
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
        </section> -->

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
        <section id="releases">
          <h2 class="text-center sm:text-left chedder text-black mb-6">
            Releases
          </h2>
          <div
            v-if="band.releases.length > 0"
            class="text-3xl chedder main_red_text chedder pb-2"
          ></div>
          <div v-if="band.releases">
            <section
              v-if="band.releases.length > 0 && !editRelease"
              class="mb-6"
            >
              <div class="flex flex-col gap-4 sm:grid-cols-3 sm:grid">
                <div
                  v-for="(r, index) in band.releases"
                  :key="r + index"
                  class="max-w-[350px] hover:scale-110 duration-200 transition-all ease-linear"
                >
                  <div
                    v-if="r.title"
                    class="py-4 px-2 border-2 border-black bg-black"
                  >
                    <h3 class="text-white">{{ r.title }}</h3>
                  </div>
                  <div v-if="r.image">
                    <img
                      class="w-full h-[281.66px] object-contain bg-black"
                      :src="r.image.url"
                      alt=""
                    />
                  </div>
                  <div class="p-2 bg-black text-white">
                    <div v-if="r.date">
                      <h3>{{ r.date }}</h3>
                    </div>
                    <div v-if="r.link" class="flex">
                      <h3 class="flex-grow underline">
                        <a :href="r.link" target="_blank"
                          >{{ r.link }} {{ r.id }}</a
                        >
                      </h3>
                      <div @click="editReleaseFunction(r.id)" class="w-[40px]">
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 16.2835V20.5679H4.16609L16.4533 7.93181L12.2872 3.64743L0 16.2835ZM19.675 4.61856C20.1083 4.17298 20.1083 3.45321 19.675 3.00763L17.0754 0.334181C16.6421 -0.111394 15.9422 -0.111394 15.509 0.334181L13.4759 2.42496L17.642 6.70934L19.675 4.61856Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div @click="deleteRelease(r.id)">
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <h3 v-else>No Releases</h3>
          <!-- edit release -->
          <section v-if="editRelease">
            <!-- add release to be edited here -->
            <div
              v-if="re"
              class="max-w-[350px] hover:scale-110 duration-200 transition-all ease-linear mx-auto mb-6"
            >
              <div class="py-4 px-2 border-2 border-black bg-black">
                <h3 class="text-white">{{ re.title }}</h3>
              </div>

              <img
                class="w-full h-[281.66px] object-contain bg-black"
                :src="re.image.url"
                alt=""
              />

              <div class="p-2 bg-black text-white">
                <h3>{{ re.date }}</h3>
                <div class="flex">
                  <h3 class="flex-grow underline">
                    <a :href="re.link" target="_blank"
                      >{{ re.link }} {{ re.id }}</a
                    >
                  </h3>
                </div>
              </div>
            </div>
            <FormulateForm
              v-model="editReleaseFormValues"
              @submit="submitEditReleaseForm"
            >
              <div class="flex flex-col justify-center">
                <div class="w-full px-4">
                  <FormulateInput
                    type="text"
                    name="title"
                    :value="re.title"
                    label="Release Tile "
                    wrapper-class="m-auto sm:w-4/5 "
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                  />
                  <FormulateInput
                    name="date"
                    type="date"
                    :value="re.date"
                    label="Date Released"
                    wrapper-class="sm:w-4/5 m-auto"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                  />

                  <FormulateInput
                    name="link"
                    label="link"
                    :value="re.link"
                    wrapper-class="sm:w-4/5 m-auto"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                  />
                  <FormulateInput
                    name="image"
                    type="image"
                    label="Change Image"
                    :value="re.image"
                    wrapper-class="sm:w-4/5 m-auto"
                    element-class="w-full"
                    errors-class="sm:w-4/5 m-auto"
                    @change="annImageFile = $event.target.files[0]"
                  />
                </div>
              </div>
              <div>
                <!-- submitReleaseForm -->
                <div
                  class="bg-black text-white flex justify-center items-center p-[.8em] mt-2"
                  @click="submitEditReleaseForm"
                >
                  Update
                </div>
                <div
                  class="bg-black text-white flex justify-center items-center p-[.8em] mt-2"
                  @click="closeEditRelease"
                >
                  Close
                </div>
              </div>
            </FormulateForm>
          </section>
          <!-- add releases here -->
        </section>
        <!-- add button  -->
        <section
          v-if="permission && $strapi.user.acc === 2"
          class="container mx-auto mb-6"
        >
          <div
            class="flex-grow flex items-center my-12 w-full cursor-pointer bg-black"
          >
            <div
              class="border-2 border-black px-6 py-4 ml-2 w-full shadow-sm text-white"
              @click="addReleaseForm"
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
                <p class="pl-2 text-lg font-bold">Add</p>
              </div>
            </div>
          </div>
        </section>
        <!-- add release form  -->
        <section v-if="addRelease">
          <FormulateForm
            v-model="releaseFormValues"
            @submit="submitReleaseForm"
          >
            <div class="flex flex-col justify-center">
              <div class="w-full px-4">
                <FormulateInput
                  type="text"
                  name="title"
                  label="Release Tile "
                  placeholder="Title"
                  wrapper-class="m-auto sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
                <FormulateInput
                  name="date"
                  type="date"
                  label="Date Released"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />

                <FormulateInput
                  name="link"
                  label="link"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
                <FormulateInput
                  name="image"
                  type="image"
                  label="Add Image"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                  @change="annImageFile = $event.target.files[0]"
                />
              </div>
            </div>
            <div>
              <!-- submitReleaseForm -->
              <div
                class="bg-black text-white flex justify-center items-center p-[.8em] mt-2"
                @click="submitReleaseForm"
              >
                Create
              </div>
              <div
                class="bg-black text-white flex justify-center items-center p-[.8em] mt-2"
                @click="addReleaseForm"
              >
                Close
              </div>
            </div>
          </FormulateForm>
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
          <div v-if="band.merch.length > 0" class="">
            <h2 class="chedder text-black">Merch</h2>
          </div>
        </div>
        <!-- merch goes here  -->
        <div v-if="band.merch && band.acc === 2">
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
          v-if="band.acc === 2"
          id="songs"
          class="text-3xl chedder main_red_text chedder pb-2 mt-6"
        >
          <!-- Songs -->
        </h2>
        <!-- songs -->

        <div v-if="band.singles.lenth > 0 && band.acc === 2">
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
      </section>

      <!-- posts  -->
      <section
        v-if="band.acc === 2"
        id="posts"
        class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0"
      >
        <h2>Posts</h2>
        <section class="mt-10 sm:mb-10">
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
          <div class="w-full mx-auto">
            <p class="text-red-500">{{ postError }}</p>
            <div class="w-full flex justify-center items-center sm:px-0">
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
    </div>
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
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      errorMessage: null,
      permission: false,
      editVideo: false,
      video1: null,
      video2: null,
      video3: null,
      addRelease: false,
      releaseImg: null,
      releaseImgFinal: '',
      annImageFile: '',
      annImageFinal: '',
      releaseFormValues: {},
      editRelease: false,
      // test rel
      editReleaseFormValues: {},
      re: '',
      trackForm: false,
    }
  },
  async mounted() {
    // get bands
    // check if user is logged in and owns the band
    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      this.band = band
      // const id = [...this.band.events]
      // const ids = await id.map((e) => {
      //   return ['id', e.id]
      // })
      if (this.band.video1) {
        this.video1 = band.video1
        this.videos.push(this.band.video1)
      }
      if (this.band.video2) {
        this.video2 = band.video2
        this.videos.push(this.band.video2)
      }
      if (this.band.video3) {
        this.video3 = band.video3
        this.videos.push(this.band.video3)
      }
      const events = this.band.events
      // this means that the events are upcoming
      const upcomingEvents = events.filter((e) => {
        console.log(moment(e.date).toISOString())
        return moment(e.date).toISOString() >= moment().toISOString()
      })

      this.events = upcomingEvents.sort((a, b) => {
        return moment.utc(a.date).diff(moment.utc(b.date))
      })
    } catch (error) {
      console.log(error, 'there was an error ')
    }
    try {
      this.user = this.$strapi.user.id
      if (this.user) {
        // compare userid to userpermission in front
        if (this.user === this.band.users_permissions_user.id) {
          console.log('do something herer')
          this.permission = true
        }
      }
    } catch (error) {
      this.user = null
    }
    // get events

    const posts = await this.$strapi.find('posts', {
      bands: this.band.id,
    })
    this.posts = posts
  },
  methods: {
    moment,
    // called on updatedSongList emit from trackForm
    updateSongList(data, status) {
      if (status === 'good') {
        this.band = data
        console.log(data)
        this.trackForm = false
      }
      this.trackForm = false
    },
    toggleTrackForm() {
      this.trackForm = !this.trackForm
    },
    closeEditRelease() {
      this.editRelease = false
    },
    async deleteRelease(rId) {
      try {
        const releasesUpdated = this.band.releases.filter((r) => {
          return r.id !== rId
        })
        const band = await this.$strapi.update('bands', this.band.id, {
          releases: releasesUpdated,
        })
        this.band = band
        this.loading = false
        this.editRelease = false
      } catch (error) {
        this.errorMessage = 'Sorry could not delete the release'
        this.loading = false
      }
    },

    editReleaseFunction(rId) {
      this.editRelease = true
      // get the release and log it
      const re = this.band.releases.filter((rel) => {
        return rel.id === rId
      })
      this.re = re[0]
    },
    async submitEditReleaseForm() {
      this.loading = true
      if (this.annImageFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.annImageFile)
          const [annImageFinal] = await this.$strapi.create('upload', formData)
          this.annImageFinal = annImageFinal
          this.editReleaseFormValues.image = annImageFinal
        } catch (error) {
          console.log(error)
          this.loading = false
          this.errorMessage =
            'Could not update the release Image ... please try again '
        }
        try {
          console.log('trying to update ')
          const releasesUpdated = this.band.releases.filter((r) => {
            console.log(r.id, this.re.id, 'the id of re to be filtered out ')
            return r.id !== this.re.id
          })
          console.log(this.editReleaseFormValues)
          releasesUpdated.push(this.editReleaseFormValues)
          console.log(releasesUpdated)
          const band = await this.$strapi.update('bands', this.band.id, {
            releases: releasesUpdated,
          })
          this.band = band
          console.log('set the band', band)
          this.loading = false
          this.editRelease = false
        } catch (error) {
          console.log(error)
          this.errorMessage = 'Sorry could not create the release'
          this.loading = false
        }
      } else {
        try {
          const releasesUpdated = this.band.releases.filter((r) => {
            return r.id !== this.re.id
          })
          const band = await this.$strapi.update('bands', this.band.id, {
            releases: releasesUpdated,
          })
          this.band = band
          this.loading = false
          this.editRelease = false
        } catch (error) {
          console.log(error)
          this.errorMessage = 'Sorry could not create the release'
          this.loading = false
        }
      }

      this.loading = false
    },
    addReleaseForm() {
      this.addRelease = !this.addRelease
    },
    async submitReleaseForm() {
      this.loading = true
      if (this.annImageFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.annImageFile)
          const [annImageFinal] = await this.$strapi.create('upload', formData)
          this.annImageFinal = annImageFinal
          this.releaseFormValues.image = annImageFinal
        } catch (error) {
          console.log(error)
          this.loading = false
          this.errorMessage =
            'Could not upload the release Image ... please try again '
        }
        try {
          console.log('trying to create ')
          const releasesUpdated = this.band.releases
          console.log(this.releaseFormValues)
          releasesUpdated.push(this.releaseFormValues)
          const band = await this.$strapi.update('bands', this.band.id, {
            releases: releasesUpdated,
          })
          this.band = band
          console.log('set the band', band)
          this.loading = false
        } catch (error) {
          console.log(error)
          this.errorMessage = 'Sorry could not create the release'
          this.loading = false
        }
      }

      this.loading = false
    },
    addVideo() {
      console.log('add video function ')
    },
    async updateVideo(video, videoId) {
      console.log(video, videoId)

      try {
        const band = await this.$strapi.update('bands', this.band.id, {
          [videoId]: video,
        })
        console.log(band.video1, 'updated band video')
        this.band = band
      } catch (error) {
        console.log('there was an error updating the videos')
      }
    },
    async deleteVideo(video, videoId) {
      console.log(videoId, 'id of video')
      try {
        const band = await this.$strapi.update('bands', this.band.id, {
          [videoId]: null,
        })
        this.band = band
      } catch (error) {
        console.log('there was an error deleting the video')
      }
    },
    closeEventForm() {
      console.log('this is the close event form')
      this.eventForm = false
    },
    editAddVideo() {
      this.editVideo = !this.editVideo
    },
    // add events
    async submitForm() {
      // uploading bandProfileImg
      this.loading = true
      if (this.formValues.timeStarts) {
        this.formValues.timeStarts = this.formValues.timeStarts += ':00.000'
      }
      try {
        const formData = new FormData()
        await formData.append('files', this.eventPosterFile)
        const [eventPosterFinal] = await this.$strapi.create('upload', formData)
        this.eventPosterFinal = eventPosterFinal
        this.formValues.eventPoster = eventPosterFinal
      } catch (error) {
        console.log(error)
        this.loading = false
        this.errorMessage =
          'Could not upload the event poster ... please try again '
      }
      try {
        const event = await this.$strapi.create('events', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        // put band id and update the band
        const updatedEvents = await this.$strapi.update('bands', this.band.id, {
          events: [...this.band.events, event],
        })
        const upcomingEvents = updatedEvents.events.filter((e) => {
          return moment(e.date).toISOString() >= moment().toISOString()
        })

        this.events = upcomingEvents.sort((a, b) => {
          return moment.utc(a.date).diff(moment.utc(b.date))
        })
        this.loading = false
        this.eventForm = false
      } catch (error) {
        console.log(error, 'there was an error ')
        this.loading = false
        this.eventForm = false
        this.errorMessage = 'Sorry, something went wrong ... please try again '
      }
      // after creation take user to band admin
      if (this.event) {
        this.$router.push({
          path: '/eventview',
          query: { event: this.event.id },
        })
      }
    },
    addAnnouncements(val) {
      this.$router.push({
        path: 'announcementcreate',
        query: { user: this.user, bandId: this.band.id, type: 'band' },
      })
    },
    addEventForm: function () {
      this.eventForm = true
    },
    setVal: function (val) {
      this.postValue = val
    },
    popupToggle() {
      this.popup = !this.popup
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
            bands: this.band.id,
            // sets the post message
            data: this.postValue,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          this.postValue = ''
          this.postImage = null
          const posts = await this.$strapi.find('posts', {
            bands: this.band.id,
          })

          this.posts = posts
          this.loading = false
        }
        if (this.postImage && !this.postValue) {
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
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          this.postValue = ''
          this.postImage = null
          this.loading = false
          const posts = await this.$strapi.find('posts', {
            bands: this.band.id,
          })

          this.posts = posts
        }
      } catch (error) {
        this.loading = false
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

/* video */
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  max-width: 250px;
  overflow: hidden;
}
.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.customBtn {
  border-radius: 0.3em;
  box-sizing: border-box;
  font-size: 0.9em;
  padding: 0.75em;
  line-height: 1.2em;
  margin: 0;
  color: #fff;
  min-width: 0;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  background: black;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
