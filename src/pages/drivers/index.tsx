import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { Box, Alert } from "@mui/material";
import { api } from '@/lib/api'
import { TableDataGrid } from '@/components/TableDataGrid';
import { GridRowId, GridValidRowModel } from '@mui/x-data-grid';
import { CondutorColunas } from '@/utils/entityTableColumns';
import { removeTimezoneDifference } from '@/utils/removeTimezoneDifference';

export default function Drivers() {
  const queryClient = new QueryClient()

  const { data, isFetching, isError, isSuccess } = useQuery<Condutor[]>(['drivers'], async () => {
    const response = await api.get('Condutor')

    return response.data
  }, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 //60s
  })

  const fixNameColumnError = (dataRow: GridValidRowModel) => {
    const categoriaHabilitacaoValue = dataRow.catergoriaHabilitacao
    const dataRowFixed = dataRow
    delete dataRowFixed['catergoriaHabilitacao']

    dataRowFixed.categoriaHabilitacao = categoriaHabilitacaoValue

    return dataRowFixed
  }

  const createDriver = (dataRow: GridValidRowModel) => {
    const localISOTime = removeTimezoneDifference(dataRow)

    const dataRowEdited = {
      ...dataRow,
      vencimentoHabilitacao: localISOTime
    }

    const dataRowFixedColumnError = fixNameColumnError(dataRowEdited)

    const data = queryClient.fetchQuery(['drivers', 'create'], async () => {
      const response = await api.post('Condutor', dataRowFixedColumnError)

      return response.data
    })

    return data
  }

  const editDriver = (dataRow: GridValidRowModel) => {
    const localISOTime = removeTimezoneDifference(dataRow)

    const dataRowEdited = {
      ...dataRow,
      vencimentoHabilitacao: localISOTime
    }

    const data = queryClient.fetchQuery(['drivers', 'edit'], async () => {
      const response = await api.put(`Condutor/${dataRow.id}`, dataRowEdited)

      return response.data
    })

    return data
  }

  const removeDriver = (id: GridRowId) => {
    const data = queryClient.prefetchQuery(['drivers', 'remove'], async () => {
      const response = await api.delete(`Condutor/${id}`, {
        data: {
          id: id.toString()
        }
      })

      return response.data
    })

    return data
  }

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries(['drivers'])
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
          entityDataGridColumns={CondutorColunas}
          data={data}
          entity='Condutores'
          create={createDriver}
          edit={editDriver}
          remove={removeDriver}
          invalidate={invalidateQuery}
        />
      )}
    </Box>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['drivers'], async () => {
    const response = await api.get('Condutor')

    return response.data
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}