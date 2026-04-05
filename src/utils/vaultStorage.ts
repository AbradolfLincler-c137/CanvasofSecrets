
/**
 * Vault Storage Layer using IndexedDB.
 * Prevents QuotaExceededErrors associated with localStorage.
 */

const DB_NAME = 'vitra_arcana_db';
const STORE_NAME = 'vault_items';
const DB_VERSION = 1;

export interface VaultItem {
  id: string;
  message: string;
  timestamp: string;
  imageThumbnail: string;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: any) => resolve(event.target.result);
    request.onerror = (event: any) => reject(event.target.error);
  });
};

/**
 * Migration helper: Pulls data from localStorage once if it exists.
 */
const migrateFromLocalStorage = async (db: IDBDatabase) => {
  const legacyData = localStorage.getItem('vitra_vault');
  if (legacyData) {
    try {
      const items: VaultItem[] = JSON.parse(legacyData);
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      for (const item of items) {
        store.put(item);
      }
      
      transaction.oncomplete = () => {
        console.log('Successfully migrated vault to IndexedDB.');
        localStorage.removeItem('vitra_vault');
      };
    } catch (e) {
      console.error('Migration failed:', e);
    }
  }
};

export const getVaultItems = async (): Promise<VaultItem[]> => {
  const db = await openDB();
  await migrateFromLocalStorage(db);
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      // Return sorted by timestamp descending
      const items = request.result.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      resolve(items);
    };
    request.onerror = () => reject(request.error);
  });
};

export const addVaultItem = async (item: VaultItem): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Check for duplicates (same message and thumbnail)
    // For simplicity, we just check all items.
    const checkRequest = store.getAll();
    checkRequest.onsuccess = () => {
      const isDuplicate = checkRequest.result.some(
        (v) => v.message === item.message && v.imageThumbnail === item.imageThumbnail
      );
      
      if (!isDuplicate) {
        const addRequest = store.put(item);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(addRequest.error);
      } else {
        resolve();
      }
    };
  });
};

export const deleteVaultItem = async (id: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
