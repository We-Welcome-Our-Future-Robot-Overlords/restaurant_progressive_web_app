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

function searchFn(dat){
    console.log(dat[0]);
    $('#results').html('');
    dat.forEach(function (result) {
        let result_section = "<div class='searchResult'><h2>" + result.name + "</h2>"
            + "<p>" + Object.values(result.address)+"</p>"
            + "<summary>" + result.description +"</summary>"
            + "<p class='cuisineTag'>" + result.cuisine.map((c)=> {return cuisine_map.get(c)}) + "</p></div>";
        $('#results').append(result_section);
    })
}
