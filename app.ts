class App {
    notes: any
    id: number

    $notes: HTMLDivElement | null
    $form: any
    $noteTitle: HTMLInputElement | null
    $noteText: HTMLInputElement | null
    $formButtons: any
    $placeholder: any
    $submitButton: HTMLButtonElement | null
    $modal: any
    $modalTitle: any
    $modalText: any
    $modalCloseButton: HTMLButtonElement | null
    $modalDoneButton: HTMLButtonElement | null
    $colorInput: any

    constructor() {
        this.notes = [
            {
                id: 2,
                title: 'Water Pokemon',
                text: 'Swarmpert',
                color: 'white',
            },
            { id: 1, title: 'Fire Pokemon', text: 'Blaziken', color: 'white' },
            {
                id: 3,
                title: 'Super Legendary',
                text: 'Mega Mewtwo Y',
                color: 'white',
            },
        ]
        this.id = 0

        // Getting HTML elements
        this.$notes = document.querySelector('#notes')
        this.$form = document.querySelector('#form')
        this.$noteTitle = document.querySelector('#note-title')
        this.$noteText = document.querySelector('#note-text')
        this.$formButtons = document.querySelector('#form-buttons')
        this.$placeholder = document.querySelector('#placeholder')
        this.$submitButton = document.querySelector('#submit-button')
        this.$modal = document.querySelector('.modal')
        this.$modalTitle = document.querySelector('.modal-title')
        this.$modalText = document.querySelector('.modal-text')
        this.$modalCloseButton = document.querySelector('#modal-close')
        this.$modalDoneButton = document.querySelector('#modal-done')
        this.$colorInput = document.querySelector('#colorinput')

        this.addEventListeners()
    }

    handleFormClick(event: Event) {
        const isFormClicked = this.$form.contains(event.target)

        isFormClicked ? this.openForm() : this.closeForm()
    }

    addEventListeners() {
        document.body.addEventListener('load', () => {
            this.displayNotes()
        })
        document.body.addEventListener('click', (event: Event) => {
            this.handleFormClick(event)
            this.openModal(event)
            this.deleteNote(event)
        })
        this.$submitButton.addEventListener('click', (event: Event) => {
            event.preventDefault()
            event.stopPropagation()
            const title = this.$noteTitle.value
            const text = this.$noteText.value
            const color: string = 'white'
            const id: number = this.notes.length + 1

            if (title && text) {
                this.notes.push({ id, title, text, color })
                this.displayNotes()
                this.closeForm()
            }
        })

        this.$modalCloseButton.addEventListener('click', (event: Event) => {
            event.stopPropagation()
            this.$modal.classList.remove('open-modal')
        })
        this.$modalDoneButton.addEventListener('click', (event: Event) => {
            event.stopPropagation()
            this.editNote()
            this.$modal.classList.remove('open-modal')
        })

        this.$colorInput.addEventListener('change', (event: any) => {
            console.log(event.target.value)
        })
    }

    openForm() {
        this.$form.classList.add('form-open')
        this.$noteTitle.style.display = 'block'
        this.$formButtons.style.display = 'block'
    }
    closeForm() {
        this.$form.classList.remove('form-open')
        this.$noteTitle.style.display = 'none'
        this.$formButtons.style.display = 'none'
        this.$noteTitle.value = ''
        this.$noteText.value = ''
    }

    openModal(event: any) {
        event.stopPropagation()
        if (event.target.classList.contains('fa-edit')) {
            this.$modal.classList.add('open-modal')
        }
        const $selectedNote = event?.target.closest('.note')
        if (!$selectedNote) return
        const [$noteTitle, $noteText] = $selectedNote.children

        if ($noteTitle && $noteText) {
            this.$modalTitle.value = $noteTitle.innerText
            this.$modalText.value = $noteText.innerText
            this.id = Number($selectedNote.dataset.id)
        }
        console.log(this.notes[this.id - 1])
    }
    editNote() {
        const note = this.notes.find((note: any) => note.id === this.id)
        note.title = this.$modalTitle.value
        note.text = this.$modalText.value
        this.displayNotes()
        console.log(note)
    }
    deleteNote(event: any) {
        event.stopPropagation()
        const $selectedNote = event?.target.closest('.note')
        if (!$selectedNote) return
        this.id = Number($selectedNote.dataset.id)
        if (event.target.classList.contains('fa-trash')) {
            const note = this.notes.find((note: any) => note.id === this.id)
            confirm(`Are you sure you want to delete ${note.title}?`)
                ? this.notes.splice(this.notes.indexOf(note), 1)
                    ? this.displayNotes()
                    : null
                : null
        }
    }
    changeNoteColor(event: any) {
        event.stopPropagation()
        const $selectedNote = event?.target.closest('.note')
        if (!$selectedNote) return
        $selectedNote.style.backgroundColor = event.target.value
    }

    displayNotes() {
        const colors: string[] = [
            'green',
            'coral',
            'darkorange',
            'slateblue',
            'deeppink',
            'gold',
        ]
        colors[Math.floor(Math.random() * colors.length)]
        this.$notes.innerHTML = ''
        this.$placeholder.style.display = 'none'
        this.notes.forEach((note: any) => {
            const $note = document.createElement('div')
            $note.classList.add('note')
            $note.dataset.id = note.id
            $note.style.backgroundColor = note.color
            $note.innerHTML = `
                <div class="note-header">
                    <h2 class="note-title">${note.title}</h2>
                                      
                </div>
                <div class="note-body">
                    <p class="note-text">${note.text}</p>
                </div>
                 <div class="toolbar">
                    <span class="toolbar-delete" style="color: tomato" >
                        <i class="fas fa-trash"></i>
                    </span>
                    <label for="colorinput" class="toolbar-color" style="color: ${
                        colors[Math.floor(Math.random() * colors.length)]
                    }">
                        <input type="color" value="${
                            note.color
                        }" id="colorinput" hidden/>
                        <i class="fas fa-palette"></i>
                    </label>
                   <span class="toolbar-edit" style="color: mediumslateblue">
                        <i class="fas fa-edit"></i>
                    </span>
                </div>

            `
            this.$notes.appendChild($note)
        })
    }
}

new App()
