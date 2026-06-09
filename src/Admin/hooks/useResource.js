// src/Admin/hooks/useResource.js
// Generic data-loading + CRUD state hook used by every manager page.
import { useState, useEffect, useCallback } from "react";

export function useResource(service) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await service.getAll();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (payload) => {
      setSaving(true);
      try {
        await service.create(payload);
        await load();
      } finally {
        setSaving(false);
      }
    },
    [service, load]
  );

  const update = useCallback(
    async (id, payload) => {
      setSaving(true);
      try {
        await service.update(id, payload);
        await load();
      } finally {
        setSaving(false);
      }
    },
    [service, load]
  );

  const remove = useCallback(
    async (id) => {
      await service.remove(id);
      await load();
    },
    [service, load]
  );

  return { items, loading, error, saving, reload: load, create, update, remove };
}
