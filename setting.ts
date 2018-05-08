import * as fs from 'fs-extra';
import { join } from 'path';
import { app, remote } from "electron";
class Setting {

    private static instance: Setting;
    public filePath: string;
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
            return 'done';
        } catch (err) {
            await this.createFile();
            return 'fail';
        }

    }

    public async createFile() {
        try {
            await fs.readJSON(this.filePath);
            return 'done';
        } catch (err) {
            await fs.outputJSON(this.filePath, {});
            return 'fail';
        }

    }

    public get(propertyName: string) {
        try {
            return fs.readJSONSync(this.filePath)[propertyName];
        } catch (err) {
            this.createFile();
            return false;
        }
    }

    public async set(propertyName: string, value: string | object) {
        try {
            let settingObj = await fs.readJson(this.filePath);
            settingObj[propertyName] = value;
            await fs.outputJSON(this.filePath, settingObj);

        } catch (err) {
            let settingObj: any = new Object();
            settingObj[propertyName] = value;
            await fs.outputJSON(this.filePath, settingObj);
        }

    }
}

export default Setting;
