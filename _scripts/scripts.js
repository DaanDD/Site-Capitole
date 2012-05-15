//DOCUMENT READY
//ACTIVATE THE IMAGE GALLERY
$(window).load(function() {
	$('.blueberry').blueberry();
});

//DOCUMENT READY
$(document).ready(function () {
	$("#toggle").click(function () {
		$(".pull-right").slideToggle(300);
	});
	
	$("#langswitcher > a,#langswitcher ul li a").click(function () {
		$("#langswitcher ul").slideToggle(300);
	})
});

//WINDOW RESIZE
$(window).resize(function () {
	if ($(window).width()+scrollbar_width() >= 640 && $(".pull-right").css("display") === "none") {
		$(".pull-right").css("display","block");
	}
	if ($(window).width()+scrollbar_width() < 640 && $(".pull-right").css("display") === "block") {
		$(".pull-right").css("display","none");
	}
});

/* Calculates scrollbar width in pixels */
function scrollbar_width() {
    if( jQuery('body').height() > jQuery(window).height()) { 
        var calculation_content = jQuery('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        jQuery('body').append( calculation_content );
        var width_one = jQuery('div', calculation_content).innerWidth();
        calculation_content.css('overflow-y', 'scroll');
        var width_two = jQuery('div', calculation_content).innerWidth();
        jQuery(calculation_content).remove();
        return ( width_one - width_two );
    }
    return false;
}



//Homepage ICONS ANIMATIONS
$(".icon-what").hover(function(){
				$(this).find('.outer').animate({
					marginLeft : '-60px',
					marginTop : '-60px',
					width : '120px',
					height : '120px',
					opacity: 0.5
				}, 250);
			}, function(){
				$(this).find('.outer').clearQueue();
				$(this).find('.outer').animate({
					marginLeft : '-55px',
					marginTop : '-55px',
					width : '110px',
					height : '110px',
					opacity: 1
				}, 250);
	});
	//TO TOP BUTTON ANIMATION
	function scrollUp()
	{
		$('html, body').animate({scrollTop:0}, 'fast');
		return false;
	}
	

	
	// GOOGLE ANALITICS
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-1845303-7']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
  