import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { Box, Alert } from "@mui/material";
import { api } from '@/lib/api'
import { TableDataGrid } from '@/components/TableDataGrid';
import { GridRowId, GridValidRowModel } from '@mui/x-data-grid';
import { ClienteColunas } from '@/utils/entityTableColumns';

export default function Clients() {
  const queryClient = new QueryClient()

  const { data, isFetching, isError, isSuccess } = useQuery<Cliente[]>(['client'], async () => {
    const response = await api.get('Cliente')

    return response.data
  }, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 //60s
  })

  const createClient = (dataRow: GridValidRowModel) => {
    const data = queryClient.fetchQuery(['client', 'create'], async () => {
      const response = await api.post('Cliente', dataRow)

      return response.data
    })

    return data
  }

  const editClient = (dataRow: GridValidRowModel) => {
    console.log('dataRow: ', dataRow)
    const data = queryClient.fetchQuery(['client', 'edit'], async () => {
      const response = await api.put(`Cliente/${dataRow.id}`, dataRow)

      return response.data
    })

    return data
  }

  const removeClient = (id: GridRowId) => {
    const data = queryClient.prefetchQuery(['client', 'remove'], async () => {
      const response = await api.delete(`Cliente/${id}`, {
        data: {
          id: id.toString()
        }
      })

      return response.data
    })

    return data
  }

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries(['client'])
    dehydrate(queryClient)
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
          entityDataGridColumns={ClienteColunas}
          data={data}
          entity='Clientes'
          create={createClient}
          edit={editClient}
          remove={removeClient}
          invalidate={invalidateQuery}
        />
      )}
    </Box>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['client'], async () => {
    const response = await api.get('Cliente')

    return response.data
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}