export interface OpcionCorrecta{
  opcion: string;
  puntacion: number;
}

export const OpcionesCorrectasEnAyuno: Record<string, OpcionCorrecta[]> = {
  'glucagon': [
    { opcion: 'glucogenolisisHigado', puntacion: 10 },
    { opcion: 'gluconeogenesis', puntacion: 10 },
    { opcion: 'cetogenesis', puntacion: 20 },
    { opcion: 'proteolisis', puntacion: 10 },
    { opcion: 'lipolisis', puntacion: 10 },
  ],
  'adrenalina': [
    { opcion: 'glucogenolisisHigado', puntacion: 10 },
    { opcion: 'gluconeogenesis', puntacion: 20 },
    { opcion: 'glucogenolisisMusculo', puntacion: 20 },
    { opcion: 'lipolisis', puntacion: 10 },
  ],
  'hormonaDelCrecimiento': [
    { opcion: 'glucogenogenesisHigado', puntacion: 10 },
    { opcion: 'gluconeogenesis', puntacion: 10 },
    { opcion: 'cetogenesis', puntacion: 10 },
    { opcion: 'proteogenesis', puntacion: 10 },
    { opcion: 'lipolisis', puntacion: 20 },
  ],
  'cortisol': [
    { opcion: 'glucogenogenesisHigado', puntacion: 10 },
    { opcion: 'gluconeogenesis', puntacion: 20 },
    { opcion: 'cetogenesis', puntacion: 10 },
    { opcion: 'proteolisis', puntacion: 10 },
    { opcion: 'lipolisis', puntacion: 10 },
  ]
};

export const OpcionesCorrectasLuegoDeAlimentarse: OpcionCorrecta[] = [
  { opcion: 'glucogenogenesisHigado', puntacion: 20 },
  { opcion: 'glucolisis', puntacion: 10 },
  { opcion: 'sintesisAcidosGrasos', puntacion: 10 },
  { opcion: 'glucogenogenesisMusculo', puntacion: 10 },
  { opcion: 'proteogenesis', puntacion: 10 },
  { opcion: 'expresionGlut4Musculo', puntacion: 10 },
  { opcion: 'lipogenesis', puntacion: 20 },
  { opcion: 'expresionGlut4Higado', puntacion: 10 },
];