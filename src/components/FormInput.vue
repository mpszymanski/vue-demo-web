<template>
  <div class="field">
    <label class="label" v-if="label">{{ label }}</label>
    <div class="control" :class="wasUsed ? 'has-icons-right' : ''">
      <input
        :type="type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :class="wasUsed ? (isValid ? 'is-success' : 'is-danger') : ''"
        class="input is-medium"
        v-model="value"
        @input="wasUsed = true"
      >
      <span class="icon is-small is-right" v-if="wasUsed && isValid">
        <icon name="check"></icon>
      </span>
      <span class="icon is-small is-right" v-if="wasUsed && !isValid">
        <icon name="exclamation-triangle"></icon>
      </span>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'FormInput',
  components: {
    Icon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      required: false,
      default: 'text'
    },
    label: {
      required: false,
      default: ''
    },
    placeholder: {
      required: false,
      default: ''
    },
    required: {
      type: Boolean,
      required: false
    },
    pattern: {
      required: false,
      default: '.*'
    },
    maxlength: {
      required: false,
      default: 255
    }
  },
  data () {
    return {
      value: '',
      wasUsed: false,
      errors: []
    }
  },
  computed: {
    isValid () {
      if (this.required && !this.value) {
        return false
      }

      let reg = new RegExp(this.pattern)
      if (this.value.match(reg) !== null) {
        return true
      }

      return false
    }
  }
}
</script>

<style scoped>
  input, label{
    text-align: left;
  }
</style>
