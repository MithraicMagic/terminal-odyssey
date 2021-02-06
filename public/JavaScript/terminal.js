const LINETYPE = {
    INPUT: 0,
    EVENT: 1,
    ALERT: 2
}

class Terminal {
    constructor() {
        this.name = '';
        this.location = '';

        this.history = [];
        this.historyIndex = -1;

        this.mainHandler = new MainHandler();
        this.mainHandler.init();
    }

    parseInput(m) {
        if (m.key === 'Enter') {
            this.saveInput();
            this.mainHandler.handle(this.getInputData());
        } else if (m.key === 'ArrowUp') {
            if (this.historyIndex + 1 < this.history.length) {
                this.historyIndex++;
                document.querySelector('.line.active .command').value = this.history[this.historyIndex];
            }
        } else if (m.key === 'ArrowDown') {
            if (this.historyIndex >= 0) {
                this.historyIndex--;
                if (this.historyIndex !== -1) {
                    document.querySelector('.line.active .command').value = this.history[this.historyIndex];
                } else {
                    document.querySelector('.line.active .command').value = '';
                }
            }
        }
    }

    addNewLine(type, data) {
        this.historyIndex = -1;

        const line = document.createElement('div');
        const name = document.createElement('span');
        const location = document.createElement('span');

        line.className = 'line';
        name.className = 'name';
        location.className = 'location';

        switch (type) {
            case LINETYPE.INPUT:
                if (document.querySelector('.line.active')) {
                    const active = document.querySelector('.line.active');
                    active.classList.remove('active');
                    active.children[3].disabled = true;
                }

                const path = document.createElement('span');
                const command = document.createElement('input');

                path.className = 'path';
                path.textContent = this.mainHandler.explorer.currentPath;

                command.className = 'command';
                command.type = 'text';
                command.setAttribute('autocapitalize', 'off');
                command.setAttribute('autocomplete', 'off');
                command.setAttribute('autocorrect', 'off');
                command.setAttribute('spellcheck', 'false');

                line.classList.add('active', 'command-line');
                name.textContent = data.name;
                location.textContent = data.location;

                command.addEventListener('keydown', (m) => {
                    if (document.querySelector('.terminal').classList.contains('active')) this.parseInput(m);
                });

                line.append(name, location, path, command);

                this.name = data.name;
                this.location = data.location;
                break;
            case LINETYPE.EVENT:
                const event = document.createElement('span');
                event.className = 'event';

                name.textContent = data.name;
                event.textContent = data.event;

                line.append(name, event);
                break;
            case LINETYPE.ALERT:
                const alert = document.createElement('span');
                alert.className = 'alert';
                alert.textContent = data.alert;

                line.append(alert);
                break;
        }

        document.querySelector('.lines').appendChild(line);
        if (type === LINETYPE.INPUT) line.children[3].focus();
    }

    saveInput() {
        if (document.querySelector('.line.active .command').value) this.history.unshift(document.querySelector('.line.active .command').value);
    }

    getInputData() {
        const name = document.querySelector('.line.active .name').textContent;
        const location = document.querySelector('.line.active .location').textContent;
        const fullInput = document.querySelector('.line.active .command').value;
        const splitInput = fullInput.split(/\s+/);

        return { name, location, input: fullInput, command: splitInput[0], parameters: splitInput.slice(1, splitInput.length) }
    }
}
