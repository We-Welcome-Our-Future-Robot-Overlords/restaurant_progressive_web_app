function setLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    $('input#lat').val(position.coords.latitude);
    $('input#lng').val(position.coords.longitude);
    initMap(position.coords.latitude, position.coords.longitude, '(cities)');
}


function initMap(lat, lng, type) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 15
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
        autoFillAddresss(map, type);
    }
}

function autoFillAddresss(map, type) {
    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setTypes([type]);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        marker.setVisible(false);
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
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        $('input#lat').val(place.geometry.location.lat());
        $('input#lng').val(place.geometry.location.lng());
    });
}