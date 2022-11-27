import {inject} from '@loopback/core';
import {
  get, HttpErrors,
  oas,
  param,
  post, Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {promisify} from 'util';
import {GeneralConfig} from '../config/general-config';

import {authenticate} from '@loopback/authentication';
import fs from 'fs';
const readdir = promisify(fs.readdir);
/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class ArchivosController {
  constructor() { }

  @authenticate('admin')
  @post('/cargar-archivo-parque', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo a cargar',
      },
    },
  })
  async fileUploading(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const filePath = path.join(__dirname, GeneralConfig.carpetaArchivosParques);
    let res = await this.StoreFileToPath(
      filePath,
      GeneralConfig.campoDeParque,
      request,
      response,
      GeneralConfig.extensionesImagenes,
    );
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        return {file: filename};
      }
    }
    return res;
  }


  // @authenticate('admin')
  // @post('/cargar-archivo-movimiento', {
  //   responses: {
  //     200: {
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //           },
  //         },
  //       },
  //       description: 'Archivo a cargar',
  //     },
  //   },
  // })
  // async filePartyUploading(
  //   @inject(RestBindings.Http.RESPONSE) response: Response,
  //   @requestBody.file() request: Request,
  // ): Promise<object | false> {
  //   const filePath = path.join(__dirname, GeneralConfig.carpetaArchivosParques);
  //   let res = await this.StoreFileToPath(
  //     filePath,
  //     GeneralConfig.campoDeParque,
  //     request,
  //     response,
  //     GeneralConfig.extensionesImagenes,
  //   );
  //   if (res) {
  //     const filename = response.req?.file?.filename;
  //     if (filename) {
  //       return {file: filename};
  //     }
  //   }
  //   return res;
  // }

  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(
    storePath: string,
    fieldname: string,
    request: Request,
    response: Response,
    acceptedExt: string[],
  ): Promise<object> {
    //console.log(storePath);

    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      //console.log(storage);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          console.log(ext);
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(
            new HttpErrors[400]('This format file is not supported.'),
          );
        },
        limits: {},
      }).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

  /** Descarga de Archivos */

  @get('/archivos/{type}', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'Una lista de archivos',
      },
    },
  })
  async listFiles(@param.path.number('type') type: number) {
    const folderPath = this.GetFolderPathByType(type);
    const files = await readdir(folderPath);
    return files;
  }

  @get('/ObtenerArchivo/{type}/{name}')
  @oas.response.file()
  async downloadFileByName(
    @param.path.number('type') type: number,
    @param.path.string('name') fileName: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const folder = this.GetFolderPathByType(type);
    const file = this.ValidateFileName(folder, fileName);
    response.download(file, fileName);
    return response;
  }

  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  private GetFolderPathByType(type: number) {
    let filePath = '';
    switch (type) {
      // amusement
      case 1:
        filePath = path.join(__dirname, GeneralConfig.carpetaArchivosParques);
        break;
      case 2:
        filePath = path.join(__dirname, GeneralConfig.carpetaArchivosParques);
        break;
      case 3:
        break;
    }
    return filePath;
  }

  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private ValidateFileName(folder: string, fileName: string) {
    const resolved = path.resolve(folder, fileName);
    if (resolved.startsWith(folder)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors[400](`Invalid file name: ${fileName}`);
  }
}
