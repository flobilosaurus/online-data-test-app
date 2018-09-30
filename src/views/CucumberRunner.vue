<template>
  <v-layout row wrap>
    <view-header text="Cucumber Runner"/>
    <v-flex md6>
      <v-tabs
        v-model="active"
        dark>
        <v-tab
          key="feature"
          ripple>
          Feature
        </v-tab>
        <v-tab
          key="steps"
          ripple>
          Steps
        </v-tab>
        <v-tab-item
          key="feature">
          <v-card>
            <editor editor-id="feature-editor" v-model="feature" mode="gherkin" />
          </v-card>
        </v-tab-item>
        <v-tab-item
          key="steps">
          <v-card>
            <editor editor-id="steps-editor" v-model="steps" mode="javascript" />
          </v-card>
        </v-tab-item>
      </v-tabs>
      <v-btn @click="runFeatureAndLogOutput">Run Feature</v-btn>
    </v-flex>
    <v-flex md6 class="output">
      <v-card>
        <pre v-html="output" style="overflow: auto"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ViewHeader from '@/components/ViewHeader'
import Editor from '@/components/Editor'
import { runFeature } from '@/utils/Cucumber'

export default {
  name: 'CucumberRunner',
  components: {
    Editor,
    ViewHeader
  },
  data () {
    return {
      active: 'feature',
      feature: '',
      steps: '',
      output: ''
    }
  },
  methods: {
    pushLocalStateToStore () {
      this.$store.commit('setFeature', this.feature)
      this.$store.commit('setSteps', this.steps)
    },
    outputAppender (line) {
      this.output += line
    },
    runFeatureAndLogOutput () {
      this.pushLocalStateToStore()
      this.output = ''
      runFeature(this.feature, this.steps, this.outputAppender)
    }
  },
  created () {
    this.feature = this.$store.state.feature
    this.steps = this.$store.state.steps
  }
}
</script>

<style scoped>
  .output {
    padding-left: 1em;
  }
</style>
