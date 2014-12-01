// js/note_list_item.js

App.NoteListItemView = Backbone.View.extend({

	tagName: 'tr',

	initialize : function() {
		//モデルのdestroyイベントを監視して
		//Backbone.ViewのRemove()メソッドを呼び出す
		this.listenTo(this.model, 'destroy', this.remove);
	},

	// [Delete]ボタンを監視して
	// onClickDelete()メソッドを呼び出す
	events : {
		'click .js-delete' : 'onClickDelete'
	},

	render : function() {
		var template = $('#noteListItemView-template').html();
		var compiled = _.template(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	},

	onClickDelete : function() {
		//モデルを削除する
		this.model.destroy();
	}
});