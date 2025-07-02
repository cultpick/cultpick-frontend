export const queryKeys = {
  user: ["user"],
  category: ["category"],
  address: ["address"],
  performanceList: (page: number, size: number) => [
    "performanceList",
    page,
    size,
  ],
  performanceDetail: (id: string) => ["performanceDetail", id],
  pickList: ["pickList"],
};
