<template>
  <q-page padding class="docs-input row justify-center">
    <div>
      <q-input
        v-model="form.email"
        @blur="$v.form.email.$touch"
        :error="$v.form.email.$error"
      />

      <q-btn color="primary" @click="submit">Submit</q-btn>
    </div>
  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        email: ''
      }
    }
  },
  validations: {
    email: { required, email }
  }
}
</script>
