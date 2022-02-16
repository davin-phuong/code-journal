/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photoUrl');

var $img = document.querySelector('img');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoUrl.value);
});

var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var title = $form.elements.title.value;
  var photoUrl = $form.elements.photoUrl.value;
  var notes = $form.elements.notes.value;

  var entryInputs = {
    title: title,
    photoUrl: photoUrl,
    notes: notes
  };

  entryInputs.entryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(entryInputs);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
