$(document).ready(function() {
  // selecting edit form
  console.log('connected');
  $('#commentfield').submit(function(e) {
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();
    // selecting the album's id from hidden input
    const id = $('#album_id').val();

    console.log(`Form data: ${data}`);

    $.ajax({
      url: `/albums/${id}`,
      data: data,
      type: 'POST',
      success: function(data) {
        console.log('response ', data);

        // redirecting to the album's show page on success
        window.location.href = `/show/${id}`;
      },
      error: function(xhr, status, error) {
        // add error handler
      },
    });
  });
  /*$('#delete').submit(function() {
    // selecting the beer's id from hidden input
    const id = $('#comment_id').val();
    const A = $('#album_id').val();

    console.log(`Deleting id: ${id}`);

    // Prompt user before deleting
    const confirm = window.confirm('Are you sure you want to delete this?');
    if (confirm) {
      // execute if user selects okay
      $.ajax({
        url: `${id}` // Path
        type: 'DELETE',
        success: function(data) {
          console.log('deleting ', data);

          // redirect to beers list after deleting an individual beer
          //window.location.href = '/show/${id}';
        },
        error: function(xhr, status, error) {
          // add error handler
        },
      });
    }
  }); */
});
