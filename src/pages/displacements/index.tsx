"use client"

import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { Box, Alert } from "@mui/material";
import { api } from '@/lib/api'
import { TableDataGrid } from '@/components/TableDataGrid';
import { GridRowId, GridValidRowModel } from '@mui/x-data-grid';
import { DeslocamentoColunas } from '@/utils/entityTableColumns';

export default function Displacements() {
  const queryClient = new QueryClient()
  const columnsNoEditOnPut = [
    "kmInicial",
    "inicioDeslocamento",
    "checkList",
    "motivo",
    "idCondutor",
    "idVeiculo",
    "idCliente"
  ]

  const { data, isFetching, isError, isSuccess } = useQuery<Deslocamento[]>(['displacements'], async () => {
    const response = await api.get('Deslocamento')

    return response.data
  }, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 //60s
  })

  const createDisplacement = (dataRow: GridValidRowModel) => {
    const data = queryClient.fetchQuery(['displacements', 'create'], async () => {
      const response = await api.post('Deslocamento/IniciarDeslocamento', dataRow)

      return response.data
    })

    return data
  }

  const editDisplacement = (dataRow: GridValidRowModel) => {
    console.log('dataRow: ', dataRow)
    const data = queryClient.fetchQuery(['displacements', 'edit'], async () => {
      const response = await api.put(`Deslocamento/${dataRow.id}/EncerrarDeslocamento`, dataRow)

      return response.data
    })

    return data
  }

  const removeDisplacement = (id: GridRowId) => {
    const data = queryClient.prefetchQuery(['displacements', 'remove'], async () => {
      const response = await api.delete(`Deslocamento/${id}`, {
        data: {
          id: id.toString()
        }
      })

      return response.data
    })

    return data
  }

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries(['displacements'])
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      mt={2}
    >
      {isFetching && <p>Carregando...</p>}
      {isError && (
        <Alert severity="error" sx={{ width: 'max-content' }}>
          Ocorreu um erro! Recarregue a página e tente novamente
        </Alert>
      )}
      {isSuccess && (
        <TableDataGrid
          entityDataGridColumns={DeslocamentoColunas}
          data={data}
          entity='Deslocamentos'
          columnsNoEditOnPut={columnsNoEditOnPut}
          create={createDisplacement}
          edit={editDisplacement}
          remove={removeDisplacement}
          invalidate={invalidateQuery}
        />
      )}
    </Box>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['displacements'], async () => {
    const response = await api.get('Deslocamento')

    return response.data
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}