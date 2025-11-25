export interface InsigniasUsuarioGlucemia {
  userId: string;
  insigniaEnAyuno: boolean;
  insigniaLuegoDeAlimentarse: boolean;
  insigniaInsulina: boolean;
  insigniaGlucagon: boolean;
  insigniaAdrenalina: boolean;
  insigniaHormonaDelCrecimiento: boolean;
  insigniaCortisol: boolean;
  insigniaTodasLasHormonas: boolean;
}

export interface InsigniasResponse {
  insignias: InsigniasUsuarioGlucemia
}