interface SubregionResponse {
  /**
   * 지역 코드
   */
  code: string;

  /**
   * 지역 이름
   */
  name: string;
}

export interface AddressResponse {
  /**
   * 지역 코드
   */
  code: string;

  /**
   * 지역 이름
   */
  name: string;

  /**
   * 하위 지역 목록
   */
  subregions: SubregionResponse[];
}
