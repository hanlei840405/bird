<template>
  <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn
          flat
          round
          dense
          v-close-overlay
          icon="keyboard_arrow_left"
        />
        <q-toolbar-title>
          Header
        </q-toolbar-title>
      </q-toolbar>

      <q-toolbar slot="footer">
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>

      <div class="layout-padding">
        <h1>Modal</h1>

        <q-btn
          color="primary" @click="close()"
          label="Close"
        />

        <p>This is a Modal presenting a Layout.</p>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {
  data: () => ({
    opened: true
  }),
  methods: {
    async open () {
      debugger
      this.opened = true
    },
    async close () {
      debugger
      this.opened = false
    }
  }
}
</script>

<style>
</style>
