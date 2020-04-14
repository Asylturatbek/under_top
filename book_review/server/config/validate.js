function isValid(body) {
	if(body.name && body.name.toString().trim() != '') {
		if(body.price && body.price.toString().trim() != '') {
			if(body.description && body.description.toString().trim() != '') {
				if(body.photo && body.photo.toString().trim() != '') {
					return true
				} else {
					console.log('1st')
					return false
				}
			} else {
				console.log('2nd')
				return false
			}
		} else {
			console.log('3rd')
			return false
		}
	} else {
		console.log('last')
		return false
	}
}

module.exports = isValid