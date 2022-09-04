<template>
  <div class="px-2">
    <!-- user profile  -->
    <section class="md:container md:mx-auto">
      <div
        v-if="user"
        class="mx-auto flex flex-col md:flex-row justify-center md:justify-start md:my-12"
      >
        <div>
          <div v-if="user.profileImg">
            <img
              :src="user.profileImg.url"
              alt=""
              class="w-full object-fill sm:w-[250px] h-[250px]"
            />
          </div>
          <div
            v-else
            class="full bg-black h-[300px] flex justify-center items-center"
          >
            <img src="~/static/imageIcon.svg" alt="" class="w-12" />
          </div>
          <div class="bg-black text-white chedder p-6 w-auto">
            {{ user.username }}
          </div>
        </div>
        <div class="sm:px-6 py-2">
          <p class="m-2">
            <span
              class="px-4 py-2 mr-4 font-bold chedder inline-block sm:w-[150px]"
              >Account Tier</span
            >{{ user.acc }}
          </p>
          <hr />
          <p class="m-2">
            <span
              class="px-4 py-2 mr-4 text-black font-bold chedder inline-block sm:w-[150px]"
              >Account Email</span
            >{{ user.email }}
          </p>
          <!-- this is the upgrade button -->
          <!-- <hr />
          <div class="hidden md:block my-6 w-full">
            <div class="w-full">
              <div
                class="inline-flex items-center justify-center border-2 border-black px-4 py-2 w-full cursor-not-allowed bg-gray-100"
                @click="update"
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
                <h3 class="text-3xl pl-2 text-center">Upgrade Account</h3>
              </div>
            </div>
          </div> -->
          <div class="hidden md:block my-6 w-full">
            <div class="w-full">
              <div
                class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full"
                @click="update"
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
                <h3 class="text-3xl pl-2 text-center">Edit User</h3>
              </div>
            </div>
          </div>

          <div class="block md:hidden my-6">
            <div class="w-full">
              <div
                class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full"
                @click="update"
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
                <h3 class="text-3xl pl-2 text-center">Edit User</h3>
              </div>
            </div>
          </div>
          <div class="block md:hidden my-6 w-full">
            <div class="w-full">
              <div
                class="inline-flex items-center justify-center border-2 border-black px-4 py-2 w-full cursor-not-allowed bg-gray-100"
                @click="update"
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
                <h3 class="text-3xl pl-2 text-center">Upgrade Account</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Edit user forms  -->
    <section class="container mx-auto">
      <FormulateForm v-model="formValues"
        ><div v-if="updateForm">
          <FormulateInput
            name="username"
            label="Change User Name"
            :placeholder="$strapi.user.username"
            wrapper-class="m-auto sm:w-4/5 "
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
          />
          <FormulateInput
            name="email"
            label="email"
            :placeholder="$strapi.user.email"
            wrapper-class="m-auto sm:w-4/5 "
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
          />
          <div>
            <FormulateInput
              type="image"
              name="profileImg"
              label="Select an image to upload"
              help="Select a png, jpg or gif to upload."
              validation="mime:image/jpeg,image/png,image/gif,image/webp"
              input-class="w-full sm:w-96 "
              wrapper-class="w-full sm:w-96 "
              element-class="w-full sm:w-96 "
              @change="profileImg = $event.target.files[0]"
            />
          </div>
        </div>
        <div v-if="updateForm">
          <p
            class="border bottom-2 border-black py-4 px-2 text-center my-4 cursor-pointer"
            @click="updateUser"
          >
            Update
          </p>
          <p
            class="border bottom-2 border-black py-4 px-2 text-center cursor-pointer"
            @click="cancelUpdate"
          >
            Cancel
          </p>
        </div>
      </FormulateForm>
    </section>
    <!-- pricing modle  -->
    <!-- <Price /> -->
    <!-- Add Bands  -->
    <h2 class="text-center chedder main_red_text">Create Your Content</h2>
    <div class="container mx-auto">
      <h2
        class="bg-black w-full text-center text-white py-6 my-10 underline-offset-2"
      >
        Your Bands
      </h2>
      <div class="w-full">
        <NuxtLink to="/createband">
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-2/5"
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
            <h3 class="text-3xl pl-2 text-center">Add Bands</h3>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- show band here  -->
    <section v-if="bands" class="w-full container mx-auto my-10">
      <div
        class="grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10 items-center justify-center"
      >
        <ProfileBandCard
          v-for="(band, index) in bands"
          :key="band.bandName + index"
          :band="band"
          @removedBand="updateData"
        />
      </div>
    </section>
    <!-- end show band  -->
    <div class="container mx-auto my-6">
      <h2
        class="bg-black w-full text-center text-white py-6 my-10 underline-offset-2"
      >
        Your Showz
      </h2>
      <div class="w-full">
        <NuxtLink to="/createevent">
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-2/5"
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
      </div>
    </div>

    <!-- present showz  -->
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
                <div
                  class="border-2 border-black ml-4 px-4 py-2"
                  @click="removeData('events', event.id)"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        </section>
        <section v-else class="container mx-auto">
          <h3>No Showz Added</h3>
        </section>
      </div>
    </section>
    <!-- show venues  -->

    <!-- tours -->
    <div class="container mx-auto my-6">
      <h2
        class="bg-black w-full text-center text-white py-6 my-10 underline-offset-2"
      >
        Your Tours
      </h2>
      <div class="w-full">
        <NuxtLink to="/tourcreate">
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-2/5"
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
            <h3 class="text-3xl pl-2 text-center">Add Tour</h3>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- tours  -->
    <section class="container mx-auto">
      <div v-if="tours" class="container mx-auto">
        <section v-if="events.length > 0" class="container mx-auto">
          <div
            v-for="(event, index) in tours"
            :key="event.title + index"
            class="shadow-md w-full min-h-64 my-12 mx-auto flex flex-col sm:flex-row transition-all duration-200 hover:scale-105"
          >
            <div v-if="event.touringPoster" class="w-full sm:w-1/2 h-64">
              <img
                class="h-full w-full object-cover"
                :src="event.touringPoster.url"
                alt=""
              />
            </div>
            <div class="p-6">
              <p class="chedder text-xl text-center inline-block sm:block">
                {{ moment(String(event.dateStart)).format('MMM') }}
              </p>
              <p class="chedder text-xl text-center inline-block sm:block">
                {{ moment(String(event.dateEnd)).format('Do') }}
              </p>
            </div>
            <div class="flex flex-col flex-grow p-6">
              <div>
                <p v-if="event.title" class="chedder text-2xl">
                  {{ event.title }}
                </p>
              </div>
              <div class="flex-grow flex items-center mt-6 sm:mt-2">
                <NuxtLink
                  :to="{
                    path: 'tourview',
                    query: { tour: event.id },
                  }"
                  class="border-2 border-black px-4 py-2"
                  >View Tour</NuxtLink
                >
              </div>
            </div>
          </div>
        </section>
        <section v-else class="container mx-auto">
          <h3>No Tours Added</h3>
        </section>
      </div>
    </section>

    <!-- venue end here  -->
    <div class="container mx-auto my-6">
      <h2
        class="bg-black w-full text-center text-white py-6 my-10 underline-offset-2"
      >
        Your Venues
      </h2>
      <div class="w-full">
        <NuxtLink to="/createVenue">
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-2/5"
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
            <h3 class="text-3xl pl-2 text-center">Add Venues</h3>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- venues list here  -->
    <section v-if="venues" class="w-full container mx-auto my-10">
      <div
        class="grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10 items-center justify-center"
      >
        <VenueCard
          v-for="(venue, index) in venues"
          :key="venue.title + index"
          :venue="venue"
        />
        <div />
      </div>
    </section>
    <!-- add classifed -->
    <section class="container mx-auto">
      <h2
        class="bg-black w-full text-center text-white py-6 my-10 underline-offset-2"
      >
        Your Classifieds
      </h2>
    </section>
    <div class="container mx-auto my-6">
      <div class="w-full">
        <NuxtLink to="/classifiedcreate">
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-2/5"
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
            <h3 class="text-3xl pl-2 text-center">Add Classified</h3>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- Show Classified -->

    <!-- add release button  -->

    <!-- show releases if has relases  -->
    <!-- <section class="container mx-auto">
      <h2
        class="bg-black w-full text-center text-white py-6 my-10 underline-offset-2"
      >
        Your Releases
      </h2>
      <div class="container mx-auto my-6">
        <div class="w-full">
          <NuxtLink to="/releasecreate">
            <div
              class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-2/5"
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
              <h3 class="text-3xl pl-2 text-center">Add Releases</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section> -->

    <section v-if="releases" class="container mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div
          v-for="r in releases"
          :key="r.title"
          class="transition-all duration-200 hover:scale-105"
        >
          <NuxtLink :to="{ path: 'releaseview', query: { release: r.id } }">
            <div v-if="r.image" class="w-full h-[300px]">
              <img class="h-full object-cover" :src="r.image.url" alt="" />
            </div>
            <div v-else class="flex items-center justify-center bg-black">
              <img class="h-20 w-20" src="~/static/imageIcon.svg" alt="" />
            </div>
            <!-- card content -->
            <div>
              <p class="chedder text-2xl">{{ r.title }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    <!-- This is where releases go  -->
    <!-- <section class="container mx-auto">
      <p>No Releases</p>
    </section> -->

    <!-- distros -->
    <!-- <div class="container mx-auto my-6">
      <h2
        class="bg-black w-full text-center text-white py-6 my-10 underline-offset-2"
      >
        Your Distros
      </h2>
      <div class="w-full">
        <NuxtLink to="/createdistro">
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-2/5"
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
            <h3 class="text-3xl pl-2 text-center">Add Distro</h3>
          </div>
        </NuxtLink>
      </div>
    </div> -->

    <section v-if="distros" class="container mx-auto">
      <div>
        <div v-for="d in distros" :key="d.name">
          <div v-if="d.distroImage">
            <div><img :src="d.distroImage.url" alt="" /></div>
          </div>
          <div>
            <p class="chedder text-2xl">{{ d.name }}</p>
          </div>
        </div>
      </div>
    </section>
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
      bands: [],
      tours: [],
      venues: [],
      classifieds: [],
      events: [],
      posts: [],
      error: '',
      releases: [],
      distros: [],
      merch: [],
      formValues: {},
      updateForm: false,
      username: '',
      email: '',
      profileImg: '',
      userImage:
        'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
      user: {},
      loading: false,
      errorMessage: '',
    }
  },
  async mounted() {
    try {
      const user = await this.$strapi.findOne('users', this.$strapi.user.id)
      console.log(user)
      this.user = user
    } catch (error) {
      console.log('error is user')
    }
    try {
      this.distros = await this.$strapi.find('record-labels', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong distros'
    }

    try {
      if (this.$strapi.user.profileImg) {
        this.userImage = this.$strapi.user.profileImg
      }
    } catch (error) {
      console.log(error)
    }
    try {
      this.posts = await this.$strapi.find('posts', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong'
    }
    try {
      const bands = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.bands = bands
      console.log(this.bands, bands, 'this is the bands')
    } catch (error) {
      this.error = 'sorry ... something went wrong'
    }
    // this.bands.forEach((b) => {
    //   if (b.releases) {
    //     b.releases.forEach((r, index) => {
    //       this.releases.push({ ...r, id: r.id, band: b.bandName, bandId: b.id })
    //     })
    //   }
    // })
    try {
      const re = await this.$strapi.find('releases', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.releases = re
    } catch (error) {}
    this.bands.forEach((b) => {
      if (b.merch) {
        b.merch.forEach((m, index) => {
          this.merch.push({ ...m, band: b.bandName, bandId: b.id })
        })
      }
    })
    try {
      this.events = await this.$strapi.find('events', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong events'
    }

    try {
      const venues = await this.$strapi.find('venues', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.venues = venues
      console.log(this.venues, 'venues')
    } catch (error) {
      console.log(error)
      this.error = 'sorry ... something went wrong venues'
    }
    try {
      this.classifieds = await this.$strapi.find('classifieds', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong classified'
    }
    try {
      this.tours = await this.$strapi.find('tours', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong'
    }
  },
  methods: {
    moment,
    async removeData(data, dataId) {
      console.log('remove data ', data, dataId)
      await this.$strapi.delete([data], dataId)
      const e = await this.$strapi.find([data])
      this[data] = e
    },
    async updateData(data) {
      try {
        const d = await this.$strapi.find([data], {
          users_permissions_user: this.$strapi.user.id,
        })
        this[data] = d
      } catch (error) {
        this.error = 'sorry ... something went wrong distros'
      }
    },
    cancelUpdate: function () {
      this.updateForm = false
    },
    update: function () {
      this.updateForm = !this.updateForm
    },
    async updateUser() {
      this.loading = true
      if (this.profileImg) {
        try {
          const formData = new FormData()
          await formData.append('files', this.profileImg)
          const [image] = await this.$strapi.create('upload', formData)
          this.image = image
          this.profileImg = image
          this.formValues.profileImg = image
          await this.$strapi.update('users', this.$strapi.user.id, {
            ...this.formValues,
          })
          window.location.reload(true)
        } catch (error) {
          this.loading = false
          console.log('there was an error ')
          this.errorMessage = 'Sorry, something went wrong ... please try again'
          console.log(error)
        }
      } else {
        try {
          const update = await this.$strapi.update(
            'users',
            this.$strapi.user.id,
            { ...this.formValues }
          )
          console.log(update, 'updated user')
          this.loading = false
          window.location.reload(true)
        } catch (error) {
          this.loading = false
          console.log('there was an error ')
          this.errorMessage = 'Sorry, something went wrong ... please try again'
        }
      }
    },
    async accountUpdate() {
      try {
        this.loading = true
        await this.$strapi.update('users', this.$strapi.user.id, { acc: 1 })
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th,
td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.btn_custom {
  padding: 0.5em 1em;
  border: 1px solid black;
}

.bord {
  border: 1px solid #e5e7eb;
}
</style>
