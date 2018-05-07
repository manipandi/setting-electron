import * as fs from 'fs-extra';
import { join } from 'path';
import { app, remote } from "electron";
class Setting {

    private static instance: Setting;
    public filePath: string;
    public directoryPath: string;
    public isAccessAvailable: boolean = false;
    public app = app || remote.app;

    private constructor() {
        this.directoryPath = join(this.getAppPath(), 'Setting');
        this.filePath = join(this.directoryPath, 'setting.json');
        this.checkFileAccess();
        this.ensureFileSetting();
    }

    public getAppPath() {
        return this.app.getPath('userData');
    }

    // tslint:disable-next-line:member-ordering
    public static getInstance() {
        if (!Setting.instance) {
            Setting.instance = new Setting();
        }
        return Setting.instance;
    }

    public async checkFileAccess() {
        // tslint:disable-next-line:no-bitwise
        await fs.access(this.getAppPath(), fs.constants.R_OK | fs.constants.W_OK, (err) => {
            console.log(err ? 'no access!' : 'can read/write', err);
            if (!err) {
                this.isAccessAvailable = true;
            } else {
                this.isAccessAvailable = false;
                console.error("Error no access to create file::", err);
            }
        });
    }

    public callbackForFolderCreater(decider: any) {
        if (!decider) {
            this.createDirectory();
            return decider;
        } else {
            console.log("Folder Already Available::", decider);
            return decider;
        }
    }

    public async isFolderAvailable(cb = this.callbackForFolderCreater) {
        try {
            await fs.exists(this.directoryPath, (exist) => {
                cb.call(this, exist);
            });
        } catch (err) {
            console.error(err);
        }

    }

    public callbackForFileCreater(decider: any) {
        if (!decider) {
            this.createFile();
            return decider;
        } else {
            console.log("File Already Available::", decider);
            return decider;
        }
    }

    public async isFileAvailable(cb = this.callbackForFileCreater) {
        await fs.exists(this.filePath, (exist) => {
            cb.call(this, exist);
        });
    }

    public async ensureFileSetting() {
        if (this.isAccessAvailable) {
            await this.isFolderAvailable();
            await this.isFileAvailable();
        } else {
            console.log('No Access for the File operation::');
        }

    }

    public async createFile() {
        try {
            await fs.writeJSON(this.filePath, {});
        } catch (err) {
            console.error(err);
        }

    }

    public async createDirectory() {
        try {
            await fs.mkdir(this.directoryPath);
        } catch (err) {
            console.error(err);
        }
    }

    public get(propertyName: string) {
        try {
            this.ensureFileSetting();
            return fs.readJSONSync(this.filePath)[propertyName];
        } catch (err) {
            console.error(err);
        }

    }

    public async set(propertyName: string, value: string | object) {
        try {
            await this.ensureFileSetting();
            let settingObj = await fs.readJson(this.filePath);
            settingObj[propertyName] = value;
            await fs.writeJSON(this.filePath, settingObj);

        } catch (err) {
            await this.ensureFileSetting();
            let settingObj: any = new Object();
            settingObj[propertyName] = value;
            await fs.writeJSON(this.filePath, settingObj);
        }

    }
}

export default Setting;
