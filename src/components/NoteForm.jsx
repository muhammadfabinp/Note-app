import { useState, useEffect } from "react"

function NoteForm({ onAddNote , notes }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
const [error, setError] = useState("")
const [color, setColor] = useState("bg-yellow-100")


useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  window.addEventListener("keydown", handleKeyDown)

  return () => {
    window.removeEventListener("keydown", handleKeyDown)
  }
}, [title, content, color, notes])




const handleSubmit = (event) => {
  event.preventDefault()

   const cleanTitle = title.trim()
   const cleanContent = content.trim()

if(cleanContent === "") {
      setError("Content cannot be empty.")
      return
    }

// if(cleanTitle.length > 100) {
//       setError("Title cannot be more than 100 characters.")
//       return
//     }

const duplicateNote = notes.some(
  (note) =>
    note.title.toLowerCase() === cleanTitle.toLowerCase() &&
    note.content.toLowerCase() === cleanContent.toLowerCase()
)

if (duplicateNote) {
  setError("A note with the same title and content already exists.")
  return
}
    setError("")

onAddNote(cleanTitle, cleanContent , color)
    
  setTitle("")
  setContent("")
    
  }

  

  return (
    
  <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow-sm border mb-6"
    >
      <input
        type="text"
        placeholder="Note title"
        value={title}
        maxLength={100}
        onChange={(event) => setTitle(event.target.value)}
        className="w-full border rounded-lg p-3 mb-3"
      />
<p className="mb-3 text-right text-xs text-black-100">{title.length}/100</p>
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="w-full border rounded-lg p-3 mb-3"
        rows="4"
      />




<div className="flex gap-3 mb-3">
  <button
    type="button"
    onClick={() => setColor("bg-yellow-100")}
    className="w-8 h-8 rounded-full bg-yellow-100 border"
  ></button>

  <button
    type="button"
    onClick={() => setColor("bg-green-100")}
    className="w-8 h-8 rounded-full bg-green-100 border"
  ></button>

  <button
    type="button"
    onClick={() => setColor("bg-blue-100")}
    className="w-8 h-8 rounded-full bg-blue-100 border"
  ></button>

  <button
    type="button"
    onClick={() => setColor("bg-purple-100")}
    className="w-8 h-8 rounded-full bg-purple-100 border"
  ></button>
</div>



      {error && (
        <p className="mb-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Add Note
      </button>
</form>
   
  )
}

export default NoteForm