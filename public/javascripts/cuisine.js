function selected_cuisines(cuisine_arr) {
    var selected = [];
    $("#cuisine_tags_chosen > ul > li.search-choice").each(function(){
        //Get index of cuisine in the original cuisine_arr + 1
        let cuisine_index = $(this).children().eq(1).attr('data-option-array-index');
        let _id = cuisine_arr[cuisine_index-1]._id;
        selected.push(_id);
    });
    $("input#cuisine").val(selected);
}
