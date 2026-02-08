import 'dotenv/config'
import { defineConfig } from 'orval'

const apiBaseUrl = process.env.VITE_API_BASE_URL || 'https://api-dev.pliview.kr'

export default defineConfig({
  dalgrock: {
    input: {
      target: `${apiBaseUrl}/api-docs`
    },
    output: {
      target: './src/apis/generated',
      schemas: './src/apis/generated/models',
      client: 'axios',
      mode: 'tags-split',
      override: {
        mutator: {
          path: './src/apis/instance.ts',
          name: 'api'
        }
      }
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write'
    }
  }
})
