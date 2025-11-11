export interface MainScheme {
  mainInfo?: MainType;
  offsetServerNow?: number;
}

export interface MainType {
  active: boolean;
  all_hours_on_line: number;
  current_time: string;
  money: number;
  start_time: string;
}
