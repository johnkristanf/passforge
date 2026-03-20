import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPasswords,
  createPassword,
  updatePassword,
  deletePassword,
} from "@/lib/actions/passwords";
import { PasswordFormValues } from "@/lib/validations/password";

const QUERY_KEY = ["passwords"];

export function usePasswords() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getPasswords,
  });
}

export function useCreatePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: PasswordFormValues) => createPassword(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: PasswordFormValues }) =>
      updatePassword(id, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeletePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePassword(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
