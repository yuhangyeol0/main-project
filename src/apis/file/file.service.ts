import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import { getToday } from 'src/common/libraries/utils';
import { v4 as uuidv4 } from 'uuid';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY,
      projectId: process.env.PROJ_ID,
    }).bucket(process.env.BUCKET_ID);

    //일단 먼저 다 받기
    const waitedFiles = await Promise.all(files);
    //구글 스토리지에 동시에 모두 올려버리기
    const results = await Promise.all(
      waitedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
          file
            .createReadStream()
            .pipe(storage.file(fname).createWriteStream())
            .on('finish', () => resolve(`process.env.BUCKET_ID/${fname}`))
            .on('error', (error) => reject(error));
        });
      }),
    );
    return results;
  }
}
