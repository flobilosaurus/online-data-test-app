<template>
  <v-layout row wrap>
    <view-header text="Test Case Extractor" />
    <v-flex md4>
      <h3>Request</h3>
      <editor editor-id="request-editor" mode="text" v-model="request"/>
    </v-flex>
    <v-flex md4 class="padded">
      <h3>Response</h3>
      <v-card>
        <pre id="response-view" v-html="responseBody"></pre>
      </v-card>
    </v-flex>
    <v-flex md4>
      <h3>Expectation</h3>
      <editor v-if="responseBody" editor-id="expection-editor" mode="json" v-model="expectionJson"/>
    </v-flex>
    <v-flex md12>
      <v-btn @click="sendRequest">Send Request</v-btn>
      <v-btn v-if="expectionJson" @click="runRegressionTest">Run Regression Test</v-btn>
    </v-flex>
    <v-flex md12>
      <v-card>
        <pre v-html="output" style="overflow: auto"></pre>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Axios from 'axios'
import ViewHeader from '@/components/ViewHeader'
import Editor from '@/components/Editor'
import { runFeature } from '@/utils/Cucumber'

export default {
  name: 'TestCaseExtractor',
  components: {
    Editor,
    ViewHeader
  },
  data () {
    return {
      api: 'https://jsonplaceholder.typicode.com/posts',
      request: '?postId=1',
      responseBody: null,
      expectionJson: null,
      output: null
    }
  },
  computed: {
    feature () {
      return `Feature: Api Regression
        
      Scenario: Get request
        Given the url "${this.api}${this.request}"
        When I request it by axios
        Then the respose has status code 200
        And the response matches 
        """
        ${this.expectionJson}
        """`
    },
    steps () {
      return `// Cucumber and chai have been loaded in the browser
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
          } catch (error) {
            this.error = error;
            console.error(error);
          }
      });
     
     
     Then('the respose has status code {int}', function (expectedCode) {
        expect(this.error).toBeNull()
        expect(this.response.status).toEqual(expectedCode)
      });

      Then('the response matches', function (json) {
        const body = this.response.data
        if (body instanceof Array) {
          const expectation = JSON.parse(json)
          if (expectation instanceof Array) {
            expect(body).toEqual(expect.arrayContaining(expectation))
          } else {
            expect(body).toContainEqual(expect.objectContaining(expectation))
          }
        } else {
          const expectation = JSON.parse(this.expectionJson)
          if (expectation instanceof Array) {
            throw('If response is object, expectation cannot be an array!')
          } else {
            expect(body).toEqual(expect.objectContaining(expectation))
          }
        }
      });`
    }
  },
  methods: {
    setResponseBody (response) {
      this.responseBody = JSON.stringify(response.data, null, 2)
      this.expectionJson = this.responseBody
    },
    sendRequest () {
      Axios.get(`${this.api}${this.request}`)
        .then(this.setResponseBody)
        .catch(console.error)
    },
    runRegressionTest () {
      this.output = null
      console.log(this.feature)
      runFeature(this.feature, this.steps, (line) => { this.output += line })
    }
  }
}
</script>

<style>
  .padded {
    padding-left: 1em;
    padding-right: 1em;
  }

  #response-view {
    overflow: auto;
    height: 43em;
  }
</style>
