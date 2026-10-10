import { useState, useEffect } from "react"
import NoteCard from "./components/NoteCard"
import NoteForm from "./components/NoteForm"

function App() {
  const [notes, setNotes] = useState(()=>{
    const savedNotes = localStorage.getItem("notes") 
    
    if(savedNotes){
      return JSON.parse(savedNotes)
    }

    return []}
)

const [searchTerm, setSearchTerm] = useState("")
const [sortBy, setSortBy] = useState("newest")
const [showArchived, setShowArchived] = useState(false)
const [selectedNotes, setSelectedNotes] = useState([])

const toggleSelectNote = (id) => {
  setSelectedNotes((currentSelected) => {
    if (currentSelected.includes(id)) {
      return currentSelected.filter((noteId) => noteId !== id)
    }

    return [...currentSelected, id]
  })
}

  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes))
}, [notes])


const addNote = (title, content,color) => {
  const newNote = {
  id: Date.now(),
  title: title,
  content: content,
  color: color,
  pinned: false,
  archived: false,
  createdAt: Date.now(),
}
  setNotes([...notes, newNote])
}

const deleteNote = (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this note?")

  if (!confirmed) {
    return
  }

  setNotes(notes.filter((note) => note.id !== id))
}


const deleteSelectedNotes = () => {
  if (selectedNotes.length === 0) {
    return
  }

  const confirmed = window.confirm(
    `Delete ${selectedNotes.length} selected notes?`
  )

  if (!confirmed) {
    return
  }

  setNotes(
    notes.filter((note) => !selectedNotes.includes(note.id))
  )

  setSelectedNotes([])
}


const updateNote = (id, title, content, color) => {
  setNotes(
    notes.map((note) =>
      note.id === id
        ? {
            ...note,
            title: title,
            content: content,
            color: color,
            updatedAt: Date.now(),
          }
        : note
    )
  )
}


const togglePin = (id) => {
  setNotes(
    notes.map((note) =>
      note.id === id
        ? {
            ...note,
            pinned: !note.pinned,
          }
        : note
    )
  )
}

const toggleArchive = (id) => {
  setNotes(
    notes.map((note) =>
      note.id === id
        ? {
            ...note,
            archived: !note.archived,
          }
        : note
    )
  )
}


const filteredNotes = notes.filter((note) => {
  if (showArchived) {
    return (
      note.archived &&
      (
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  return (
    !note.archived &&
    (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
})


const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned !== b.pinned) {
    return Number(b.pinned) - Number(a.pinned)
  }

  if (sortBy === "title") {
    return a.title.localeCompare(b.title)
  }

  if (sortBy === "oldest") {
    return a.createdAt - b.createdAt
  }

  return b.createdAt - a.createdAt
})


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6 flex justify-center">
        My Notes
      </h1>

     <NoteForm notes={notes} onAddNote={addNote}/>


<button
  onClick={deleteSelectedNotes}
  disabled={selectedNotes.length === 0}
  className="bg-red-600 text-white px-4 py-2 rounded-lg mb-6 mr-2 disabled:opacity-50"
>
  Delete Selected ({selectedNotes.length})
</button>


<button
  onClick={() => setShowArchived(!showArchived)}
  className="bg-gray-700 text-white px-4 py-2 rounded-lg mb-6"
>
  {showArchived ? "Back to Notes" : "View Archive"}
</button>



<input
  type="text"
  placeholder="Search notes..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  className="w-full bg-white border rounded-lg p-3 mb-6"
/>

<select
  value={sortBy}
  onChange={(event) => setSortBy(event.target.value)}
  className="w-full bg-white border rounded-lg p-3 mb-6"
>
  <option value="newest">Newest first</option>
  <option value="oldest">Oldest first</option>
  <option value="title">Title A-Z</option>
</select>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">



        
{sortedNotes.length === 0 ? (
  <p className="text-gray-500 text-center col-span-full">
    No notes found.
  </p>
) : (
sortedNotes.map((note) => (
    <NoteCard
      key={note.id}
      id={note.id}
      title={note.title}
      content={note.content}
      notes={notes}
      isSelected={selectedNotes.includes(note.id)}
      onToggleSelect={toggleSelectNote}
      color={note.color}
      pinned={note.pinned}
      archived={note.archived}
      onDelete={deleteNote}
      onUpdate={updateNote}
      onTogglePin={togglePin}
      onToggleArchive={toggleArchive}
      createdAt={note.createdAt}
      updatedAt={note.updatedAt}
    />
  ))
)}
      </div>

    </div>
  )
}

export default App