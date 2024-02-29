import {readdir, readFile, writeFileSync} from 'fs';

function readGeoJSONFiles(directoryPath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        readdir(directoryPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            const promises: Promise<any>[] = [];
            files.forEach(file => {
                if (file.endsWith('.geojson')) {
                    const filePath = `${directoryPath}/${file}`;
                    promises.push(readFileGeo(filePath));
                }
            });

            Promise.all(promises)
                .then(results => resolve(results))
                .catch(error => reject(error));
        });
    });
}

function readFileGeo(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        });
    });
}

function extractUniqueNames(data: any[]): string[] {
    const uniqueNames: Set<string> = new Set();
    data.forEach(featureCollection => {
        if (featureCollection.features && featureCollection.features.length > 0) {
            featureCollection.features.forEach(feature => {
                if (feature.properties && feature.properties.NAME) {
                    uniqueNames.add(feature.properties.NAME);
                }
            });
        }
    });
    return Array.from(uniqueNames);
}

export async function main() {
    const geoJSONDirectory = '../geojson';
    try {
        const filesData = await readGeoJSONFiles(geoJSONDirectory);
        const uniqueNames = extractUniqueNames(filesData);

        const colors: { [name: string]: string } = {};
        uniqueNames.forEach((name, index) => {
            const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            colors[name] = color;
        });

        const outputFilePath = '../json/result.json';
        writeFileSync(outputFilePath, JSON.stringify(colors, null, 2));
        console.log('Results upload to result.json', outputFilePath);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
