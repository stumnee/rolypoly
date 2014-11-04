var express = require('express');
var router = express.Router();

router.post('/transform', function(req, res) {
	console.log("POST /transform");
	console.log("Request: ");
	console.log(req);
	
	var setCorrection = function (position, spacesRemoved) {
		html = '';

		if (spacesRemoved == 0) {
			return;
		}

		var correction = {position: position};

		if (spacesRemoved > 0) {
			html = '<span class="removed">' + Array(spacesRemoved).join('-') + '</span>';
			correction.position -= spacesRemoved;
			correction.spacesRemoved = spacesRemoved;
		} else {
			correction.spacesAdded = Math.abs(spacesRemoved);
			html = '<span class="added">' + Array(correction.spacesAdded).join('+') + '</span>';
		}

		corrections.push(correction);

		return html;
	};

	var i = 0,
		spaces = '',
		diff = '',
		corrections = [],
		original = req.body.text,
		transformed = '';//original.replace(/\s*,\s*/g,', ');

	
	//loop through every character the original text	
	while ((c = original.charAt(i++)) != '') {
		console.log(c);
		if (c == ' ' || c == '\t') {
			spaces += c;
			continue;
		}
		
		if (c == ',' && spaces != '') {
			diff += setCorrection(i, spaces.length);
			spaces = '';
		}

		if (transformed.charAt(transformed.length - 1) == ',') {
			diff += setCorrection(i, 1 - spaces.length);
			spaces = ' ';
		}

		diff += spaces + c;
		transformed += spaces + c;
		spaces = '';
	} 

	transformed += spaces;

	res.json({
		original: original,
		transformed: transformed,
		corrections: corrections,
		diff: diff
	});
});

module.exports = router;
