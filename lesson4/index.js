import readline from "readline";
import colors from "colors";
import path from "path";
import inquirer from "inquirer";
import fsp from "fs/promises"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const root = process.cwd();

const findFilesinDir = (dirName) => {
    return fsp
        .readdir(dirName)
        .then((choices) => {
            return inquirer.prompt([
                {
                    name: "fileName",
                    type: "list",
                    message: "Choose file",
                    choices,
                },
                {
                    name: "findString",
                    type: "input",
                    message: "Enter something for search",
                },
            ]);
        })
        .then(async ( {fileName, findString} ) => {
        const fullPath = path.join(dirName, fileName);
        const stat = await fsp.stat(fullPath);
        if (!stat.isFile()) {
            return findFilesinDir(fullPath);
        }
        return Promise.all([
            fsp.readFile(path.join(dirName, fileName), "utf-8"),
            Promise.resolve(findString),
        ]);
    })
        .then((result) => {
            if (result) {
                const [text, findString] = result;
                const pattern = new RegExp(findString, "g");
                let count = 0;
                const out = text.replace(pattern, () => {
                    count++;
                    return colors.red(findString);
                });
                console.log(out, "\n", colors.green(`Found ${count} values`));
            }
        });
};

rl.question(
    `You are in: ${root} \n Please enter the path to the directory: `,
    (dirPath) => {
        const dirName = path.join(root, dirPath);

        findFilesinDir(dirName);
    }
);

rl.on("close", () => process.exit(0));
