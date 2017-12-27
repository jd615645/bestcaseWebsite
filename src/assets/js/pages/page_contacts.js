var ContactPage = function () {

    return {
        
    	//Basic Map
        initMap: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
				scrollwheel: false,				
				lat: 24.134269,
				lng: 120.637131
			  });
			  
			  var marker = map.addMarker({
				lat: 24.134269,
				lng: 120.637131,
	            title: 'Company, Inc.'
		       });
			});
        },

        //Panorama Map
        initPanorama: function () {
		    var panorama;
		    $(document).ready(function(){
		      panorama = GMaps.createPanorama({
		        el: '#panorama',
		        lat : 40.748866,
		        lng : -73.988366
		      });
		    });
		}        

    };
}();