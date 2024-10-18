/**
 * 検索フォーム駆動
 * @param form_obj
 * @returns {Boolean}
 */
function searchFormAction(form_obj, sub_form) {
  if (!form_obj) {
    return false;
  }

  var url = form_obj.action + '/';
  var data = $(form_obj).serializeArray();

  for (var i in data) {
    if (data[i].value === '') {
      continue;
    }
    url += data[i].name + '=' + encodeURIComponent(data[i].value) + '/';
  }

  if (typeof sub_form !== 'undefined') {
    var sub_data = $(sub_form).serializeArray();

    for (var i in sub_data) {
      if (sub_data[i].value === '') {
        continue;
      }
      url += sub_data[i].name + '=' + encodeURIComponent(sub_data[i].value) + '/';
    }
  }
  window.location.href = url;

  return false;
}

function number_format(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

var mutexIncremental = false;

/**
 * 検索条件から車両数取得
 * @param form_obj
 * @returns {Boolean}
 */
function getSearchCount() {
  if (mutexIncremental) {
    return false;
  }
  mutexIncremental = true;

  var data = [];
  if ($('#listFm').length) {
    // Stocklist
    data = $('#listFm').serializeArray();
  } else if ($('#schFm').length) {
    // Top
    data = $('#schFm').serializeArray();
  }

  var data2 = $('#header-search-keyword').serializeArray();
  data = data.concat(data2);

  var url = '/ajax/search_count/';
  for (var i in data) {
    url += data[i].name + '=' + encodeURIComponent(data[i].value) + '/';
  }

  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    async: true,
    success: function (d) {
      mutexIncremental = false;
      var count = 0;
      if (jQuery.isNumeric(d.total_count)) {
        count = number_format(d.total_count);
      }
      $('.fn-available-criteria-count').text(count);
    },
    error: function (response) {
      mutexIncremental = false;
      $('.fn-available-criteria-count').text('- - - - - ');
    }
  });

  return false;
}

$(function () {
  $('#listFm > *, #schFm > *, #header-search-keyword').on('change', function () {
    getSearchCount();
  });
});
