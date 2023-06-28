export function getTableColumnsFromApiData({ data }: dataFromApi) {
  if (!data || data?.length < 1) {
    return []
  }
  
  return Object.keys(data[0])
    .map(columnName => {
      return {
        field: columnName,
        headerName: columnName,
        editable: true
      }
    })
}