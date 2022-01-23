import renderNotes from './display'

const deleteNote = (
    event: any,
    $notes: HTMLDivElement,
    $placeholder: { style: { display: string } },
    state: { id?: number; notes: any; trash: any }
) => {
    event.stopPropagation()
    const $selectedNote = event?.target.closest('.note')
    if (!$selectedNote) return
    state.id = Number($selectedNote.dataset.id)

    if (event.target.classList.contains('fa-trash')) {
        const note = state.notes.find((note: any) => note.id === state.id)
        const approve = confirm(
            `Are you sure you want to delete ${note.title}?`
        )
        if (approve) {
            state.trash.push(state.notes[state.notes.indexOf(note)])
            state.notes.splice(state.notes.indexOf(note), 1)
            console.log(state.trash)
            renderNotes($notes, $placeholder, state)
        }
    }
}

export default deleteNote
