import * as utils from './utils';

export function ClearGutterIcon() {
    console.log("[RightLines] ClearGutterIcon called");
    console.log("[RightLines] Disposing of decoType");
    utils.decoType.dispose();

    console.log("[RightLines] Clearing out collection of positions to decorate");
    utils.ranges.splice(0, utils.ranges.length);

    utils.createDecoType(utils.iconPath);
}
