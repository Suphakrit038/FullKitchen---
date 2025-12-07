"use client"
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { addNoteToRecipe, updateNote, deleteNote } from '../lib/recipes'
import { formatDate } from '../lib/utils'

export default function NotesSection({ recipeId, notes = [], onUpdate }) {
  const [newNote, setNewNote] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    try {
      setLoading(true)
      await addNoteToRecipe(recipeId, newNote)
      setNewNote('')
      // TODO: แสดง success Toast
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error('Error adding note:', error)
      // TODO: แสดง error Toast แทน alert()
      alert('เกิดข้อผิดพลาดในการเพิ่มโน้ต')
    } finally {
      setLoading(false)
    }
  }

  const handleEditNote = async (noteId) => {
    if (!editText.trim()) return

    try {
      setLoading(true)
      await updateNote(recipeId, noteId, editText)
      setEditingId(null)
      setEditText('')
      // TODO: แสดง success Toast
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error('Error updating note:', error)
      // TODO: แสดง error Toast แทน alert()
      alert('เกิดข้อผิดพลาดในการแก้ไขโน้ต')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteNote = async (noteId) => {
    // TODO: ใช้ ConfirmDialog component แทน confirm()
    if (!confirm('ต้องการลบโน้ตนี้หรือไม่?')) return

    try {
      setLoading(true)
      await deleteNote(recipeId, noteId)
      // TODO: แสดง success Toast
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error('Error deleting note:', error)
      // TODO: แสดง error Toast แทน alert()
      alert('เกิดข้อผิดพลาดในการลบโน้ต')
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (note) => {
    setEditingId(note.id)
    setEditText(note.text)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        โน้ต & ความคิดเห็น
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="เพิ่มโน้ตหรือความคิดเห็น..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          disabled={loading}
        />
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddNote}
          disabled={!newNote.trim() || loading}
          variant="contained"
          sx={{ mt: 1 }}
        >
          เพิ่มโน้ต
        </Button>
      </Box>

      {notes.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          ยังไม่มีโน้ต
        </Typography>
      ) : (
        <List>
          {notes.map((note) => (
            <ListItem
              key={note.id}
              sx={{
                flexDirection: 'column',
                alignItems: 'stretch',
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
                bgcolor: 'background.default'
              }}
            >
              {editingId === note.id ? (
                <Box sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    disabled={loading}
                  />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={() => handleEditNote(note.id)}
                      disabled={!editText.trim() || loading}
                      variant="contained"
                    >
                      บันทึก
                    </Button>
                    <Button
                      size="small"
                      startIcon={<CancelIcon />}
                      onClick={cancelEdit}
                      disabled={loading}
                    >
                      ยกเลิก
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <ListItemText
                      primary={note.text}
                      secondary={formatDate(note.createdAt)}
                    />
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => startEdit(note)}
                        disabled={loading}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteNote(note.id)}
                        disabled={loading}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}
