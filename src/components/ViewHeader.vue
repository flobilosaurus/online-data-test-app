<template>
  <v-flex md12 class="view-header">
    <v-card>
      <v-card-title>
        <h2>
          {{text}}
        </h2>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'ViewHeader',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
  .view-header {
    padding-bottom: 1em;
  }
</style>
