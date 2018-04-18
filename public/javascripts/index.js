/**
 * Send an ajax query
 * @param url the url to post to
 * @param data the data to post
 * @param successor callback function that uses the return data from the server.
 */
function sendAjaxQuery(url, data, successor) {
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
            successor(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

/**
 * For form submissions
 * @param url the url to post to
 * @param form_selector the form
 * @param validator the validation function
 * @param successor the callback function
 */
function onSubmit(url, form_selector, validator, successor) {
    var formArray= $(form_selector).serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    if (validator(data)) {
        sendAjaxQuery(url, data, successor);
    }
    event.preventDefault();
}

/**
 * Set the input for cuisines.
 */
function setCuisineSel(){
    $('#cuisine_selector').selectize({
        plugins: ['remove_button'],
        persist: false,
        maxItems: null,
        valueField: '_id',
        labelField: 'title',
        searchField: 'title',
        options: cuisine_arr,
        create: false,
        theme: 'links'
    });
}
