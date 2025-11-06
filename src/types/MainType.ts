export interface MainScheme {
  mainInfo?: MainType
}

export interface MainType {
  active: boolean;
  all_hours_on_line: number;
  current_time: string;
  money: number;
  start_time: string;
}
