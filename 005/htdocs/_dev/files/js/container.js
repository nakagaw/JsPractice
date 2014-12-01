
var Todo = Backbone.Model.extend({
	defaults : {
		title : '',
		competed : false
	}
});

var TodoView = Backbone.View.extend({

template :  '<label>' +
			'	<input class="toggle" type="checkbox">' +
			'	<ispan><%= title %></span>' +
			'</label>' ,
	events : {
		'click. toggle' : 'toggleCompleted'
	},
	render: function() {
		var compiled = _.template(this.template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	},
	toggleCompleted : function(e) {
		console.log('チェックボックスがクリックされました。');
		console.log(this instanceof TodoView);
	}
});

var todo = new Todo({ title : '牛乳を買う'});

var todoView = new TodoView({
	model : todo
});

$(function() {
	todoView.render().$el.appendTo($(document.body));
});