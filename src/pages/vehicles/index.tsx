import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { Box, Alert } from "@mui/material";
import { api } from '@/lib/api'
import { TableDataGrid } from '@/components/TableDataGrid';
import { GridRowId, GridValidRowModel } from '@mui/x-data-grid';
import { VeiculoColunas } from '@/utils/entityTableColumns';

export default function Vehicles() {
  const queryClient = new QueryClient()
  const columnsNoEditOnPut = [
    'placa',
  ]

  const { data, isFetching, isError, isSuccess } = useQuery<Veiculo[]>(['vehicles'], async () => {
    const response = await api.get('Veiculo')

    return response.data
  }, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 //60s
  })

  const createVehicle = (dataRow: GridValidRowModel) => {
    const data = queryClient.fetchQuery(['vehicles', 'create'], async () => {
      const response = await api.post('Veiculo', dataRow)

      return response.data
    })

    return data
  }

  const editVehicle = (dataRow: GridValidRowModel) => {
    console.log('dataRow: ', dataRow)
    const data = queryClient.fetchQuery(['vehicles', 'edit'], async () => {
      const response = await api.put(`Veiculo/${dataRow.id}`, dataRow)

      return response.data
    })

    return data
  }

  const removeVehicle = (id: GridRowId) => {
    const data = queryClient.prefetchQuery(['vehicles', 'remove'], async () => {
      const response = await api.delete(`Veiculo/${id}`, {
        data: {
          id: id.toString()
        }
      })

      return response.data
    })

    return data
  }

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries(['vehicles'])
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
          entityDataGridColumns={VeiculoColunas}
          data={data}
          entity='Veículos'
          create={createVehicle}
          edit={editVehicle}
          remove={removeVehicle}
          invalidate={invalidateQuery}
          columnsNoEditOnPut={columnsNoEditOnPut}
        />
      )}
    </Box>
  )
}

export async function getInitialProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['vehicles'], async () => {
    const response = await api.get('Veiculo')

    return response.data
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}