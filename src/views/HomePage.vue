<template>
  <div class="container">
    <form-panel>
      <!-- STEP 1 -->
      <form-step
        id="welcome"
        :index="0"
        :first="true"
      >
        <header class="header">
          <h2 class="is-size-4">Hey There!</h2>
        </header>
        <p class="paragraph">Are you going to <strong>register your receipt?</strong></p>
        <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <p class="paragraph">Deserunt ipsum deleniti ratione, amet tempora consectetur laboriosam unde.</p>
        <p class="paragraph">Obcaecati architecto libero inventore impedit labore vero fugit iusto molestiae qui debitis similique!</p>
      </form-step>
      <!-- STEP 2 -->
      <form-step
        id="user"
        :index="1"
      >
        <header class="header">
          <h2 class="is-size-4">Tell Us Who You Are!</h2>
        </header>
        <!-- FORM -->
        <div class="columns">
          <div class="column">
            <form-input
              name="first_name"
              label="First Name*"
              placeholder="Joe"
              :required="true"
            ></form-input>
          </div>
          <div class="column">
            <form-input
              name="last_name"
              label="Last Name*"
              placeholder="Smith"
              :required="true"
            ></form-input>
          </div>
        </div>
        <form-input
          name="email"
          label="Email*"
          placeholder="joe.smith@example.com"
          pattern="^[a-zA-Z0-9.]*@[a-zA-Z0-9]*\.[a-z]{2,4}$"
          :required="true"
        ></form-input>
        <form-input
          name="phone"
          label="Phone"
          placeholder="+22 123 456 789"
          pattern="^[ +0-9]*$"
        ></form-input>
        <!-- END FORM -->
      </form-step>
      <!-- STEP 3 -->
      <form-step
        id="receipt"
        :index="2"
      >
        <header class="header">
          <h2 class="is-size-4">Show Your Receipt</h2>
        </header>
        <!-- FORM -->
        <form-input
          name="shop_zip"
          label="Shop Zip Code*"
          placeholder="653 213"
          pattern="^[0-9]{3}[ ]?[0-9]{3}$"
          :required="true"
        ></form-input>
        <form-input
          name="code"
          label="Receipt Code*"
          placeholder="123456789"
          pattern="^[0-9]*$"
          :required="true"
        ></form-input>
        <form-input-image
          name="image"
          label="Your Receipt Xerocopy*"
          :required="true"
          :max-size="10"
        ></form-input-image>
        <!-- END FORM -->
      </form-step>
      <form-summary>
        <div slot="messageSuccess">
          <header class="header">
            <h2 class="is-size-4">Success!</h2>
          </header>
          <p class="paragraph">Check your inbox for confirmation.</p>
          <p class="paragraph">We will also send you your code in a while.</p>
        </div>
        <div slot="messageError">
          <header class="header">
            <h2 class="is-size-4">Whoops!</h2>
          </header>
          <p class="paragraph">Somethings went wrong with your register.</p>
          <h4 class="is-size-5 has-text-weight-bold has-text-left">Reason:</h4>
        </div>
      </form-summary>
    </form-panel>
  </div>
</template>

<script>
import FormPanel from '@/components/FormPanel.vue'
import FormStep from '@/components/FormPanelStep.vue'
import FormSummary from '@/components/FormPanelSummary.vue'
import FormInput from '@/components/FormInput.vue'
import FormInputImage from '@/components/FormInputImage.vue'

export default {
  name: 'HomePage',
  components: {
    FormPanel,
    FormStep,
    FormInput,
    FormInputImage,
    FormSummary
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .header {
    margin-bottom: 1rem;
    text-align: center;
  }
  p.paragraph {
    margin-bottom: 0.5rem;
    text-align: left;
  }
</style>
