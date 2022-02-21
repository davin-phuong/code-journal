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

  data.view = 'entries';
  $list.prepend(renderEntry(data.entries[0]));

  $form.reset();
});

function renderEntry(entry) {
  var listItem = document.createElement('li');
  listItem.setAttribute('data-entry-id', entry.entryId);

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

  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-pen');
  title.appendChild(editIcon);

  var notes = document.createElement('p');
  notes.textContent = entry.notes;
  textColumn.appendChild(notes);

  return listItem;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderEntry(data.entries[i]);
    $list.appendChild(entry);
  }
});

var $container = document.querySelector('.container');
var $list = document.querySelector('ul');
var $viewHidden = document.querySelector('.hidden');
var $entryForm = document.querySelector('#entry-form');
var $entries = document.querySelector('#entries');

$container.addEventListener('click', function (event) {
  if (event.target.matches('.entries-btn')) {
    $entryForm.className = 'hidden';
    $entries.className = '';
    data.view = 'entries';
  }
});

$form.addEventListener('click', function (event) {
  if (event.target.matches('.save-btn')) {
    $entryForm.className = 'hidden';
    $entries.className = '';
    data.view = 'entries';
  }
});

$viewHidden.addEventListener('click', function (event) {
  if (event.target.matches('.new-btn')) {
    $entryForm.className = '';
    $entries.className = 'hidden';
    data.view = 'entry-form';
  }
});

if (data.view === 'entries') {
  $entryForm.className = 'hidden';
  $entries.className = '';
  data.view = 'entries';
} else {
  $entryForm.className = '';
  $entries.className = 'hidden';
  data.view = 'entry-list';
}

$list.addEventListener('click', function (event) {
  var header = document.querySelector('h2');
  header.textContent = 'Edit Entry';

  if (event.target && event.target.matches('i')) {
    $entryForm.className = '';
    $entries.className = 'hidden';
    data.view = 'entry-form';

    var closestListItem = event.target.closest('li');
    var currentId = closestListItem.getAttribute('data-entry-id');
    currentId = JSON.parse(currentId);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === currentId) {
        data.editing = data.entries[i];
      }
    }
    $form.elements.title.value = data.editing.title;
    $form.elements.photoUrl.value = data.editing.photoUrl;
    $form.elements.notes.value = data.editing.notes;
    $img.setAttribute('src', data.editing.photoUrl);
  }
});
