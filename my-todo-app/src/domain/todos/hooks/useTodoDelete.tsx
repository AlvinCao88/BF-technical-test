import { useMutation, useQueryClient } from '@tanstack/react-query';

type DeleteTodoInput = {
  id: string;
  token: string;
};

export const useTodoDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, token }: DeleteTodoInput) => {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete todo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // Invalidate the todos query to refetch the list
    },
  });
};
