const LEGACY_ACCOUNT_KEY = "medilocker_account";
const LEGACY_RECORDS_KEY = "medilocker_records";
const ACCOUNTS_KEY = "medilocker_accounts";
const RECORDS_BY_USER_KEY = "medilocker_records_by_user";
const MEDICINES_BY_USER_KEY = "medilocker_medicines_by_user";
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

function canUseStorage() {
  return typeof window !== "undefined";
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function readStorageItem(key, fallback) {
  if (!canUseStorage()) {
    return fallback;
  }

  return safeParse(window.localStorage.getItem(key), fallback);
}

function writeStorageItem(key, value) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function migrateLegacyStorage() {
  if (!canUseStorage()) {
    return;
  }

  const hasModernAccounts = window.localStorage.getItem(ACCOUNTS_KEY);
  const hasModernRecords = window.localStorage.getItem(RECORDS_BY_USER_KEY);
  const hasModernMedicines = window.localStorage.getItem(MEDICINES_BY_USER_KEY);
  const legacyAccount = safeParse(window.localStorage.getItem(LEGACY_ACCOUNT_KEY), null);
  const legacyRecords = safeParse(window.localStorage.getItem(LEGACY_RECORDS_KEY), []);

  if (!hasModernAccounts && legacyAccount) {
    writeStorageItem(ACCOUNTS_KEY, [legacyAccount]);
  }

  if (!hasModernRecords && legacyAccount && Array.isArray(legacyRecords)) {
    writeStorageItem(RECORDS_BY_USER_KEY, {
      [normalizeEmail(legacyAccount.email)]: legacyRecords,
    });
  }

  if (!hasModernMedicines) {
    writeStorageItem(MEDICINES_BY_USER_KEY, {});
  }
}

function getStoredSession() {
  migrateLegacyStorage();
  return readStorageItem(SESSION_KEY, null);
}

function setStoredSession(user) {
  writeStorageItem(SESSION_KEY, user);
}

function clearStoredSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

function getStoredAccounts() {
  migrateLegacyStorage();
  return readStorageItem(ACCOUNTS_KEY, []);
}

function getStoredAccountByEmail(email) {
  if (!email) {
    return null;
  }

  const emailKey = normalizeEmail(email);

  return getStoredAccounts().find((account) => normalizeEmail(account.email) === emailKey) ?? null;
}

function saveStoredAccount(account) {
  const accounts = getStoredAccounts();
  const emailKey = normalizeEmail(account.email);
  const existingIndex = accounts.findIndex(
    (storedAccount) => normalizeEmail(storedAccount.email) === emailKey,
  );

  if (existingIndex >= 0) {
    const nextAccounts = [...accounts];
    nextAccounts[existingIndex] = account;
    writeStorageItem(ACCOUNTS_KEY, nextAccounts);
    return account;
  }

  writeStorageItem(ACCOUNTS_KEY, [account, ...accounts]);
  return account;
}

function getUserBucket(key) {
  migrateLegacyStorage();
  return readStorageItem(key, {});
}

function setUserBucket(key, email, items) {
  const emailKey = normalizeEmail(email);
  const bucket = getUserBucket(key);
  const nextBucket = {
    ...bucket,
    [emailKey]: items,
  };

  writeStorageItem(key, nextBucket);
  return nextBucket[emailKey];
}

function getStoredRecords(email) {
  if (!email) {
    return [];
  }

  return getUserBucket(RECORDS_BY_USER_KEY)[normalizeEmail(email)] ?? [];
}

function saveStoredRecord(email, record) {
  const nextRecords = [record, ...getStoredRecords(email)];
  return setUserBucket(RECORDS_BY_USER_KEY, email, nextRecords);
}

function getStoredMedicines(email) {
  if (!email) {
    return [];
  }

  return getUserBucket(MEDICINES_BY_USER_KEY)[normalizeEmail(email)] ?? [];
}

function saveStoredMedicine(email, medicine) {
  const nextMedicines = [medicine, ...getStoredMedicines(email)];
  return setUserBucket(MEDICINES_BY_USER_KEY, email, nextMedicines);
}

export {
  clearStoredSession,
  getStoredAccountByEmail,
  getStoredAccounts,
  getStoredMedicines,
  getStoredRecords,
  getStoredSession,
  normalizeEmail,
  saveStoredAccount,
  saveStoredMedicine,
  saveStoredRecord,
  setStoredSession,
};
