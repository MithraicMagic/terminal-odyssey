const LINETYPE = {
    INPUT: 0,
    EVENT: 1,
    ALERT: 2
}

class Terminal {
    constructor() {
        this.name = 'nick';
        this.location = 'terminal';
        this.command = '';
        this.buffer = '';

        this.history = [];
        this.historyIndex = 0;

        this.removedLine = null;
    }

    parseInput(m) {
        switch (m.key) {
            case 'Backspace':
                this.command = this.command.slice(0, -1);
                break;
            case 'Delete':
                this.buffer = this.buffer.substr(1, this.buffer.length - 1);
                break;
            case 'ArrowLeft':
                this.buffer = this.command.charAt(this.command.length - 1) + this.buffer;
                this.command = this.command.slice(0, -1);
                break;
            case 'ArrowRight':
                this.command += this.buffer.charAt(0);
                this.buffer = this.buffer.substr(1, this.buffer.length - 1);
                break;
            case 'ArrowUp':
            //TODO add history
            case 'ArrowDown':
            //TODO add history
            case 'Shift':
            case 'Control':
                break;
            default:
                this.command += m.key;
                break;
        }

        this.renderInput();
    }

    renderInput() {
        document.querySelector('.active .command').innerHTML = this.command.replaceAll(' ', '&nbsp;');
        document.querySelector('.active .buffer').innerHTML = this.buffer.replaceAll(' ', '&nbsp;');
    }

    addNewLine(type, data) {
        this.command = '';
        this.buffer = '';
        this.historyIndex = 0;

        const line = document.createElement('div');
        const name = document.createElement('span');
        const location = document.createElement('span');

        line.className = 'line';
        name.className = 'name';
        location.className = 'location';

        switch (type) {
            case LINETYPE.INPUT:
                if (document.querySelector('.active')) document.querySelector('.active').classList.remove('active');
                const command = document.createElement('span');
                const buffer = document.createElement('span');

                line.classList.add('active');
                command.className = 'command';
                buffer.className = 'buffer';

                name.textContent = data.name;
                location.textContent = data.location;

                line.append(name, location, command, buffer);

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

        document.querySelector('.terminal').appendChild(line);
    }

    deleteLastLine() {
        this.removedLine = document.querySelector('.terminal').lastElementChild;
        document.querySelector('.terminal').removeChild(this.removedLine);
    }

    saveInput() {
        this.history.push(this.command + this.buffer);
    }

    getInputData() {
        const name = document.querySelector('.active .name').textContent;
        const location = document.querySelector('.active .location').textContent;
        const fullInput = this.command + this.buffer;
        const splitInput = fullInput.split(/\s+/);

        return { name, location, input: fullInput, command: splitInput[0], parameters: splitInput.shift() }
    }
}
