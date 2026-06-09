// src/Admin/services/crudService.js
// Reusable CRUD factory. Every resource gets identical, predictable
// methods so adding a new entity is a one-liner.
import api from "./api.js";

export function createCrudService(resource) {
  return {
    getAll: (params) =>
      api.get(`/${resource}`, { params }).then((res) => res.data),
    getOne: (id) => api.get(`/${resource}/${id}`).then((res) => res.data),
    create: (payload) =>
      api.post(`/${resource}`, payload).then((res) => res.data),
    update: (id, payload) =>
      api.put(`/${resource}/${id}`, payload).then((res) => res.data),
    remove: (id) => api.delete(`/${resource}/${id}`).then((res) => res.data),
  };
}

export const coursesService = createCrudService("courses");
export const teachersService = createCrudService("teachers");
export const studentsService = createCrudService("students");
