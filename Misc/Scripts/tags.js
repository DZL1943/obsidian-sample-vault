module.exports = async (params) => {
    const { obsidian, quickAddApi = app.plugins.plugins.quickadd.api } = params || {};
    
    const { operation, tag, newTag } = await quickAddApi.requestInputs([
        { id: 'operation', type: 'dropdown', options: ['add', 'remove', 'replace'] },
        { id: 'tag', type: 'text' },
        { id: 'newTag', type: 'text' },
    ]);

    const operations = {
        add: (tags) => !tags.includes(tag) && tags.push(tag),
        remove: (tags) => {
            const index = tags.indexOf(tag);
            return index > -1 && tags.splice(index, 1);
        },
        replace: (tags) => {
            const index = tags.indexOf(tag);
            return index > -1 && (tags[index] = newTag);
        }
    };

    let modified = 0;
    
    for (const file of app.vault.getMarkdownFiles()) {
        await app.fileManager.processFrontMatter(file, (fm) => {
            fm.tags = fm.tags || [];
            if (operations[operation](fm.tags)) modified++;
        });
    }
    
    new obsidian.Notice(`Modified ${modified} files`);
    return modified;
}