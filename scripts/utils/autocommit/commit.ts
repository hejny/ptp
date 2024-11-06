import colors from 'colors';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { spaceTrim } from 'spacetrim';
import { $execCommand } from '../../../src/utils/execCommand/$execCommand';
import { isWorkingTreeClean } from './isWorkingTreeClean';

export async function commit(addPaths: ReadonlyArray<string>, message: string): Promise<void> {
    const projectPath = process.cwd();
    // const addPath = '.';

    const commitMessageFilePath = join(process.cwd(), '.tmp', 'COMMIT_MESSAGE');
    const commitMessage = spaceTrim(
        (block) => `
        ${block(message)}

        🔼 This commit was automatically generated by map scripts
      `,
    );

    if (await isWorkingTreeClean(projectPath)) {
        console.info(colors.gray(`⏩ Not commiting because nothings changed`));
        return;
    }

    try {
        for (const addPath of addPaths) {
            await $execCommand({
                cwd: projectPath,
                crashOnError: false,
                command: `git add ${addPath}`,
            });
        }

        await mkdir(dirname(commitMessageFilePath), { recursive: true });
        await writeFile(commitMessageFilePath, commitMessage, 'utf-8');

        await $execCommand({
            cwd: projectPath,
            crashOnError: false,
            command: `git commit --file ${commitMessageFilePath}`,
        });

        await $execCommand({
            cwd: projectPath,
            crashOnError: false,
            command: `git push --quiet`,
        });
    } catch (error) {
        console.error(error);
    } finally {
        await unlink(commitMessageFilePath);
    }
}

/**
 * Note: [⚫] Code in this file should never be published in any package
 */
