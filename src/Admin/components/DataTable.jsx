// src/Admin/components/DataTable.jsx
// Configurable table with loading / empty / error states and row actions.
const DataTable = ({
  columns,
  data,
  loading,
  error,
  onEdit,
  onDelete,
  emptyText = "Ma'lumot topilmadi",
}) => {
  if (loading) {
    return (
      <div className="table-state" role="status">
        <span className="spinner" aria-hidden="true" />
        Yuklanmoqda...
      </div>
    );
  }

  if (error) {
    return <div className="table-state error">Xatolik: {error}</div>;
  }

  if (!data.length) {
    return <div className="table-state">{emptyText}</div>;
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th className="actions-col">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key} data-label={col.label}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              <td className="actions-col">
                <button
                  type="button"
                  className="btn-icon edit"
                  onClick={() => onEdit(row)}
                >
                  Tahrirlash
                </button>
                <button
                  type="button"
                  className="btn-icon delete"
                  onClick={() => onDelete(row)}
                >
                  O&apos;chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
