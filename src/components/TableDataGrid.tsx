import { useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowSelectionModel,
  GridRowsProp,
  GridValidRowModel
} from '@mui/x-data-grid';
import { Box, Divider, IconButton, NoSsr, Toolbar, Typography } from '@mui/material'
import { Edit, Delete, Save, Cancel, Add } from '@mui/icons-material'

interface TableDataGridProps extends dataFromApi {
  entityDataGridColumns: GridColDef[]
  entity: string
  create: (dataRow: GridValidRowModel) => Promise<any>
  remove: (id: GridRowId) => Promise<any>
  edit: (dataRow: GridValidRowModel) => Promise<any>
  invalidate: () => void
  columnsNoEditOnPut?: string[]
}

interface AddToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void
  entity: string
}

const AddToolbar = ({ setRows, setRowModesModel, entity }: AddToolbarProps) => {
  const temporaryId = '-'

  const handleClick = () => {
    setRows((oldRows) => [...oldRows, { id: temporaryId, isNew: true, }])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [temporaryId]: { mode: GridRowModes.Edit, fieldToFocus: 'id' },
    }))
  };

  return (
    <Toolbar>
      <Box
        display='flex'
        flex={1}
        justifyContent='space-between'
        alignItems='center'
        pt='5px'
      >
        <Typography fontSize='1.1rem' component='h1'>
          {entity}
        </Typography>
        <IconButton onClick={handleClick} sx={{ backgroundColor: 'primary.light' }}>
          <Add />
        </IconButton>
      </Box>
      <Divider />
    </Toolbar>
  )
}

export function TableDataGrid({
  entityDataGridColumns,
  data,
  create,
  remove,
  entity,
  edit,
  invalidate,
  columnsNoEditOnPut
}: TableDataGridProps) {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const [rows, setRows] = useState<GridRowsProp | undefined>(data)

  const processRowUpdate = (newRow: GridValidRowModel) => {
    const isNewRow = newRow.isNew
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows?.map((row) => (row.id === newRow.id ? updatedRow : row)))

    if (isNewRow) {
      create(newRow)
        .then((id) => {
          const rowUpdatedId = {...newRow, id: id || '-'}
          setRows(rows?.map((row) => (row.id === newRow.id ?  rowUpdatedId : row)))
          invalidate()
        })
        .catch((data) => {
          window.alert(data.response.data?.title || data.response.data)
          handleCancelClick(newRow.id)
        })
    } else {
      const confirm = window.confirm('Deseja mesmo editar o campo?')
      if (confirm) {
        edit(newRow)
          .then(() => {
            invalidate()
          })
          .catch((data) => {
            window.alert(data.response.data?.title || data.response.data)
            handleCancelClick(newRow.id)
          })
      } else {
        handleCancelClick(newRow.id)
      }
    }

    return updatedRow
  };

  const handleDeleteClick = (id: GridRowId) => {
    const confirm = window.confirm('Deseja mesmo apagar o campo?')

    if (confirm) {
      remove(id)
        .then(() => {
          setRows(rows?.filter((row) => row.id !== id))
          invalidate()
        }, (data) => {
          window.alert(data.response.data?.title || data.response.data)
        })
    }
  };

  const handleSaveClick = async (params: GridRowParams) => {
    setRowModesModel({ ...rowModesModel, [params.id]: { mode: GridRowModes.View, } })
  }

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows?.find((row) => row.id === id)
    if (editedRow?.isNew) {
      setRows(rows?.filter((row) => row.id !== id));
    }
  };

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    ...entityDataGridColumns,
    {
      field: 'actions',
      headerName: 'Ações',
      type: 'actions',
      cellClassName: 'actions',
      getActions: (params: GridRowParams) => {
        const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key='salvar'
              icon={<Save />}
              label="Salvar"
              onClick={() => handleSaveClick(params)}
            />,
            <GridActionsCellItem
              key='cancelar'
              icon={<Cancel />}
              label="Cancelar"
              onClick={() => handleCancelClick(params.id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key='editar'
            label='editar'
            icon={<Edit />}
            onClick={() => handleEditClick(params.id)}
          />,
          <GridActionsCellItem
            key='deletar'
            label='deletar'
            icon={<Delete />}
            onClick={() => handleDeleteClick(params.id)}
          />
        ]
      }
    }
  ]

  return (
    <NoSsr>
      <Box>
        <DataGrid
          rows={rows || []}
          columns={columns}
          editMode='row'
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => window.alert(error)}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          rowSelectionModel={rowSelectionModel}
          isCellEditable={(params) => {
            if (params.value && columnsNoEditOnPut?.includes(params.field)) {
              return false
            }

            return true
          }}
          slots={{
            toolbar: AddToolbar
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, entity },
          }}
          sx={{
            maxWidth: '80vw',
            borderRadius: '10px',
            backgroundColor: 'primary.dark',
            padding: '0 1rem',
            margin: 'auto',
            '& *': {
              color: 'white',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'primary.main',
            },
            '& .MuiDataGrid-row--editing': {
              '.MuiDataGrid-cell': {
                backgroundColor: 'primary.main',
              },
              '.MuiInputBase-input': {
                color: 'white',
              },
              '.MuiDataGrid-cell:has(> .Mui-focused)': {
                backgroundColor: 'primary.light',
                border: '2px solid white',
                borderTop: 'none',
                borderBottom: 'none',
              },
              '.MuiDataGrid-cell:has(> .Mui-error)': {
                borderColor: 'red',
              },
            },
          }}
        />
      </Box>
    </NoSsr>
  )
}