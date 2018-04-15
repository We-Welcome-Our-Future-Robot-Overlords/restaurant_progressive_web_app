function cuisine(cuisine) {
    console.log(cuisine);
    for(var i=0;i<cuisine.length;i++){
        let id = cuisine[i].id;
        let title = cuisine[i].title;
        var checkbox=$("<input type='checkbox'/>").val(id)
        $('ul#cuisine_checkboxes').append(checkbox);
        $("input:checkbox[value=" + id + "]").wrap("<li>" + title + "</li>");
    }
}

function checked_cuisines() {
    var checked_cuisines = [];
    $("#cuisine_checkboxes > li > input[type=checkbox]").each(function(){
        if ($(this).is(":checked")) {
            checked_cuisines.push($(this).val());
        }
    });
    console.log(checked_cuisines);
    $("input#cuisine").val(checked_cuisines);
}