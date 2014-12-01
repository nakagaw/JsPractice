// js/router.js
//これでメモの一覧詳細の遷移を読み込みなしでできる

App.Router = Backbone.Router.extend({
	routes : {
		'notes/:id' : 'showNoteDetail',
		'new' : 'showNewNote',
		'notes/:id/edit' : 'showEditNote',
		'notes/search/:query' : 'searchNote',
		'*actions' : 'defaultRoute'
	},

	//ルーティングが受け取った:idパラメータは
	//そのまま引数名idで受け取れる
	showNoteDetail : function(id) {
		var note = App.noteCollection.get(id);
		var noteDetailView = new App.NoteDetailView({
			model : note
		});
		App.mainContainer.show(noteDetailView);

		//メモ詳細画面ではNewNoteボタンを消したいので
		//App.Containerのempty()メソッドを呼び出してビューを破棄
		App.headerContainer.empty();

	},

	defaultRoute : function() {
		this.showNoteList();
		this.navigate('notes');
	},

	//引数modelsを受け取るように変更
	showNoteList : function(models) {

		//一覧表示用のコレクションを別途初期化する
		if (!this.filteredCollection) {
			this.filteredCollection = new App.NoteCollection();
		}

		//NoteListViewのインスタンスが表示中でないときのみ
		//これを初期化して表示する
		if (!App.mainContainer.has(App.NoteListView)) {
			//初期化の際に一覧表示用のコレクションを渡しておく
			var noteListView = new App.NoteListView({
				collection : this.filteredCollection
			});
			App.mainContainer.show(noteListView);
		}

		//検索されたモデルの配列が引数に渡されていればそちらを、
		//そうでなければ、すべてのモデルを持つApp.noteCollection
		//インスタンスのモデルの配列を仕様する
		models = models || App.noteCollection.models;

		//一覧表示用のコレクションのreset()メソッドに
		//採用したほうのモデルの配列を渡す
		this.filteredCollection.reset(models);
		//メモ一覧操作ビューを表示するメソッドの呼び出しを追加
		this.showNoteControl();
	},

	//メモ一覧操作ビューを表示するメソッドを追加
	showNoteControl : function() {
		var noteControlView = new App.NoteControlView();

		//submit : formイベントの監視を追加する
		noteControlView.on('submit : form', function(query) {
			this.searchNote(query);
			this.navigate('notes/search/' + query);
		}, this);

		App.headerContainer.show(noteControlView);
	},

	//新規作成画面のルーティングの追加
	showNewNote : function() {
		var self = this;
		//テンプレートの<%= title %>などの出力を空文字列で
		//空欄にしておくため、新規に生成したNoteモデルを渡して
		//NoteFormViewを初期化する
		var noteFormView = new App.NoteFormView({
			model : new App.Note()
		});

		noteFormView.on( 'submit:form', function(attrs) {
			//submit:formイベントで受け取ったフォームの
			//入力値をNoteCollectionコレクションのcreate()に
			//渡してNoteモデルの新規作成と保存を行う
			App.noteCollection.create(attrs);

			//モデル一覧を表示してルートを#notesに戻す
			self.showNoteList();
			self.navigate('notes')
		});

		App.mainContainer.show(noteFormView);
		//[New Note]ボタンはこの画面では必要ないのでビューを破棄
		App.headerContainer.empty();
	},

	//編集画面のルーティングの追加
	showEditNote : function(id) {
		var self = this;
		//既存のNoteモデルを取得してNoteFormViewに渡す
		var note = App.noteCollection.get(id);
		var noteFormView = new App.NoteFormView({
			model : note
		});

		noteFormView.on( 'submit:form', function(attrs) {
			//submit:formイベントで受け取ったフォームの
			//入力値をNoteモデルに保存する
			note.save(attrs);

			//モデル詳細画面を表示してルートも適切なものに書き換える
			self.showNoteDetail(note.get('id'));
			self.navigate('notes/' + note.get('id'));
		});

		App.mainContainer.show(noteFormView);
		//[New Note]ボタンはこの画面では必要ないのでビューを破棄
		App.headerContainer.empty();
	},

	searchNote : function(query) {
		var filtered = App.noteCollection.filter(function(note) {
			return note.get('title').indexOf(query) !== -1;
		});
		this.showNoteList(filtered);
	}
 });