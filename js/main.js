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

  if (data.editing === null) {
    var entryInputs = {
      title: title,
      photoUrl: photoUrl,
      notes: notes,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entryInputs);
    $list.prepend(renderEntry(entryInputs));

  } else {
    data.editing.title = title;
    data.editing.photoUrl = photoUrl;
    data.editing.notes = notes;

    $closestListItem.replaceWith(renderEntry(data.editing));
  }
  data.editing = null;
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
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
var $entriesView = document.querySelector('.entries-view');
var $entryForm = document.querySelector('#entry-form');
var $entries = document.querySelector('#entries');
var $modal = document.querySelector('#modal');
var $deleteButton = document.querySelector('#delete-btn');

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

$entriesView.addEventListener('click', function (event) {
  if (event.target.matches('.new-btn')) {
    $entryForm.className = '';
    $entries.className = 'hidden';
    data.view = 'entry-form';
  }
});

if (data.view === 'entries') {
  $entryForm.className = 'hidden';
  $entries.className = '';
  $deleteButton.className = 'hidden';
  data.view = 'entries';
} else {
  $entryForm.className = '';
  $entries.className = 'hidden';
  $deleteButton.className = 'hidden';
  $modal.className = 'hidden';
  data.view = 'entry-list';
}

var $closestListItem = null;

$list.addEventListener('click', function (event) {
  var header = document.querySelector('h2');
  header.textContent = 'Edit Entry';

  $deleteButton.className = '.delete-btn red-txt';

  if (event.target && event.target.matches('i')) {
    $entryForm.className = '';
    $entries.className = 'hidden';
    data.view = 'entry-form';

    $closestListItem = event.target.closest('li');
    var currentId = $closestListItem.getAttribute('data-entry-id');
    currentId = parseInt(currentId);
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

$deleteButton.addEventListener('click', showModal);

function showModal(event) {
  $modal.className = 'modal-background';
}

var $cancelButton = document.querySelector('.cancel-btn');
$cancelButton.addEventListener('click', hideModal);

function hideModal(event) {
  $modal.className = 'hidden';
}

var $confirmButton = document.querySelector('.confirm-btn');
$confirmButton.addEventListener('click', deleteEntry);

function deleteEntry(event) {
  var $listItems = document.querySelectorAll('li');

  for (var j = 0; j < data.entries.length; j++) {
    var deleteObject = $listItems[j].getAttribute('data-entry-id');
    deleteObject = parseInt(deleteObject);
    if (data.entries[j].entryId === deleteObject) {
      deleteObject = data.entries[j];
      data.entries.splice(deleteObject, 1);
    }
  }

  for (var k = 0; k < $listItems.length; k++) {
    var editEntryId = $listItems[k].getAttribute('data-entry-id');
    editEntryId = parseInt(editEntryId);
    if (data.editing.entryId === editEntryId) {
      $listItems[k].remove();
    }
  }
  $entryForm.className = 'hidden';
  $entries.className = '';
  data.view = 'entries';
  $modal.className = 'hidden';
  data.editing = null;

  var header = document.querySelector('h2');
  header.textContent = 'New Entry';

  $deleteButton.className = 'hidden';
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

}
