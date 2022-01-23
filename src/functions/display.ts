const renderNotes = (
    $notes: HTMLDivElement,
    $placeholder: { style: { display: string } },
    state: { notes: any[] }
) => {
    window.localStorage.setItem('notes', JSON.stringify(state.notes))
    displayNotes($notes, $placeholder, state)
}

const displayNotes = (
    $notes: HTMLDivElement,
    $placeholder: { style: { display: string } },
    state: { notes: any[] }
) => {
    const colors: string[] = ['seagreen', 'deeppink', 'rebeccapurple']
    colors[Math.floor(Math.random() * colors.length)]
    $notes.innerHTML = ''
    $placeholder.style.display = 'none'
    state.notes.forEach((note: any) => {
        const $note = document.createElement('div')
        $note.classList.add('note')
        $note.dataset.id = note.id
        $note.style.background = note.color
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
                    <span class="toolbar-color" style="color: ${
                        colors[Math.floor(Math.random() * colors.length)]
                    }">
                        <i class="fas fa-palette"></i>
                    </span>
                   <span class="toolbar-edit" style="color: skyblue">
                        <i class="fas fa-edit"></i>
                    </span>
                </div>
                <div id="color-tooltip">
                    <p class="color-option lightslategray" data-color="white"></p>
                    <p class="color-option lightcoral" data-color="lightcoral"></p>
                    <p class="color-option lightseagreen" data-color="lightseagreen"></p>
                    <p class="color-option lightskyblue" data-color="mediumslateblue"></p>
                    <p class="color-option lightgoldenrodyellow" data-color="lightgoldenrodyellow"></p>
                </div>
                            `
        $notes.appendChild($note)
    })
}

export default renderNotes
