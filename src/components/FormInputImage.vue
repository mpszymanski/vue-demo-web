<template>
  <div>
    <label class="label" v-if="label">{{ label }}</label>
    <div class="file has-name is-boxed is-fullwidth" :class="wasUsed ? (isValid ? 'is-success' : 'is-danger') : ''">
      <label class="file-label">
        <input class="file-input" type="file" accept="image/*" :name="name" :id="name" @change="fileUpload($event)">
        <span class="file-cta">
          <span class="file-icon">
            <icon name="upload" scale="2"></icon>
          </span>
        </span>
        <span class="file-name has-text-centered" v-if="file">
          {{ file.name }}
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'FormInputImage',
  components: {
    Icon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      required: false,
      default: ''
    },
    required: {
      type: Boolean,
      required: false
    },
    maxSize: {
      type: Number, // Megabytes
      required: false
    }
  },
  data () {
    return {
      wasUsed: false,
      file: null,
      errors: []
    }
  },
  computed: {
    isValid () {
      const bytesInMegabyte = 1000000

      if (this.required && !this.file) {
        return false
      }

      if (this.maxSize && this.file.size !== undefined) {
        if (this.file.size > this.maxSize * bytesInMegabyte) {
          return false
        }
      }

      return true
    }
  },
  methods: {
    fileUpload ($event) {
      this.wasUsed = true
      this.file = $event.target.files[0]
    }
  }
}
</script>

<style scoped>
  label {
    text-align: left;
  }
</style>
