<template>
    <div id="progress">
        <div id="bar" v-bind:style="{width: progress + '%'}"></div>
    </div>
</template>

<script>
export default {
    props: ['progress']
}
</script>

<style scoped>

#progress {
  width: 100%;
  background-color: #ddd;
}

#bar {
  width: 1%;
  height: 30px;
  background-color: #4CAF50;
}

</style>