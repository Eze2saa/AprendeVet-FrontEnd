export interface InsigniasUsuarioGlucemia {
  userId: string;
  insigniaEnAyuno: boolean;
  insigniaLuegoDeAlimentarse: boolean;
  insigniaConsecutivos: boolean;
}

export interface InsigniasResponse {
  insignias: InsigniasUsuarioGlucemia
}