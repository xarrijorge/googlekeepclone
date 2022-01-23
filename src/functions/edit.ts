import renderNotes from './display'

const editNote = (
    $modalTitle: any,
    $modalText: any,
    $notes: any,
    $placeholder: any,
    state: any
) => {
    const note = state.notes.find((note: any) => note.id === state.id)
    note.title = $modalTitle.value
    note.text = $modalText.value
    renderNotes($notes, $placeholder, state)
}

export const changeColor = (event: any, state: any) => {
    // if (event.target.matches('.fa-palette')) {
    const noteElem = event.target.parentElement.parentElement.parentElement
    state.id = noteElem.dataset.id

    console.log(noteElem)
    // const noteCoords = event.target.getBoundingClientRect()
    // const xVal = noteCoords.left + window.scrollX
    // const yVal = noteCoords.top + window.scrollY

    // }
}

export default editNote
