// generate call html
function generateCallHtml(nameContains, maxSignups, callback) {
  $.ajax({
      url: "https://bnc-website.herokuapp.com/maestro/upcomingConferences",
      crossDomain: true,
      data: {"nameContains": nameContains},
      success: function(response) {
          if (typeof response.conferences === "undefined" || response.conferences.length < 1) {
            callback("Sorry, all calls are full. Check back later.");
            return;
          }

          var $ul = $("<ul></ul>");
          $(response.conferences).each(function(index, item) {
              var freeSlots = maxSignups - item.currentSignups;
              if (freeSlots > 0) {
                var $conferenceLink = $("<a></a>").attr("href", item.registrationLink);
                // refactor
                var linkText = "<b>" + item.date + "</b>" + " &mdash; " + item.time;
                // removed this. add back if we want to display free slots: + " (<b>" + freeSlots + "</b> free slots)";
                $conferenceLink.html(linkText);
                var $listItem = $("<li></li>");
                $listItem.append($conferenceLink);
                $ul.append($listItem);
              }
          });

          callback($ul.get(0).outerHTML);
      },
      error: function(xhr, error, exception) {
          console.log(xhr);
          callback("Error occurred. Please contact info@brandnewcongress.org if you were directed to this page.");
      }
  });
}
