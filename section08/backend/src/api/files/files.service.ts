import { Injectable } from "@nestjs/common";
import {Storage} from "@google-cloud/storage";
import {FileUpload} from "graphql-upload";

interface IFilesServiceUpload{
  files: FileUpload[];
}
@Injectable()
export class FilesService {
  async upload({files}:IFilesServiceUpload):Promise<string[]>  {



    const waitedFiles = await Promise.all(files);


    //1. 파일을 클라우드 스토리지에 저장하는 로직

    //1-1 스토리지 셋팅하기
    const bucket = "imgs-storage";
    const storage = new Storage({
      projectId: "backend-400306",
      keyFilename: "gcp-file-storage.json"
    }).bucket(bucket);

    //1-2 스토리지 파일 올리기console.log(waitedFiles);


    const results = await Promise.all(
        waitedFiles.map((el) => {
          return new Promise<string>((resolve, reject) => {
            el.createReadStream().pipe(storage.file(el.filename).createWriteStream())
                .on('finish', () => resolve(`${bucket}/${el.filename}`))
                .on("error", () => reject("실패"));
          });
        }));

      console.log('파일 전송 완료');

    return results;
  }
}
