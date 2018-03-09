<template>
  <div class="form-panel column is-one-third is-offset-one-third">
    <div class="box">
      <form @submit.prevent="onSubmit()">
        <slot></slot>
        <nav class="form-panel-nav">
          <div v-if="currentStep < 1">
            <button
              v-if="summaryStatus === 0"
              class="next button is-primary is-rounded"
              type="button"
              @click="next"
            >
              Start Receipt Register
            </button>
            <button
              v-else
              class="next button is-primary is-rounded"
              type="button"
              @click="reset"
            >
              Add Another Receipt!
            </button>
          </div>
          <div v-else class="field is-grouped">
            <p class="control">
              <button
                type="button"
                class="prev button is-rounded"
                @click="back"
              >
                <span class="icon is-small">
                  <icon name="arrow-left"></icon>
                </span>
                <span>Back</span>
              </button>
            </p>
            <p class="control">
              <button
                v-if="currentStep !== steps.length-1"
                type="button"
                class="next button is-rounded is-primary"
                :disabled="!stepIsValid"
                :title="!stepIsValid ? 'Fill all required fields with star' : ''"
                @click="next"
              >
                <span>Next</span>
                <span class="icon is-small">
                  <icon name="arrow-right"></icon>
                </span>
              </button>
              <button
                v-if="currentStep === steps.length-1"
                type="submit"
                class="submit button is-rounded is-danger"
                :disabled="!stepIsValid"
                :title="!stepIsValid ? 'Fill all required fields with star' : ''"
              >
                <span>Send</span>
                <span class="icon is-small">
                  <icon name="paper-plane"></icon>
                </span>
              </button>
            </p>
          </div>
        </nav>
      </form>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import axios from 'axios'

export default {
  name: 'FormPanel',
  components: {
    Icon
  },
  data () {
    return {
      currentStep: 0,
      summary: null,
      steps: []
    }
  },
  computed: {
    stepIsValid () {
      let step = this.steps.find(step => { return step.isCurrent })
      if (step !== undefined) {
        return step.isValid
      }

      return false
    },
    summaryStatus () {
      if (this.summary) {
        return this.summary.status
      }

      return 0
    }
  },
  mounted () {
    this.steps = this.$children.filter(el => { return el.$options.name === 'FormPanelStep' })
    let firstStep = this.steps.find(step => { return step.isCurrent })
    if (firstStep) {
      this.currentStep = firstStep.index
    }

    this.summary = this.$children.find(el => { return el.$options.name === 'FormPanelSummary' })
    if (this.summary) {
      this.summary.status = 0
    }
  },
  methods: {
    next () {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
        this.updateSteps()
      }
    },
    back () {
      if (this.currentStep > 0) {
        this.currentStep--
        this.updateSteps()
      }
    },
    reset () {
      this.summary.status = 0
      this.currentStep = 0
      this.updateSteps()
      this.steps.forEach(step => {
        return step.inputs.forEach(input => {
          input.wasUsed = false
          if (input.file === undefined || input.file === null) {
            input.value = ''
          } else {
            input.file = null
          }
        })
      })
    },
    updateSteps () {
      this.steps.forEach(step => {
        step.isCurrent = step.index === this.currentStep
      })
    },
    onSubmit () {
      let data = new FormData()

      this.steps.forEach(step => {
        return step.inputs.forEach(input => {
          let name = input.name
          let value = input.value
          let file = input.file
          if (file === undefined || file === null) {
            data.append(name, value)
          } else {
            data.append(name, file, file.name)
          }
        })
      })

      axios.post(process.env.API_ROOT + 'create', data)
        .then(response => {
          this.summary.status = 1
          this.currentStep = -1
          this.updateSteps()
        }).catch(error => {
          console.log(error.response)
          this.summary.errors = error.response.data.errors
          this.summary.status = -1
          this.currentStep = -1
          this.updateSteps()
        })
    }
  }
}
</script>

<style scoped>
  .control {
    flex: 1;
    text-align: center;
  }
  .form-panel-nav {
    margin-top: 1rem;
  }
  .form-panel {
    margin-top: 2rem;
  }
</style>
