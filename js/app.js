'use strict'
//////////////////////////////////////

//build constructor function to build/display each photo
//use AJAX $.get() to read the JSON file data
// use jQuery to make a copy of the HMTL template of the photo component
//for each object, fill in the duplicated template with its properties, then append the copy to the DOM

function ImageObject (item){
  this.img_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}
ImageObject.list = []

function readFile(){
  $.get('/data/page-1.json', data => {
    console.log(data);
    data.forEach( item => {
      ImageObject.list.push( new ImageObject(item))
    });

  },'json');
}

function displayImages(ImageObject){
  ImageObject.list.forEach(item => {

    const $newItem = $('#photo-template').clone();

    $newItem.find('h2').text(item.title);
    $newItem.find('img').attr('src', item.img_url);
    $newItem.find('alt').text(item.keyword);
    $newItem.find('p').text(item.description);

    $('#photo-template').append($newItem);
  });
}


function startApp(){
  readFile();
  displayImages();

}

console.log('test');
$(startApp);

