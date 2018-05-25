/***
 * Validator function for onSubmit
 * @param data JSON
 */
function validateSearch(data){
    var text_arr = [];
    text_arr.push(data['keywords']);
    text_arr.push(data['cuisine']);
    text_arr.push(data['pac_input']);

    /* Reduce is like Haskell's fold which we learnt in COM2001
       If all text inputs were empty then their concatenation would be the empty string.
       The condition would then be satisfied because empty strings are falsy.
     */
    if (text_arr.join('') == "") {
        return false;
    }
    console.log(text_arr)
    console.log(text_arr.join(''))
    return true;
}

/**
 * Populate the main#results with data
 * @param dat the details of each resturant returned by the search.
 * @param cuisine_arr require to map ids to the names of cuisines displayed.
 */
function searchFn(dat, cuisine_arr){
    var cuisine_map = new Map(cuisine_arr.map((kv) => [kv._id, kv.title]));
    var locations = [];
    $('#results').html('');
    let n = 0;
    if (dat == ''){
        var empty_result = $("<h1><b>No Result Found</b></h1>");
        $('#results').append(empty_result);
    }
    dat.forEach((result) => {
        n++;
        var result_card = $("<div class='card rounded-0 my-3'></div>");
        //TODO: Images
        var card_body = $("<div class='card-body'><h4 class='card-title'><a href='./restaurant/" +result._id + "'>" + n + "." + result.name + "</a></h4></div>");
        var card_text = $("<p class='card_text'>" + result.address + "</p><summary class='card-text'>" + result.description + "</summary>");
        var cuisine_tags = $('<div class="btn-group btn-group-sm"></div>');
        result.cuisine.forEach((c) => {
            var c_tag = $("<button type='button' class='btn btn-info'></button>").html(cuisine_map.get(c));
            c_tag.click(() => {
                sendAjaxQuery('/search', {cuisine: c}, (dat) => searchFn(dat, cuisine_arr));
            });
            cuisine_tags = cuisine_tags.append(c_tag);
        });
        card_body.append(card_text);
        card_body.append(cuisine_tags);
        result_card.append(card_body);
        $('#results').append(result_card);
        var location = {lat: result.location.lat,lng: result.location.lng};
        locations.push(location);
    })
    placeMarkers(locations);
}

function mapToggle(){
    $('#locationSearch').on('shown.bs.collapse', function() {
        console.log("Shown");
        zoomTight();
    }).on('show.bs.collapse', function() {
        console.log("Showing");
    });

    $('#locSearchToggle').click(()=>{
        const state = $('#locationSearch').hasClass('show');
        $('#locSearchToggle > span').attr('data-glyph', 'chevron-' + (state ? 'bottom' : 'top'));
    });
}