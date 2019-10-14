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
      text: 'Something went wrong!'
    });
  })
  // form validation passed, form will submit if submit event not returned false
  .on('formvalid.zf.abide', function(ev, frm) {
    Swal.fire({
      type: 'success',
      title: 'Thank you',
      text: 'We have received your email.'
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
        Swal.fire(
          response.message,
          'Thank You, ' + response.name + ' for your contact information!',
          'success'
        );
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

// quotes are stored in an array of objects
var quotes = [
  {
    attrib: 'Pamala Simpson',
    quote:
      'Darrell Dunn and his wonderful crew just completed  my patio deck, cover and front porch today, everything looks excellent and they are true craftsmen. The job was finished on time as promised and I will definitely use Mr Fix again soon, Thank you Pam S'
  },
  {
    attrib: 'Dave Williams',
    quote:
      'Outstanding job on a neighbors home in the Warrior Fall community I observed your progress in completing this beautiful project. A few years ago Mr. Fix It redid our master bath shower. It came out beautifully. Thanks!'
  },
  {
    attrib: 'Michael',
    quote:
      'Mr Fix It replaced our deck, updated two bathrooms and the foyer, as well as other remodeling work.  Enjoyed working with a team of experienced professionals.  People were working on some aspect of the renovation nearly every day, keeping the project on schedule.  Happy with the quality of the completed work.'
  },
  {
    attrib: 'Julie Tidwell',
    quote:
      'Darrell & his crew built a beautiful deck (replacing an old, worn deck).  Guys were dependable, hard-working, & did an excellent job.  The whole thing was finished in 4 days.  I will certainly recommend them to friends & will call him in the future for other projects.'
  },
  {
    attrib: 'Melissa Holloway',
    quote:
      'Mr. Dunn and his wonderful crew of workman have done 3 major projects for us over the last two years. Two full remodels of master and second bath last year. Their work and care were both outstanding  and we love our new bathrooms. They just finished a full gut job of our kitchen and oh my goodness what a transformation. Again the crew was great and worked effectively and amazed at how clean it was after each day of work. The only issues we have is that they have done such an amazing job we now want them to do several more projects for us. Kudos to the Mr. Fix It team for making our home look so wonderful!! I would highly recommend them to anyone needing home improvements.'
  },
  {
    attrib: 'Grieg Vanlandingham',
    quote:
      'I moved here 13 years ago.  Mr. Dunn did a lot of work on my home before I purchased it.  Since then he has done two additions to the original deck which he built and renovated my bathroom, put in a beautiful walk in shower.  I plan to have him do another project in the near future.  His work is always perfect! He has a wonderful crew that work quickly & never leave a mess!  He is dependable and honest.  I cannot say enough good things about his work.'
  },
  {
    attrib: 'ETBCR Border Collie Rescue',
    quote:
      'I have had Mr Fix It do numerous jobs for me over the past 6 years.  With every job, he was extremely professional, always on time, his workmen are fantastic, and always finished the job exactly as promised.   I just signed a contract with him to do yet another job.   He is a man of his word, has a wonderful team, and definitely knows his trade.  I recommend him to everyone!'
  },
  {
    attrib: 'Michael West',
    quote:
      'Mr. Fix-It just completed replacing our old Jacuzzi Tub with a beautiful walk-in shower. The job was completed in a timely manner and at a reasonable price.  The workers were very professional and knowledgeable and did an excellent job.  Mr. Fix-It  has completed several jobs for me over the past 10 years, and I have always been pleased with the end results. I would call him again tomorrow if I needed another project completed and would not hesitate to recommend him to my friends.'
  },
  {
    attrib: 'Rosemary McKinney',
    quote: 'Another outstanding job... Darrell and his crew the very best.'
  }
];

// function to load and display a new quote
function newQuote() {
  var quoteID = Math.floor(Math.random() * quotes.length);
  $('#quote').html(quotes[quoteID].quote);
  $('#attrib').html(quotes[quoteID].attrib);
  $('#twitterButton').attr(
    'href',
    'https://twitter.com/intent/tweet?text=' +
      quotes[quoteID].quote +
      ' -' +
      quotes[quoteID].attrib
  );
}

// wait for page load before displaying content
$(document).ready(function() {
  // load an initial quote
  newQuote();

  // retrieve a new quote when the button is clicked
  $('#generateButton').on('click', function() {
    newQuote();
  });
});
