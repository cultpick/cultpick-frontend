export interface Subregion {
  code: string;
  name: string;
}
export interface Address {
  code: string;
  name: string;
  subregions: Subregion[];
}
