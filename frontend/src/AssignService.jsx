import React, { useState, useEffect } from 'react';

// Map status to badge color
const statusStyles = {
  'UNASSIGNED': 'bg-gray-300 text-gray-800',
  'STANDBY': 'bg-yellow-300 text-yellow-900',
  'SERVICE': 'bg-green-300 text-green-900',
  'MAINTENANCE': 'bg-red-300 text-red-900'
};

const statusOptions = ['UNASSIGNED', 'STANDBY', 'SERVICE', 'MAINTENANCE'];

export default function AssignService() {
  const [trainData, setTrainData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedStatus, setEditedStatus] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:4001/api/get_trains", { method: "GET" })
      .then(res => res.json())
      .then(res => setTrainData(res));
  }, []);

  const assign = () => {
    fetch("http://127.0.0.1:4001/api/get_current_model_assignment")
      .then(res => res.json())
      .then(setTrainData);
  };

  const save = () => {
    for (let x of trainData) {
      let train_id = x['train_id'];
      let statuss = x['status'];
      fetch("http://127.0.0.1:4001/api/update_status", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'status': statuss,
          'train_id': train_id
        }),
      });
    }
  };

  const startEditing = (train_id, currentStatus) => {
    setEditRowId(train_id);
    setEditedStatus(currentStatus);
  };

  const changeStatus = (e) => {
    setEditedStatus(e.target.value);
  };

  const saveEdit = (train_id) => {
    setTrainData(prevData =>
      prevData.map(train =>
        train.train_id === train_id ? { ...train, status: editedStatus } : train
      )
    );
    setEditRowId(null);
    setEditedStatus('');
  };

  const cancelEdit = () => {
    setEditRowId(null);
    setEditedStatus('');
  };

  return (
    <div className="p-8 max-w-full overflow-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide">Assign Service</h1>
        <button
          onClick={assign}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition"
        >
          Assign using Model
        </button>
        <button
          onClick={save}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition"
        >
          Save
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Train ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Mileage (KM This Month)</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Has Branding</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Branding Days Completed</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Branding Days Required</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Branding Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide select-none">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trainData.map((train, idx) => (
              <tr
                key={train.train_id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.train_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                  {train.is_fit_for_service ? 'OK' : 'Maintenance'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.mileage_kms_this_month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.has_branding ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.branding_days_completed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.branding_days_required}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{train.branding_expiry_date || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  {editRowId === train.train_id ? (
                    <select
                      value={editedStatus}
                      onChange={changeStatus}
                      className="border rounded px-2 py-1"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-center ${statusStyles[train.status] || statusStyles['UNASSIGNED']}`}
                    >
                      {train.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {editRowId === train.train_id ? (
                    <>
                      <button
                        onClick={() => saveEdit(train.train_id)}
                        className="mr-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditing(train.train_id, train.status)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
