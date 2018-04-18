function setLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, geoError, {timeout: 5000});
    }
}

function geoError() {
    initMap(53.3816197, -1.4820851, '(cities)');
}

function showPosition(position) {
    $('input#lat').val(position.coords.latitude);
    $('input#lng').val(position.coords.longitude);
    initMap(position.coords.latitude, position.coords.longitude, '(cities)');
}

var map;

function initMap(lat, lng, type) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 17,
    });
    var styles = {
        hide: [
            {
                featureType: 'poi.business',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}]
            }
        ]
    };
    map.setOptions({styles: styles['hide']});

    if (type != undefined) {
        autoFillAddresss(type)
    }

}

function autoFillAddresss(type) {
    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setTypes([type]);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);



    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        $('input#lat').val(place.geometry.location.lat());
        $('input#lng').val(place.geometry.location.lng());
    });
}

var markers = [];
var bounds =[];

function placeMarkers(locations) {
    // clear all markers
    markers.forEach(function(marker) {
        marker.setMap(null);
    });

    var labels = '123456789';
    bounds = new google.maps.LatLngBounds();
    bounds.extend(map.getCenter());

    markers = locations.map(function(location, i) {
        bounds.extend(location);
        return new google.maps.Marker({
            map: map,
            position: location,
            label: labels[i % labels.length]
        });
    });
    zoomTight();
}

function zoomTight() {
    markers.forEach(function(marker) {
        marker.setVisible(true);
    });
    if (markers.length == 1){
        map.setCenter(markers[0].getPosition());
        map.setZoom(17);
    } else if (markers.length > 1){
        map.fitBounds(bounds);
    }
}
