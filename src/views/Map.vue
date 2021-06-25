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
    return {
      places: [
        { lat: -25.363, lng: 131.044, description: "A place in Australia" },
        { lat: -33.8675, lng: 151.207, description: "The main city!" },
        { lat: -37.8136, lng: 144.9631, description: "This is Melbourne!" },
        {
          lat: 37.773972,
          lng: -122.431297,
          description: "This is David's house"
        }
      ]
    };
  },
  mounted: function () {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [131.044, -25.363], // starting position [lng, lat]
      zoom: 5 // starting zoom
    });

    this.places.forEach((place) => {
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(place.description);
      var marker = new mapboxgl.Marker()
        .setLngLat([place.lng, place.lat])
        .setPopup(popup)
        .addTo(map);
      console.log(marker);
    });

    // geocoding example

    // var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    // mapboxClient.geocoding
    //   .forwardGeocode({
    //     query: "Georgia",
    //     autocomplete: false,
    //     limit: 1
    //   })
    //   .send()
    //   .then(function (response) {
    //     if (
    //       response &&
    //       response.body &&
    //       response.body.features &&
    //       response.body.features.length
    //     ) {
    //       var feature = response.body.features[0];

    //       var map = new mapboxgl.Map({
    //         container: "map",
    //         style: "mapbox://styles/mapbox/streets-v11",
    //         center: feature.center,
    //         zoom: 10
    //       });

    //       // Create a marker and add it to the map.
    //       new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    //     }
    //   });
  },
  methods: {}
};
</script>
