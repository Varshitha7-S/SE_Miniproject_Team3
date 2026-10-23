const TOKEN_KEY = 'hms_token';

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (t) => (t ? sessionStorage.setItem(TOKEN_KEY, t) : sessionStorage.removeItem(TOKEN_KEY));

export class ApiError extends Error {
  constructor(status, message, fields) {
    super(message);
    this.status = status;
    this.fields = fields || {};
  }
}

async function call(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  let res;
  try {
    res = await fetch(`/api${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  } catch {
    throw new ApiError(0, 'Cannot reach the server. Check that the backend is running.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && token) {
      setToken(null);
      window.dispatchEvent(new Event('hms-logout'));
    }
    throw new ApiError(res.status, data.error || 'Something went wrong', data.fields);
  }
  return data;
}

const qs = (params) => {
  const p = new URLSearchParams(Object.entries(params).filter(([, v]) => v));
  return p.toString() ? `?${p}` : '';
};

export const api = {
  authStatus: () => call('GET', '/auth/status'),
  login: (username, password) => call('POST', '/auth/login', { username, password }),
  dashboard: () => call('GET', '/dashboard'),
  students: (search) => call('GET', `/students${qs({ search })}`),
  student: (id) => call('GET', `/students/${encodeURIComponent(id)}`),
  createStudent: (b) => call('POST', '/students', b),
  updateStudent: (id, b) => call('PUT', `/students/${encodeURIComponent(id)}`, b),
  updateFee: (id, b) => call('PATCH', `/students/${encodeURIComponent(id)}/fee`, b),
  studentAllocations: (id) => call('GET', `/students/${encodeURIComponent(id)}/allocations`),
  rooms: (availability) => call('GET', `/rooms${qs({ availability })}`),
  createRoom: (b) => call('POST', '/rooms', b),
  allocations: (filters = {}) => call('GET', `/allocations${qs(filters)}`),
  allocate: (b) => call('POST', '/allocations', b),
  vacate: (id, endDate) => call('PATCH', `/allocations/${id}/vacate`, endDate ? { endDate } : {}),
  changeRoom: (id, roomId) => call('PATCH', `/allocations/${id}/change-room`, { roomId }),
};
