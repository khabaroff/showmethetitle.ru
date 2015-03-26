(function($) {
  var documentReady = $.Deferred();
  allObj = $.Deferred();

  $(document).ready(function() {
    documentReady.resolve();

    document.querySelector("button").addEventListener('click', function (e) {

      allObj.done(function (lines1, lines2, lines3) {
        var rnd1 = getRnd(lines1);
        var rnd3 = getRnd(lines3);
        var rnd2 = getRnd(lines2);


        document.querySelector("div").innerHTML = lines1[rnd1] +
        lines2[rnd2] + lines3[rnd3];

        var rnd4 = Math.ceil(Math.random() * 11) + 1;
        document.body.className = 'site' + rnd4;

      });
    }, true);


  });

  var documentsDeferr = $.when(
    getDoc('http://habarobots.ru/lab/ttl/01.txt'),
    getDoc('http://habarobots.ru/lab/ttl/02.txt'),
    getDoc('http://habarobots.ru/lab/ttl/03.txt'),
    documentReady
  );

  documentsDeferr.done(function(a1, a2, a3) {



    // console.log(a1);
    var lines1 = a1[0].split("\n");
    var lines2 = a2[0].split("\n");
    var lines3 = a3[0].split("\n");


    allObj.resolve(lines1, lines2, lines3);

    var rnd1 = getRnd(lines1);
    var rnd3 = getRnd(lines3);
    var rnd2 = getRnd(lines2);


    document.querySelector("div").innerHTML = lines1[rnd1] + lines2[rnd2] + lines3[rnd3];

    var rnd4 = Math.ceil(Math.random() * 11) + 1;
    document.body.className = 'site' + rnd4;
  });

  function getDoc(url) {
    return $.ajax({
      url: url
    });
  }

  function getRnd(obj) {
    return Math.floor(obj.length * Math.random());
  }


})(jQuery);
