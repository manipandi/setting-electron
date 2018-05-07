import * as fs from 'fs-extra';
import { join } from 'path';
import { app, remote } from "electron";
class Setting {

    private static instance: Setting;
    public filePath: string;
    public isAccessAvailable: boolean = false;
    public app = app || remote.app;

    private constructor() {
        this.filePath = join(this.app.getPath('userData'), 'Setting/setting.json');
        this.checkFileAccess();
    }

    // tslint:disable-next-line:member-ordering
    public static getInstance() {
        if (!Setting.instance) {
            Setting.instance = new Setting();
        }
        return Setting.instance;
    }

    public async checkFileAccess() {
        try {
            // tslint:disable-next-line:no-bitwise
            await fs.access(this.filePath, fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            await this.createFile();
        }

    }

    public async createFile() {
        try {
            await fs.readJSON(this.filePath);
        } catch (err) {
            await fs.outputJSON(this.filePath, {});
        }

    }

    public get(propertyName: string) {
        try {
            this.checkFileAccess();
            return fs.readJSONSync(this.filePath)[propertyName];
        } catch (err) {
            this.createFile();
        }

    }

    public async set(propertyName: string, value: string | object) {
        try {
            await this.checkFileAccess();
            let settingObj = await fs.readJson(this.filePath);
            settingObj[propertyName] = value;
            await fs.writeJSON(this.filePath, settingObj);

        } catch (err) {
            let settingObj:any = new Object();
            settingObj[propertyName] = value;
            await fs.writeJSON(this.filePath, settingObj);
        }

    }
}

export default Setting;
