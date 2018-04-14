function sendAjaxQuery(url, data, fn) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            var ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            fn(JSON.stringify(ret));
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function onSubmit(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    //TODO: User friendly way of displaying search results
    sendAjaxQuery(url, data, function(dat) {
        $('#results').html(dat);
    });
    event.preventDefault();
}

function setLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    $('input#lat').val(position.coords.latitude);
    $('input#lng').val(position.coords.longitude);
}
