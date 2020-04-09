// When you click the postcomment button
$(document).on("click", "#postcomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // console.log($("#bodyinput").val());
  
    // Run a POST request to change the comment, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "./articles/" + thisId,
      data: {
        // Value taken from title input
        // title: $("#bodyinput").val(),
        // Value taken from note textarea
        post: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the comments section
        $("#bodyinput").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    // $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  