var youTube_Url='https://www.googleapis.com/youtube/v3/search';

//Getting JSON from youtube
function getDataFromApi(searchTerm,callback)
{
  var params=
  {
    part: 'snippet',
    key: 'AIzaSyDh5Y_ujDw5C7aI6ZUC9ix1T-kwuM7AJI8',
    q: searchTerm
  };
  $.getJSON (youTube_Url,params,callback);
}

//JSON Callback Function
function callback (data)
{
  var resultElement='';

  if (data.items.length > 0)
  {
    data.items.forEach(function(item)
    {
      resultElement +='<img data-id="'+item.id.videoId+'" class="js-video" src="'+item.snippet.thumbnails.high.url+'">';
    });
  }

  else
  resultElement+='<p> No Results! </p>';

  $(".js-search-results").html(resultElement);
  lightbox();
}

//Getting SearchTerm to search YouTube
function searchChannel()
 {
  $('.js-search-form').submit(function(e)
  {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, callback);
  });
}

//Creating lightbox to display YouTube Video
function lightbox()
{
  $('.js-video').click(function(event)
  {
    var id=$(this).data('id');
    var element='<div class="js-place"><iframe width="100%" height="500" src="https://www.youtube.com/embed/'+id+'"></iframe>'+
    '<button type="button" class="js-close">close</button></div>';

    $('.js-lightbox').removeClass('hidden');
    $('.js-lightbox').html(element);
    $('.js-search-results').addClass('hidden');
    $('.container').addClass('vanish');
    $('.js-search-form').addClass('hidden');
    lightboxClose();
  });
}

//Closing the video frame
function lightboxClose()
{
  $('.js-close').click(function()
  {
    $(this).closest("div").remove();
    $('.js-search-results').removeClass('hidden');
    $('.container').removeClass('vanish');
    $('.js-search-form').removeClass('hidden');

  });
}

$(function()
{
  searchChannel();
});
