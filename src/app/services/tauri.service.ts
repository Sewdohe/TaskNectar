import { Injectable } from '@angular/core';
import { BaseDirectory, createDir, writeFile } from "@tauri-apps/api/fs";


@Injectable({
  providedIn: 'root'
})
export class TauriService {
  dataDir = BaseDirectory.Data;

  constructor() {
  }

  createDataFolder = async () => {
    try {
      await createDir("nc-tasks", {
        dir: this.dataDir,
        recursive: true,
      })
    } catch (e) {
      console.error(e)
    }
  }

  async createDataFile() {
    try {
      await writeFile(
        {
          contents: "",
          path: `./nc-tasks/settings.json`
        },
        {
          dir: this.dataDir
        }
      );
    } catch (e) {
      console.error(e)
    }
  }
}
