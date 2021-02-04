class SpeechHandler {
    constructor() {}

    handle(data) {
        const message = data.input.match(/'([^']+)'/);
        if (message) {
            if (data.command === 'shout') message[1] = message[1].toUpperCase();
            terminal.addNewLine(LINETYPE.EVENT, { name: data.name, event: ': "' + message[1] + '"' });
        } else {
            terminal.addNewLine(LINETYPE.ALERT, { alert: 'Could not parse message, make sure to put message between two single-quotes (\')' });
        }
        terminal.addNewLine(LINETYPE.INPUT, { name: data.name, location: data.location });
    }
}