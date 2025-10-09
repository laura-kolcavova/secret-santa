import { createResource } from 'solid-js';

export const useDepartmentsQuery = () => {
  return createResource(async () => {
    const response = await fetch(`/departments.json`);

    const data = (await response.json()) as { departments: string[] };

    return data.departments;
  });
};
