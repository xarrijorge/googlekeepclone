var App = /** @class */ (function () {
    function App() {
        this.notes = [
            {
                id: 2,
                title: 'Water Pokemon',
                text: 'Swarmpert',
                color: 'white'
            },
            { id: 1, title: 'Fire Pokemon', text: 'Blaziken', color: 'white' },
            {
                id: 3,
                title: 'Super Legendary',
                text: 'Mega Mewtwo Y',
                color: 'white'
            },
        ];
        this.id = 0;
        // Getting HTML elements
        this.$notes = document.querySelector('#notes');
        this.$form = document.querySelector('#form');
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText = document.querySelector('#note-text');
        this.$formButtons = document.querySelector('#form-buttons');
        this.$placeholder = document.querySelector('#placeholder');
        this.$submitButton = document.querySelector('#submit-button');
        this.$modal = document.querySelector('.modal');
        this.$modalTitle = document.querySelector('.modal-title');
        this.$modalText = document.querySelector('.modal-text');
        this.$editButton = document.querySelector('.fa-edit');
        this.$modalCloseButton = document.querySelector('#modal-close');
        this.$modalDoneButton = document.querySelector('#modal-done');
        this.addEventListeners();
    }
    App.prototype.handleFormClick = function (event) {
        var isFormClicked = this.$form.contains(event.target);
        isFormClicked ? this.openForm() : this.closeForm();
    };
    App.prototype.addEventListeners = function () {
        var _this = this;
        document.body.addEventListener('load', function () {
            _this.displayNotes();
        });
        document.body.addEventListener('click', function (event) {
            _this.handleFormClick(event);
            _this.openModal(event);
            _this.deleteNote(event);
        });
        this.$submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var title = _this.$noteTitle.value;
            var text = _this.$noteText.value;
            var color = 'white';
            var id = _this.notes.length + 1;
            if (title && text) {
                _this.notes.push({ id: id, title: title, text: text, color: color });
                _this.displayNotes();
                _this.closeForm();
            }
        });
        this.$modalCloseButton.addEventListener('click', function (event) {
            event.stopPropagation();
            _this.$modal.classList.remove('open-modal');
        });
        this.$modalDoneButton.addEventListener('click', function (event) {
            event.stopPropagation();
            _this.editNote();
            _this.$modal.classList.remove('open-modal');
        });
    };
    App.prototype.openForm = function () {
        this.$form.classList.add('form-open');
        this.$noteTitle.style.display = 'block';
        this.$formButtons.style.display = 'block';
    };
    App.prototype.closeForm = function () {
        this.$form.classList.remove('form-open');
        this.$noteTitle.style.display = 'none';
        this.$formButtons.style.display = 'none';
        this.$noteTitle.value = '';
        this.$noteText.value = '';
    };
    App.prototype.openModal = function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('fa-edit')) {
            this.$modal.classList.add('open-modal');
        }
        var $selectedNote = event === null || event === void 0 ? void 0 : event.target.closest('.note');
        if (!$selectedNote)
            return;
        var _a = $selectedNote.children, $noteTitle = _a[0], $noteText = _a[1];
        if ($noteTitle && $noteText) {
            this.$modalTitle.value = $noteTitle.innerText;
            this.$modalText.value = $noteText.innerText;
            this.id = Number($selectedNote.dataset.id);
        }
        console.log(this.notes[this.id - 1]);
    };
    App.prototype.editNote = function () {
        var _this = this;
        var note = this.notes.find(function (note) { return note.id === _this.id; });
        note.title = this.$modalTitle.value;
        note.text = this.$modalText.value;
        this.displayNotes();
        console.log(note);
    };
    App.prototype.deleteNote = function (event) {
        var _this = this;
        event.stopPropagation();
        var $selectedNote = event === null || event === void 0 ? void 0 : event.target.closest('.note');
        if (!$selectedNote)
            return;
        this.id = Number($selectedNote.dataset.id);
        if (event.target.classList.contains('fa-trash')) {
            var note = this.notes.find(function (note) { return note.id === _this.id; });
            confirm("Are you sure you want to delete ".concat(note.title, "?"))
                ? this.notes.splice(this.notes.indexOf(note), 1)
                    ? this.displayNotes()
                    : null
                : null;
        }
    };
    App.prototype.displayNotes = function () {
        var _this = this;
        var colors = [
            'green',
            'coral',
            'darkorange',
            'slateblue',
            'deeppink',
            'gold',
        ];
        colors[Math.floor(Math.random() * colors.length)];
        this.$notes.innerHTML = '';
        this.$placeholder.style.display = 'none';
        this.notes.forEach(function (note) {
            var $note = document.createElement('div');
            $note.classList.add('note');
            $note.dataset.id = note.id;
            $note.style.backgroundColor = note.color;
            $note.innerHTML = "\n                <div class=\"note-header\">\n                    <h2 class=\"note-title\">".concat(note.title, "</h2>\n                                      \n                </div>\n                <div class=\"note-body\">\n                    <p class=\"note-text\">").concat(note.text, "</p>\n                </div>\n                 <div class=\"toolbar\">\n                    <span class=\"toolbar-delete\" style=\"color: tomato\" >\n                        <i class=\"fas fa-trash\"></i>\n                    </span>\n                    <span class=\"toolbar-color\" style=\"color: ").concat(colors[Math.floor(Math.random() * colors.length)], "\">\n                        <i class=\"fas fa-palette\"></i>\n                    </span>\n                    <span class=\"toolbar-edit\" style=\"color: mediumslateblue\">\n                        <i class=\"fas fa-edit\"></i>\n                    </span>\n                </div>\n\n            ");
            _this.$notes.appendChild($note);
        });
    };
    return App;
}());
new App();
