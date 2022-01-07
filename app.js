var App = /** @class */ (function () {
    function App() {
        this.notes = [];
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
        this.$modalCloseButton = document.querySelector('.modal-close-button');
        this.$editButton = document.querySelector('.toolbar-edit');
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
            _this.openModal(event);
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
    App.prototype.openModal = function (event) {
        var $selectedNote = event.target.closest('.toolbar-edit');
        console.log(event.target);
        if (event.target.classList.contains('fa-edit')) {
            this.$modal.classList.toggle('open-modal');
        }
        // const [$noteTitle, $noteText] = $selectedNote.children
        // console.log($noteTitle.innerText)
        // this.id = $selectedNote.dataset.id
        // if (!$selectedNote) {
        //     return
        // }
        // if ($selectedNote) {
        //     this.$modalTitle.value = $noteTitle.innerText
        //     this.$modalText.value = $noteText.innerText
        //     this.$modal.classList.toggle('open-modal')
        // }
    };
    // editNote() {
    //     const note = this.notes.find((note: any) => note.id === this.id)
    //     console.log(note)
    // }
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
            $note.innerHTML = "\n                <div class=\"note-header\">\n                    <h2 class=\"note-title\">".concat(note.title, "</h2>\n                                      \n                </div>\n                <div class=\"note-body\">\n                    <p class=\"note-text\">").concat(note.text, "</p>\n                </div>\n                 <div class=\"toolbar\">\n                    <span class=\"toolbar-delete\" style=\"color: tomato\" >\n                        <i class=\"fas fa-trash-alt\"></i>\n                    </span>\n                    <span class=\"toolbar-color\" style=\"color: ").concat(colors[Math.floor(Math.random() * colors.length)], "\">\n                        <i class=\"fas fa-palette\"></i>\n                    </span>\n                    <span class=\"toolbar-edit\" style=\"color: mediumslateblue\">\n                        <i class=\"fas fa-edit\"></i>\n                    </span>\n                </div>\n\n            ");
            _this.$notes.appendChild($note);
        });
    };
    App.prototype.selectNote = function (event) {
        var selectedNote = event === null || event === void 0 ? void 0 : event.target.closest('.note');
        var _a = selectedNote.children, $noteTitle = _a[0], $noteText = _a[1];
    };
    return App;
}());
new App();
