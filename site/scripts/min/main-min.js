$(function(){function t(){$(window).width()>768&&(e(),n(),c(),l())}function o(){return;var t=new Waypoint({element:$("#projectOne"),handler:function(){console.log("test")},context:$("main")})}function n(){$("header nav li.project-nav a").on("click",function(){$("header nav li.project-nav").siblings().removeClass("active"),$(this).parents("li").addClass("active")})}function e(){$(".jumptoproject").on("click",function(t){t.preventDefault(),jumpProject($(this).data("project"))}),$(".scrolltotop").on("click",function(t){t.preventDefault(),TweenLite.to(window,.5,{scrollTo:{y:0},ease:Power2.easeInOut})}),$(".scrolltobottom").on("click",function(t){t.preventDefault(),TweenLite.to(window,.5,{scrollTo:{y:"max"},ease:Power2.easeInOut})})}function r(){$(window).width()>768&&$(".carousel ul").each(function(){var t=$(this).children(".group").length;$(this).width(100*t+"%");var o=100/t+"%";$(this).children(".group").width(o)})}function a(){$(".group").on("click",function(t){var o=t.clientX-$(this).offset().left,n=$(this).parent(".ul").length,e=$(this).parent().children(".group").length,r=100/e,a=$(this).attr("data-group");if(o>=h){var i=$(this).parent("ul").attr("data-position",-1*(r*a)),s=$(this).attr("data-current",-(r*a));$(this).hasClass("last")?t.preventDefault():$(this).parent("ul").css({transform:"translateX(-"+r*a+"%)"})}else{var c=parseInt($(this).parent("ul").attr("data-position")),l=parseInt($(this).parent().find(".group").attr("data-current"));l*=a;var u=$(this).prev().prev().attr("data-current");parseInt(u),1===$(this).index()&&(u=0),$(this).parent("ul").css({transform:"translateX("+u+"%)"})}}),$(".group img").on("click",function(t){t.stopPropagation()})}function i(){$(".group").mousemove(function(t){var o=t.clientX-$(this).offset().left;o>=h-30?$(".group").css("cursor","url(images/cursor-rightarrow.svg), auto"):$(".group").css("cursor","url(images/cursor-leftarrow.svg), auto")})}function s(){$(window).on("scroll touchmove mousewheel",function(t){var o=$(window).innerHeight(),n=$(window).scrollTop(),e=$(document).innerHeight();o+n==e?$(".main").css({overflow:"scroll"}):$(".main").css({overflow:"hidden"})})}function c(){$(".modalify").on("click",function(t){var o=$(this).attr("src");console.log("make a modal!",o),$(".modal").removeClass("white"),$(".modalized").attr("src",o),$(".modal").addClass("show"),t.preventDefault})}function l(){$(".modal").on("click",function(t){$(".modal").removeClass("show")})}t();var u=$(".group").width(),h=u/2});