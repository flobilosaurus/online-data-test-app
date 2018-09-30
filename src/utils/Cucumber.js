import { EventEmitter } from 'events'
import ansiHTML from 'ansi-html'
import expect from 'expect'
import Axios from 'axios'
import * as Cucumber from 'cucumber'

// global registration of cucumber and expect (jest)
window.Cucumber = Cucumber
window.expect = expect
window.axios = Axios

console.log(Cucumber)

function runCucumberFeature (featureSource, stepsSource, logAppender) {
  const eventBroadcaster = new EventEmitter()
  const eventDataCollector = new Cucumber.formatterHelpers.EventDataCollector(
    eventBroadcaster
  )

  const testCases = Cucumber.getTestCases({
    eventBroadcaster,
    pickleFilter: new Cucumber.PickleFilter({}),
    source: featureSource,
    uri: '/feature'
  })

  Cucumber.supportCodeLibraryBuilder.reset('')
  new Function(stepsSource)() // eslint-disable-line no-new-func
  const supportCodeLibrary = Cucumber.supportCodeLibraryBuilder.finalize()

  const formatterOptions = {
    colorsEnabled: true,
    cwd: '/',
    eventBroadcaster,
    eventDataCollector,
    log (data) {
      logAppender(ansiHTML(data))
    },
    supportCodeLibrary
  }
  Cucumber.FormatterBuilder.build('progress', formatterOptions)

  const runtime = new Cucumber.Runtime({
    eventBroadcaster,
    options: {},
    testCases,
    supportCodeLibrary
  })
  return runtime.start()
}

function displayError (logAppender, error) {
  logAppender(`<div class="error">${error.stack || error}</div>`)
}

function doRunFeature (featureSource, stepsSource, logAppender) {
  runCucumberFeature(featureSource, stepsSource, logAppender).then(function (success) {
    var exitStatus = success ? '0' : '1'
    logAppender(`<div class="exit-status">Exit Status ${exitStatus}</div>`)
  }).catch(e => displayError(logAppender, e))
}

export const runFeature = doRunFeature
