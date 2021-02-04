const terminal = new Terminal();

function init() {
    document.body.addEventListener('keydown', (m) => {
        if (document.querySelector('.terminal').classList.contains('active')) {
            m.key === 'Enter' ? executeCommand() : terminal.parseInput(m);
        }
    });

    terminal.addNewLine(LINETYPE.INPUT, { name: 'nick', location: 'terminal' });
}

function switchWindow(value) {
    const terminalEl = document.querySelector('.terminal');
    const chatEl = document.querySelector('.chat');
    const terminalTab = document.querySelector('.tab.ter');
    const chatTab = document.querySelector('.tab.cha')

    if (value === 0 && !terminalEl.classList.contains('active')) {
        chatEl.classList.remove('active');
        terminalEl.classList.add('active');
        chatTab.classList.remove('active');
        terminalTab.classList.add('active');
    } else {
        terminalEl.classList.remove('active');
        chatEl.classList.add('active');
        terminalTab.classList.remove('active');
        chatTab.classList.add('active');
    }
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
            terminal.addNewLine(LINETYPE.ALERT, { alert: 'Command "' + data.command + '" is unknown' });
            terminal.addNewLine(LINETYPE.INPUT, { name: data.name, location: data.location });
    }
}