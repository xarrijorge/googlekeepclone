var App = /** @class */ (function () {
    function App() {
        this.notes = [];
        this.$notes = document.querySelector('#notes');
        this.$form = document.querySelector('#form');
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText = document.querySelector('#note-text');
        this.$formButtons = document.querySelector('#form-buttons');
        this.$placeholder = document.querySelector('#placeholder');
        this.$submitButton = document.querySelector('#submit-button');
        this.closeButton = document.querySelector('#close-button');
        this.submitButton = document.querySelector('#submit-button');
        this.addEventListeners();
    }
    App.prototype.handleFormClick = function (event) {
        var isFormClicked = this.$form.contains(event.target);
        isFormClicked ? this.openForm() : this.closeForm();
    };
    App.prototype.addEventListeners = function () {
        var _this = this;
        document.body.addEventListener('click', function (event) {
            _this.handleFormClick(event);
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
    App.prototype.displayNotes = function () {
        var _this = this;
        this.$notes.innerHTML = '';
        this.$placeholder.style.display = 'none';
        this.notes.forEach(function (note) {
            var $note = document.createElement('div');
            $note.classList.add('note');
            $note.style.backgroundColor = note.color;
            $note.innerHTML = "\n                <div class=\"note-header\">\n                    <h2 class=\"note-title\">".concat(note.title, "</h2>\n                                      \n                </div>\n                <div class=\"note-body\">\n                    <p class=\"note-text\">").concat(note.text, "</p>\n                </div>\n                 <div class=\"toolbar\">\n                    <button class=\"toolbar-color\">\n                        <i class=\"fas fa-palette\"></i>\n                    </button>\n                    <button class=\"toolbar-delete\">\n                        <i class=\"fas fa-trash-alt\"></i>\n                    </button>\n\n                    </div>\n\n            ");
            _this.$notes.appendChild($note);
        });
    };
    return App;
}());
new App();
