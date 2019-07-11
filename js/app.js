'use strict'

//Create helper funtion to launch actions when the app is started

function startApp(){
  readFile();
  addEventListeners();
}

//Constructor function to create objects with the JSON data

ImageObject.list = []

function ImageObject (item){
  this.image_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

//Create function to read the file, run them through the constructor function, and into the storage array

function readFile(){

  $.get('/data/page-1.json', objectsArray => {
    objectsArray.forEach(item => {
      ImageObject.list.push(new ImageObject(item));
    })
    displayImages();
  },'json');
}

//Create function to display images on the home page by cloning the template for each photo object

function displayImages(){
  const keywordArray = [];

  ImageObject.list.forEach( item => {
    const $newItem = $('#photo-template').clone();

    $newItem.find('h2').text(item.title);
    $newItem.find('img').attr('src', item.image_url).attr('alt', item.keyword);
    $newItem.find('p').text(item.description);
    $newItem.removeAttr('id')

    $('main').append($newItem);

    if(!keywordArray.includes(item.keyword)) {keywordArray.push(item.keyword);}
  });

  //Remove the photo template now that we have data to add to the page

  $('photo-template').remove();

  //Read the keyword array and fill the drop down menu with those items

  keywordArray.forEach(item => {
    const $newKey = $('.menuName').clone();
    $newKey.text(item);
    $newKey.attr('value', 'menuItem');
    $('#dropMenu').append($newKey);
    $newKey.removeAttr('class');
  })
}

function addEventListeners() {
  $('select').on('change', event => {
    const $menuChoice = $(event.target).val();

    if($menuChoice === 'default') {
      $('.picSection').show();
    } else {
      $('.picSection').hide();
      $(___________________).show();
    }
  });
}

$(startApp);
