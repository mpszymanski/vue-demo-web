let helpers = {
	elementIsHidden(wrapper, element) {
		return ! wrapper.find(element).isVisible()
	},
	click(wrapper, element) {
		return wrapper.find(element).trigger('click')
	},
	type(wrapper, element, text) {
		let ob = wrapper.find(element)
		if (ob.element !== undefined) {
			ob.element.value = text
			ob.trigger('input')
		}
		
	},
	mockFile() {
		var blob = new Blob([""], { type: 'image/jpeg' });
		blob["lastModifiedDate"] = "";
		blob["name"] = "filename.jpeg";
		return blob;
	}
}

export default helpers
