/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_USE_SECURE_API: string
  readonly VITE_API_SECURE_URL: string
  readonly VITE_API_URL: string
  readonly VITE_USE_SECURE_API: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
