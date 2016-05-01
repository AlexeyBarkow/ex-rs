var   $submitButtonPressed
	, $editingBookmark = null
	;

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


function toDefault() {
	$('#index').val($('.bookmarks').children().length);
	$('#title').val('');
	$('#html-content').val('');	
}

$('.bookmarks').children().on('click', onBookmarkClick);

function onBookmarkClick () {
	switchToBookmark($(this));
	$('#index').val($(this).index());
	$('#title').val($(this).children().text());
	$('#html-content').val($(`.item:nth-child( ${ 1 + ( + $(this).index()) } )`).html().replace(/<!--[^>]*-->/g, ''));
}


function switchToBookmark($current) {
	var $selected = $('.selected')
		, index = $current.index();
	$editingBookmark = $current;
	$selected.toggleClass('selected');
	$(`.item:nth-child( ${ 1 + ( + $selected.index()) } )`).toggle();
	$current.toggleClass('selected');
	$(`.item:nth-child( ${ 1 + ( + $current.index()) } )`).toggle();
}

$('button[type=submit]').on('click', function () {
	$submitButtonPressed = $(this);
})

$('.add-form').submit(function (e) {
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
		console.log($submitButtonPressed.attr('name'))
		if ($submitButtonPressed.attr('name') === 'edit'){
			console.log("le fu")
			if ($editingBookmark) {
				$(`.item:nth-child( ${ 1 + ( + $editingBookmark.index()) } )`).remove();
				$editingBookmark.remove();
			} 
		}
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
		//prevent page updating
		return false;
	}
});


toDefault();