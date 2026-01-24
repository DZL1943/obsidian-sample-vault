module.exports = async (params) => {
    const { obsidian, quickAddApi = app.plugins.plugins.quickadd.api } = params || {};
    
    const { operation, tag, newTag } = await quickAddApi.requestInputs([
        { id: 'operation', type: 'dropdown', options: ['add', 'remove', 'replace'] },
        { id: 'tag', type: 'text' },
        { id: 'newTag', type: 'text' },
    ]);

    const ops = {
        add: (fm) => !fm.tags ? (fm.tags = [tag], true) : !fm.tags.includes(tag) && (fm.tags.push(tag), true),
        remove: (fm) => fm.tags?.includes(tag) && fm.tags.splice(fm.tags.indexOf(tag), 1).length,
        replace: (fm) => fm.tags?.includes(tag) && (fm.tags[fm.tags.indexOf(tag)] = newTag, true)
    };

    let modified = 0;
    
    for (const file of app.vault.getMarkdownFiles()) {
        await app.fileManager.processFrontMatter(
            file,
            (fm) => ops[operation](fm) && modified++,
        );
    }
    
    new obsidian.Notice(`Modified ${modified} files`);
    return modified;
};