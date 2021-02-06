const terminal = new Terminal();

function init() {
    terminal.addNewLine(LINETYPE.INPUT, { name: 'nick', location: 'earth-terminal' });
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