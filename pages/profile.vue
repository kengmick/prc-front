<template>
  <div>
    <!-- has band venue classified events  -->
    <!-- needs tours record lables albums songs videos  -->
    <div v-if="user" class="container mx-auto mt-10">
      <div class="hidden" @click="accountUpdate">Update Account</div>

      <div v-if="user.profileImg">
        <!-- <pre>{{ user }}</pre> -->
        <img class="h-[250px]" :src="user.profileImg.url" alt="" />
      </div>
      <div v-else>
        <!-- <pre>{{ user }}</pre> -->
        <img
          src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
          alt=""
        />
      </div>
      <p class="text-2xl mt-2">Welcome {{ user.username }}</p>
      <p class="text-2xl mt-2">Email : {{ user.email }}</p>
      <p class="text-2xl mt-2">Password : {{ user.password }}</p>
      <p
        v-if="!updateForm"
        @click="update"
        class="border bottom-2 border-black py-4 px-2 text-center"
      >
        Edit user details
      </p>
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
              validation="mime:image/jpeg,image/png,image/gif"
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
    </div>
    <div v-if="$strapi.user" class="container mx-auto my-10">
      <div v-if="bands" class="hidden sm:block">
        <div class="h-[74px] w-full bord bg-black flex items-center px-[16px]">
          <p class="text-2xl chedder text-white flex-grow">Band Profiles</p>
          <div>
            <nuxtLink
              :to="{ path: '/createband' }"
              class="chedder text-2xl text-white flex-1 text-left border-2 border-white px-4 py-2"
              >+ Create Band
            </nuxtLink>
          </div>
        </div>
        <table class="w-screen sm: full">
          <tr>
            <th>Band Name</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>

          <tr v-for="(band, index) in bands" :key="band.bandName + index">
            <td>{{ band.bandName }}</td>
            <td>{{ moment(String(band.created_at)).format('MMM Do') }}</td>
            <td>
              <div class="flex gap-6">
                <nuxtLink
                  :to="{ path: '/bandprofile', query: { band: band.id } }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/bandadmin',
                    query: { band: band.id },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-if="bands" class="block px-2 sm:hidden">
        <!-- lable section, create band button, band title, date created, view, edit -->
        <!-- card Container -->
        <div class="flex">
          <h3 class="text-3xl flex-grow mb-4">Bands</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/createband' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Create Band</NuxtLink
            >
          </div>
        </div>
        <section class="shadow-xl h-[400px] overflow-auto">
          <ul>
            <li
              v-for="(band, index) in bands"
              :key="band.bandName + index"
              class="flex flex-col py-4"
            >
              <p class="flex-grow text-xl font-bold">{{ band.bandName }}</p>
              <p class="flex-grow texl-lg font-bold">
                Created on
                {{ moment(String(band.created_at)).format('MMM Do') }}
              </p>
              <div class="mt-4">
                <NuxtLink
                  :to="{ path: '/bandprofile', query: { band: band.id } }"
                  class="chedder py-2 px-4 border-2 border-black"
                >
                  View</NuxtLink
                >
                <NuxtLink
                  :to="{
                    path: '/bandadmin',
                    query: { band: band.id },
                  }"
                  class="chedder py-2 px-4 border-2 border-black ml-2"
                  >Edit</NuxtLink
                >
              </div>
            </li>
          </ul>
        </section>
      </div>
      <!-- Classifieds -->
      <div v-if="classifieds" class="mt-6 hidden sm:block">
        <div class="h-[74px] w-full bord bg-black flex items-center px-[16px]">
          <p class="text-2xl chedder text-white flex-grow">Classifieds</p>
          <div>
            <nuxtLink
              :to="{ path: '/createclassified' }"
              class="chedder text-2xl text-white flex-1 text-left border-2 border-white px-4 py-2"
              >+ Create Classified
            </nuxtLink>
          </div>
        </div>
        <table class="w-full">
          <tr>
            <th>Article Title</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>

          <tr v-for="article in classifieds" :key="article.name">
            <td>{{ article.title }}</td>
            <td>{{ moment(String(article.created_at)).format('MMM Do') }}</td>
            <td>
              <div class="flex gap-6">
                <nuxtLink
                  :to="{
                    path: '/classifiedview',
                    query: { article: article.id },
                  }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/classifiededit',
                    query: { article: article.id },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-if="classifieds" class="block px-2 sm:hidden">
        <!-- lable section, create band button, band title, date created, view, edit -->
        <!-- card Container -->
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Classifieds</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/classifiedcreate' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Classified</NuxtLink
            >
          </div>
        </div>
        <section class="shadow-xl h-[400px] overflow-auto">
          <ul>
            <li
              v-for="(article, index) in classifieds"
              :key="article.title + index"
              class="flex flex-col py-4"
            >
              <p class="flex-grow text-xl font-bold">{{ article.title }}</p>
              <p class="flex-grow texl-lg font-bold">
                Created on
                {{ moment(String(article.created_at)).format('MMM Do') }}
              </p>
              <div class="mt-4">
                <NuxtLink
                  :to="{
                    path: '/classifiedview',
                    query: { article: article.id },
                  }"
                  class="chedder py-2 px-4 border-2 border-black"
                >
                  View</NuxtLink
                >
                <NuxtLink
                  :to="{
                    path: '/classifiededit',
                    query: { article: article.id },
                  }"
                  class="chedder py-2 px-4 border-2 border-black ml-2"
                  >Edit</NuxtLink
                >
              </div>
            </li>
          </ul>
        </section>
      </div>
      <!-- venues -->
      <!-- desktop venue -->
      <div v-if="venues.length > 0" class="mt-6 hidden sm:block">
        <div class="h-[74px] w-full bord bg-black flex items-center px-[16px]">
          <p class="text-2xl chedder text-white flex-grow">Venues</p>
          <div>
            <nuxtLink
              :to="{ path: '/createVenue' }"
              class="chedder text-2xl text-white flex-1 text-left border-2 border-white px-4 py-2"
              >+ Create Venue
            </nuxtLink>
          </div>
        </div>
        <table class="w-full">
          <tr>
            <th>Venue Name</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>

          <tr v-for="(venue, index) in venues" :key="venue.name + index">
            <td>{{ venue.name }}</td>
            <td>{{ moment(String(venue.created_at)).format('MMM Do') }}</td>
            <td>
              <div class="flex gap-6">
                <nuxtLink
                  :to="{ path: '/venueprofile', query: { venue: venue.id } }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/venueedit',
                    query: { venue: venue.id },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Venues</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/createvenue' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Venue</NuxtLink
            >
          </div>
        </div>
        <h3>No Venues Added</h3>
      </div>
      <div v-if="venues.length > 0" class="block px-2 sm:hidden">
        <!-- lable section, create band button, band title, date created, view, edit -->
        <!-- card Container -->
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Venues</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/createvenue' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Venue</NuxtLink
            >
          </div>
        </div>
        <section class="shadow-xl h-[400px] overflow-auto">
          <ul>
            <li
              v-for="(v, index) in venues"
              :key="v.name + index"
              class="flex flex-col py-4"
            >
              <p class="flex-grow text-xl font-bold">{{ v.name }}</p>
              <p class="flex-grow texl-lg font-bold">
                Created on
                {{ moment(String(v.created_at)).format('MMM Do') }}
              </p>
              <div class="mt-4">
                <NuxtLink
                  :to="{
                    path: '/venueprofile',
                    query: { venue: v.id },
                  }"
                  class="chedder py-2 px-4 border-2 border-black"
                >
                  View</NuxtLink
                >
                <NuxtLink
                  :to="{
                    path: '/venueedit',
                    query: { venue: v.id },
                  }"
                  class="chedder py-2 px-4 border-2 border-black ml-2"
                  >Edit</NuxtLink
                >
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Venues</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/createvenue' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Venue</NuxtLink
            >
          </div>
        </div>
        <h3>No Venues Added</h3>
      </div>

      <div v-if="events.length > 0" class="mt-6 hidden sm:block">
        <div class="h-[74px] w-full bord bg-black flex items-center px-[16px]">
          <p class="text-2xl chedder text-white flex-grow">Showz</p>
          <div>
            <nuxtLink
              :to="{ path: '/createevent' }"
              class="chedder text-2xl text-white flex-1 text-left border-2 border-white px-4 py-2"
              >+ Create Show
            </nuxtLink>
          </div>
        </div>
        <table class="w-full">
          <tr>
            <th>Event Name</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>

          <tr v-for="(event, index) in events" :key="event.title + index">
            <td>Show</td>
            <td>{{ event.title }}</td>
            <td>
              <div class="flex gap-6">
                <nuxtLink
                  :to="{ path: '/eventview', query: { event: event.id } }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/eventedit',
                    query: { event: event.id },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Showz</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/createevent' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Show</NuxtLink
            >
          </div>
        </div>
        <h3>No Showz Added</h3>
      </div>
      <div v-if="events.length > 0" class="block px-2 sm:hidden">
        <!-- lable section, create band button, band title, date created, view, edit -->
        <!-- card Container -->
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Showz</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/createevent' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Show</NuxtLink
            >
          </div>
        </div>
        <section class="shadow-xl h-[400px] overflow-auto">
          <ul>
            <li
              v-for="(ev, index) in events"
              :key="ev.title + index"
              class="flex flex-col py-4"
            >
              <p class="flex-grow text-xl font-bold">{{ ev.title }}</p>
              <p class="flex-grow texl-lg font-bold">
                Created on
                {{ moment(String(ev.created_at)).format('MMM Do') }}
              </p>
              <div class="mt-4">
                <NuxtLink
                  :to="{
                    path: '/eventview',
                    query: { event: ev.id },
                  }"
                  class="chedder py-2 px-4 border-2 border-black"
                >
                  View</NuxtLink
                >
                <NuxtLink
                  :to="{
                    path: '/eventedit',
                    query: { event: ev.id },
                  }"
                  class="chedder py-2 px-4 border-2 border-black ml-2"
                  >Edit</NuxtLink
                >
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Events</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/createevent' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Events</NuxtLink
            >
          </div>
        </div>
        <h3>No Events Added</h3>
      </div>
      <!-- Tours desktop tour -->
      <div v-if="tours.length > 0" class="mt-6 hidden sm:block">
        <div class="h-[74px] w-full bord bg-black flex items-center px-[16px]">
          <p class="text-2xl chedder text-white flex-grow">Tours</p>
          <div>
            <nuxtLink
              :to="{ path: '/tourcreate' }"
              class="chedder text-2xl text-white flex-1 text-left border-2 border-white px-4 py-2"
              >+ Create Tour
            </nuxtLink>
          </div>
        </div>
        <table class="w-full">
          <tr>
            <th>Tour Name</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>

          <tr v-for="(tour, index) in tours" :key="tour.title + index">
            <td>Tour</td>
            <td>{{ tour.title }}</td>
            <!-- <td>{{ moment(String(venue.created_at)).format('MMM Do') }}</td> -->
            <td>
              <div class="flex gap-6">
                <nuxtLink
                  :to="{ path: '/tourview', query: { tour: tour.id } }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/touredit',
                    query: { tour: tour.id },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Tours</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/tourcreate' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add tour</NuxtLink
            >
          </div>
        </div>
        <h3>No Tours Added</h3>
      </div>
      <!-- mobile tours  -->
      <div v-if="tours.length > 0" class="block px-2 sm:hidden">
        <!-- lable section, create band button, band title, date created, view, edit -->
        <!-- card Container -->
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Tours</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/tourcreate' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Tour</NuxtLink
            >
          </div>
        </div>
        <section class="shadow-xl h-[400px] overflow-auto">
          <ul>
            <li
              v-for="(t, index) in tours"
              :key="t.title + index"
              class="flex flex-col py-4"
            >
              <p class="flex-grow text-xl font-bold">Title :{{ t.title }}</p>
              <p class="flex-grow texl-lg font-bold">
                Created on
                {{ moment(String(t.created_at)).format('MMM Do') }}
              </p>
              <div class="mt-4">
                <NuxtLink
                  :to="{
                    path: '/tourview',
                    query: {
                      tour: t.id,
                    },
                  }"
                  class="chedder py-2 px-4 border-2 border-black"
                >
                  View</NuxtLink
                >
                <NuxtLink
                  :to="{
                    path: '/touredit',
                    query: {
                      tour: t.id,
                    },
                  }"
                  class="chedder py-2 px-4 border-2 border-black ml-2"
                  >Edit</NuxtLink
                >
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Tour</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/tourcreate' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Tour</NuxtLink
            >
          </div>
        </div>
        <h3>No tours Added</h3>
      </div>
      <!-- desktop releases  -->
      <div v-if="releases.length > 0" class="mt-6 hidden sm:block">
        <div class="h-[74px] w-full bord bg-black flex items-center px-[16px]">
          <p class="text-2xl chedder text-white flex-grow">Releases</p>
          <div>
            <nuxtLink
              :to="{ path: '/releasecreate' }"
              class="chedder text-2xl text-white flex-1 text-left border-2 border-white px-4 py-2"
              >+ Create Release
            </nuxtLink>
          </div>
        </div>
        <table class="w-full">
          <tr>
            <th>Name</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>

          <tr v-for="(r, index) in releases" :key="r.title + index">
            <td>Tour</td>
            <td>{{ r.title }}</td>
            <!-- <td>{{ moment(String(venue.created_at)).format('MMM Do') }}</td> -->
            <td>
              <div class="flex gap-6">
                <nuxtLink
                  :to="{
                    path: '/releaseview',
                    query: { release: r.id, bandId: r.band.id },
                  }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/releaseview',
                    query: { release: r.id, band: r.bandId },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Releases</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/releasecreate' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Release</NuxtLink
            >
          </div>
        </div>
        <h3>No Releases Added</h3>
      </div>
      <!-- mobile releases -->
      <!-- <pre>{{ releases }}</pre> -->
      <div v-if="releases.length > 0" class="block px-2 sm:hidden">
        <!-- lable section, create band button, band title, date created, view, edit -->
        <!-- card Container -->
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Releases</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/releasecreate' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Release</NuxtLink
            >
          </div>
        </div>
        <section class="shadow-xl h-[400px] overflow-auto">
          <ul>
            <li
              v-for="(r, index) in releases"
              :key="r.title + index"
              class="flex flex-col py-4"
            >
              <p class="flex-grow text-xl font-bold">Title :{{ r.title }}</p>
              <p class="flex-grow text-xl font-bold">Band :{{ r.band }}</p>
              <p class="flex-grow texl-lg font-bold">
                Created on
                {{ moment(String(r.created_at)).format('MMM Do') }}
              </p>
              <div class="mt-4">
                <NuxtLink
                  :to="{
                    path: '/releaseview',
                    query: {
                      realease: r.id,
                      band: r.band.bandName,
                      bandId: r.bandId,
                    },
                  }"
                  class="chedder py-2 px-4 border-2 border-black"
                >
                  View</NuxtLink
                >
                <NuxtLink
                  :to="{
                    path: '/releaseview',
                    query: {
                      realease: r.id,
                      band: r.band.bandName,
                      bandId: r.bandId,
                    },
                  }"
                  class="chedder py-2 px-4 border-2 border-black ml-2"
                  >Edit</NuxtLink
                >
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Releases</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/releasecreate' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Release</NuxtLink
            >
          </div>
        </div>
        <h3>No Releases Added</h3>
      </div>

      <!-- merch  -->
      <!-- desktop merch -->
      <div v-if="merch.length > 0" class="mt-6 hidden sm:block">
        <div class="h-[74px] w-full bord bg-black flex items-center px-[16px]">
          <p class="text-2xl chedder text-white flex-grow">Merch</p>
          <div>
            <nuxtLink
              :to="{ path: '/createmerch' }"
              class="chedder text-2xl text-white flex-1 text-left border-2 border-white px-4 py-2"
              >+ Create Merch
            </nuxtLink>
          </div>
        </div>
        <table class="w-full">
          <tr>
            <th>Product</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>

          <tr v-for="(m, index) in merch" :key="m.productName + index">
            <td v-if="m.productImage">
              <img :src="m.productImage.formats.thumbnail.url" alt="" />
            </td>
            <td v-else>No Image</td>
            <td>{{ m.productName }}</td>
            <!-- <td>{{ moment(String(venue.created_at)).format('MMM Do') }}</td> -->
            <td>
              <div class="flex gap-6">
                <nuxtLink
                  :to="{
                    path: '/merchview',
                    query: { merch: m.id, band: m.bandName, band: m.bandId },
                  }"
                  class="btn_custom"
                  >View
                </nuxtLink>
                <nuxtLink
                  :to="{
                    path: '/merchview',
                    query: { merch: m.id, band: m.bandName, band: m.bandId },
                  }"
                  class="btn_custom"
                  >Edit</nuxtLink
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Merch</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/createmerch' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Merch</NuxtLink
            >
          </div>
        </div>
        <h3>No Merch Added</h3>
      </div>
      <div v-if="merch.length > 0" class="block px-2 sm:hidden">
        <!-- lable section, create band button, band title, date created, view, edit -->
        <!-- card Container -->
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Merch</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{
                path: '/createmerch',
              }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Merch</NuxtLink
            >
          </div>
        </div>
        <section class="shadow-xl max-h-[400px] overflow-auto">
          <ul>
            <li
              v-for="(m, index) in merch"
              :key="m.productName + index"
              class="flex flex-col py-4"
            >
              <p class="flex-grow text-xl font-bold">
                Product :{{ m.productName }}
              </p>
              <div v-if="m.productImage">
                <img :src="m.productImage.formats.thumbnail.url" alt="" />
              </div>
              <p class="flex-grow text-xl font-bold">Band :{{ m.band }}</p>
              <p class="flex-grow texl-lg font-bold">
                Created on
                {{ moment(String(m.created_at)).format('MMM Do') }}
              </p>
              <div class="mt-4">
                <NuxtLink
                  :to="{
                    path: '/merchview',
                    query: {
                      merch: m.id,
                      bandId: m.bandId,
                    },
                  }"
                  class="chedder py-2 px-4 border-2 border-black"
                >
                  View</NuxtLink
                >
                <NuxtLink
                  :to="{
                    path: '/merchview',
                    query: {
                      merch: m.id,
                      bandId: m.band.id,
                    },
                  }"
                  class="chedder py-2 px-4 border-2 border-black ml-2"
                  >Edit</NuxtLink
                >
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div v-else class="block px-2 sm:hidden">
        <div class="flex mt-32">
          <h3 class="text-3xl flex-grow mb-4">Merch</h3>
          <div class="pr-2">
            <NuxtLink
              :to="{ path: '/releasecreate' }"
              class="chedder py-2 px-4 border-2 border-black"
              >+ Add Merch</NuxtLink
            >
          </div>
        </div>
        <h3>No Merch Added</h3>
      </div>
    </div>
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
      merch: [],
      formValues: {},
      updateForm: false,
      username: '',
      email: '',
      profileImg: '',
      userImage:
        'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
      user: {},
    }
  },
  async mounted() {
    try {
      const user = await this.$strapi.findOne('users', this.$strapi.user.id)
      console.log(user)
      this.user = user
    } catch (error) {}
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
      this.bands = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong'
    }
    this.bands.forEach((b) => {
      if (b.releases) {
        b.releases.forEach((r, index) => {
          this.releases.push({ ...r, band: b.bandName, bandId: b.id })
        })
      }
    })
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
      this.error = 'sorry ... something went wrong'
    }

    try {
      this.venues = await this.$strapi.find('venues', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong'
    }
    try {
      this.classifieds = await this.$strapi.find('classifieds', {
        users_permissions_user: this.$strapi.user.id,
      })
    } catch (error) {
      this.error = 'sorry ... something went wrong'
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
    cancelUpdate: function () {
      this.updateForm = false
    },
    update: function () {
      this.updateForm = !this.updateForm
    },
    async updateUser() {
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
          window.location.reload(true)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async accountUpdate() {
      try {
        const updated = await this.$strapi.update(
          'users',
          this.$strapi.user.id,
          { acc: 1 }
        )
        console.log(updated)
      } catch (error) {
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
