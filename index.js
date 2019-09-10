import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";
import { animate, lerp } from "https://www.vectary.com/viewer-api/v1/apiUtils.js";

async function run() {
    console.log("Example script running..");

    function errHandler(err) {
        console.log("API error", err);
    }

    async function onReady() {
        console.log("API ready..");

        try {
            console.log(await vctrApi.getObjects());

            vctrApi.setVisibility("HexKey1", false, false);
            vctrApi.setVisibility("HexKey2", false, false);
            const hexKeyPos1 = await vctrApi.getPosition("HexKey2");
            const hexKeyPos2 = await vctrApi.getPosition("HexKey1");
            const newHexKeyPos1 = [hexKeyPos1[0] + 0.09, hexKeyPos1[1], hexKeyPos1[2]];
            const newHexKeyPos2 = [hexKeyPos2[0] - 0.06, hexKeyPos2[1], hexKeyPos2[2]];

            const hexKeyRot1 = await vctrApi.getRotation("HexKey2");
            const hexKeyRot2 = await vctrApi.getRotation("HexKey1");
            const newHexKeyRot1 = [hexKeyRot1[0] + 560, hexKeyRot1[1], hexKeyRot1[2]];
            const newHexKeyRot2 = [hexKeyRot2[0] + 560, hexKeyRot2[1], hexKeyRot2[2]];

            const screwRightPos = await vctrApi.getPosition("screwRight");
            const screwLeftPos = await vctrApi.getPosition("screwLeft");
            const newScrewRightPos = [screwRightPos[0] + 4, screwRightPos[1], screwRightPos[2]];
            const newScrewLeftPos = [screwLeftPos[0] - 4, screwLeftPos[1], screwLeftPos[2]];

            const trayPos = await vctrApi.getPosition("w-tray_2");
            const newTrayPos = [trayPos[0], trayPos[1] - 200, trayPos[2]];

            const keyFrames = [1000, 2000, 5000, 6000, 8000, 10000];

            document.getElementById("explodeButton").addEventListener("click", async () => {
                vctrApi.switchView("ZoomView");
                await vctrApi.setVisibility("HexKey1", true, false);
                await vctrApi.setVisibility("HexKey2", true, false);
                animate(1000, timeFraction => {
                    return Math.pow(timeFraction, 2);
                }, (timeFraction) => {
                    const position1 = lerp(hexKeyPos1, newHexKeyPos1, timeFraction);
                    const position2 = lerp(hexKeyPos2, newHexKeyPos2, timeFraction);
                    vctrApi.setPositionAbsolute("HexKey2", position1);
                    vctrApi.setPositionAbsolute("HexKey1", position2);
                });
                setTimeout(() => {
                    animate(1000, timeFraction => {
                        return Math.pow(timeFraction, 2);
                    }, (timeFraction) => {
                        const rotation1 = lerp(hexKeyRot1, newHexKeyRot1, timeFraction);
                        const rotation2 = lerp(hexKeyRot2, newHexKeyRot2, timeFraction);
                        vctrApi.setRotationAbsolute("HexKey2", rotation1);
                        vctrApi.setRotationAbsolute("HexKey1", rotation2);

                        const position1 = lerp(screwRightPos, newScrewRightPos, timeFraction);
                        const position2 = lerp(screwLeftPos, newScrewLeftPos, timeFraction);
                        vctrApi.setPositionAbsolute("screwRight", position1);
                        vctrApi.setPositionAbsolute("screwLeft", position2);
                    });
                }, keyFrames[0]);
                setTimeout(() => {
                    animate(2000, timeFraction => {
                        return Math.pow(timeFraction, 2);
                    }, (timeFraction) => {
                        const position = lerp(trayPos, newTrayPos, timeFraction);
                        vctrApi.setPositionAbsolute("w-tray_2", position);
                    });
                }, keyFrames[1]);
                setTimeout(() => {
                    animate(1000, timeFraction => {
                        return Math.pow(timeFraction, 2);
                    }, (timeFraction) => {
                        const position = lerp(newTrayPos, [newTrayPos[0], newTrayPos[1], newTrayPos[2] + 72], timeFraction);
                        vctrApi.setPositionAbsolute("w-tray_2", position);
                    });
                }, keyFrames[2]);
                setTimeout(() => {
                    animate(2000, timeFraction => {
                        return Math.pow(timeFraction, 2);
                    }, (timeFraction) => {
                        const position = lerp([newTrayPos[0], newTrayPos[1], newTrayPos[2] + 72], [newTrayPos[0], trayPos[1] + 70, newTrayPos[2] + 72], timeFraction);
                        vctrApi.setPositionAbsolute("w-tray_2", position);
                    });
                }, keyFrames[3]);
                setTimeout(() => {
                    animate(2000, timeFraction => {
                        return Math.pow(timeFraction, 2);
                    }, (timeFraction) => {
                        const rotation1 = lerp(newHexKeyRot1, hexKeyRot1, timeFraction);
                        const rotation2 = lerp(newHexKeyRot2, hexKeyRot2, timeFraction);
                        vctrApi.setRotationAbsolute("HexKey2", rotation1);
                        vctrApi.setRotationAbsolute("HexKey1", rotation2);

                        const position1 = lerp(newScrewRightPos, screwRightPos, timeFraction);
                        const position2 = lerp(newScrewLeftPos, screwLeftPos, timeFraction);
                        vctrApi.setPositionAbsolute("screwRight", position1);
                        vctrApi.setPositionAbsolute("screwLeft", position2);
                    });
                }, keyFrames[4]);
                setTimeout(() => {
                    vctrApi.setVisibility("HexKey1", false, false);
                    vctrApi.setVisibility("HexKey2", false, false);
                }, keyFrames[5]);
            });
        } catch (e) {
            errHandler(e);
        }

    }
    const vctrApi = new VctrApi("99b6715e-ba9c-49d6-9c7f-62afa53bf3a2", errHandler);
    try {
        await vctrApi.init();
        onReady();
    } catch (e) {
        errHandler(e);
    }
}

run();