// API URL + Key
var api_url = 'http://api.nea.gov.sg/api/WebAPI/?dataset=psi_update&keyref='; 
var api_key = '<!--put-your-own-api-key-->';
api_url += api_key;

// Timestamp
var timestamp = '';

// Parse XML data
$.ajax({
  url: api_url,
  dataType: 'xml',
  success: function(data) {
    var datetime = '';
    $(data).find('channel item region').each(function(){
      var region = $(this).find('id').text();
      timestamp = $(this).find('record').attr('timestamp');
      var lat = $(this).find('latitude').text();
      var long = $(this).find('longitude').text();
      console.log(region);
      console.log(lat + ', ' + long);

      // Region - National
      if (region === 'NRS') {
        $(this).find('record reading').each(function(){
          var type = $(this).attr('type');
          var value = $(this).attr('value');
          if (type === 'NPSI') {
            console.log('24hr PSI: ' + value);
            $('#national-24-psi').text(value);
          }
          if (type === 'NPSI_PM25_3HR') {
            console.log('3hr PSI: ' + value);
            $('#national-3-psi').text(value);
          }
        });
      }
      // Region - North
      if (region === 'rNO') {
        $(this).find('record reading').each(function(){
          var type = $(this).attr('type');
          var value = $(this).attr('value');
          if (type === 'NPSI') {
            console.log('24hr PSI: ' + value);
            $('#north-24-psi').text(value);
          }
          if (type === 'NPSI_PM25_3HR') {
            console.log('3hr PSI: ' + value);
            $('#north-3-psi').text(value);
          }
        });
      }
      // Region - South
      if (region === 'rSO') {
        $(this).find('record reading').each(function(){
          var type = $(this).attr('type');
          var value = $(this).attr('value');
          if (type === 'NPSI') {
            console.log('24hr PSI: ' + value);
            $('#south-24-psi').text(value);
          }
          if (type === 'NPSI_PM25_3HR') {
            console.log('3hr PSI: ' + value);
            $('#south-3-psi').text(value);
          }
        });
      }
      // Region - Central
      if (region === 'rCE') {
        $(this).find('record reading').each(function(){
          var type = $(this).attr('type');
          var value = $(this).attr('value');
          if (type === 'NPSI') {
            console.log('24hr PSI: ' + value);
            $('#central-24-psi').text(value);
          }
          if (type === 'NPSI_PM25_3HR') {
            console.log('3hr PSI: ' + value);
            $('#central-3-psi').text(value);
          }
        });
      }
      // Region - East
      if (region === 'rEA') {
        $(this).find('record reading').each(function(){
          var type = $(this).attr('type');
          var value = $(this).attr('value');
          if (type === 'NPSI') {
            console.log('24hr PSI: ' + value);
            $('#east-24-psi').text(value);
          }
          if (type === 'NPSI_PM25_3HR') {
            console.log('3hr PSI: ' + value);
            $('#east-3-psi').text(value);
          }
        });
      }
      // Region - West
      if (region === 'rWE') {
        $(this).find('record reading').each(function(){
          var type = $(this).attr('type');
          var value = $(this).attr('value');
          if (type === 'NPSI') {
            console.log('24hr PSI: ' + value);
            $('#west-24-psi').text(value);
          }
          if (type === 'NPSI_PM25_3HR') {
            console.log('3hr PSI: ' + value);
            $('#west-3-psi').text(value);
          }
        });
      }
    });

    var YYYY = timestamp.substring(0, 4);
    var MM = timestamp.substring(4, 6);
    var DD = timestamp.substring(6, 8);
    var HH = timestamp.substring(8, 10);

    // Time
    var time = '';
    var hour = parseInt(HH, 10);
    if (hour === 0) { time = 'midnight'; }
    if (hour > 0 && hour <= 12) { time = hour.toString() + 'am'; }
    if (hour > 12) { time =  (hour - 12).toString() + 'pm';}

    // Date
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = DD + ' ' + month[parseInt(MM, 10) - 1] + ' ' + YYYY;

    // Display date and time
    $('#timestamp').text('Latest PSI at ' + time + ' on ' + date);
  },
  error: function(){
    var text = 'Failed to fetch data.';
    console.log(text);
    $('.psi').text(text);
  }
});
