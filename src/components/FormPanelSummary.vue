<template>
<div>
  <div class="summary" id="success" v-show="status === 1">
    <slot name="messageSuccess"></slot>
  </div>
  <div class="summary" id="error" v-show="status === -1">
    <slot name="messageError"></slot>
    <ul class="has-text-left has-text-danger">
      <li v-for="error in errors" :key="error">{{ error }}</li>
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
      errors: []
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  min-height: 350px;
}
</style>
