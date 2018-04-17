function setCuisineSel(){
    $('#cuisine_selector').selectize({
        plugins: ['remove_button'],
        persist: false,
        maxItems: null,
        valueField: '_id',
        labelField: 'title',
        searchField: 'title',
        options: cuisine_arr,
        create: false
    });
}

function searchFn(dat, cuisine_arr){
    var cuisine_map = new Map(cuisine_arr.map((kv) => [kv._id, kv.title]));
    var locations = [];
    $('#results').html('');
    dat.forEach((result) => {
        var result_panel = $("<div class='panel panel-info'><div class='panel-heading'>" + result.name + "</div></div>");
        var panel_body = $("<div class='panel-body'>").html("<p>" + Object.values(result.address)+"</p><summary>" + result.description +"</summary>");
        var cuisine_tags = $('<div class="btn-group"></div>');
        result.cuisine.forEach((c) => {
            var c_tag = $("<button type='button' class='btn btn-info btn-sm'></button>").html(cuisine_map.get(c));
            c_tag.click(() => {
                sendAjaxQuery('/search', {cuisine: c}, (dat) => searchFn(dat, cuisine_arr));
            });
            cuisine_tags = cuisine_tags.append(c_tag);
        });
        panel_body.append(cuisine_tags);
        result_panel.append(panel_body);
        $('#results').append(result_panel);
        var location = {lat: result.location.lat,lng: result.location.lng};
        locations.push(location);
    })
    placeMarkers(locations);
}
