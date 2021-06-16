<template>
  <div class="map">
    <h1>This is my map page</h1>
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 600px;
}
</style>

<script>
/* global mapboxgl */
export default {
  data: function () {
    return {};
  },
  mounted: function () {
    mapboxgl.accessToken = "your-access-token-here";
    new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-87.62, 41.88], // starting position [lng, lat]
      zoom: 15 // starting zoom
    });
  },
  methods: {}
};
</script>
