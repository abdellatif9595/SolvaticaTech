import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface TableProps {
  columns: Column[]
  data: any[]
  loading?: boolean
  emptyMessage?: string
  className?: string
  onRowClick?: (row: any) => void
  sortable?: boolean
  defaultSort?: {
    column: string
    direction: 'asc' | 'desc'
  }
}

export default function Table({
  columns,
  data,
  loading = false,
  emptyMessage = 'Aucune donnée disponible',
  className = '',
  onRowClick,
  sortable = true,
  defaultSort
}: TableProps) {
  const [sortColumn, setSortColumn] = useState(defaultSort?.column || '')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSort?.direction || 'asc')

  const handleSort = (column: string) => {
    if (!sortable) return

    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue === bValue) return 0
    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1

    const comparison = aValue < bValue ? -1 : 1
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const renderCell = (column: Column, row: any) => {
    if (column.render) {
      return column.render(row[column.key], row)
    }
    return row[column.key]
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${column.sortable && sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                onClick={() => column.sortable && handleSort(column.key)}
                role={column.sortable ? 'button' : undefined}
                aria-sort={
                  sortColumn === column.key
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && sortable && sortColumn === column.key && (
                    <span className="text-gray-400">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                <LoadingSpinner size="sm" />
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {renderCell(column, row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

// Exemple d'utilisation :
/*
// Table simple
interface User {
  id: number
  name: string
  email: string
  role: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
]

const columns: Column<User>[] = [
  { key: 'name', header: 'Nom' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Rôle' }
]

<Table
  columns={columns}
  data={users}
  keyExtractor={(user) => user.id}
/>

// Table avec rendu personnalisé
const columns: Column<User>[] = [
  { key: 'name', header: 'Nom' },
  { key: 'email', header: 'Email' },
  {
    key: 'role',
    header: 'Rôle',
    render: (user) => (
      <span className={`
        px-2 py-1 text-xs font-medium rounded-full
        ${user.role === 'Admin'
          ? 'bg-purple-100 text-purple-800'
          : 'bg-green-100 text-green-800'
        }
      `}>
        {user.role}
      </span>
    )
  }
]

<Table
  columns={columns}
  data={users}
  keyExtractor={(user) => user.id}
/>

// Table avec actions
const columns: Column<User>[] = [
  { key: 'name', header: 'Nom' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Rôle' },
  {
    key: 'actions',
    header: 'Actions',
    render: (user) => (
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            console.log('Edit', user)
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          Modifier
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            console.log('Delete', user)
          }}
          className="text-red-600 hover:text-red-800"
        >
          Supprimer
        </button>
      </div>
    )
  }
]

<Table
  columns={columns}
  data={users}
  keyExtractor={(user) => user.id}
  onRowClick={(user) => console.log('Row clicked', user)}
  hoverable
  striped
/>

// Table avec état de chargement
<Table
  columns={columns}
  data={users}
  keyExtractor={(user) => user.id}
  loading={true}
/>

// Table avec message personnalisé
<Table
  columns={columns}
  data={[]}
  keyExtractor={(user) => user.id}
  emptyMessage="Aucun utilisateur trouvé"
/>

// Table avec style personnalisé
<Table
  columns={columns}
  data={users}
  keyExtractor={(user) => user.id}
  className="my-8 shadow-lg rounded-lg"
/>
*/ 