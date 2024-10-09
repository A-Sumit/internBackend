import { cpp } from 'compile-run';
import { performance } from 'perf_hooks';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

export const executeCppCode = async (filePath, sourceCode, input) => {
    let tempFilePath;
    try {
        if (sourceCode) {
            const tempDir = os.tmpdir();
            tempFilePath = path.join(tempDir, `temp-${Date.now()}.cpp`);
            await fs.writeFile(tempFilePath, sourceCode);
        }

        const startTime = performance.now();
        const result = await cpp.runFile(filePath || tempFilePath, { stdin: input });
        const endTime = performance.now();
        const executionTime = endTime - startTime;

        return {
            result: result,
            executionTime: `${executionTime.toFixed(2)} ms`,
        };
    } catch (err) {
        throw err;
    } finally {
        if (tempFilePath) {
            // Clean up the temporary file
            await fs.unlink(tempFilePath);
        }
    }
};
