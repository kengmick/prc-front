<template>
  <div class="container md:container mx-auto lg:px-[6%]">
    <section class="w-[90vw] mx-auto mb-6 overflow-x-auto pt-4 lg:pt-8">
      <div>
        <!-- Genre filters -->
        <div class="flex items-center mb-1">
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
            wrapper-class="sm:w-4/5 lg:w-1/4 "
            element-class="w-full"
            errors-class="sm:w-4/5 lg:w-1/4 "
          />
        </FormulateForm>
      </div>

      <div class="flex items-center">
        <h3 class="mr-4">Filter By Location</h3>
        <FormulateInput v-model="locationFilter" type="checkbox" />
      </div>

      <FormulateForm v-if="locationFilter" v-model="formValues" class="mt-1">
        <FormulateInput
          name="country"
          label="country"
          wrapper-class="sm:w-4/5 lg:w-1/4 "
          :options="ct"
          placeholder="select a country"
          element-class="w-full"
          errors-class="sm:w-4/5 "
          type="select"
          @change="formValues.country = $event.target.value"
        />
        <FormulateInput
          v-if="formValues.country === 'United States'"
          name="state"
          label="State"
          :options="Object.keys(cs)"
          placeholder="select a state"
          wrapper-class="sm:w-4/5 lg:w-1/4 "
          element-class="w-full"
          errors-class="sm:w-4/5 lg:w-1/4 "
          type="select"
          @change="formValues.city = ''"
        />
        <div class="sm:w-4/5 lg:w-1/4 mb-1">
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
    <section
      v-if="bands"
      class="flex items-center"
      :class="{ 'pb-[80px]': locationFilter }"
    >
      <div v-if="genre && locationFilter" class="my-10 ml-4 overflow-x-auto">
        <div class="flex gap-4 w-min md:w-full md:justify-center">
          <div
            v-for="band in bands.filter((i) => {
              if (formValues.country && !formValues.state) {
                return i.country === formValues.country
              }
              if (formValues.country && !formValues.state) {
                return i.country === formValues.country
              }
              if (formValues.country && formValues.state && !formValues.city) {
                return (
                  i.country === formValues.country &&
                  i.state === formValues.state
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
            :key="band.bandName"
          >
            <SimpleCardsBand class="w-[220px]" :band="band" />
            <!-- <PosterCard
            v-if="band.genreAlt === genreSelected.genre"
            :band="band"
            :user="band.users_permissions_user"
            :isFeatured="true"
            @startChat="startChatNow(band.users_permissions_user)"
            @updatedFavs="updatedFavs('bands', band.id)"
            :isFav="favCheck('bands', band.id)"
          /> -->
          </div>
        </div>
      </div>
      <section class="my-10 ml-4 overflow-x-auto">
        <div
          v-if="genre && !locationFilter"
          class="flex gap-4 w-min md:w-full md:justify-center"
        >
          <SimpleCardsBand
            class="w-[220px]"
            v-for="(band, index) in bands"
            :key="band.bandName + index"
            :band="band"
          />
        </div>
      </section>
      <div v-if="!genre && locationFilter" class="my-10 ml-4 overflow-x-auto">
        <div class="flex gap-4 w-min md:w-full md:justify-center">
          <div
            v-for="band in bands.filter((i) => {
              if (formValues.country && !formValues.state) {
                return i.country === formValues.country
              }
              if (formValues.country && !formValues.state) {
                return i.country === formValues.country
              }
              if (formValues.country && formValues.state && !formValues.city) {
                return (
                  i.country === formValues.country &&
                  i.state === formValues.state
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
            :key="band.bandName"
          >
            <SimpleCardsBand class="w-[220px]" :band="band" />
          </div>
        </div>
      </div>
      <section v-if="!genre && !locationFilter" class="my-10 overflow-x-auto">
        <div class="flex gap-4 w-min md:w-full md:justify-center">
          <div v-for="band in bands" :key="band.bandName">
            <SimpleCardsBand class="w-[220px]" :band="band" />
          </div>
        </div>
        <!-- <PosterCard
            class="mb-10"
            v-for="(band, index) in bands"
            :key="band.bandName + index"
            :band="band"
            :user="band.users_permissions_user"
            :isFeatured="true"
            :isHome="true"
            @updatedFavs="updatedFavs('bands', band.id)"
            :isFav="favCheck('bands', band.id)"
            @startChat="startChatNow(band.users_permissions_user)"
          /> -->
      </section>
    </section>
    <div v-else>{{ errorMessage }}</div>
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
export default {
  data() {
    return {
      bands: [],
      errorMessage: '',
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
      favs: null,
      locationFilter: false,
      formValues: {},
      city: '',
      country: '',
      genre: false,
      genreSelected: '',
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
      console.log('looking for bands')
      const bands = await this.$strapi.find('bands')
      console.log(bands)
      this.bands = bands
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },

  methods: {
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
    async renderChatComp(chat) {
      console.log('this is the render chat comp')
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
  },
}
</script>
