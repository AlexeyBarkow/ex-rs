$('.hide, .show').on('click', function () {
	$('.add-form, #aside-hide, #aside-show').toggle();
});


// $('.inner-content > section').html($('.selected').data('text'));
function toDefault() {
	$('#index').val($('.bookmarks').children().length);
	$('#title').val('');
	$('#html-content').val('');	
}

// $('#title').val(function() {
// 	return $(this).data('default');
// });
function onBookmarkClick () {
	switchToBookmark($(this));
}

$('.bookmarks').children().on('click', onBookmarkClick);

function switchToBookmark($current) {
	var $selected = $('.selected')
		, index = $current.index();
	$selected.toggleClass('selected');
	console.log($(`.item:nth-child( ${ 1 + ( + $current.index()) } )`))
	$(`.item:nth-child( ${ 1 + ( + $selected.index()) } )`).toggle();
	$current.toggleClass('selected');
	$(`.item:nth-child( ${ 1 + ( + $current.index()) } )`).toggle();
}

$('.add-form').submit(function () {
	// console.log($('#index').val() === '');
	var   isValid = true
		, $index = $('#index')
		, indexVal = $index.val()
		, $title = $('#title')
		, $htmlContent = $('#html-content')
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

	if (isValid) {
		var   $newBookmark = $(`<li class="trapezoid"><a href="#">${ $( '#title' ).val() }</a></li>`)
			, $bookmarks = $('.bookmarks')
			, $newSection = $(`<section class="item"></section>`).html($('#html-content').val()).hide()
			, $innerContent = $('.inner-content')
			;
		$newBookmark.on('click', onBookmarkClick);
		// console.log($index.val())
		if (indexVal === '0') {
			$bookmarks.prepend($newBookmark);
			$innerContent.prepend($newSection);
		} else {
			if (indexVal >= $bookmarks.children().length) {
				$bookmarks.append($newBookmark);
				$innerContent.append($newSection);
			} else {
				$(`.bookmarks li:nth-child( ${ indexVal } )`).after($newBookmark);
				$(`.inner-content section:nth-child( ${ indexVal } )`).after($newSection);
			}
		}
		switchToBookmark($newBookmark);
		toDefault();
	}
});

toDefault();