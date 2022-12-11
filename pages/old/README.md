     <div class="sm:w-4/5 m-auto mb-[2rem]">
                <label for="band" class="label">Band New Form </label>
                <input
                  v-model="bandDropdown"
                  class="dropdown"
                  list="band"
                  name="band"
                  placeholder="Band"
                />
                <datalist id="band">
                  <option
                    v-for="band in userBands"
                    :key="band"
                    :value="band"
                  ></option>
                </datalist>
              </div>


         <div class="sm:w-4/5 m-auto mb-[2rem]">
                <label for="city" class="label">City</label>
                <input
                  v-model="city"
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
