$('#login').click(function () {
  var g = G$('Ram', 'Manor');

  try {
    g.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
  } catch (e) {
    alert(e);
  }
});

