/**
* Sample functions
* 
* Some functions for my projects
* 
*/

/*2018-06-09: greg 
 * display correct orientation for picture according EXIF 
 * requiere exif.js a 3rd party library
 *
 *
 * @var file: file from input file
 * @var imgID: id to assign to the picture
 * @var container: preview container
 *
 */
 function exifTest(file, imgID, container) {
    var angle = 0;
    EXIF.getData(file, function() {
        orientation = file.exifdata.Orientation;

	// Assign the default orientation
        if(orientation === undefined) {
            orientation = 1;
        }
        
        switch(orientation){
            case 1: default:
                angle =0;
                $('#'+container).css('height','inherit');
            break;
            case 8:  angle =-90;break;
            case 3:  angle =180;break;
            case 6:  angle =90;break;
        }
    
        if(angle){
            elemntWidth =  $('#'+container).css('width');
            elemntHeight =  $('#'+container).css('height');

            $('#'+container).css('height',elemntWidth);
            $('#'+imgID).css('transform-origin', 'top left');//translateY(-546px)
            transformation = 'rotate('+angle+'deg) translateY(-'+elemntHeight+')';

            $('#'+imgID).css('transform',transformation);
        }
            $('#'+container).show();
    });
}

/**
 * This simple function retrieve the  picture from the input
 * 
 * @var source: input file 
 * @var target: ID of the preview container
 * 
 * @use: onchange of input file (asume is restricted to pictures)
 */
function uploadPreview(source, target){
    var fileList = source.files ;
    $('#'+target).hide();
	
    for( var i=0,l=fileList.length; l>i; i++ ) {
        file = fileList[i];

        var blobUrl = window.URL.createObjectURL(file) ;
	//Check for the picture orienation
        exifTest(file,target+'Img',target);

        document.getElementById( target).innerHTML = '<img src="' + blobUrl + '" id="'+target+'Img">' ;
    }
}