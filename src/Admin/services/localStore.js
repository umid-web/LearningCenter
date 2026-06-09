// src/Admin/services/localStore.js
// A localStorage-backed data store seeded from db.json. It mirrors a REST
// backend so the admin panel is fully functional in the preview without a
// running json-server. It exposes the same async CRUD shape as the axios
// service, so switching to a real backend is a drop-in change.
import seed from "../../../db.json";

const PREFIX = "admin_db_";
const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

function read(resource) {
  const key = PREFIX + resource;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fall through to reseed
    }
  }
  const initial = Array.isArray(seed[resource]) ? seed[resource] : [];
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
}

function write(resource, items) {
  localStorage.setItem(PREFIX + resource, JSON.stringify(items));
  return items;
}

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
}

export function createLocalStore(resource) {
  return {
    async getAll() {
      await delay();
      return read(resource);
    },
    async getOne(id) {
      await delay();
      return read(resource).find((item) => String(item.id) === String(id)) || null;
    },
    async create(payload) {
      await delay();
      const items = read(resource);
      const record = { ...payload, id: nextId(items) };
      write(resource, [...items, record]);
      return record;
    },
    async update(id, payload) {
      await delay();
      const items = read(resource).map((item) =>
        String(item.id) === String(id) ? { ...item, ...payload, id: item.id } : item
      );
      write(resource, items);
      return items.find((item) => String(item.id) === String(id));
    },
    async remove(id) {
      await delay();
      const items = read(resource).filter((item) => String(item.id) !== String(id));
      write(resource, items);
      return { id };
    },
  };
}
