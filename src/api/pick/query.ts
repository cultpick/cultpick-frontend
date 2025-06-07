import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPickList, deletePickList } from "./api";

export const usePickListQuery = () => {
  return useQuery({
    queryKey: ["pickList"],
    queryFn: async () => {
      const response = await fetch('/api/auth/token');
      const { token } = await response.json();
      return getPickList(token);
    }
  });
};

export const useDeletePickListMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (performanceIdList: string[]) => {
      const response = await fetch('/api/auth/token');
      const { token } = await response.json();
      return deletePickList(performanceIdList, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pickList"] });
    }
  });
};