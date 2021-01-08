import { Controller, Get } from '@nestjs/common';
import { FileSystemService } from './file-system.service';

@Controller()
export class FileSystemController {


    constructor(private fileSystemService: FileSystemService){}

    @Get('user/save/json')
    saveUsersToJson(){
        return this.fileSystemService.saveUsersToJson();
    }

    @Get('user/read/json')
    readUsersToJson(){
        return this.fileSystemService.readUsersFromJson();
    }

    @Get('user/save/xml')
    saveUsersToXML(){
        return this.fileSystemService.saveUsersToXML();
    }

    @Get('user/read/xml')
    readUsersFromXML(){
        return this.fileSystemService.readUsersFromXML();
    }

}
