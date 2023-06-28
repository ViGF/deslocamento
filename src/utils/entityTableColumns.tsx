import { GridPreProcessEditCellProps } from "@mui/x-data-grid";

export const ClienteColunas = [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    width: 50,
    editable: false,
  },
  {
    field: 'numeroDocumento',
    headerName: 'numeroDocumento',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'tipoDocumento',
    headerName: 'tipoDocumento',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'nome',
    headerName: 'nome',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'logradouro',
    headerName: 'logradouro',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'numero',
    headerName: 'numero',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'bairro',
    headerName: 'bairro',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'cidade',
    headerName: 'cidade',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'uf',
    headerName: 'uf',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  }
]

export const CondutorColunas = [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    width: 50,
    editable: false,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'nome',
    headerName: 'nome',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'numeroHabilitacao',
    headerName: 'numeroHabilitacao',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'catergoriaHabilitacao',
    headerName: 'categoriaHabilitacao',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'vencimentoHabilitacao',
    headerName: 'vencimentoHabilitacao',
    type: 'dateTime',
    width: 160,
    editable: true,
    valueGetter: ({ value }: { value: string }) => new Date(value),
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = new Date(params.props.value) < new Date()
      return { ...params.props, error: hasError };
    },
  },
]

export const VeiculoColunas = [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    width: 50,
    editable: false,
  },
  {
    field: 'placa',
    headerName: 'placa',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'marcaModelo',
    headerName: 'marcaModelo',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'anoFabricacao',
    headerName: 'anoFabricacao',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'kmAtual',
    headerName: 'kmAtual',
    type: 'number',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
]

export const DeslocamentoColunas = [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    width: 50,
    editable: false,
  },
  {
    field: 'kmInicial',
    headerName: 'kmInicial',
    type: 'number',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'kmFinal',
    headerName: 'kmFinal',
    type: 'number',
    editable: true
  },
  {
    field: 'inicioDeslocamento',
    headerName: 'inicioDeslocamento',
    width: 160,
    type: 'dateTime',
    editable: true,
    valueGetter: ({ value }: { value: string }) => value ? new Date(value) : '',
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'fimDeslocamento',
    headerName: 'fimDeslocamento',
    width: 160,
    type: 'dateTime',
    editable: true,
    valueGetter: ({ value }: { value: string }) => value ? new Date(value) : ''
  },
  {
    field: 'checkList',
    headerName: 'checkList',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'motivo',
    headerName: 'motivo',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'observacao',
    headerName: 'observacao',
    type: 'string',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'idCondutor',
    headerName: 'idCondutor',
    type: 'number',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'idVeiculo',
    headerName: 'idVeiculo',
    type: 'number',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: 'idCliente',
    headerName: 'idCliente',
    type: 'number',
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value?.length < 1;
      return { ...params.props, error: hasError };
    },
  },
]