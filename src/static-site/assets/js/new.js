$(document).ready(function() {
  var x = "us";
  var y = "brandnewcongress";
  var z = ".org";
  var r = '' + x + '@' + y + z;
  $('.obf-email').attr('href', 'mailto:' +r);
});