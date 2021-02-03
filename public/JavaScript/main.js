const terminal = new Terminal();

function init() {
    document.body.addEventListener('keydown', (m) => m.key === 'Enter' ? executeCommand() : terminal.parseInput(m));
    terminal.addNewLine(LINETYPE.INPUT, { name: 'nick', location: 'terminal' });
}

function executeCommand() {
    terminal.saveInput();
    const data = terminal.getInputData();

    switch (data.command) {
        case 'say':
            const message = data.input.match(/'([^']+)'/);
            if (message) {
                terminal.addNewLine(LINETYPE.EVENT, { name: data.name, event: 'said "' + message[1] + '"' });
            } else {
                terminal.addNewLine(LINETYPE.ALERT, { alert: 'Could not parse message, make sure to put message between two single-quotes (\')' });
            }
            terminal.addNewLine(LINETYPE.INPUT, { name: data.name, location: data.location });
            break;
        default:
            terminal.addNewLine(LINETYPE.ALERT, { alert: '"' + data.command + '" is unknown' });
            terminal.addNewLine(LINETYPE.INPUT, { name: data.name, location: data.location });
    }
}