#!/usr/bin/env node

const path = require('path');
const { promises: fs } = require('fs');
const file = process.argv[2];
const target = process.argv[3];
const swaggerBundleFileName = 'swagger-ui-bundle.min.js';
const swaggerPresetFileName = 'swagger-ui-standalone-preset.min.js';
const swaggerHtmlTemplateFileName = 'index.html';

const run = async () => {
    const template = await fs.readFile(`${__dirname}/script.js`);

    const fileType = path.extname(file);

    if (fileType !== '.json') {
        console.error(`File type ${fileType} not supported. Supported file types: json.`);

        process.exit(-1);
    }

    const swaggerSpec = JSON.parse(await fs.readFile(file, 'utf8'));
    const directory = [...target.split('/').slice(0, -1)].join('/');

    try {
        await fs.stat(directory);
    } catch (e) {
        await fs.mkdir(directory, { recursive: true });
    }

    const output = template.toString().replace("'{{spec}}'", JSON.stringify(swaggerSpec));

    await fs.writeFile(target, output);
    await fs.copyFile(`${__dirname}/${swaggerBundleFileName}`, `${directory}/${swaggerBundleFileName}`);
    await fs.copyFile(`${__dirname}/${swaggerPresetFileName}`, `${directory}/${swaggerPresetFileName}`);
    await fs.copyFile(`${__dirname}/${swaggerHtmlTemplateFileName}`, `${directory}/${swaggerHtmlTemplateFileName}`);
};

run();
