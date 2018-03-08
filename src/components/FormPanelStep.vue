<template>
<div
    class="step"
    v-show="isCurrent"
  >
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'FormPanelStep',
  props: {
    index: {
      required: true
    },
    first: {
      required: false,
      default: false
    }
  },
  data () {
    return {
      isCurrent: false,
      inputs: [],
      errors: []
    }
  },
  computed: {
    isValid () {
      if (!this.inputs.length) {
        return true
      }

      return this.inputs.every(input => { return input.isValid })
    }
  },
  created () {
    this.isCurrent = this.first
  },
  mounted () {
    this.inputs = this.$children.filter(input => { return ['FormInput', 'FormInputImage'].includes(input.$options.name) })
  }
}
</script>

<style lang="scss" scoped>
.step {
  min-height: 360px;
}
</style>
