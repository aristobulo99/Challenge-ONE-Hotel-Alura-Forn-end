
export interface Huesped{
  hue_id: number,
  hue_nom: string,
  hue_ape: string,
  hue_fec_nac: string,
  hue_nacionalidad: string,
  hue_telf: string,
  reservas?: null
}

export interface RegistroHUesped extends Omit<Huesped, 'hue_id'>{
  hue_id?: number
}

export interface HuespedDelete{
  Eliminado: boolean
}
