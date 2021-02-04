const speech = new SpeechHandler();

class MainHandler {
    constructor() {
        this.commands = new Map();
    }

    init() {
        this.register(speech, 'say', 'shout');
    }

    register(handler, ...commands) {
        commands.forEach(c => {
            this.commands.set(c, handler);
        });
    }

    handle(data) {
        const handler = this.commands.get(data.command);

        if (handler) {
            handler.handle(data);
        } else {
            terminal.addNewLine(LINETYPE.ALERT, { alert: 'Command "' + data.command + '" is unknown' });
            terminal.addNewLine(LINETYPE.INPUT, { name: data.name, location: data.location });
        }
    }
}