import { useMutation, useQuery } from "@apollo/react-hooks";

import { GET_PROJECTS, USER_PROJECTS, GET_PROJECT } from "@/apollo/queries";

import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "@/apollo/mutations";

export const useGetProjects = () => useQuery(GET_PROJECTS);
export const useUserProjects = () => useQuery(USER_PROJECTS);
export const useGetProject = (variables) =>
  useQuery(GET_PROJECT, { variables });

export const useCreateProject = () =>
  useMutation(CREATE_PROJECT, {
    update(cache, { data: { createProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, createProject] },
      });
    },
  });

export const useUpdateProject = () => useMutation(UPDATE_PROJECT);
export const useDeleteProject = () =>
  useMutation(DELETE_PROJECT, {
    update(cache, { data: { deleteProject } }) {
      const { userProjects } = cache.readQuery({
        query: USER_PROJECTS,
      });
      const newProjects = userProjects.filter(
        (p) => p._id !== deleteProject._id
      );
      cache.writeQuery({
        query: USER_PROJECTS,
        data: { userProjects: newProjects },
      });
    },
  });
