<template>
  <section class="container mx-auto">
    <section class="px-4">
      <section class="w-[90vw] mx-auto mb-6">
        <div class="flex items-center mt-6">
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
    </section>
    <section
      v-if="events"
      class="flex items-center min-h-[60vh]"
      :class="{ 'pb-[80px]': locationFilter }"
    >
      <div v-if="locationFilter" class="flex gap-2 overflow-y-scroll mb-2">
        <div
          v-for="event in events.filter((i) => {
            if (formValues.country && !formValues.state) {
              return i.country === formValues.country
            }
            if (formValues.country && !formValues.state) {
              return i.country === formValues.country
            }
            if (formValues.country && formValues.state && !formValues.city) {
              return (
                i.country === formValues.country && i.state === formValues.state
              )
            }
            if (formValues.country && formValues.state && formValues.city) {
              return (
                i.country === formValues.country &&
                i.state === formValues.state &&
                i.city === formValues.city
              )
            }
          })"
          :key="event.title"
        >
          <CardsShowCard
            class="mx-auto"
            :event="event"
            @updatedFavs="updatedFavs('events', event.id)"
            :isFav="favCheck('events', event.id)"
          />
        </div>
      </div>
      <div v-if="!locationFilter" class="flex gap-2 overflow-y-scroll mb-2">
        <CardsShowCard
          v-for="event in events"
          :key="event.title"
          class="mx-auto"
          :event="event"
          @updatedFavs="updatedFavs('events', event.id)"
          :isFav="favCheck('events', event.id)"
        />
      </div>
    </section>

    <!-- <div v-if="events" class="container mx-auto">
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
    <section class="container mx-auto">
      <div v-if="oldEvents" class="container mx-auto">
        <section v-if="oldEvents.length > 0" class="container mx-auto">
          <h2 class="text-center">Previous Showz</h2>
          <div
            v-for="(event, index) in oldEvents"
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
    <section v-if="errorMessage">{{ errorMessage }}</section>
  </section>
  <!-- <div v-if="events">
    <h1 class="text-5xl text-center main_red_text my-6">Showz</h1>
    <section class="container mx-auto">
      <div
        v-for="(event, index) in events"
        :key="events.title + index"
        class="shadow-md w-full h-full flex flex-col ms:h-64 sm:my-12 sm:mx-auto sm:flex-row transition-all duration-200 hover:scale-105"
      >
        <div v-if="event.eventPoster" class="w-full sm:w-1/3 h-64">
          <img
            class="h-full w-full object-cover"
            :src="event.eventPoster.url"
            alt=""
          />
        </div>
        <div class="p-6">
          <p class="chedder text-xl inline sm:text-center sm:block">
            {{ moment(String(event.date)).format('MMM') }}
          </p>
          <p class="chedder text-xl inline sm:text-center sm:block">
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
            <p v-if="event.streetAddress && event.streetName" class="text-xl">
              The Vic, {{ event.streetAddress }} {{ event.streetName }} /
              {{ moment(String(event.date)).format('LT') }} -
              {{ moment(event.timeEnds, 'h').format('LT') }}
            </p>
            <p v-if="event.city && event.state" class="text-xl">
              {{ event.city }}, {{ event.state }}
            </p>
          </div>
          <div class="flex-grow flex items-center my-4 sm:my-0">
            <NuxtLink
              :to="{ path: 'eventview', query: { event: event.id } }"
              class="border-2 border-black px-4 py-2"
              >View Event</NuxtLink
            >
          </div>
        </div>
      </div>
    </section>
  </div> -->
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      events: '',
      oldEvents: '',
      errorMessage: '',
      favs: null,
      locationFilter: false,
      formValues: {},
      city: '',
      country: '',
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
  async mounted() {
    if (this.$strapi.user) {
      console.log('mounted user ', this)
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
    }
    try {
      const events = await this.$strapi.find('events')
      this.events = events
      // const upcomingEvents = events.filter((e) => {
      //   console.log(moment(e.date).toISOString())
      //   return moment(e.date).toISOString() >= moment().toISOString()
      // })
      // const oldShows = events.filter((e) => {
      //   return moment(e.date).toISOString() < moment().toISOString()
      // })
      // this.oldEvents = oldShows.sort((a, b) => {
      //   return moment.utc(a.date).diff(moment.utc(b.date))
      // })
      // this.events = upcomingEvents.sort((a, b) => {
      //   return moment.utc(a.date).diff(moment.utc(b.date))
      // })
    } catch (error) {
      console.log(error)
      this.errorMessage = 'Sorry there are no events'
    }
    // this means that the events are upcoming
  },

  methods: {
    moment,
    async updatedFavs(type, id) {
      console.log(
        'this is the updated favs event emited from the parent component'
      )
      if (this.$strapi.user) {
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

        if (this.favs !== null) {
          const check = this.favs.filter((f) => {
            console.log('fav checkc ')
            return f.data.id === id
          })
          if (check.length > 0) {
            return true
          }
          console.log(check, ' this is check ')
        }
      }
    },
    favCheck(type, id) {
      console.log('emited from the child component')
      if (this.favs !== null) {
        const check = this.favs.filter((f) => {
          console.log('fav checkc ')
          return f.data.id === id
        })
        if (check.length > 0) {
          return true
        }
        console.log(check, ' this is check ')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
