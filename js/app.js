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
  // const successful = data => displayImages(data);

  $.get('/data/page-1.json', objectsArray => {
    objectsArray.forEach(item => {
      ImageObject.list.push(new ImageObject(item));
      console.log(ImageObject.list, 'do I have stuff')
      // if (item.length){ImageObject.list.push(new ImageObject(item));}
      // else {console.log('The file was not read.');}
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
    $newItem.find('img').attr('src', item.image_url);
    $newItem.find('alt').attr(item.keyword);
    $newItem.find('p').text(item.description);
    $newItem.removeAttr('id')

    $('main').append($newItem);

    if(!keywordArray.includes(item.keyword)) {keywordArray.push(item.keyword);}
  });

  //Remove the photo template now that we have data to add to the page

  $('photo-template').remove();

  // keywordArray.forEach(item => {
  //   const $newImage = $('optionMenu').clone();
  //   $newImage.text(item);
  //   $newImage.attr('value', item);

  //   $('select').append($newImage);
//   })
}

$(startApp);
