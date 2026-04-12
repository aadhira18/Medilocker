const ACCOUNT_KEY = "medilocker_account";
const RECORDS_KEY = "medilocker_records";
const SESSION_KEY = "medilocker_session";

function safeParse(value, fallback) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function getStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  return safeParse(window.localStorage.getItem(SESSION_KEY), null);
}

function setStoredSession(user) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

function getStoredAccount() {
  if (typeof window === "undefined") {
    return null;
  }

  return safeParse(window.localStorage.getItem(ACCOUNT_KEY), null);
}

function setStoredAccount(account) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
}

function getStoredRecords() {
  if (typeof window === "undefined") {
    return [];
  }

  return safeParse(window.localStorage.getItem(RECORDS_KEY), []);
}

function saveStoredRecord(record) {
  const records = getStoredRecords();
  const nextRecords = [record, ...records];

  if (typeof window !== "undefined") {
    window.localStorage.setItem(RECORDS_KEY, JSON.stringify(nextRecords));
  }

  return nextRecords;
}

export {
  clearStoredSession,
  getStoredAccount,
  getStoredRecords,
  getStoredSession,
  saveStoredRecord,
  setStoredAccount,
  setStoredSession,
};
