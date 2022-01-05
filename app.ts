class App {
    notes: any[]
    $notes: any
    $form: any
    $noteTitle: any
    $noteText: any
    $formButtons: any
    $placeholder: any
    $submitButton: any
    closeButton: any
    submitButton: any

    constructor() {
        this.notes = []

        this.$notes = document.querySelector('#notes')
        this.$form = document.querySelector('#form')
        this.$noteTitle = document.querySelector('#note-title')
        this.$noteText = document.querySelector('#note-text')
        this.$formButtons = document.querySelector('#form-buttons')
        this.$placeholder = document.querySelector('#placeholder')
        this.$submitButton = document.querySelector('#submit-button')

        this.closeButton = document.querySelector('#close-button')
        this.submitButton = document.querySelector('#submit-button')

        this.addEventListeners()
    }

    handleFormClick(event: Event) {
        const isFormClicked = this.$form.contains(event.target)

        isFormClicked ? this.openForm() : this.closeForm()
    }

    addEventListeners() {
        document.body.addEventListener('click', (event: Event) => {
            this.handleFormClick(event)
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
    displayNotes() {
        this.$notes.innerHTML = ''
        this.$placeholder.style.display = 'none'
        this.notes.forEach((note: any) => {
            const $note = document.createElement('div')
            $note.classList.add('note')
            $note.style.backgroundColor = note.color
            $note.innerHTML = `
                <div class="note-header">
                    <h2 class="note-title">${note.title}</h2>
                                      
                </div>
                <div class="note-body">
                    <p class="note-text">${note.text}</p>
                </div>
                 <div class="toolbar">
                    <button class="toolbar-color">
                        <i class="fas fa-palette"></i>
                    </button>
                    <button class="toolbar-delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>

                    </div>

            `
            this.$notes.appendChild($note)
        })
    }
}

new App()
