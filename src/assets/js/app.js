import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).foundation();

$(document)
  // form validation failed
  .on('forminvalid.zf.abide', function(ev, frm) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    });
  })
  // form validation passed, form will submit if submit event not returned false
  .on('formvalid.zf.abide', function(ev, frm) {
    Swal.fire({
      type: 'success',
      title: 'Thank you',
      text: 'We have received your email.',
      footer: '<a href>Why do I have this issue?</a>'
    });
    // ajax post form
  });

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$('#contact-form')
  // form validation passed, form will submit if submit event not returned false
  .on('formvalid.zf.abide', function(ev, frm) {
    var form = $(this);
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function(data) {
        var result = trim(data);
        var response = JSON.parse(result);
        console.log(response);
        // Swal.fire(
        //   response.message,
        //   'Thank You, ' + response.name + ' for your reservation!',
        //   'success'
        // );
      }
    });
  });
// to prevent form from submitting upon successful validation
// .on('submit', function(ev) {
//   ev.preventDefault();
// });

function trim(str) {
  var str = str.replace(/^\s+|\s+$/, '');
  return str;
}
