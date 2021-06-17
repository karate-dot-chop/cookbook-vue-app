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
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-87.62, 41.88], // starting position [lng, lat]
      zoom: 10 // starting zoom
    });

    // create the popup
    var popup = new mapboxgl.Popup({ offset: 30 }).setText(
      "Chicago is the windy city with lots of pizza."
    );

    // Create a default Marker and add it to the map.
    var marker1 = new mapboxgl.Marker()
      .setLngLat([-87.62, 41.88])
      .setPopup(popup)
      .addTo(map);
    console.log(marker1);

    // Create a default Marker, colored black, rotated 45 degrees.
    var marker2 = new mapboxgl.Marker({
      color: "black",
      rotation: 45,
      isDraggable: true,
      draggable: true
    })
      .setLngLat([-122.431297, 37.773972])
      .addTo(map);
    console.log(marker2);
  },
  methods: {}
};
</script>
