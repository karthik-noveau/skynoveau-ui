import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryList) => {
    queryClient.invalidateQueries({ queryKey: queryList });
  };

  return {
    invalidateQuery,
  };
};
