import renderNotes from './functions/displayNotes'

class App {
    state: any

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
        this.state = {
            notes: JSON.parse(window.localStorage.getItem('notes')) ?? [
                {
                    id: 2,
                    title: 'Water Pokemon',
                    text: 'Swarmpert',
                    color: 'white',
                },
                {
                    id: 1,
                    title: 'Fire Pokemon',
                    text: 'Blaziken',
                    color: 'white',
                },
                {
                    id: 3,
                    title: 'Super Legendary',
                    text: 'Mega Mewtwo Y',
                    color: 'white',
                },
            ],
            id: 0,
            meta: JSON.parse(window.localStorage.getItem('meta')) ?? {
                theme: 'light',
                lang: 'eng',
            },
        }

        // Getting HTML elements
        this.$notes ??= document.querySelector('#notes')
        this.$form ??= document.querySelector('#form')
        this.$noteTitle ??= document.querySelector('#note-title')
        this.$noteText ??= document.querySelector('#note-text')
        this.$formButtons ??= document.querySelector('#form-buttons')
        this.$placeholder ??= document.querySelector('#placeholder')
        this.$submitButton ??= document.querySelector('#submit-button')
        this.$modal ??= document.querySelector('.modal')
        this.$modalTitle ??= document.querySelector('.modal-title')
        this.$modalText ??= document.querySelector('.modal-text')
        this.$modalCloseButton ??= document.querySelector('#modal-close')
        this.$modalDoneButton ??= document.querySelector('#modal-done')
        this.$colorInput = document.getElementById('#color-tooltip')

        this.addEventListeners()
        renderNotes(this.$notes, this.$placeholder, this.state)
    }

    handleFormClick(event: Event) {
        const isFormClicked = this.$form.contains(event.target)

        isFormClicked ? this.openForm() : this.closeForm()
    }

    addEventListeners() {
        document.body.addEventListener('load', () => {
            renderNotes(this.$notes, this.$placeholder, this.state)
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
            const color: string = '#ffffff'
            const id: number = this.state.notes.length + 1

            if (title && text) {
                this.state.notes.push({ id, title, text, color })
                renderNotes(this.$notes, this.$placeholder, this.state)
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
            this.state.id = Number($selectedNote.dataset.id)
        }
    }

    editNote() {
        const note = this.state.notes.find(
            (note: any) => note.id === this.state.id
        )
        note.title = this.$modalTitle.value
        note.text = this.$modalText.value
        renderNotes(this.$notes, this.$placeholder, this.state)
    }

    deleteNote(event: any) {
        event.stopPropagation()
        const $selectedNote = event?.target.closest('.note')
        if (!$selectedNote) return
        this.state.id = Number($selectedNote.dataset.id)
        if (event.target.classList.contains('fa-trash')) {
            const note = this.state.notes.find(
                (note: any) => note.id === this.state.id
            )
            confirm(`Are you sure you want to delete ${note.title}?`)
                ? this.state.notes.splice(this.state.notes.indexOf(note), 1)
                    ? renderNotes(this.$notes, this.$placeholder, this.state)
                    : null
                : null
        }
    }
}

export default App
