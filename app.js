(function ($) {
    var documentReady = $.Deferred();
    allObj = $.Deferred();
    $(document).ready(function () {
        documentReady.resolve();
        var angle = 360;
        var refreshtimes = 0;
        var bodycolor = '';

        document.querySelector(".refresh").addEventListener('click', function () {
            allObj.done(function (lines1, lines2, lines3) {
                var rnd1 = getRnd(lines1);
                var rnd3 = getRnd(lines3);
                var rnd2 = getRnd(lines2);
                document.querySelector("#txt").innerHTML = lines1[rnd1] + ' ' + lines2[rnd2] + ', ' + lines3[rnd3];
                var rnd4 = Math.ceil(Math.random() * 8) + 1;
                document.body.className = 'site' + rnd4;


                $(".refresh").css({
                    '-webkit-transform': 'rotate(' + angle + 'deg)',
                    '-moz-transform': 'rotate(' + angle + 'deg)',
                    '-o-transform': 'rotate(' + angle + 'deg)',
                    '-ms-transform': 'rotate(' + angle + 'deg)'
                });

                arrowcolor = $("body").css("color");

                $('.refresh').hover(function () {
                        $('#svg').css('fill', 'red');
                    },
                    function () {
                        $('#svg').css('fill', arrowcolor);
                    });


                refreshtimes += 1;
                angle += 360;

                ga('send', 'event', 'button', 'click', 'refresh', refreshtimes);






            });
        }, true);
    });
    var documentsDeferr = $.when(getDoc('http://habarobots.ru/lab/ttl/01.txt'),
        getDoc('http://habarobots.ru/lab/ttl/02.txt'),
        getDoc('http://habarobots.ru/lab/ttl/03.txt'), documentReady);


    documentsDeferr.done(function (a1, a2, a3) {
        var lines1 = a1[0].split(/\r?\n/);
        var lines2 = a2[0].split(/\r?\n/);
        var lines3 = a3[0].split(/\r?\n/);

        allObj.resolve(lines1, lines2, lines3);
        var rnd1 = getRnd(lines1);
        var rnd3 = getRnd(lines3);
        var rnd2 = getRnd(lines2);
        document.querySelector("#txt").innerHTML = lines1[rnd1] + ' ' + lines2[rnd2] + ', ' + lines3[rnd3];
        var rnd4 = Math.ceil(Math.random() * 8) + 1;
        document.body.className = 'site' + rnd4;

        arrowcolor = $("body").css("color");

        $('.refresh').hover(function () {
                $('#svg').css('fill', 'red');
            },
            function () {
                $('#svg').css('fill', arrowcolor);
            });



    });
    function getDoc(url) {
        return $.ajax({url: url});
    }

    function getRnd(obj) {
        return Math.floor(obj.length * Math.random());
    }

})(jQuery);


