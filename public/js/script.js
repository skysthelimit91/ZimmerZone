$(document).ready(function() {
  $('.edit').click(function(e) {
    console.log('click heard');

    const inputId = e.target.getAttribute('data-input-id');
    console.log('in .edit click callback. inputId:', inputId);
    //$(inputId).removeAttr('disabled');
  });

  // TIMS HELPED
  $('.comment-section').click(e => {
    if (e.target.classList.contains('edit')) {
      const $messagesInput = $(e.currentTarget).find('.messages');
      $messagesInput.removeAttr('disabled');
    }
  });

  $('#edithere').submit(function(e) {
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();
    // selecting the comment's id from hidden input
    const commentId = e.target.getAttribute('data-comment-id');
    const albumId = $('#album_id').val();

    // $('.edit').click(function(e) {
    //   console.log('click heard');

    //   $('#comment').removeAttr('disabled');
    // });

    console.log(`Form data: ${data}`);

    // PUT request to /albums/:commentId to update an individual comment
    $.ajax({
      url: `/albums/${albumId}`,
      data: data,
      type: 'PUT',
      success: function(data) {
        console.log('response ', data);
        // redirecting to the beer's show page on success
        window.location.href = `/albums/${albumId}`;
      },
      error: function(xhr, status, error) {
        // add error handler
      },
    });
  });

  // selecting edit form
  console.log('connected');
  $('#commentfield').submit(function(e) {
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();
    // selecting the album's id from hidden input

    const albumId = $('#album_id').val();

    console.log(`Form data: ${data}`);

    //const id = $('#comments').val();

    $.ajax({
      url: `/albums/${albumId}`,
      data: data,
      type: 'POST',
      success: function(data) {
        console.log('response ', data);
        window.location.href = `/albums/${albumId}`;
      },
      error: function(xhr, status, error) {
        // add error handler
      },
    });
  });
  $('.delete').click(function(e) {
    e.preventDefault();
    console.log('attempting delete');
    // selecting the comment's id from hidden input
    const commentId = e.target.getAttribute('data-comment-id');
    const albumId = $('#album_id').val();

    console.log(`Deleting id: ${commentId}`);

    // Prompt user before deleting
    const confirm = window.confirm('Are you sure you want to delete this?');
    if (confirm) {
      // execute if user selects okay
      $.ajax({
        //app.delete(/:albumId/comments/:commentId, ...)
        //url: `/albums/50/comments/4`
        url: `/albums/${commentId}`, // Path
        type: 'DELETE',
        success: function(data) {
          console.log('deleting ', data);

          window.location.href = `/albums/${albumId}`;
        },
        error: function(xhr, status, error) {
          // add error handler
        },
      });
    }
  });
});
// function change() {
//   document.getElementById('edit').addEventListener('click', enable);
//   function enable() {}
// }
