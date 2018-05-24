function validateReview(data){
    var text_arr = [];
    var data_id = ['author','comment','star','rstrnt_id']
    data_id.forEach(function(id) {
        if (data[id] == '')
            return false;
        text_arr.push(data[id]);
    });

    return true;
}

function reviewFn(dat){
    $('#results').html('');
    let n = 0;
    if (dat == ''){
        var empty_result = $("<h1><b>Review Fail to Submit</b></h1>");
        $('#results').append(empty_result);
    }
    dat.forEach((result) => {
        n++;
        // TODO
    })
}