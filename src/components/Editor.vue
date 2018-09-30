<template>
  <div :id="editorId" class="editor">
    {{value}}
  </div>
</template>

<script>
import ace from 'brace'
require('brace/mode/gherkin')
require('brace/mode/javascript')
require('brace/mode/json')

export default {
  name: 'Editor',
  props: {
    editorId: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    value: {
      type: String | null,
      required: true
    }
  },
  data () {
    return {
      editor: null
    }
  },
  methods: {
    emitInput () {
      this.$emit('input', this.editor.getSession().getValue())
    }
  },
  mounted () {
    this.editor = ace.edit(this.editorId)
    this.editor.getSession().setMode(`ace/mode/${this.mode}`)
    this.editor.getSession().on('change', this.emitInput)
  }
}
</script>

<style scoped>
  .editor {
    height: 50em;
  }
</style>
