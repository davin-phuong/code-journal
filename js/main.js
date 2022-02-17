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

var list = document.querySelector('ul');
list.prepend(renderEntry(data.entries[0]));

function renderEntry(entry) {
  var listItem = document.createElement('li');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  listItem.appendChild(row);

  var imageColumn = document.createElement('div');
  imageColumn.setAttribute('class', 'column-half');
  row.appendChild(imageColumn);

  var image = document.createElement('img');
  image.setAttribute('src', entry.photoUrl);
  imageColumn.appendChild(image);

  var textColumn = document.createElement('div');
  textColumn.setAttribute('class', 'column-half');
  row.appendChild(textColumn);

  var title = document.createElement('h2');
  title.textContent = entry.title;
  textColumn.appendChild(title);

  var notes = document.createElement('p');
  notes.textContent = entry.notes;
  textColumn.appendChild(notes);

  return listItem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderEntry(data.entries[i]);
    list.appendChild(entry);
  }
});
