var lines1 = new Object({});
var lines2 = new Object({});
var lines3 = new Object({});


$.when(ajax1(), ajax2(), ajax3()).done(function(a1, a2, a3){

  lines1 = a1[0].split("\n");
  lines2 = a2[0].split("\n");
  lines3 = a3[0].split("\n");
});


function ajax1() {
      return $.ajax({
          url: "http://habarobots.ru/lab/ttl/01.txt"
      });
}

function ajax2() {
      return $.ajax({
          url: "http://habarobots.ru/lab/ttl/02.txt"
      });
}

function ajax3() {
      return $.ajax({
          url: "http://habarobots.ru/lab/ttl/03.txt"
      });
}


rnd1 = Math.floor(Math.random() * Object.keys(lines1).length);
rnd2 = Math.floor(Math.random() * Object.keys(lines2).length);
rnd3 = Math.floor(Math.random() * Object.keys(lines3).length);
