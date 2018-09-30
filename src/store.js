import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    feature: `
    Feature: Axios Request
        I want to check if axios works
        with steps too
        
      Scenario: Get request
        Given the url 'https://jsonplaceholder.typicode.com/users/1'
        When I request it by axios
        Then the respose has status code 200
        And the response contains "Leanne Graham"`,
    steps: `
    
  
    // Cucumber and chai have been loaded in the browser
     var setWorldConstructor = Cucumber.setWorldConstructor;
     var Given = Cucumber.Given;
     var When = Cucumber.When;
     var Then = Cucumber.Then;
     
     ///// World /////
     //
     // Call 'setWorldConstructor' with to your custom world (optional)
     //

     var CustomWorld = function() {
         this.url = null;
       this.response = null;
       this.error = null;
     };
     
     setWorldConstructor(CustomWorld);
     
     ///// Step definitions /////
     //
     // use 'Given', 'When' and 'Then' to declare step definitions
     //
     
     Given('the url {string}', function (url) {
        this.url = url
      });
          
     When('I request it by axios', async function () {
         try {
            const response = await axios.get(this.url);
            this.response = response
            console.log(response);
          } catch (error) {
            this.error = error;
            console.error(error);
          }
      });
     
     
     Then('the respose has status code {int}', function (expectedCode) {
        expect(this.error).toBeNull()
        expect(this.response.status).toEqual(expectedCode)
      });

      Then('the response contains {string}', function (str) {
        expect(JSON.stringify(this.response.data)).toContain(str)
      });
    `
  },
  mutations: {
    setFeature (state, newFeature) {
      state.feature = newFeature
    },
    setSteps (state, newSteps) {
      state.steps = newSteps
    }
  },
  actions: {

  }
})
