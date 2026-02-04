/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TICKET_API: "http://localhost:8000/";
}

interface ImportMeta{
  readonly env: ImportMetaEnv;
}
