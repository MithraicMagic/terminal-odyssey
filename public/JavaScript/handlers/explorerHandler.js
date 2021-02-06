class ExplorerHandler {
    constructor() {
        this.currentPath = '/';
        this.fileSystemNames = ['earth-terminal'];
        this.fileSystems = new Map();

        this.fileSystemNames.forEach(async name => {
            this.fileSystems.set(name, await this.getFilesystem(name));
        });
    }

    handle(data) {
        switch (data.command) {
            case 'cd':
                if (data.parameters[0]) {
                    
                } else {
                    terminal.addNewLine(LINETYPE.ALERT, { alert: 'No path found.' });
                }
                terminal.addNewLine(LINETYPE.INPUT, { name: data.name, location: data.location });
                break;
            case 'ls':
                break;
            case 'open':
                break;
        }
    }

    async getFilesystem(name) {
        let json;
        await fetch('/JavaScript/filesystems/' + name + '.json')
            .then(res => res.json())
            .then(res => json = res);
        return json;
    }
}