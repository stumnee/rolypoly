function init() {
	$('button').on('click', function () {
		transform($('textarea').val());
	});
}

function transform(text) {
	$.ajax({
		url : '/api/v1.0/transform',
		type: 'post',
		data: {
			text: text
		},
		success: function (data) {
			console.log("DATA", data);
			$('textarea').val(data.transformed);
			$('.diff').html(data.diff);

		},
		error: function () {
			console.log("ERROR");
		}

	})
}