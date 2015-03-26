var lines1 = new Object();
var lines2 = new Object();
var lines3 = new Object();

$.ajax({
  url: "http://habarobots.ru/lab/ttl/01.txt",
  async: false
})
  .done(function( data1 ) {
      lines1 = data1.split("\n");
	  //console.log(lines1);
    }
 );

$.ajax({
  url: "http://habarobots.ru/lab/ttl/02.txt",
  async: false
})
  .done(function( data2 ) {
      lines2 = data2.split("\n");
	  //console.log(lines2);
    }
 );

 $.ajax({
  url: "http://habarobots.ru/lab/ttl/03.txt",
  async: false
})
  .done(function( data3 ) {
      lines3 = data3.split("\n");
	  //console.log(lines3);
    }
 );

rnd1 = Math.floor(Math.random() * Object.keys(lines1).length);
rnd2 = Math.floor(Math.random() * Object.keys(lines2).length);
rnd3 = Math.floor(Math.random() * Object.keys(lines3).length);
