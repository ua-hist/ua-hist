import { readFile, writeFile } from 'fs';

interface CountryColor {
    name: string;
    color: string;
}

readFile('../../server/json/result.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Reading file error:', err);
        return;
    }
    
    try {
        const parsedData: CountryColor[] = JSON.parse(data);
        let colorsContent = 'export const colors = ' + JSON.stringify(parsedData) + ';';

        writeFile('colors.ts', colorsContent, (err) => {
            if (err) {
                console.error('Error file creation:', err);
                return;
            }
            console.log('File colors.ts successfuly saved');
        });

    } catch (error) {
        console.error('Parsing error:', error);
    }
});
