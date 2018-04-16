var cuisine_map;

function setCuisineSel(cuisine_arr){
    $('#cuisine_selector').selectize({
        plugins: ['remove_button'],
        persist: false,
        maxItems: null,
        valueField: '_id',
        labelField: 'title',
        options: cuisine_arr,
        create: false
    });
    cuisine_map = new Map(cuisine_arr.map((kv) => [kv._id, kv.title]));
}

function searchFn(dat, cuisine_arr){
    cuisine_map = cuisine_map || new Map(cuisine_arr.map((kv) => [kv._id, kv.title]));
    var locations = [];
    $('#results').html('');
    dat.forEach((result) => {
        var result_item = $("<div class='searchResult'></div>").html("<h2>" + result.name + "</h2>"
            + "<p>" + Object.values(result.address)+"</p>"
            + "<summary>" + result.description +"</summary>");
        var cuisine_tags = $('');
        result.cuisine.forEach((c) => {
           var c_tag = $("<button type='button' class='btn btn-primary btn-sm'></button>").html(cuisine_map.get(c));
           c_tag.click(() => {
               sendAjaxQuery('/search', {cuisine: c}, searchFn);
           });
            cuisine_tags = cuisine_tags.add(c_tag);
        });
        result_item.append(cuisine_tags);
        $('#results').append(result_item);
        var location = {lat: result.location.lat,lng: result.location.lng};
        locations.push(location);
    })
    placeMarkers(locations);
}
