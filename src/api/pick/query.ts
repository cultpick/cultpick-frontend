import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApiRequest } from "@/lib/apiClient";
import { PickListResponse } from "./type";

export const usePickListQuery = () => {
  return useQuery({
    queryKey: ["pickList"],
    queryFn: () => authApiRequest.get<PickListResponse>("/pick"),
  });
};

export const useDeletePickListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (performanceIdList: string[]) =>
      authApiRequest.delete<void>("/pick", { performanceIdList }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pickList"] });
    },
  });
};
