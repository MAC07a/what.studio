// toggle visibility for css3 animations 
var slides = null
var slideTemplate = null

$(document).ready(function() {
    slideTemplate = $('#slide-template').html().trim()
    $('#slide-template').remove()
    $.getJSON('ndc.json', function(data){
        slides = data
        addSlides()
        $("#load-more .btn").bind("click", addSlides);
    });
    $('header').addClass('visibility');

});

//carousel animation
$(window).load(function () {
    $('header').addClass("animated fadeIn");
});

// Fixed navbar
$(window).scroll(function () {
    //animations    
    $('header').each(function(){
        var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+35) {
            $('.navbar-default').removeClass("fixed-to-top");
        }       
    });
    
    $('.careers').each(function(){
        var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+35) {
            $('.navbar-default').addClass('fixed-to-top');
        }       
    });
});

var masonryInit = false
function addSlides() {
    var count = 10
    var img = $('<img />', { 
               src: '/img/compi_cartoon_logo.png', 
               width: '100%'
             })
    var dummy = '<div class="dummy-rectangle"><div class="dummy"></div><div class="rectangle"></div></div>'
    while(count > 0){
        var index = slides.length -1
        if(index < 0) break;

        // create each slide template
        var slide = slideTemplate
        slide = slide.replace(/{title}/g, slides[index].title)
                     .replace(/{speaker}/g, slides[index].speaker)
                     .replace(/{type}/g, slides[index].type)
                     .replace(/{description}/g, slides[index].description)
                     .replace(/{link}/g, slides[index].link || slides[index].pressLink)

        if(slides[index].profile){
            img = img.attr('src', slides[index].profile)
        }
        slide = slide.replace(/{profile}/g, img.prop('outerHTML'))

        var slideElem = ''
        if(slides[index].slide){
            img = img.attr('src', slides[index].slide)
            slideElem = img.prop('outerHTML')+dummy
        }
        slide = slide.replace(/{slide}/g, slideElem)

        // append to list
        if(!masonryInit){
            $('#slides').append($.parseHTML(slide))
        }else{
            var $elems = $.parseHTML(slide)
            $('.grid').append( $elems ).masonry('appended', $elems, true);
        }
        slides.pop()
        count--
    }
    if(slides.length <= 0) {
        $("#load-more").remove()
    }
    if(!masonryInit){
        $('.grid').masonry({
            columnWidth: '.grid-sizer',
            itemSelector: '.grid-item',
            percentPosition: true
        });
        masonryInit = true
    }
}

// Header Carousel
$('header .carousel').carousel({
  interval: 3000
})
