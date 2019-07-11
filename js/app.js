'use strict'

//Create helper funtion to launch actions when the app is started

function startApp(){
  readFile();
  // displayImages();
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

  keywordArray.forEach(item => {
    const $newKey = $('.menuOption').clone();
    $newKey.text(item.title);
  })
}

$(startApp);
