import path from "path";
import EditorDao from "../dao/EditorDao.js";
import { pool } from "../database/Connection.js";
import FormartUtils from "../utils/FormatUtils.js";
import fs from 'fs';
import JSZip from "jszip";
import ChatGPT from "../services/ChatGPTService.js";
import Prompt from "../utils/Prompt.js";

export default class EditorUseCase{
    static async editorUpdate(data){
        const connection = await pool.connect()
        try {
            console.log(data);
            connection.query('BEGIN');
            const editorDao = new EditorDao(connection);
            await editorDao.editorUpdate(data);
            connection.query('COMMIT');
        } catch (error) {
            console.log(error);
            connection.query('ROLLBACK');
            throw error;
        } finally {
            connection.release();
        }
    }
    static async generarCodigo(html, css){
        //TODO: Codigo para analizar diseño
        const editorData = {html, css}
        let response = await ChatGPT.queryTextFromOR( JSON.stringify({prompt: Prompt.getGenerarCodigoAngular()}), JSON.stringify(editorData))
        console.log(response);
        response = JSON.parse(response);
        const files = response.files;
        const zip = new JSZip();
        const path_public_files = path.join(process.cwd(), '/src/client/public/output')
        await fs.rmSync(path_public_files, { recursive: true, force: true }, (error) => {});
        
        files.forEach( file => {
            const filepath = path.join(path_public_files, file.filepath);
            fs.mkdirSync(filepath, { recursive: true });
            fs.writeFileSync(
                path.join(filepath, file.filename), file.filecontent, 'utf8'
            );
        });

        await this.addDirectoryToZip(zip, path_public_files);
        const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
        return zipContent;
    }

    async getEditor(data){
        const connection = await pool.connect()
        try {
            const editorDao = new EditorDao(connection);
            const result = await editorDao.getEditor(data.idEditor);
            result.jsondata = FormartUtils.encodeBase64(result.jsondata);
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    static async addDirectoryToZip(zip, folderPath, zipFolderPath = '') {
        const files = fs.readdirSync(folderPath);
      
        for (const filename of files) {
          const fullPath = path.join(folderPath, filename);
          const stat = fs.statSync(fullPath);
      
          if (stat.isDirectory()) {
            // Si es carpeta, crea carpeta en el ZIP y baja recursivamente
            const folder = zip.folder(path.join(zipFolderPath, filename));
            await this.addDirectoryToZip(folder, fullPath);
          } else {
            // Si es archivo, lo agrega
            const fileData = fs.readFileSync(fullPath);
            zip.file(path.join(zipFolderPath, filename), fileData);
          }
        }
      }

    static async processSketch(){

    }
}