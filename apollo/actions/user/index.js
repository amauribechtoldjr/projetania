import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";

import { GET_USER } from "@/apollo/queries";

import { SIGN_IN, SIGN_OUT } from "@/apollo/mutations";

export const useSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn: signInUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: { ...signInUser } },
      });
    },
  });

export const useSignOut = () => useMutation(SIGN_OUT);

export const useLazyGetUser = () => useLazyQuery(GET_USER);
export const useGetUser = () => useQuery(GET_USER);
