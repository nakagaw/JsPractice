// js/models.js

var Contact = Backbone.Model.extend ({
	defaults: {
		firstName: '',
		lastName: '',
		email: ''
	}
});

var ContactCollection = Backbone.Collection.extend( {
	model : Contact,
	initialize : function() {
		console.log('ContactCollectionが初期化されました。')
	}
})

var contactCollection = new ContactCollection();

contactCollection.on('add' , function(contact) {
	console.log('モデルが追加されました。' , contact.get('firstName'));
});

contactCollection.add([
{
	firstName: 'Alice',
	lastName: 'Henderson',
	email: 'alice@example.com'
} , {
	firstName: 'Bob',
	lastName: 'Sanders',
	email: 'bob@example.com'
}
]);

// contactCollection.each(function (contact) {
// 	console.log(JSON.stringify(contactCollection, null, 2));
// 	console.log(contactCollection.length);
// });

var ContactView = Backbone.View.extend ({
	render: function() {
		var htmlTemplate = $('#contact-template').html();
		var compiled = _.template(htmlTemplate);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	}
});

var contactView = new ContactView({
	model : contactCollection
});

$(function () {
	contactView.render().$el.appendTo($(document.body))
});
