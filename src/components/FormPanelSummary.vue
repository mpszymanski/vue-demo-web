<template>
<div>
  <div class="summary" id="success" v-show="status === 1">
    <slot name="messageSuccess"></slot>
  </div>
  <div class="summary" id="error" v-show="status === -1">
    <slot name="messageError"></slot>
    <ul class="has-text-left has-text-danger">
      <li v-for="(error, key) in errors" :key="key">{{ error[0] }}</li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'FormPanelSummary',
  data () {
    return {
      status: 0,
      errors: ['Server did not respond']
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  min-height: 350px;
}
</style>
