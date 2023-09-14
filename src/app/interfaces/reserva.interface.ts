
export interface Reserva{
  res_id?: number,
  res_fecha_entrada: string,
  res_fecha_salida: string,
  res_valor: number,
  res_forma_pago: string,
  huesped?: {
    hue_id: number
  }
}

export interface ReservaHuesped extends Omit<Reserva, 'huesped'>{
  res_id: number,
  huesped: {
    hue_id: number
  }
}

export interface ReservaHuesped2 extends Omit<Reserva, 'huesped'>{
  res_id: number,
}

export interface ReservaDelete{
  Eliminado: boolean
}
