var element = $('body');
var visibility = VisSense(element[0], {fullyvisible: 0.75});

if (visibility.isFullyVisible()) {
    console.log("fullyvisible");
}
 