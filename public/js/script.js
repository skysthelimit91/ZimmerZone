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
});
