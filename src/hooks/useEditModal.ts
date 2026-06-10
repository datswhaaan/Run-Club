import { useState } from 'react'

export function useEditModal<T>() {
  const [editingRow, setEditingRow] = useState<T | null>(null)

  return {
    editingRow,
    isOpen: editingRow !== null,
    open: (row: T) => setEditingRow(row),
    close: () => setEditingRow(null),
  }
}