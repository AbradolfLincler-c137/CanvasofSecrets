# Passwordless Future: Canvas of Secrets

A Renaissance-inspired web experience where secrets are hidden within art and locked by your biology. Using advanced steganography and biometric key derivation, **Passwordless Future** turns the act of hiding a message into a ritual of digital alchemy.

---

## 🏛️ The Great Ritual (Workflow)

```mermaid
graph TD
    subgraph ENROLL_PHASE [0. Identity Foundation]
        Z[Biometric Presence] --> Y[Identity Enrollment]
        Y --> X[Scholar Profile Created]
    end

    subgraph INSCRIBE_PHASE [1. Inscribe Arcana]
        A[Secret Message] --> C[Biometric Key Derivation]
        B[Uploaded Image] --> D[Steganography Engine]
        C -->|SHA256 Hash| E[AES-256 Encryption]
        A --> E
        E --> D
        D --> F[Sealed PNG image]
    end

    subgraph REVEAL_PHASE [2. Reveal Arcana]
        F --> G[Upload Sealed Image]
        H[Scan Face] --> I[Biometric Key Reconstruction]
        G --> J[Steganography Decoder]
        J --> K[Encrypted Ciphertext]
        I -->|Reconstructed Key| L[AES Decryption]
        K --> L
        L --> M[Revealed Secret]
    end

    subgraph VAULT_PHASE [3. The Vault]
        M --> N[Save to High-Capacity IndexedDB]
        N --> O[Sacred Scroll Gallery]
        O --> P[Persistent Access via Face ID]
    end
```

---

## 🗝️ Key Features

- **Biometric Key Derivation**: Unlike traditional Face ID which just says "Yes/No," we derive a unique cryptographic key directly from your facial geometry using a **Fuzzy Extractor** scheme.
- **Biometric Sanctum (Login/Profile)**: The entire application is protected by a biometric gate. No passwords, no emails—just your presence. Manage your Scholar identity in the dedicated Profile settings.
- **Steganographic Sealing**: Messages are woven into the bitstream of an image. They are invisible to the naked eye and leave no digital footprint.
- **High-Capacity IndexedDB Vault**: Migrated from limited storage to a robust, asynchronous database. Supports thousands of secrets with automatic thumbnailing for extreme performance.
- **Zero-Storage Privacy**: Your secrets never touch a server. All encryption, decryption, and identity data exist only on your device.
- **Turbo-Charged Engine**: Parallelized neural network loading and WebGL acceleration for near-instant biometric recognition.

### 📜 Technical Stack
- **Biometrics**: `@vladmandic/face-api` (TensorFlow.js) with WebGL acceleration.
- **Cryptography**: `CryptoJS` (AES-256, SHA-256).
- **Storage**: IndexedDB for high-capacity local vaults + Thumbnailing Engine.
- **Frontend**: React 19 + Vite + Tailwind CSS + Framer Motion.
- **Icons**: Lucide React.

---

## 🏺 How to Run

1.  **Clone & Enter**:
    ```bash
    cd CanvasofSecrets
    ```
2.  **Install**:
    ```bash
    npm install
    ```
3.  **Ignite**:
    ```bash
    npm run dev
    ```
4.  **Witness**: Open [http://localhost:3000](http://localhost:3000)

---
*© MCCCCLII Passwordless Future. All secrets reserved.*
