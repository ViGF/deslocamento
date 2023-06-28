import { GridValidRowModel } from "@mui/x-data-grid";

export function removeTimezoneDifference(dataRow: GridValidRowModel) {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = (new Date(dataRow.vencimentoHabilitacao - tzoffset)).toISOString()

  return localISOTime
}