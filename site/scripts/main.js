$(function() {
    function init() {
        if($(window).width() > 768) {
            makeScrollTos();
            makeProjectNavWork();
            // makeProjectNavUpdateWithScrolling()
            // preventCarousel();
            // moveCarousel();
            // changeCursor();
            showModal();
            hideModal();
            //disableScroll();
        }        
    }

    function makeProjectNavUpdateWithScrolling() {
        return
        var waypoint = new Waypoint({
            element: $('#projectOne'),
            handler: function() {
                console.log("test")
            },
            context: $('main')
        })
    }

    function makeProjectNavWork() {
        $("header nav li.project-nav a").on("click", function() {
            $("header nav li.project-nav").siblings().removeClass("active");
            $(this).parents("li").addClass("active");
        })
    }

    function makeScrollTos() {
       
        $(".scrolltotop").on("click", function(e) {

           e.preventDefault();

           TweenLite.to(window, 0.5, {scrollTo:{y: 0}, ease:Power2.easeInOut});
        })

        $(".scrolltobottom").on("click", function(e) {

            e.preventDefault();

            TweenLite.to(window, 0.5, {scrollTo:{y: "max"}, ease:Power2.easeInOut});
        })
    }

    function preventCarousel() {
        // Don't carousel on tablet+
        if($(window).width() > 768) {

            $('.carousel ul').each(function() {
                var groups = $(this).children('.group').length;
                $(this).width(100 * groups + '%');
                var width = (100 / groups + '%'); 
                $(this).children('.group').width(width);
            });
        }    
    }    

    function moveCarousel() {
        // Move Carousel based on position
        $('.group').on('click', function(event){
            var distanceFromLeft = event.clientX - $(this).offset().left;   
            var length =  $(this).parent('.ul').length
            var groupNumber = $(this).parent().children('.group').length;
            var percentChange = 100 / groupNumber;
            var groupIndex = $(this).attr('data-group');

            if (distanceFromLeft >= halfWay) {
                var dataPosition = $(this).parent('ul').attr('data-position', -1 * (percentChange * groupIndex));
                var dataCurrent = $(this).attr('data-current', - (percentChange * groupIndex));

                if($(this).hasClass('last')) {
                    event.preventDefault();
                } else {
                    $(this).parent('ul').css({'transform': 'translateX(-' + percentChange * groupIndex +'%)'});
                }
            } 

            else {
                var position = parseInt($(this).parent('ul').attr('data-position'));
                var moveBack = parseInt($(this).parent().find('.group').attr('data-current'));
                moveBack = moveBack * (groupIndex);
                
                var moveHere = $(this).prev().prev().attr('data-current');
                parseInt(moveHere);

                if($(this).index() === 1 ) {
                    moveHere = 0;
                }

                $(this).parent('ul').css({'transform': 'translateX(' + moveHere +'%)'});
            }           
        });
        

        // If user clicks on modal image, don't push carousel.
        $('.group img').on('click', function(event) {
            event.stopPropagation();
        });
    }  

    function changeCursor() {
        // Change default cursor
        $('.group').mousemove(function(event) {
            var distanceFromLeft = event.clientX - $(this).offset().left;       
            if (distanceFromLeft >= (halfWay - 30)) {
                $('.group').css( 'cursor', 'url(images/cursor-rightarrow.svg), auto' );
            } else {
                $('.group').css( 'cursor', 'url(images/cursor-leftarrow.svg), auto' );
            }
        });    
    } 

    function disableScroll() {
        $(window).on('scroll touchmove mousewheel', function(e){
            var winHeight = $(window).innerHeight();
            var scrollPos = $(window).scrollTop();
            var fullDocHeight = $(document).innerHeight();
            
            if (winHeight + scrollPos == fullDocHeight) { 
                $('.main').css({'overflow': 'scroll'});
            } else {
                $('.main').css({'overflow': 'hidden'});
            }
        });
    }


    function showModal() {
        if (isMobile()) return;

        $('.modalify').on('click', function(event){
            var imgSrc = $(this).attr('src');
            
            console.log("make a modal!", imgSrc);
            
            $('.modal').removeClass('white');
            $('.modalized').attr('src', imgSrc);
            $('.modal').addClass('show');

            event.preventDefault;
        });
    } 

    function hideModal() {
        if (isMobile()) return;
        
        $('.modal').on('click', function(event) {
            $('.modal').removeClass('show');
        });
    }


    init();
    //var groupWidth = $('.group').width();
    //var halfWay = groupWidth / 2;

});
