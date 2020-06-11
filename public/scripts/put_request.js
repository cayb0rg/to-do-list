import $ from "jquery";

$(document).ready(function() {
    $('#submit').click(  function () {
        console.log("click");

        $.ajax({
            url: window.location.href,
            type: 'PUT',
            data: $('#theform').serialize(),
        })
        ;

    });
});
