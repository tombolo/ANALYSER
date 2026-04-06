import getToolsInterface from './ToolsInterface';
import getTicksInterface from './TicksInterface';
import getBotInterface from './BotInterface';
import TradeEngine from '../trade';

const sleep = (observer, arg = 1) => {
    return new Promise(
        r =>
            setTimeout(() => {
                r();
                setTimeout(() => observer.emit('CONTINUE'), 0);
            }, arg * 1000),
        () => {}
    );
};

const Interface = $scope => {
    const tradeEngine = new TradeEngine($scope);
    const { observer } = $scope;
    const getInterface = () => {
        const STOP_LOSS_ALERT_PATTERN = /\bstop\s*loss\b.*\b(hit|reached)\b/i;
        const STOP_LOSS_ALERT_MESSAGE = 'Stop loss hit. Bot stopped.';

        return {
            ...getBotInterface(tradeEngine),
            ...getToolsInterface(tradeEngine),
            getTicksInterface: getTicksInterface(tradeEngine),
            watch: (...args) => tradeEngine.watch(...args),
            sleep: (...args) => sleep(observer, ...args),
            alert: (...args) => {
                if (typeof args?.[0] === 'string' && STOP_LOSS_ALERT_PATTERN.test(args[0])) {
                    // eslint-disable-next-line no-alert
                    return alert(STOP_LOSS_ALERT_MESSAGE);
                }
                // eslint-disable-next-line no-alert
                return alert(...args);
            },
            prompt: (...args) => prompt(...args), // eslint-disable-line no-alert
            console: {
                log(...args) {
                    // eslint-disable-next-line no-console
                    console.log(new Date().toLocaleTimeString(), ...args);
                },
            },
        };
    };
    return { tradeEngine, observer, getInterface };
};

export default Interface;
