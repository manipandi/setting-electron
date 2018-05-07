import Setting from './setting'
import { expect } from 'chai';
import { spy } from "sinon";
describe('Setting -spec', () => {
    it('should return the path of the application', () => {
        let instance  = Setting.getInstance();
        let input = instance.getAppPath();
        console.log("Path", input);
        let path = '/var/folders/b6/ksj485v12y91fdd47lf8fh_h0000gn/T/electron-mocha-qSIt0Z';
        expect(input).to.be.equal(path);
    });

    it('should return the access for the folder', () => {
        let instance  = Setting.getInstance();
        instance.checkFileAccess();
        // tslint:disable-next-line:no-unused-expression
        expect(instance.isAccessAvailable).to.be.true;
    });

    it('should call te callback if folder is available', () => {
        let instance  = Setting.getInstance();
        let cb = spy();
        instance.isFolderAvailable( () => {
            cb();
        });
        // tslint:disable-next-line:no-unused-expression
        expect(cb.called).to.be.true;
    });

    it('should return the false if folder is not available', () => {
        let instance  = Setting.getInstance();
        let input = instance.callbackForFolderCreater(false);
        // tslint:disable-next-line:no-unused-expression
        expect(input).to.be.false;
    });

    it('should call te callback if file is available', () => {
        let instance  = Setting.getInstance();
        let cb = spy();
        instance.isFileAvailable( () => {
            cb();
        });
        // tslint:disable-next-line:no-unused-expression
        expect(cb.called).to.be.true;
    });

    it('should return the false if file is not available', () => {
        let instance  = Setting.getInstance();
        let input = instance.callbackForFileCreater(false);
        // tslint:disable-next-line:no-unused-expression
        expect(input).to.be.false;
    });

    it('should return the data from file', () => {
        let instance  = Setting.getInstance();
        instance.set('data', 'data');
        let input = instance.get("data");
        // tslint:disable-next-line:no-unused-expression
        expect(input).to.be.equal('data');
    });

});
