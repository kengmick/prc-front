<template>
  <div
    style="z-index: 9999999; overflow: scroll"
    class="h-screen w-screen fixed bg-gray-50 top-0"
  >
    <div class="pt-[20px] pr-[20px]" @click="toggleSearch">
      <nuxt-img
        src="close_black.svg"
        width="20"
        height="20"
        class="ml-auto mb-[20px]"
      />
    </div>
    <!-- index tabs  -->
    <section class="px-4 mb-6">
      <div class="flex justify-between mt-4">
        <h2
          :class="{ isActive: bandActive }"
          class="text-xl"
          @click="changeIndex('bands')"
        >
          Bands
        </h2>
        <h2
          :class="{ isActive: distroActive }"
          class="text-xl"
          @click="changeIndex('record-labels')"
        >
          Distros
        </h2>
        <h2
          :class="{ isActive: showActive }"
          class="text-xl"
          @click="changeIndex('events')"
        >
          Showz
        </h2>
        <h2
          :class="{ isActive: venueActive }"
          class="text-xl"
          @click="changeIndex('venue')"
        >
          Venue
        </h2>
        <h2
          :class="{ isActive: tourActive }"
          class="text-xl"
          @click="changeIndex('tours')"
        >
          Tour
        </h2>
        <h2
          :class="{ isActive: classifiedActive }"
          class="text-xl"
          @click="changeIndex('classified')"
        >
          Classified
        </h2>
      </div>
    </section>

    <ais-instant-search :search-client="searchClient" :index-name="index">
      <section class="flex justify-center items-center w-auto mb-6">
        <ais-search-box
          class="relative"
          id="a"
          :classNames="{
            'ais-SearchBox': 'searchBox',
            'ais-SearchBox-input': 'searchFormCustom',
          }"
        >
          <template v-slot:submit-icon
            ><nuxt-img
              src="search.svg"
              width="20"
              height="20"
              class="absolute right-[20px] top-[3px]"
          /></template>
        </ais-search-box>
      </section>
      <section class="w-[90vw] mx-auto mb-6">
        <div v-if="index == 'bands'">
          <!-- Genre filters -->
          <div class="flex items-center mb-4">
            <h3 class="mr-4">Filter By Genre</h3>
            <FormulateInput v-model="genre" type="checkbox" />
          </div>
          <FormulateForm v-if="genre" v-model="genreSelected" class="mb-4">
            <FormulateInput
              name="genre"
              :options="{
                oldPunk: 'Old Punk',
                hardCore: 'HardCore',
                streetSkate: 'Street/Skate',
                oi: 'Oi!',
                crust: 'Crust',
                skaSurf: 'Ska/Surf',
                melodicPop: 'Melodic/Pop',
                anarchoPeace: 'Anarcho/Peace',
                other: 'Other',
              }"
              type="select"
              label="What is the genre"
              wrapper-class="sm:w-4/5 m-auto"
              element-class="w-full"
              errors-class="sm:w-4/5 m-auto"
            />
          </FormulateForm>
        </div>

        <div v-if="index !== 'classified'" class="flex items-center">
          <h3 class="mr-4">Filter By Location</h3>
          <FormulateInput v-model="locationFilter" type="checkbox" />
        </div>

        <FormulateForm v-if="locationFilter" v-model="formValues">
          <FormulateInput
            name="country"
            label="country"
            wrapper-class="sm:w-4/5 m-auto"
            :options="ct"
            placeholder="select a country"
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
            type="select"
            @change="formValues.country = $event.target.value"
          />
          <FormulateInput
            v-if="formValues.country === 'United States'"
            name="state"
            label="State"
            :options="Object.keys(cs)"
            placeholder="select a state"
            wrapper-class="sm:w-4/5 m-auto"
            element-class="w-full"
            errors-class="sm:w-4/5 m-auto"
            type="select"
            @change="formValues.city = ''"
          />
          <div class="sm:w-4/5 m-auto mb-[2rem]">
            <label for="city" class="label">City</label>
            <input
              v-model="formValues.city"
              class="dropdown"
              list="city"
              name="city"
              placeholder="type or select the city"
            />
            <datalist id="city">
              <option
                v-for="city in cs[formValues.state]"
                :key="city"
                :value="city"
              ></option>
            </datalist>
          </div>
        </FormulateForm>
      </section>
      <!-- <ais-refinement-list attribute="country" /> -->
      <!-- data results  -->
      <ais-state-results>
        <template v-slot="{ state: { query } }">
          <ais-hits v-if="query.length >= 0">
            <template v-slot="{ items }">
              <!-- tours  -->

              <ul
                v-if="locationFilter && index === 'tours'"
                class="container flex flex-col items-center mt-10"
              >
                <li
                  v-for="item in items"
                  :key="item.objectID"
                  @click="toggleSearch"
                >
                  <!-- add location filter if user choses and show the filter selection  -->
                  <!-- need to know what are the location filters .... is it city state so on  -->
                  <div>
                    <div
                      v-for="show in item.events.filter((i) => {
                        if (formValues.country && !formValues.state) {
                          return i.country === formValues.country
                        }
                        if (
                          formValues.country &&
                          formValues.state &&
                          !formValues.city
                        ) {
                          return (
                            i.country === formValues.country &&
                            i.state === formValues.state
                          )
                        }
                        if (
                          formValues.country &&
                          formValues.state &&
                          formValues.city
                        ) {
                          return (
                            i.country === formValues.country &&
                            i.state === formValues.state &&
                            i.city === formValues.city
                          )
                        }
                      })"
                      :key="show.title"
                    >
                      <NuxtLink
                        :to="{
                          path: '/tours',
                          query: {
                            tours: item.id.replace('tours-', ''),
                          },
                        }"
                        class="text-xl chedder text-blue-700"
                      >
                        <CardsTourCard :tour="trimId(item)" :key="item.name" />
                      </NuxtLink>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- regular filter function -->
              <ul
                v-if="locationFilter && index !== 'tours'"
                class="container flex flex-col items-center mt-10"
              >
                <li
                  v-for="item in items.filter((i) => {
                    if (formValues.country && !formValues.state) {
                      return i.country === formValues.country
                    }
                    if (formValues.country && !formValues.state) {
                      return i.country === formValues.country
                    }
                    if (
                      formValues.country &&
                      formValues.state &&
                      !formValues.city
                    ) {
                      return (
                        i.country === formValues.country &&
                        i.state === formValues.state
                      )
                    }
                    if (
                      formValues.country &&
                      formValues.state &&
                      formValues.city
                    ) {
                      return (
                        i.country === formValues.country &&
                        i.state === formValues.state &&
                        i.city === formValues.city
                      )
                    }
                  })"
                  :key="item.objectID"
                  @click="toggleSearch"
                >
                  <!-- add location filter if user choses and show the filter selection  -->
                  <div>
                    <NuxtLink
                      v-if="index === 'bands'"
                      :to="{
                        path: '/bands/bandprofile',
                        query: {
                          band: item.id.replace('bands-', ''),
                        },
                      }"
                      class="text-xl chedder z-20"
                      style="z-index: 9999"
                    >
                      <!-- write condition for location filter -->
                      <div v-if="genreSelected">
                        <PosterCard
                          v-if="item.genreAlt === genreSelected.genre"
                          class="mb-10"
                          style="z-index: -9999"
                          :band="trimId(item)"
                          :isFeatured="true"
                          :isHome="true"
                          disableAll
                        />
                      </div>
                      <div v-if="!genreSelected">
                        <PosterCard
                          class="mb-10"
                          style="z-index: -9999"
                          :band="trimId(item)"
                          :isFeatured="true"
                          :isHome="true"
                          disableAll
                        />
                      </div>
                    </NuxtLink>
                  </div>

                  <NuxtLink
                    v-if="index === 'record-labels'"
                    :to="{
                      path: '/distros/distroview',
                      query: {
                        distro: item.id.replace('record-labels-', ''),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsDistroCard disableAll :distro="trimId(item)" />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'events'"
                    :to="{
                      path: '/events/eventview',
                      query: {
                        event: item.id.replace('events-', ''),
                      },
                    }"
                    class="text-xl chedder z-20"
                    style="z-index: 9999"
                  >
                    <CardsShowCard
                      class="mb-10"
                      style="z-index: -9999"
                      :event="trimId(item)"
                      :isFeatured="true"
                      :isHome="true"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'venue'"
                    :to="{
                      path: '/venues/venueprofile',
                      query: {
                        venues: item.id.replace('venues-', ''),
                      },
                    }"
                    class="text-xl chedder z-20"
                    style="z-index: 9999"
                  >
                    <CardsVenueCard
                      class="mb-10"
                      style="z-index: -9999"
                      :venue="trimId(item)"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'classified'"
                    :to="{
                      path: '/classified/classifiedview',
                      query: {
                        article: item.id.replace('classifieds-', ''),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsClassifiedCard
                      style="z-index: -9999"
                      class="mx-auto"
                      :article="trimId(item)"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'tours'"
                    :to="{
                      path: '/tours',
                      query: {
                        tours: item.id.replace('tours-', ''),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsTourCard :tour="trimId(item)" :key="item.name" />
                  </NuxtLink>
                </li>
              </ul>

              <ul
                v-if="!locationFilter"
                class="container flex flex-col items-center mt-10"
              >
                <li
                  v-for="item in items"
                  :key="item.objectID"
                  @click="toggleSearch"
                >
                  <!-- add location filter if user choses and show the filter selection  -->
                  <div>
                    <NuxtLink
                      v-if="index === 'bands'"
                      :to="{
                        path: '/bands/bandprofile',
                        query: {
                          band: item.id.replace('bands-', ''),
                        },
                      }"
                      class="text-xl chedder z-20"
                      style="z-index: 9999"
                    >
                      <!-- write condition for location filter -->
                      <div v-if="genreSelected">
                        <PosterCard
                          v-if="item.genreAlt === genreSelected.genre"
                          class="mb-10"
                          style="z-index: -9999"
                          :band="trimId(item)"
                          :isFeatured="true"
                          :isHome="true"
                          disableAll
                        />
                      </div>
                      <div v-if="!genreSelected">
                        <PosterCard
                          class="mb-10"
                          style="z-index: -9999"
                          :band="trimId(item)"
                          :isFeatured="true"
                          :isHome="true"
                          disableAll
                        />
                      </div>
                    </NuxtLink>
                  </div>

                  <NuxtLink
                    v-if="index === 'record-labels'"
                    :to="{
                      path: '/distros/distroview',
                      query: {
                        distro: item.id.replace('record-labels-', ''),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsDistroCard disableAll :distro="trimId(item)" />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'events'"
                    :to="{
                      path: '/events/eventview',
                      query: {
                        event: item.id.replace('events-', ''),
                      },
                    }"
                    class="text-xl chedder z-20"
                    style="z-index: 9999"
                  >
                    <CardsShowCard
                      class="mb-10"
                      style="z-index: -9999"
                      :event="trimId(item)"
                      :isFeatured="true"
                      :isHome="true"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'venue'"
                    :to="{
                      path: '/venues/venueprofile',
                      query: {
                        venues: item.id.replace('venues-', ''),
                      },
                    }"
                    class="text-xl chedder z-20"
                    style="z-index: 9999"
                  >
                    <CardsVenueCard
                      class="mb-10"
                      style="z-index: -9999"
                      :venue="trimId(item)"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'classified'"
                    :to="{
                      path: '/classified/classifiedview',
                      query: {
                        article: item.id.replace('classifieds-', ''),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsClassifiedCard
                      style="z-index: -9999"
                      class="mx-auto"
                      :article="trimId(item)"
                    />
                  </NuxtLink>

                  <NuxtLink
                    v-if="index === 'tours'"
                    :to="{
                      path: '/tours',
                      query: {
                        tours: item.id.replace('tours-', ''),
                      },
                    }"
                    class="text-xl chedder text-blue-700"
                  >
                    <CardsTourCard :tour="trimId(item)" :key="item.name" />
                  </NuxtLink>
                </li>
              </ul>
            </template>
          </ais-hits>
          <div class="hidden" v-else></div>
        </template>
      </ais-state-results>
    </ais-instant-search>
  </div>
