export interface Incident {
  id: number;
  number: string;
  alert_id: string;
  alert_level: string;
  state: string;
  description: string;
  config_item: string;
  priority: string;
  category: string;
  alert_acknowledge: boolean;
}