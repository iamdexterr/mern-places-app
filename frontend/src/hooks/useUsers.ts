import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, loginUser, signupUser } from "../../apis/user.services";
import { toast } from "sonner";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useSignupUser = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess:
      options?.onSuccess ??
      (() => toast.success("User signed up successfully!")),
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useLoginUser = ({ onSuccess }: { onSuccess?: (user) => void }) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess,
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
