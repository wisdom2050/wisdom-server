var url = document.URL;
console.log(url);
var coordinates = [4.6247575, -74.0836085];
var map =  L.map('mapid').setView(coordinates, 15);
var token ="pk.eyJ1Ijoid2lzZG9tZGV2IiwiYSI6ImNqam5tcnBsNzFkYjQzcXFpaDgzYzhxd2QifQ.cFJqhoAPFomNa4khKDMdLg";
var markerCoordinates = {};
markerCoordinates.lat = coordinates[0];
markerCoordinates.lng = coordinates[1];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 12,
    id: 'mapbox.streets',
    accessToken: token
}).addTo(map);

var myMarker = L.marker(coordinates, {title: "MyPoint", alt: "The Big I", draggable: true})
    .addTo(map)
    .on('dragend', function() {
        var coord = String(myMarker.getLatLng()).split(',');
        var lat = coord[0].split('(');
        var lng = coord[1].split(')');
        markerCoordinates.lat = lat[1];
        markerCoordinates.lng = lng[0];
        myMarker.bindPopup(lat[1] + ", " + lng[0] + ".");
    });

$('#ModalRegister').on('show.bs.modal', function(){
    setTimeout(function() {
        map.invalidateSize();
    }, 400);
});