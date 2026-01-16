module.exports = async (params) => {
    const { obsidian, quickAddApi = app.plugins.plugins.quickadd.api } = params || {};
    
    const { operation, tag, newTag, filepaths } = await quickAddApi.requestInputs([
        { id: 'operation', type: 'dropdown', options: ['add', 'remove', 'replace'], default: 'add' },
        { id: 'tag', type: 'text' },
        { id: 'newTag', type: 'text' },
        { id: 'filepaths', type: 'textarea' },
    ]);

    const ops = {
        add: (fm) => !fm.tags ? (fm.tags = [tag], true) : !fm.tags.includes(tag) && (fm.tags.push(tag), true),
        remove: (fm) => fm.tags?.includes(tag) && fm.tags.splice(fm.tags.indexOf(tag), 1).length,
        replace: (fm) => fm.tags?.includes(tag) && (fm.tags[fm.tags.indexOf(tag)] = newTag, true)
    };

    let modified = 0;
    
    const files = filepaths && filepaths.trim()
        ? filepaths.split('\n')
            .map(p => p.trim())
            .filter(p => p)
            .map(p => app.vault.getFileByPath(p))
            .filter(f => f)
        : app.vault.getMarkdownFiles();
    
    for (const file of files) {
        await app.fileManager.processFrontMatter(file, (fm) => ops[operation](fm) && modified++);
    }
    
    new obsidian.Notice(`Modified ${modified} files`);
    return modified;
};