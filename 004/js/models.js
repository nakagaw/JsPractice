// js/models.js

App.Note = Backbone.Model.extend({
	default: {
		title: '',
		body: ''
	}
});

App.NoteCollection = Backbone.Collection.extend({
	localStrage: new Backbone.LocalStrage('Notes'),
	model: App.Note
});
