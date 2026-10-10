import { useState } from "react"

function NoteCard({ id, title, content,  notes,isSelected,onToggleSelect, color, onDelete, archived,pinned,createdAt,updatedAt,onTogglePin,onToggleArchive, onUpdate  }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editContent, setEditContent] = useState(content)
  const [editColor, setEditColor] = useState(color)
  const [editError, setEditError] = useState("")

const handleUpdate = () => {
  const cleanTitle = editTitle.trim()
  const cleanContent = editContent.trim()




const duplicateNote = notes.some(
  (note) =>
    note.id !== id &&
    note.title.toLowerCase() === cleanTitle.toLowerCase() &&
    note.content.toLowerCase() === cleanContent.toLowerCase()
)

if (duplicateNote) {
  setEditError("A note with the same title and content already exists.")
  return
}





  if (cleanContent === "") {
    setEditError("Content cannot be empty.")
    return
  }

  if (cleanTitle.length > 100) {
    setEditError("Title cannot be more than 100 characters.")
    return
  }

  setEditError("")

  onUpdate(
    id,
    cleanTitle,
    cleanContent,
    editColor
  )

  setIsEditing(false)
}

  return (
    <div
  className={`p-5 rounded-xl shadow-sm border hover:shadow-md transition ${color}`}
>

      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            maxLength={100}
            className="w-full border rounded-lg p-3 mb-3"
          />

          <textarea
            value={editContent}
            onChange={(event) => setEditContent(event.target.value)}
            rows="4"
            className="w-full border rounded-lg p-3 mb-3"
          />
  {editError && (
  <p className="text-red-500 mb-3">
    {editError}
  </p>
)}

<div className="flex gap-3 mb-3">
  <button
    type="button"
    onClick={() => setEditColor("bg-yellow-100")}
    className="w-8 h-8 rounded-full bg-yellow-100 border"
  ></button>

  <button
    type="button"
    onClick={() => setEditColor("bg-green-100")}
    className="w-8 h-8 rounded-full bg-green-100 border"
  ></button>

  <button
    type="button"
    onClick={() => setEditColor("bg-blue-100")}
    className="w-8 h-8 rounded-full bg-blue-100 border"
  ></button>

  <button
    type="button"
    onClick={() => setEditColor("bg-purple-100")}
    className="w-8 h-8 rounded-full bg-purple-100 border"
  ></button>
</div>





          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>


          <input
  type="checkbox"
  checked={isSelected}
  onChange={() => onToggleSelect(id)}
  className="w-5 h-5 mb-3"
/>



          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <p className="mt-2 text-gray-600">
            {content}
          </p>


        <div className="mt-3 text-sm text-gray-500">
  <p>
    Created: {new Date(createdAt).toLocaleString()}
  </p>

  {updatedAt && (
    <p>
      Updated: {new Date(updatedAt).toLocaleString()}
    </p>
  )}
</div>


          <div className="flex gap-2 mt-4">

            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>

    <button
        onClick={() => onTogglePin(id)}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
    >
    {pinned ? "Unpin" : "Pin"}
                        </button>

<button
  onClick={() => onToggleArchive(id)}
  className="bg-gray-600 text-white px-4 py-2 rounded-lg"
>
  {archived ? "Unarchive" : "Archive"}
</button>



            <button
              onClick={() => onDelete(id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>
        </>
      )}

    </div>
  )
}

export default NoteCard