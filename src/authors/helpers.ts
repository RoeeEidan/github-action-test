import fs from 'fs';
import YAML from 'yaml'

export const createFolder = (folder: string): Promise<void> => new Promise((resolve, reject) => {
    fs.mkdir(folder, (err) => {
        if (err) {
            reject(err);
        }
        resolve();
    });
});

export const writeMd = (filename: string, data: string): Promise<void> => new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
        if (err) {
            reject(err);
        }
        resolve();
    });
});

export const readMd = (filename: string): Promise<string> => new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(data);
    });
});

export const writeYml = (filename: string, data: any): Promise<void> => new Promise((resolve, reject) => {
    fs.writeFile(filename, YAML.stringify(data), (err) => {
        if (err) {
            reject(err);
        }
        resolve();
    })
})