</template>
<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisStateResults,
  // AisRefinementList,
} from 'vue-instantsearch'
export default {
  components: {
    // AisRefinementList,
    AisInstantSearch,
    AisSearchBox,
    AisHits,
    AisStateResults,
  },

  data() {
    return {
      locationFilter: false,
      formValues: {},
      city: '',
      country: '',
      genre: false,
      genreSelected: '',
      searchClient: instantMeiliSearch(
        // 'http://localhost:1337',
        'https://prcsearch.net',
        // 'https://punkrockcompound.com',
        'OTRmM2M3MGE3NGJlN2FlMGIxYWMwN2E2'
      ),
      index: 'bands',
      bandActive: true,
      distroActive: false,
      showActive: false,
      venueActive: false,
      tourActive: false,
      classifiedActive: false,
      ct: [
        'United States',
        'Canada',
        'Afghanistan',
        'Albania',
        'Algeria',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antarctica',
        'Antigua and/or Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Bouvet Island',
        'Brazil',
        'British Indian Ocean Territory',
        'Brunei Darussalam',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Cape Verde',
        'Cayman Islands',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Christmas Island',
        'Cocos (Keeling) Islands',
        'Colombia',
        'Comoros',
        'Congo',
        'Cook Islands',
        'Costa Rica',
        'Croatia (Hrvatska)',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'East Timor',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'England',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Ethiopia',
        'Falkland Islands (Malvinas)',
        'Faroe Islands',
        'Fiji',
        'Finland',
        'France',
        'France, Metropolitan',
        'French Guiana',
        'French Polynesia',
        'French Southern Territories',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guadeloupe',
        'Guam',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Heard and Mc Donald Islands',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran (Islamic Republic of)',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Ivory Coast',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        "Korea, Democratic People's Republic of",
        'Korea, Republic of',
        'Kuwait',
        'Kyrgyzstan',
        "Lao People's Democratic Republic",
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libyan Arab Jamahiriya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macau',
        'Macedonia',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Martinique',
        'Mauritania',
        'Mauritius',
        'Mayotte',
        'Mexico',
        'Micronesia, Federated States of',
        'Moldova, Republic of',
        'Monaco',
        'Mongolia',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'Netherlands Antilles',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Niue',
        'Norfolk Island',
        'Northern Ireland',
        'Northern Mariana Islands',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Pitcairn',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Reunion',
        'Romania',
        'Russian Federation',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Scotland',
        'Senegal',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Georgia South Sandwich Islands',
        'Spain',
        'Sri Lanka',
        'St. Helena',
        'St. Pierre and Miquelon',
        'Sudan',
        'Suriname',
        'Svalbard and Jan Mayen Islands',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syrian Arab Republic',
        'Taiwan',
        'Tajikistan',
        'Tanzania, United Republic of',
        'Thailand',
        'Togo',
        'Tokelau',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks and Caicos Islands',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United States minor outlying islands',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City State',
        'Venezuela',
        'Vietnam',
        'Virgin Islands (British)',
        'Virgin Islands (U.S.)',
        'Wales',
        'Wallis and Futuna Islands',
        'Western Sahara',
        'Yemen',
        'Yugoslavia',
        'Zaire',
        'Zambia',
        'Zimbabwe',
      ],
      cs: {
        Alabama: [
          'Birmingham',
          'Montgomery',
          'Mobile',
          'Huntsville',
          'Tuscaloosa',
          'Hoover',
          'Dothan',
          'Auburn',
          'Decatur',
          'Madison',
          'Florence',
          'Gadsden',
        ],
        Alaska: ['Anchorage'],

        Arizona: [
          'Phoenix',
          'Tucson',
          'Mesa',
          'Chandler',
          'Glendale',
          'Scottsdale',
          'Gilbert',
          'Tempe',
          'Peoria',
          'Surprise',
          'Yuma',
          'Avondale',
          'Goodyear',
          'Flagstaff',
          'Buckeye',
          'Lake Havasu City',
          'Casa Grande',
          'Sierra Vista',
          'Maricopa',
          'Oro Valley',
          'Prescott',
          'Bullhead City',
          'Prescott Valley',
          'Marana',
          'Apache Junction',
        ],
        Arkansas: [
          'Little Rock',
          'Fort Smith',
          'Fayetteville',
          'Springdale',
          'Jonesboro',
          'North Little Rock',
          'Conway',
          'Rogers',
          'Pine Bluff',
          'Bentonville',
        ],
        California: [
          'Los Angeles',
          'San Diego',
          'San Jose',
          'San Francisco',
          'Fresno',
          'Sacramento',
          'Long Beach',
          'Oakland',
          'Bakersfield',
          'Anaheim',
          'Santa Ana',
          'Riverside',
          'Stockton',
          'Chula Vista',
          'Irvine',
          'Fremont',
          'San Bernardino',
          'Modesto',
          'Fontana',
          'Oxnard',
          'Moreno Valley',
          'Huntington Beach',
          'Glendale',
          'Santa Clarita',
          'Garden Grove',
          'Oceanside',
          'Rancho Cucamonga',
          'Santa Rosa',
          'Ontario',
          'Lancaster',
          'Elk Grove',
          'Corona',
          'Palmdale',
          'Salinas',
          'Pomona',
          'Hayward',
          'Escondido',
          'Torrance',
          'Sunnyvale',
          'Orange',
          'Fullerton',
          'Pasadena',
          'Thousand Oaks',
          'Visalia',
          'Simi Valley',
          'Concord',
          'Roseville',
          'Victorville',
          'Santa Clara',
          'Vallejo',
          'Berkeley',
          'El Monte',
          'Downey',
          'Costa Mesa',
          'Inglewood',
          'Carlsbad',
          'San Buenaventura (Ventura)',
          'Fairfield',
          'West Covina',
          'Murrieta',
          'Richmond',
          'Norwalk',
          'Antioch',
          'Temecula',
          'Burbank',
          'Daly City',
          'Rialto',
          'Santa Maria',
          'El Cajon',
          'San Mateo',
          'Clovis',
          'Compton',
          'Jurupa Valley',
          'Vista',
          'South Gate',
          'Mission Viejo',
          'Vacaville',
          'Carson',
          'Hesperia',
          'Santa Monica',
          'Westminster',
          'Redding',
          'Santa Barbara',
          'Chico',
          'Newport Beach',
          'San Leandro',
          'San Marcos',
          'Whittier',
          'Hawthorne',
          'Citrus Heights',
          'Tracy',
          'Alhambra',
          'Livermore',
          'Buena Park',
          'Menifee',
          'Hemet',
          'Lakewood',
          'Merced',
          'Chino',
          'Indio',
        ],
        Colorado: [
          'Denver',
          'Colorado Springs',
          'Aurora',
          'Fort Collins',
          'Lakewood',
          'Thornton',
          'Arvada',
          'Westminster',
          'Pueblo',
          'Centennial',
          'Boulder',
          'Greeley',
          'Longmont',
          'Loveland',
          'Grand Junction',
          'Broomfield',
          'Castle Rock',
          'Commerce City',
          'Parker',
          'Littleton',
          'Northglenn',
        ],
        Connecticut: [
          'Bridgeport',
          'New Haven',
          'Stamford',
          'Hartford',
          'Waterbury',
          'Norwalk',
          'Danbury',
          'New Britain',
          'Meriden',
          'Bristol',
          'West Haven',
          'Milford',
          'Middletown',
          'Norwich',
          'Shelton',
        ],
        Delaware: ['Wilmington', 'Dover'],
        'District of Columbia': ['Washington'],
        Florida: [
          'Jacksonville',
          'Miami',
          'Tampa',
          'Orlando',
          'St. Petersburg',
          'Hialeah',
          'Tallahassee',
          'Fort Lauderdale',
          'Port St. Lucie',
          'Cape Coral',
          'Pembroke Pines',
          'Hollywood',
          'Miramar',
          'Gainesville',
          'Coral Springs',
          'Miami Gardens',
          'Clearwater',
          'Palm Bay',
          'Pompano Beach',
          'West Palm Beach',
          'Lakeland',
          'Davie',
          'Miami Beach',
          'Sunrise',
          'Plantation',
          'Boca Raton',
          'Deltona',
          'Largo',
          'Deerfield Beach',
          'Palm Coast',
          'Melbourne',
          'Boynton Beach',
          'Lauderhill',
          'Weston',
          'Fort Myers',
          'Kissimmee',
          'Homestead',
          'Tamarac',
          'Delray Beach',
          'Daytona Beach',
          'North Miami',
          'Wellington',
          'North Port',
          'Jupiter',
          'Ocala',
          'Port Orange',
          'Margate',
          'Coconut Creek',
          'Sanford',
          'Sarasota',
          'Pensacola',
          'Bradenton',
          'Palm Beach Gardens',
          'Pinellas Park',
          'Coral Gables',
          'Doral',
          'Bonita Springs',
          'Apopka',
          'Titusville',
          'North Miami Beach',
          'Oakland Park',
          'Fort Pierce',
          'North Lauderdale',
          'Cutler Bay',
          'Altamonte Springs',
          'St. Cloud',
          'Greenacres',
          'Ormond Beach',
          'Ocoee',
          'Hallandale Beach',
          'Winter Garden',
          'Aventura',
        ],
        Georgia: [
          'Atlanta',
          'Columbus',
          'Augusta-Richmond County',
          'Savannah',
          'Athens-Clarke County',
          'Sandy Springs',
          'Roswell',
          'Macon',
          'Johns Creek',
          'Albany',
          'Warner Robins',
          'Alpharetta',
          'Marietta',
          'Valdosta',
          'Smyrna',
          'Dunwoody',
        ],
        Hawaii: ['Honolulu'],
        Idaho: [
          'Boise City',
          'Nampa',
          'Meridian',
          'Idaho Falls',
          'Pocatello',
          'Caldwell',
          "Coeur d'Alene",
          'Twin Falls',
        ],
        Illinois: [
          'Chicago',
          'Aurora',
          'Rockford',
          'Joliet',
          'Naperville',
          'Springfield',
          'Peoria',
          'Elgin',
          'Waukegan',
          'Cicero',
          'Champaign',
          'Bloomington',
          'Arlington Heights',
          'Evanston',
          'Decatur',
          'Schaumburg',
          'Bolingbrook',
          'Palatine',
          'Skokie',
          'Des Plaines',
          'Orland Park',
          'Tinley Park',
          'Oak Lawn',
          'Berwyn',
          'Mount Prospect',
          'Normal',
          'Wheaton',
          'Hoffman Estates',
          'Oak Park',
          'Downers Grove',
          'Elmhurst',
          'Glenview',
          'DeKalb',
          'Lombard',
          'Belleville',
          'Moline',
          'Buffalo Grove',
          'Bartlett',
          'Urbana',
          'Quincy',
          'Crystal Lake',
          'Plainfield',
          'Streamwood',
          'Carol Stream',
          'Romeoville',
          'Rock Island',
          'Hanover Park',
          'Carpentersville',
          'Wheeling',
          'Park Ridge',
          'Addison',
          'Calumet City',
        ],
        Indiana: [
          'Indianapolis',
          'Fort Wayne',
          'Evansville',
          'South Bend',
          'Carmel',
          'Bloomington',
          'Fishers',
          'Hammond',
          'Gary',
          'Muncie',
          'Lafayette',
          'Terre Haute',
          'Kokomo',
          'Anderson',
          'Noblesville',
          'Greenwood',
          'Elkhart',
          'Mishawaka',
          'Lawrence',
          'Jeffersonville',
          'Columbus',
          'Portage',
        ],
        Iowa: [
          'Des Moines',
          'Cedar Rapids',
          'Davenport',
          'Sioux City',
          'Iowa City',
          'Waterloo',
          'Council Bluffs',
          'Ames',
          'West Des Moines',
          'Dubuque',
          'Ankeny',
          'Urbandale',
          'Cedar Falls',
        ],
        Kansas: [
          'Wichita',
          'Overland Park',
          'Kansas City',
          'Olathe',
          'Topeka',
          'Lawrence',
          'Shawnee',
          'Manhattan',
          'Lenexa',
          'Salina',
          'Hutchinson',
        ],
        Kentucky: [
          'Louisville/Jefferson County',
          'Lexington-Fayette',
          'Bowling Green',
          'Owensboro',
          'Covington',
        ],
        Louisiana: [
          'New Orleans',
          'Baton Rouge',
          'Shreveport',
          'Lafayette',
          'Lake Charles',
          'Kenner',
          'Bossier City',
          'Monroe',
          'Alexandria',
        ],
        Maine: ['Portland'],
        Maryland: [
          'Baltimore',
          'Frederick',
          'Rockville',
          'Gaithersburg',
          'Bowie',
          'Hagerstown',
          'Annapolis',
        ],
        Massachusetts: [
          'Boston',
          'Worcester',
          'Springfield',
          'Lowell',
          'Cambridge',
          'New Bedford',
          'Brockton',
          'Quincy',
          'Lynn',
          'Fall River',
          'Newton',
          'Lawrence',
          'Somerville',
          'Waltham',
          'Haverhill',
          'Malden',
          'Medford',
          'Taunton',
          'Chicopee',
          'Weymouth Town',
          'Revere',
          'Peabody',
          'Methuen',
          'Barnstable Town',
          'Pittsfield',
          'Attleboro',
          'Everett',
          'Salem',
          'Westfield',
          'Leominster',
          'Fitchburg',
          'Beverly',
          'Holyoke',
          'Marlborough',
          'Woburn',
          'Chelsea',
        ],
        Michigan: [
          'Detroit',
          'Grand Rapids',
          'Warren',
          'Sterling Heights',
          'Ann Arbor',
          'Lansing',
          'Flint',
          'Dearborn',
          'Livonia',
          'Westland',
          'Troy',
          'Farmington Hills',
          'Kalamazoo',
          'Wyoming',
          'Southfield',
          'Rochester Hills',
          'Taylor',
          'Pontiac',
          'St. Clair Shores',
          'Royal Oak',
          'Novi',
          'Dearborn Heights',
          'Battle Creek',
          'Saginaw',
          'Kentwood',
          'East Lansing',
          'Roseville',
          'Portage',
          'Midland',
          'Lincoln Park',
          'Muskegon',
        ],
        Minnesota: [
          'Minneapolis',
          'St. Paul',
          'Rochester',
          'Duluth',
          'Bloomington',
          'Brooklyn Park',
          'Plymouth',
          'St. Cloud',
          'Eagan',
          'Woodbury',
          'Maple Grove',
          'Eden Prairie',
          'Coon Rapids',
          'Burnsville',
          'Blaine',
          'Lakeville',
          'Minnetonka',
          'Apple Valley',
          'Edina',
          'St. Louis Park',
          'Mankato',
          'Maplewood',
          'Moorhead',
          'Shakopee',
        ],
        Mississippi: [
          'Jackson',
          'Gulfport',
          'Southaven',
          'Hattiesburg',
          'Biloxi',
          'Meridian',
        ],
        Missouri: [
          'Kansas City',
          'St. Louis',
          'Springfield',
          'Independence',
          'Columbia',
          "Lee's Summit",
          "O'Fallon",
          'St. Joseph',
          'St. Charles',
          'St. Peters',
          'Blue Springs',
          'Florissant',
          'Joplin',
          'Chesterfield',
          'Jefferson City',
          'Cape Girardeau',
        ],
        Montana: ['Billings', 'Missoula', 'Great Falls', 'Bozeman'],
        Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island'],
        Nevada: [
          'Las Vegas',
          'Henderson',
          'Reno',
          'North Las Vegas',
          'Sparks',
          'Carson City',
        ],
        'New Hampshire': ['Manchester', 'Nashua', 'Concord'],
        'New Jersey': [
          'Newark',
          'Jersey City',
          'Paterson',
          'Elizabeth',
          'Clifton',
          'Trenton',
          'Camden',
          'Passaic',
          'Union City',
          'Bayonne',
          'East Orange',
          'Vineland',
          'New Brunswick',
          'Hoboken',
          'Perth Amboy',
          'West New York',
          'Plainfield',
          'Hackensack',
          'Sayreville',
          'Kearny',
          'Linden',
          'Atlantic City',
        ],
        'New Mexico': [
          'Albuquerque',
          'Las Cruces',
          'Rio Rancho',
          'Santa Fe',
          'Roswell',
          'Farmington',
          'Clovis',
        ],
        'New York': [
          'New York',
          'Buffalo',
          'Rochester',
          'Yonkers',
          'Syracuse',
          'Albany',
          'New Rochelle',
          'Mount Vernon',
          'Schenectady',
          'Utica',
          'White Plains',
          'Hempstead',
          'Troy',
          'Niagara Falls',
          'Binghamton',
          'Freeport',
          'Valley Stream',
        ],
        'North Carolina': [
          'Charlotte',
          'Raleigh',
          'Greensboro',
          'Durham',
          'Winston-Salem',
          'Fayetteville',
          'Cary',
          'Wilmington',
          'High Point',
          'Greenville',
          'Asheville',
          'Concord',
          'Gastonia',
          'Jacksonville',
          'Chapel Hill',
          'Rocky Mount',
          'Burlington',
          'Wilson',
          'Huntersville',
          'Kannapolis',
          'Apex',
          'Hickory',
          'Goldsboro',
        ],
        'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot'],
        Ohio: [
          'Columbus',
          'Cleveland',
          'Cincinnati',
          'Toledo',
          'Akron',
          'Dayton',
          'Parma',
          'Canton',
          'Youngstown',
          'Lorain',
          'Hamilton',
          'Springfield',
          'Kettering',
          'Elyria',
          'Lakewood',
          'Cuyahoga Falls',
          'Middletown',
          'Euclid',
          'Newark',
          'Mansfield',
          'Mentor',
          'Beavercreek',
          'Cleveland Heights',
          'Strongsville',
          'Dublin',
          'Fairfield',
          'Findlay',
          'Warren',
          'Lancaster',
          'Lima',
          'Huber Heights',
          'Westerville',
          'Marion',
          'Grove City',
        ],
        Oklahoma: [
          'Oklahoma City',
          'Tulsa',
          'Norman',
          'Broken Arrow',
          'Lawton',
          'Edmond',
          'Moore',
          'Midwest City',
          'Enid',
          'Stillwater',
          'Muskogee',
        ],
        Oregon: [
          'Portland',
          'Eugene',
          'Salem',
          'Gresham',
          'Hillsboro',
          'Beaverton',
          'Bend',
          'Medford',
          'Springfield',
          'Corvallis',
          'Albany',
          'Tigard',
          'Lake Oswego',
          'Keizer',
        ],
        Pennsylvania: [
          'Philadelphia',
          'Pittsburgh',
          'Allentown',
          'Erie',
          'Reading',
          'Scranton',
          'Bethlehem',
          'Lancaster',
          'Harrisburg',
          'Altoona',
          'York',
          'State College',
          'Wilkes-Barre',
        ],
        'Rhode Island': [
          'Providence',
          'Warwick',
          'Cranston',
          'Pawtucket',
          'East Providence',
          'Woonsocket',
        ],
        'South Carolina': [
          'Columbia',
          'Charleston',
          'North Charleston',
          'Mount Pleasant',
          'Rock Hill',
          'Greenville',
          'Summerville',
          'Sumter',
          'Goose Creek',
          'Hilton Head Island',
          'Florence',
          'Spartanburg',
        ],
        'South Dakota': ['Sioux Falls', 'Rapid City'],
        Tennessee: [
          'Memphis',
          'Nashville-Davidson',
          'Knoxville',
          'Chattanooga',
          'Clarksville',
          'Murfreesboro',
          'Jackson',
          'Franklin',
          'Johnson City',
          'Bartlett',
          'Hendersonville',
          'Kingsport',
          'Collierville',
          'Cleveland',
          'Smyrna',
          'Germantown',
          'Brentwood',
        ],
        Texas: [
          'Houston',
          'San Antonio',
          'Dallas',
          'Austin',
          'Fort Worth',
          'El Paso',
          'Arlington',
          'Corpus Christi',
          'Plano',
          'Laredo',
          'Lubbock',
          'Garland',
          'Irving',
          'Amarillo',
          'Grand Prairie',
          'Brownsville',
          'Pasadena',
          'McKinney',
          'Mesquite',
          'McAllen',
          'Killeen',
          'Frisco',
          'Waco',
          'Carrollton',
          'Denton',
          'Midland',
          'Abilene',
          'Beaumont',
          'Round Rock',
          'Odessa',
          'Wichita Falls',
          'Richardson',
          'Lewisville',
          'Tyler',
          'College Station',
          'Pearland',
          'San Angelo',
          'Allen',
          'League City',
          'Sugar Land',
          'Longview',
          'Edinburg',
          'Mission',
          'Bryan',
          'Baytown',
          'Pharr',
          'Temple',
          'Missouri City',
          'Flower Mound',
          'Harlingen',
          'North Richland Hills',
          'Victoria',
          'Conroe',
          'New Braunfels',
          'Mansfield',
          'Cedar Park',
          'Rowlett',
          'Port Arthur',
          'Euless',
          'Georgetown',
          'Pflugerville',
          'DeSoto',
          'San Marcos',
          'Grapevine',
          'Bedford',
          'Galveston',
          'Cedar Hill',
          'Texas City',
          'Wylie',
          'Haltom City',
          'Keller',
          'Coppell',
          'Rockwall',
          'Huntsville',
          'Duncanville',
          'Sherman',
          'The Colony',
          'Burleson',
          'Hurst',
          'Lancaster',
          'Texarkana',
          'Friendswood',
          'Weslaco',
        ],
        Utah: [
          'Salt Lake City',
          'West Valley City',
          'Provo',
          'West Jordan',
          'Orem',
          'Sandy',
          'Ogden',
          'St. George',
          'Layton',
          'Taylorsville',
          'South Jordan',
          'Lehi',
          'Logan',
          'Murray',
          'Draper',
          'Bountiful',
          'Riverton',
          'Roy',
        ],
        Vermont: ['Burlington'],
        Virginia: [
          'Virginia Beach',
          'Norfolk',
          'Chesapeake',
          'Richmond',
          'Newport News',
          'Alexandria',
          'Hampton',
          'Roanoke',
          'Portsmouth',
          'Suffolk',
          'Lynchburg',
          'Harrisonburg',
          'Leesburg',
          'Charlottesville',
          'Danville',
          'Blacksburg',
          'Manassas',
        ],
        Washington: [
          'Seattle',
          'Spokane',
          'Tacoma',
          'Vancouver',
          'Bellevue',
          'Kent',
          'Everett',
          'Renton',
          'Yakima',
          'Federal Way',
          'Spokane Valley',
          'Bellingham',
          'Kennewick',
          'Auburn',
          'Pasco',
          'Marysville',
          'Lakewood',
          'Redmond',
          'Shoreline',
          'Richland',
          'Kirkland',
          'Burien',
          'Sammamish',
          'Olympia',
          'Lacey',
          'Edmonds',
          'Bremerton',
          'Puyallup',
        ],
        'West Virginia': ['Charleston', 'Huntington'],
        Wisconsin: [
          'Milwaukee',
          'Madison',
          'Green Bay',
          'Kenosha',
          'Racine',
          'Appleton',
          'Waukesha',
          'Eau Claire',
          'Oshkosh',
          'Janesville',
          'West Allis',
          'La Crosse',
          'Sheboygan',
          'Wauwatosa',
          'Fond du Lac',
          'New Berlin',
          'Wausau',
          'Brookfield',
          'Greenfield',
          'Beloit',
        ],
        Wyoming: ['Cheyenne', 'Casper'],
      },
    }
  },
  methods: {
    trimId(meiliItem) {
      if (this.index === 'record-labels') {
        const id = meiliItem.id.replace('record-labels-', '')
        return {
          ...meiliItem,
          id: id,
        }
      }
      const [type, id] = meiliItem.id.split('-')
      console.log('destructured ================', type, id)
      return {
        ...meiliItem,
        id,
        type,
      }
    },
    log() {
      console.log('logs')
    },
    toggleSearch() {
      console.log('toggleSearch')
      this.$emit('toggleSearch')
      console.log('has emited')
    },
    changeIndex(selectedIndex) {
      const indexes = [
        'bands',
        'distros',
        'shows',
        'venue',
        'tours',
        'classified',
      ]
      for (let i = 0; i < indexes.length; i++) {
        if (selectedIndex === 'bands') {
          console.log('this is the index from the change index function')
          this.distroActive = false
          this.showActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.tourActive = false
          this.index = selectedIndex
          return (this.bandActive = true)
        }
        if (selectedIndex === 'record-labels') {
          this.bandActive = false
          this.showActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.tourActive = false
          this.index = 'record-labels'
          return (this.distroActive = true)
        }
        if (selectedIndex === 'events') {
          this.bandActive = false
          this.distroActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.tourActive = false
          this.index = selectedIndex
          return (this.showActive = true)
        }
        if (selectedIndex === 'tours') {
          this.bandActive = false
          this.distroActive = false
          this.showActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.formValues = {}
          this.index = selectedIndex
          return (this.tourActive = true)
        }
        if (selectedIndex === 'venue') {
          this.bandActive = false
          this.distroActive = false
          this.showActive = false
          this.tourActive = false
          this.classifiedActive = false
          this.index = selectedIndex
          return (this.venueActive = true)
        }
        if (selectedIndex === 'classified') {
          this.bandActive = false
          this.tourActive = false
          this.distroActive = false
          this.showActive = false
          this.venueActive = false
          this.classifiedActive = false
          this.locationFilter = false
          this.formValues = {}
          this.index = selectedIndex
          return (this.classifiedActive = true)
        }
      }
      this.index = selectedIndex
    },
  },
}
</script>

<style scoped>
.searchBox {
  width: 90% !important;
  border: 1px solid black;
}

.ais-SearchBox-input {
  width: 300px !important;
  background: red;
  display: none;
}

.isActive {
  color: red !important;
}
</style>
