// js/app.js

window.App = {};


//ダミーのNoteコレクションを生成する
var initialzeNotes = function() {
	var noteCollection = new App.NoteCollection([{
		title: 'テスト1',
		body: 'テスト1です'
	} , {
		title: 'テスト2',
		body: 'テスト2です'
	} , {
		title: 'テスト3',
		body: 'テスト3です'
	}]);

	//作成したモデルはローカルストレージに保存する
	noteCollection.each(function(note) {
		note.save();
	});

	//この処理で作ったコレクションは一時的な用途であり
	//必要なのは中身のモデルなのでモデルの配列を返す
	return noteCollection.models;
};

$(function() {
	// NoteCollectionコレクションを初期化する
	// あとで別のjsファイルからも参照するので
	// App名前空間配下に参照を持たせておく
	App.noteCollection = new App.NoteCollection();

	//メモ一覧のビューを表示する領域として
	//App.Containerを初期化する
	//こちらも同様に理由でApp配下に参照を持たせる
	App.mainContainer = new App.Container({
		el : '#main-container'
	});

	//初期化処理を追加する
	App.headerContainer = new App.Container({
		el : '#header-container'
	});

	//NoteCollectionコレクションのデータを受信する
	//（Backborn.localStorageを使用しているので
	//ブラウザのローカルストレージから読み込む）
	App.noteCollection.fetch().then( function(notes) {

		if (notes.length === 0 ) {
			var models = initialzeNotes();
			App.noteCollection.reset(models);
		}

		//ルータの初期化と履歴管理の開始
		App.router = new App.Router();
		Backbone.history.start();
	});
});


