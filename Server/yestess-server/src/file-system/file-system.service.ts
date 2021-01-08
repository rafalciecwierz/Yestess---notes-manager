import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as convert from 'xml-js';


@Injectable()
export class FileSystemService {

    private jsonPath = path.join(__dirname,'..', '..','src', 'files', 'json', 'users.json')
    private xmlPath = path.join(__dirname,'..', '..','src', 'files', 'json', 'users.xml')

    readUsersFromXML() {
        const rawdata = fs.readFileSync(this.xmlPath);
        return rawdata.toString();
    }


    async saveUsersToXML() {
        const users = await UserEntity.find();
        const options = {compact: true, ignoreComment: true, spaces: 4};
        const result = convert.json2xml(JSON.parse(JSON.stringify(users)),options);
        fs.writeFileSync(this.xmlPath, result);
        return result
    }


    readUsersFromJson() {
        const rawdata = fs.readFileSync(this.jsonPath);
        return JSON.parse(rawdata.toString());
    }


    async saveUsersToJson() {
        const users = await UserEntity.find();
        fs.writeFileSync(this.jsonPath, JSON.stringify(users));
        return users;
    }
}
