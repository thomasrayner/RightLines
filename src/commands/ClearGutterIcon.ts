import * as utils from '../utils';

export function ClearGutterIcon() {
    utils.writeLog("ClearGutterIcon called");
    utils.writeLog("Disposing of decoType");
    utils.decoType.dispose();

    utils.writeLog("Clearing out collection of positions to decorate");
    utils.decorateRanges.splice(0, utils.decorateRanges.length);

    utils.createDecoType(utils.iconPath);
}
