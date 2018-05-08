import Setting from './setting';
import { expect } from 'chai';
import * as fs from 'fs-extra';
// import { spy } from "sinon";
describe('Setting -spec', () => {
    it('should return fail because file will not be available using checkFileAccess', async () => {
        let instance = Setting.getInstance();
        let input = await instance.checkFileAccess();
        expect(input).to.be.equal('fail');
     });

    it('should return fail because file will not be availableusing checkFileAccess', async () => {
        let instance = Setting.getInstance();
        let input = await instance.checkFileAccess();
        expect(input).to.be.equal('done');
     });

    it('should return fail because file will not be available using createFile', async () => {
       let instance = Setting.getInstance();
       await fs.unlink(instance.filePath);
       let input = await instance.createFile();
       expect(input).to.be.equal('fail');
    });

    it('should return done because file will be created using createFile', async () => {
        let instance = Setting.getInstance();
        let input = await instance.createFile();
        expect(input).to.be.equal('done');
     });

    it('should return false because file will not be available using get', async () => {
        let instance = Setting.getInstance();
        await fs.unlink(instance.filePath);
        let input = await instance.get('data');
        // tslint:disable-next-line:no-unused-expression
        expect(input).to.be.false;
     });

    it('should return data value available using get', async () => {
        let instance = Setting.getInstance();
        await instance.set('data', 'data');
        let input = await instance.get('data');
        expect(input).to.be.equal('data');
     });

    it('should return fail because file does not contain any data' , async () => {
        let instance = Setting.getInstance();
        await fs.outputJSON(instance.filePath, {
            hello: "world"
        });
        await instance.set('1', 'one');
        let output = fs.readJsonSync(instance.filePath);
        let expectedOutput = {
            hello: "world",
            1 : "one"
        };
        expect(output).to.be.eql(expectedOutput);
     });

    it('should return  because file does not contain any data' , async () => {
        let instance = Setting.getInstance();
        await instance.set('1', 'one');
        await fs.unlink(instance.filePath);
        await instance.set('data', 'data');
        let input = await fs.readJsonSync(instance.filePath);
        let expectedOutput = {
            data: 'data'
        };
        // tslint:disable-next-line:no-unused-expression
        expect(input).not.to.be.null;
        expect(input).to.be.eql(expectedOutput);
     });
    
});
