var $submitButtonPressed = null;
var slider = $('.bxslider').bxSlider({
  mode: 'fade',
  speed: 200,
  pager: false,
  onSlideBefore: function(_, _, newIndex) {
  	// console.log(newIndex)
	// console.log($(`.bookmarks li:nth-child( ${ newIndex + 1 } )`));
	var $select = $(`.bookmarks li:nth-child( ${ newIndex + 1 } )`);
	switchToBookmark($select);
	changeFormFields($select);
  	// console.log(newIndex);
  }
});

// _ params we are not interested of
// slider.onSlideNext(function(_, _, newIndex) {
// });
$('#hide-button').on('click', function () {
	$('.add-form').toggle();
	$(this).toggleClass('hide').toggleClass('show');
		console.log($(this).data('text-original'), $(this).text())
	if ($(this).text() === $(this).data('text-original')) {
		$(this).text($(this).data('text-swap'));
	} else {
		if ($(this).text() === $(this).data('text-swap')) {
			$(this).text($(this).data('text-original'));
		}
	}
});

$('#datepicker').datepicker();

function getFormattedDate(ms) {
	if (ms) {
		return $.datepicker.formatDate('mm/dd/yy', new Date(ms));
	}
	return $.datepicker.formatDate('mm/dd/yy', new Date());
}

function toDefault() {
	// $editingBookmark = null;
	$('#index').val($('.bookmarks').children().length);
	$('#title').val('');
	$('#html-content').val('');
	$('#datepicker').val(getFormattedDate());
	$('#imagepicker').val('');
	$('.error-message').html('');
}

$('.bookmarks').children().on('click', onBookmarkClick);

function onBookmarkClick () {
	switchToBookmark($(this));
	changeFormFields($(this));
}

function changeFormFields ($current) {
	$('#index').val($current.index());
	$('#title').val($current.children().text());
	$('#html-content').val($(`.item:nth-child( ${ 1 + ( + $current.index()) } )`).html().replace(/<!--[^>]*-->/g, ''));
	$('#datepicker').val(getFormattedDate($current.data('date')));
	$('#imagepicker').val($(`.bxslider li:nth-child( ${ 1 + ( + $current.index()) } ) img`).attr('src'));
}


function switchToBookmark($current) {
	var $selected = $('.selected')
		, index = $current.index()
		;
	$editingBookmark = $current;
	$selected.toggleClass('selected');
	$(`.item:nth-child( ${ 1 + ( + $selected.index()) } )`).toggle();
	$current.toggleClass('selected');
	$(`.item:nth-child( ${ 1 + ( + $current.index()) } )`).toggle();
	$('.actual-date').text(getFormattedDate($current.data('date')));
	// slider.reloadSlider();
	slider.goToSlide($current.index());
}

$('button[type=submit]').on('click', function () {
	$submitButtonPressed = $(this);
});

$('#reset').on('click', function () {
	toDefault();
});

$('.add-form').submit(function () {
	var   isValid = true
		, validMessage = ''
		, $index = $('#index')
		, indexVal = $index.val()
		, $title = $('#title')
		, $htmlContent = $('#html-content')
		, $datepicker = $('#datepicker')
		, date = $datepicker.datepicker('getDate')
		, $imagepicker = $('#imagepicker')
		;
	$('.red-border').removeClass('red-border');
	if (indexVal === '') {
		$index.addClass('red-border');
		validMessage += '<p>Please, fill the index field</p>';
		isValid = false;
	}

	if ($title.val() === '') {
		$title.addClass('red-border');
		validMessage += '<p>Please, fill the title field</p>';
		isValid = false;
	}

	if (date === null) {
		$datepicker.addClass('red-border');
		isValid = false;
		validMessage += '<p>Please, fill the date field</p>';
	} else {
		var currDate = new Date();
		currDate.setHours(0,0,0,0);
		if (currDate.getTime() > date.getTime()) {
			$datepicker.addClass('red-border');
			isValid = false;
			validMessage += '<p>Please, fill the correct date</p>';
		}
	}

	if ($imagepicker.val() === '') {
		$imagepicker.addClass('red-border');
		isValid = false;
		validMessage += '<p>Please, fill the image field</p>';
	}

	if ($htmlContent.val() === '') {
		$htmlContent.addClass('red-border');
		isValid = false;
		validMessage += '<p>Please, fill the content field</p>';
	}

	if ($('.bookmarks').outerWidth() + 100 > $('.content').outerWidth() && $submitButtonPressed.attr('name') !== 'edit') {
		isValid = false;
		validMessage += "Can't add new tab";
	}

	if (isValid) {
		var   $newBookmark = $(`<li class="trapezoid"><a href="#">${ $( '#title' ).val().replace(/<[^>]+>/g, '') }</a></li>`)
			, $bookmarks = $('.bookmarks')
			, $newSection = $(`<section class="item"></section>`).html($('#html-content').val()).hide()
			, $innerContent = $('.inner-content')
			, $bxslider = $('.bxslider')
			, $newSlide = $(`<li><image src="${ $imagepicker.val() }" alt="slide"></li>`)
			;

		$newBookmark.on('click', onBookmarkClick);
		$newBookmark.data('date', date.getTime());
		if ($submitButtonPressed.attr('name') === 'edit'){
			if ($editingBookmark) {
				$(`.item:nth-child( ${ 1 + ( + indexVal ) } )`).remove();

				$(`.bxslider li:nth-child( ${ 1 + ( + indexVal ) } )`).remove();
				$editingBookmark.remove();
			}
		}
		if (indexVal === '0') {
			$bookmarks.prepend($newBookmark);
			$innerContent.prepend($newSection);
			$bxslider.prepend($newSlide);
		} else {
			if (indexVal >= $bookmarks.children().length) {
				$bookmarks.append($newBookmark);
				$innerContent.append($newSection);
				$bxslider.append($newSlide);
			} else {
				$(`.bookmarks li:nth-child( ${ indexVal } )`).after($newBookmark);
				$(`.inner-content section:nth-child( ${ indexVal } )`).after($newSection);
				$(`.bxslider li:nth-child( ${ indexVal } )`).after($newSlide);
			}
		}
		// slider.goToSlide($newSlide.index());
		switchToBookmark($newBookmark);
		slider.reloadSlider();
		slider.goToSlide($('.selected').index());
		toDefault();
	} else {
		$('.error-message').html(validMessage);
	}
	return false;
});

switchToBookmark($('.selected'));
toDefault();
