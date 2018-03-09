<template>
  <main ref="elem">
    <button @click="open1=true">Open set of nested modals</button>
    <!--
      By default, modals are inserted at the bottom of body,
      but you can specify an embed element via props -->
    <v-modal-backdrop :embed-element="elem" v-model="open1">
      <p>This is a simple large modal.</p>
      <p>Click on the first button below to open a nested modal.</p>
      <button @click="open2=true">Open Modal 2</button>
      <button @click="open1=false">Close Modal 1</button>


      <v-modal-backdrop v-model="open2">
        <p>This is a nested modal.</p>
        <button @click="open3=true">Open Modal 3</button>
        <button @click="open2=false">Close Modal 2</button>
      </v-modal-backdrop>
    </v-modal-backdrop>
    <!-- all modals can be on the same level because they will be stacked in order of appearance -->
    <v-modal-backdrop v-model="open3">
      <p>This is another nested modal.</p>
      <button @click="open3=false">Close Modal 3</button>
    </v-modal-backdrop>
  </main>
</template>
<script>
  export default {
    data () {
      return {
        open1: false,
        open2: false,
        open3: false,
        elem: undefined
      }
    },
    mounted () {
      this.elem = this.$refs.elem
    }
  }
</script>
<style>
.modal {
  color: white
}
</style>
