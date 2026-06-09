// src/Admin/services/crudService.js
// Reusable CRUD factory. Every resource gets identical, predictable
// methods so adding a new entity is a one-liner.
//
// The panel currently runs on a localStorage-backed store (seeded from
// db.json) so it is fully functional in the preview with no server.
// To switch to a real REST backend, set VITE_API_URL and flip USE_API to
// true — the createApiService implementation below already speaks REST.
import api from "./api.js";
import { createLocalStore } from "./localStore.js";

const USE_API = import.meta.env.VITE_USE_API === "true";

export function createApiService(resource) {
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

export function createCrudService(resource) {
  return USE_API ? createApiService(resource) : createLocalStore(resource);
}

export const coursesService = createCrudService("courses");
export const teachersService = createCrudService("teachers");
export const studentsService = createCrudService("students");
