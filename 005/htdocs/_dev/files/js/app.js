// js/app.js

var Contact = Backbone.Model.extend ({
	defaults: {
		firstName: '',
		lastName: '',
		email: ''
	}
});

var ContactView = Backbone.View.extend ({
	render: function() {
		var htmlTemplate = $('#contact-template').html();
		var compiled = _.template(htmlTemplate);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	}
});

var contact = new Contact({
	firstName: 'Alice',
	lastName: 'Henderson',
	email: 'alice@example.com'
});

var contactView = new ContactView({
	model: contact
});

$(function () {
	contactView.render().$el.appendTo($(document.body))
});

// console.log(JSON.stringify(contact, null, 2));
// contact.set('email', 'Henderson@example.com');
// console.log(JSON.stringify(contact, null, 2));