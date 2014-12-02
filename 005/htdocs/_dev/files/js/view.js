
//ビューの定義
var TodoView = Backbone.View.extend({

	template:
	'<label>' +
	'	<input class="toggle" type="checkbox">' +
	'	<span><%= title %></span>' +
	'</label>',

	events: {
		'click .toggle': 'toggleCompleted'
	},

	render: function() {
		var compiled = _.template(this.template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	},

	toggleCompleted: function() {
		console.log('チェックされました');
		console.log(this instanceof TodoView);
	}
});


//DOMへの挿入
var todo = new Todo({title: '牛乳を買う'});

var todoView = new TodoView({
	model: todo
});

$(function() {
	todoView.render().$el.appendTo($(document.body));
});