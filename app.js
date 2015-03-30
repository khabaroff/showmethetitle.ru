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

                allShit(lines1, lines2, lines3);

                $(".refresh").css({
                    '-webkit-transform': 'rotate(' + angle + 'deg)',
                    '-moz-transform': 'rotate(' + angle + 'deg)',
                    '-o-transform': 'rotate(' + angle + 'deg)',
                    '-ms-transform': 'rotate(' + angle + 'deg)'
                });

                refreshtimes += 1;
                angle += 360;

                ga('send', 'event', 'button', 'click', 'refresh ' + refreshtimes);
            });
        }, true);
    });
    var documentsDeferr = $.when(getDoc('01.txt'),
        getDoc('02.txt'),
        getDoc('03.txt'), documentReady);


    documentsDeferr.done(function (a1, a2, a3) {
        var lines1 = a1[0].split(/\r?\n/);
        var lines2 = a2[0].split(/\r?\n/);
        var lines3 = a3[0].split(/\r?\n/);

        allObj.resolve(lines1, lines2, lines3);

        allShit(lines1, lines2, lines3);


    });

    function getDoc(url) {
        return $.ajax({url: url});
    }

    function getRnd(obj) {
        return Math.floor(obj.length * Math.random());
    }

    function resizable(bool) {
        while (!bool) {

            fntsz = parseFloat($("#txt").css('font-size'));
            lnhght = parseFloat($("#txt").css('line-height'));

            console.log(fntsz);
            console.log(lnhght);

            $("#txt").css({
                'font-size': fntsz * 0.95 + 'px',
                'line-height': lnhght * 0.95 + 'px'
            });

            console.log($("#txt").css('font-size'));
            console.log($("#txt").css('line-height'));


            bool = $("#txt").visible(false, false, 'both');

            console.log(bool);
        }
    }

    function allShit(textPart1, textPart2, textPart3) {
        var rnd1 = getRnd(textPart1);
        var rnd3 = getRnd(textPart3);
        var rnd2 = getRnd(textPart2);
        document.querySelector("#txt").innerHTML = textPart1[rnd1] + ' ' + textPart2[rnd2] + ', ' + textPart3[rnd3];
        var rnd4 = Math.ceil(Math.random() * 8) + 1;
        document.body.className = 'site' + rnd4;

        $("#txt").css({
            'font-size': '100px',
            'line-height': '116px'
        });

        var visio = $("#txt").visible(false, false, 'both');

        resizable(visio);


        window.addEventListener('resize', function () {
            resizable(visio)
        });


    }

})(jQuery);





