export interface CategoryResponse {
  /**
   * 카테고리 코드
   */
  code: string;

  /**
   * 카테고리 이름
   */
  name: string;
}

export interface CategoryListResponse {
  /**
   * 카테고리 목록
   */
  categories: CategoryResponse[];
}
