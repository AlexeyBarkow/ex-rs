var $submitButtonPressed = null;
var slider = $('.bxslider').bxSlider({
  mode: 'fade',
  speed: 200,
  pager: false,
  onSlideBefore: function(_, _, newIndex) {
  	// console.log(newIndex)
	// console.log($(`.bookmarks li:nth-child( ${ newIndex + 1 } )`));
	switchToBookmark($(`.bookmarks li:nth-child( ${ newIndex + 1 } )`));	
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
	$('#index').val($('.bookmarks').children().length);
	$('#title').val('');
	$('#html-content').val('');	
	$('#datepicker').val(getFormattedDate());
}

$('.bookmarks').children().on('click', onBookmarkClick);

function onBookmarkClick () {
	switchToBookmark($(this));
	$('#index').val($(this).index());
	$('#title').val($(this).children().text());
	$('#html-content').val($(`.item:nth-child( ${ 1 + ( + $(this).index()) } )`).html().replace(/<!--[^>]*-->/g, ''));
	$('#datepicker').val(getFormattedDate($(this).data('date')));
	$('#imagepicker').val($(`.bxslider li:nth-child( ${ 1 + ( + $(this).index()) } ) img`).attr('src'));
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
		isValid = false;
	}
	if ($title.val() === '') {
		$title.addClass('red-border');
		isValid = false;
	}
	if ($htmlContent.val() === '') {
		$htmlContent.addClass('red-border');
		isValid = false;
	}

	if (date === null) {
		$datepicker.addClass('red-border');
		isValid = false;
	}

	if ($imagepicker.val() === '') {
		$imagepicker.addClass('red-border');
		isValid = false;
	}

	// console.log(date);
	if (isValid) {
		var   $newBookmark = $(`<li class="trapezoid"><a href="#">${ $( '#title' ).val().replace(/<[^>]+>/, '') }</a></li>`)
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
				$(`.item:nth-child( ${ indexVal + 1 } )`).remove();
				$(`.bxslider li:nth-child( ${ indexVal + 1 } )`).remove();
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
		slider.reloadSlider();
		switchToBookmark($newBookmark);
		toDefault();
		//prevent page updating
		return false;
	}
});

switchToBookmark($('.selected'));
toDefault();
