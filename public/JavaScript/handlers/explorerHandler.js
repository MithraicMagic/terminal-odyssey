class ExplorerHandler {
    constructor() {
        this.fileSystemNames = ['earth-terminal'];
        this.fileSystems = new Map();

        this.fileSystemNames.forEach(async name => {
            this.fileSystems.set(name, await this.getFilesystem(name));
        });

        this.currentPath = '/';
    }

    handle(data) {
        switch (data.command) {
            case 'cd':
                if (data.parameters[0] && this.testPath(data.parameters[0])) {
                    let path = data.parameters[0];
                    if (!path.endsWith('/')) path += '/';
                    if (path.startsWith('/')) {
                        this.currentPath = path;
                    } else {
                        this.currentPath += path;
                    }
                } else {
                    terminal.addNewLine(LINETYPE.ALERT, { alert: 'No path found, or invalid path found' });
                }
                break;
            case 'ls':
                const folder = this.getCurrentFolder();
                let fileString = '';
                folder.content.forEach((f, i) => { fileString += f.name + (i < folder.content.length - 1 ? ', ' : '') });
                terminal.addNewLine(LINETYPE.ALERT, { alert: fileString });
                break;
            case 'open':
                break;
        }

        terminal.addNewLine(LINETYPE.INPUT, { name: data.name, location: data.location });
    }

    testPath(path) {
        const paths = path.split('/');
        if (path.startsWith('/')) paths.shift();
        if (path.endsWith('/')) paths.pop();
        let folder = path.startsWith('/') ? this.fileSystems.get(terminal.location) : this.getCurrentFolder();
        for (let i = 0; i < paths.length; i++) {
            const newFolder = folder.content.find(f => f.name === paths[i]);
            if (newFolder) {
                folder = newFolder;
            } else {
                return false;
            }
        }
        return true;
    }

    findById() {

    }

    getCurrentFolder() {
        const paths = this.currentPath.split('/');
        paths.shift();
        paths.pop();
        let folder = this.fileSystems.get(terminal.location);
        for (let i = 0; i < paths.length; i++) {
            const newFolder = folder.content.find(f => f.name === paths[i]);
            if (newFolder) {
                folder = newFolder;
            } else {
                return null;
            }
        }
        return folder;
    }

    async getFilesystem(name) {
        let json;
        await fetch('/JavaScript/filesystems/' + name + '.json')
            .then(res => res.json())
            .then(res => json = res);
        return json;
    }
}