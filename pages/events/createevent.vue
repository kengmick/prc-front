<template>
  <div>
    <!-- add :  description for members, oldBandShows,, singles, merch somewhere, genre alt  -->
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
                name="headlinerOne"
                label="Headlining Band"
                wrapper-class="m-auto sm:w-4/5 "
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />

              <FormulateInput
                v-if="userBands"
                value="null"
                type="select"
                name="bandName"
                label="Add show to a band you created Optional?"
                :options="{ ...userBands, clear: 'clear form' }"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="clear($event.target.value)"
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
                :options="{ ...userTours, clear: 'clear form' }"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="clearTour($event.target.value)"
              />
              <FormulateInput
                v-if="userVenues"
                value="null"
                type="select"
                name="venueName"
                label="Add Show to your Venue Optional?"
                :options="userVenues"
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
                step="0.000"
                label="Time Event Begins"
                placeholder="5555 wolf ave"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                @change="log($event.target.value)"
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
                name="country"
                label="Country"
                wrapper-class="sm:w-4/5 m-auto"
                :options="ct"
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
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
                type="select"
              />

              <div class="sm:w-4/5 m-auto mb-[2rem]">
                <label for="city" class="label">City</label>
                <input
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

              <imput
                v-if="formValues.country === 'United States'"
                name="city"
                label="City"
                :options="cs[formValues.state] || ''"
                type="select"
                placeholder="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-else-if="formValues.country === 'Northern Ireland'"
                name="city"
                label="City that the band is from?"
                :options="ni"
                type="select"
                placeholder="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-else-if="formValues.country === 'England'"
                name="city"
                label="City that the band is from?"
                :options="England"
                type="select"
                placeholder="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-else-if="formValues.country === 'Scotland'"
                name="city"
                label="City that the band is from?"
                :options="Scotland"
                type="select"
                placeholder="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-else-if="formValues.country === 'Wales'"
                name="city"
                label="City that the band is from?"
                :options="Wales"
                type="select"
                placeholder="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-else-if="formValues.country === 'Ireland'"
                name="city"
                label="City that the band is from?"
                :options="Ireland"
                type="select"
                placeholder="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-else-if="
                  formValues.country !== 'United States' ||
                  'England' ||
                  'Ireland' ||
                  'Wales' ||
                  'Scotland' ||
                  'Northern Ireland'
                "
                label="City that the band is from?"
                placeholder="City"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />
              <FormulateInput
                v-if="
                  !formValues.country || formValues.country === 'United States'
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
                name="addmissionFee"
                type="number"
                placeholder="10.00"
                label="Addmission Fee"
                wrapper-class="sm:w-4/5 m-auto"
                element-class="w-full"
                errors-class="sm:w-4/5 m-auto"
              />

              <div class="sm:w-4/5 m-auto mb-[2rem]">
                <label for="ageRestriction" class="label"
                  >Age Restriction
                </label>
                <input
                  class="dropdown"
                  list="ageRestriction"
                  name="ageRestriction"
                  placeholder="type or select the age restriction policy"
                />
                <datalist id="ageRestriction">
                  <option
                    v-for="age in [
                      'All Ages',
                      '3+',
                      '10+',
                      '12+',
                      '14+',
                      '18+',
                      '21+',
                    ]"
                    :key="age"
                    :value="age"
                  ></option>
                </datalist>
              </div>

              <div class="sm:w-4/5 m-auto mb-[2rem]">
                <label for="alcoholPolicy" class="label">Alcohol Policy </label>
                <input
                  class="dropdown"
                  list="alcoholPolicy"
                  name="alcoholPolicy"
                  placeholder="type or select the alcohol policy"
                />
                <datalist id="alcoholPolicy">
                  <option
                    v-for="policy in [
                      'No Alcohol',
                      'BYOB',
                      'Sold on premisies',
                    ]"
                    :key="policy"
                    :value="policy"
                  ></option>
                </datalist>
              </div>
            </div>
          </div>

          <section class="px-4 mt-10 sm:m-20">
            <!-- <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
              List Bands Playing
            </h2> -->
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
            <FormulateInput
              type="submit"
              label="Next"
              wrapper-class="w-full mt-10 px-4 sm:mx-10"
              grouping-class="bg-black"
              element-class="w-full"
            />
          </div>
        </FormulateForm>
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
      formValues: {},
      errorMessage: '',
      event: {},
      created: false,
      eventPosterFile: '',
      eventPosterFinal: '',
      end: '',
      // profiles to populate form options
      userBands: null,
      userVenues: null,
      userTours: null,
      userDistros: null,
      // profiles array
      bands: [],
      venues: [],
      tours: [],
      distros: [],
      loading: false,
      tour: null,
      tourEvent: null,
      test: {
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
          'Redwood City',
          'Lake Forest',
          'Napa',
          'Tustin',
          'Bellflower',
          'Mountain View',
          'Chino Hills',
          'Baldwin Park',
          'Alameda',
          'Upland',
          'San Ramon',
          'Folsom',
          'Pleasanton',
          'Union City',
          'Perris',
          'Manteca',
          'Lynwood',
          'Apple Valley',
          'Redlands',
          'Turlock',
          'Milpitas',
          'Redondo Beach',
          'Rancho Cordova',
          'Yorba Linda',
          'Palo Alto',
          'Davis',
          'Camarillo',
          'Walnut Creek',
          'Pittsburg',
          'South San Francisco',
          'Yuba City',
          'San Clemente',
          'Laguna Niguel',
          'Pico Rivera',
          'Montebello',
          'Lodi',
          'Madera',
          'Santa Cruz',
          'La Habra',
          'Encinitas',
          'Monterey Park',
          'Tulare',
          'Cupertino',
          'Gardena',
          'National City',
          'Rocklin',
          'Petaluma',
          'Huntington Park',
          'San Rafael',
          'La Mesa',
          'Arcadia',
          'Fountain Valley',
          'Diamond Bar',
          'Woodland',
          'Santee',
          'Lake Elsinore',
          'Porterville',
          'Paramount',
          'Eastvale',
          'Rosemead',
          'Hanford',
          'Highland',
          'Brentwood',
          'Novato',
          'Colton',
          'Cathedral City',
          'Delano',
          'Yucaipa',
          'Watsonville',
          'Placentia',
          'Glendora',
          'Gilroy',
          'Palm Desert',
          'Cerritos',
          'West Sacramento',
          'Aliso Viejo',
          'Poway',
          'La Mirada',
          'Rancho Santa Margarita',
          'Cypress',
          'Dublin',
          'Covina',
          'Azusa',
          'Palm Springs',
          'San Luis Obispo',
          'Ceres',
          'San Jacinto',
          'Lincoln',
          'Newark',
          'Lompoc',
          'El Centro',
          'Danville',
          'Bell Gardens',
          'Coachella',
          'Rancho Palos Verdes',
          'San Bruno',
          'Rohnert Park',
          'Brea',
          'La Puente',
          'Campbell',
          'San Gabriel',
          'Beaumont',
          'Morgan Hill',
          'Culver City',
          'Calexico',
          'Stanton',
          'La Quinta',
          'Pacifica',
          'Montclair',
          'Oakley',
          'Monrovia',
          'Los Banos',
          'Martinez',
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
        'District of Columbia': ['Washington'],
        Maryland: [
          'Baltimore',
          'Frederick',
          'Rockville',
          'Gaithersburg',
          'Bowie',
          'Hagerstown',
          'Annapolis',
        ],
        Kentucky: [
          'Louisville/Jefferson County',
          'Lexington-Fayette',
          'Bowling Green',
          'Owensboro',
          'Covington',
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
        Nevada: [
          'Las Vegas',
          'Henderson',
          'Reno',
          'North Las Vegas',
          'Sparks',
          'Carson City',
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
        Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island'],
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
        Hawaii: ['Honolulu'],
        Alaska: ['Anchorage'],
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
        'Rhode Island': [
          'Providence',
          'Warwick',
          'Cranston',
          'Pawtucket',
          'East Providence',
          'Woonsocket',
        ],
        Mississippi: [
          'Jackson',
          'Gulfport',
          'Southaven',
          'Hattiesburg',
          'Biloxi',
          'Meridian',
        ],
        'South Dakota': ['Sioux Falls', 'Rapid City'],
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
        'New Hampshire': ['Manchester', 'Nashua', 'Concord'],
        'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot'],
        Montana: ['Billings', 'Missoula', 'Great Falls', 'Bozeman'],
        Delaware: ['Wilmington', 'Dover'],
        Maine: ['Portland'],
        Wyoming: ['Cheyenne', 'Casper'],
        'West Virginia': ['Charleston', 'Huntington'],
        Vermont: ['Burlington'],
      },
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
      ni: [
        'Belfast',
        'Derry',
        'Newtownabbey',
        'Craigavon',
        'Armagh City',
        'Banbridge',
        'Bangor',
        'Castlereagh',
        'Lisburn',
        'Ballymena',
        'Newtownards',
        'Carrickfergus',
        'Newry',
        'Coleraine',
        'Antrim',
        'Omagh',
        'Larne',
        'Banbridge',
        'Armagh',
        'Dungannon',
        'Enniskillen',
        'Strabane',
        'Limavady',
        'Cookstown',
        'Holywood',
        'Downpatrick',
        'Ballymoney',
        'Ballyclare',
        'Comber',
        'Magherafelt',
        'Warrenpoint',
        'Portstewart',
        'Newcastle',
        'Carryduff',
        'Donaghadee',
        'Kilkeel',
        'Portrush',
        'Dromore',
        'Ballynahinch',
        'Coalisland',
        'Greenisland',
        'Ballycastle',
        'Crumlin',
        'Randalstown',
        'Moira',
        'Maghera',
        'Royal Hillsborough',
        'Whitehead',
        'Waringstown',
        'Eglinton',
        'Tandragee',
        'Culmore',
      ],
      England: [
        'Avon',
        'Bedfordshire',
        'Berkshire',
        'Buckinghamshire',
        'Cambridgeshire',
        'Cheshire',
        'Cleveland',
        'Cornwall',
        'Cumbria',
        'Derbyshire',
        'Devon',
        'Dorset',
        'Durham',
        'East-Sussex',
        'Essex',
        'Gloucestershire',
        'Hampshire',
        'Herefordshire',
        'Hertfordshire',
        'Isle-of-Wight',
        'Kent',
        'Lancashire',
        'Leicestershire',
        'Lincolnshire',
        'London',
        'Merseyside',
        'Middlesex',
        'Norfolk',
        'Northamptonshire',
        'Northumberland',
        'North-Humberside',
        'North-Yorkshire',
        'Nottinghamshire',
        'Oxfordshire',
        'Rutland',
        'Shropshire',
        'Somerset',
        'South-Humberside',
        'South-Yorkshire',
        'Staffordshire',
        'Suffolk',
        'Surrey',
        'Tyne-and-Wear',
        'Warwickshire',
        'West-Midlands',
        'West-Sussex',
        'West-Yorkshire',
        'Wiltshire',
        'Worcestershire',
      ],
      Wales: [
        'Clwyd',
        'Dyfed',
        'Gwent',
        'Gwynedd',
        'Mid-Glamorgan',
        'Powys',
        'South-Glamorgan',
        'West-Glamorgan',
      ],
      Scotland: [
        'Aberdeenshire',
        'Aberdeen',
        'Angus',
        'Argyll',
        'Ayrshire',
        'Banffshire',
        'Berwickshire',
        'Bute',
        'Caithness',
        'Clackmannanshire',
        'Dundee',
        'Dunfermline',
        'Dumfriesshire',
        'Dunbartonshire',
        'East-Lothian',
        'Edinburgh',
        'Fife',
        'Glasgow',
        'Inverness-shire',
        'Kincardineshire',
        'Kinross-shire',
        'Kirkcudbrightshire',
        'Lanarkshire',
        'Midlothian',
        'Moray',
        'Nairnshire',
        'Orkney',
        'Peeblesshire',
        'Perthshire',
        'Renfrewshire',
        'Ross-shire',
        'Roxburghshire',
        'Selkirkshire',
        'Shetland',
        'Stirling',
        'Stirlingshire',
        'Sutherland',
        'West Lothian',
        'Wigtownshire',
      ],
      Ireland: [
        'Dublin',
        'Cork',
        'Galway',
        'Limerick',
        'Waterford',
        'Drogheda',
        'Dún',
        'Swords',
        'Blackrock',
        'Carlow',
        'Ennis',
        'Dunleary',
        'Kilkenny',
        'Naas',
        'Sligo',
        'Monaghan',
        'Ros Comáin',
        'Mullingar',
        'Tallaght',
        'Wicklow',
        'Clonmel',
        'Wexford',
        'Longford',
        'Trim',
        'Carrick on Shannon',
        'Tullamore',
        'An Cabhán',
        'Port Laoise',
        'Castlebar',
        'Lifford',
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
  computed: {
    formatedUK() {
      const temp = []
      this.uk.forEach((c) => {
        temp.push(c.TCITY15NM)
      })

      return temp
    },
  },
  async mounted() {
    // finds all band to populate form
    try {
      const bands = await this.$strapi.find('bands', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.bands = bands
      const o = {}
      bands.forEach((b) => {
        o[b.bandName] = b.bandName
      })
      // This is user band for the full
      this.userBands = o
      console.log(this.userBands)
    } catch (error) {
      this.userBands = null
      console.log(error)
    }
    // venues
    try {
      const venues = await this.$strapi.find('venues', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.venues = venues
      const o = {}
      venues.forEach((v) => {
        o[v.name] = v.name
      })
      // This is user band for the full
      this.userVenues = o
    } catch (error) {
      this.userVenues = null
      console.log(error)
    }
    // distros
    // must work on later
    try {
      const distros = await this.$strapi.find('record-labels', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.distros = distros
      const o = {}
      distros.forEach((d) => {
        o[d.name] = d.name
      })
      // This is user band for the full
      this.userDistros = o
    } catch (error) {
      this.userDistros = null
      console.log(error)
    }
    // tour
    try {
      const tours = await this.$strapi.find('tours', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.tour = tours
      const o = {}
      tours.forEach((t) => {
        console.log(t, ' this is the tour')
        o[t.title] = t.title
      })
      // This is user band for the full
      this.userTours = o
    } catch (error) {
      this.userTours = null
      console.log(error)
    }
  },

  methods: {
    moment,
    log(val) {
      const d = (val += ':00.000')
      console.log(d)
    },
    clear(val) {
      if (val === 'clear') {
        this.formValues.bandName = null
      }
    },
    async clearTour(val) {
      if (val === 'clear') {
        this.formValues.tourName = null
      } else {
        try {
          console.log(val)
          const t = await this.$strapi.find('tours', { title: val })
          // sets the tour in data objects
          this.tour = t[0]
          console.log(t)
        } catch (error) {
          console.log(error)
        }
      }
    },
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
        console.log(error, '351: error in uploading event poster ')
        this.loading = false
        this.errorMessage =
          'Could not upload the event poster ... please try again '
      }
      try {
        // if user picks band find band but not a tour
        if (
          this.formValues.bandName !== 'null' &&
          this.formValues.tourName === 'null'
        ) {
          console.log('this is the bandName conditional not the tour  ')
          const b = this.bands.filter((band) => {
            return band.bandName === this.formValues.bandName
          })
          console.log(b)
          this.formValues.bandName = b[0]
          const event = await this.$strapi.create('events', {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          })

          await this.$strapi.update('bands', b[0].id, {
            events: [...b[0].events, event],
          })
          this.event = event
          this.loading = false
        }
        // if band and tour name
        if (
          this.formValues.bandName !== 'null' &&
          this.formValues.tourName !== 'null'
        ) {
          console.log('this is the band and tour  conditional ')
          const b = this.bands.filter((band) => {
            return band.bandName === this.formValues.bandName
          })
          this.formValues.bandName = b[0]
          const event = await this.$strapi.create('events', {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          })
          this.event = event
          // put band id and update the band
          await this.$strapi.update('bands', b[0].id, {
            events: [...b[0].events, event],
          })
          await this.$strapi.update('tours', this.tour.id, {
            events: [...this.tour.events, event],
          })
        }
        // if user picks a tour but not a band
        if (
          this.formValues.bandName === 'null' &&
          this.formValues.tourName !== 'null'
        ) {
          this.formValues.bandName = null
          const event = await this.$strapi.create('events', {
            ...this.formValues,
            users_permissions_user: this.$strapi.user.id,
          })
          this.event = event
          // put band id and update the band
          await this.$strapi.update('tours', this.tour.id, {
            events: [...this.tour.events, event],
          })
        }
        // if user does not pick a band or a tour
      } catch (error) {
        console.log('form vals', this.formValues)
        console.log(error, 'there was an error in creating an event  ')
        this.loading = false
        this.errorMessage = 'Sorry, something went wrong ... please try again '
      }

      if (
        this.formValues.bandName === 'null' &&
        this.formValues.tourName === 'null'
      ) {
        // user does not pick band our tour
        this.formValues.bandName = null
        const event = await this.$strapi.create('events', {
          ...this.formValues,
          users_permissions_user: this.$strapi.user.id,
        })
        this.event = event
        this.loading = false
      }
      if (this.event) {
        this.$router.push({
          path: '/events/eventview',
          query: { event: this.event.id },
        })
      }
    },
  },
}
</script>

<style scoped>
.center-custom {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
