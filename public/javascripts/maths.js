module.exports = {
    /**
     * Distance between two map coordinates on Earth.
     *
     * @author Jack Cheng Ding Han 150159519
     * @param {number} lat1 Latitude of the first coordinate.
     * @param {number} lng1 Longitude of the first coordinate.
     * @param {number} lat2 Latitude of the second coordinate.
     * @param {number} lng2 Longitude of the second coordinate.
     * @returns {number} The distance between two coordinates.
     */
    haversine: function (lat1,lng1, lat2, lng2) {
        var R = 6371e3; // metres
        var φ1 = lat1 * Math.PI / 180;
        var φ2 = lat2 * Math.PI / 180;
        var Δφ = (lat2-lat1) * Math.PI / 180;
        var Δλ = (lng2-lng1)* Math.PI / 180;

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c;
        return d;
    }
};
