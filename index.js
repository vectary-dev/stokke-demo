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
            let animationPlaying = false;

            vctrApi.setVisibility("HexKey1", false, false);
            vctrApi.setVisibility("HexKey2", false, false);

            const screwsLeftPos = await vctrApi.getPosition("screws_left");
            const screwsRightPos = await vctrApi.getPosition("screws_right");
            const newScrewsLeftPos = [screwsLeftPos[0] - 160, screwsLeftPos[1], screwsLeftPos[2]];
            const newScrewsRightPos = [screwsRightPos[0] + 160, screwsRightPos[1], screwsRightPos[2]];

            const leftLegPos = await vctrApi.getPosition("Left");
            const rightLegPos = await vctrApi.getPosition("Right");
            const newLeftLegPos = [leftLegPos[0] - 100, leftLegPos[1], leftLegPos[2]];
            const newRightLegPos = [rightLegPos[0] + 100, rightLegPos[1], rightLegPos[2]];

            const plasticPos = await vctrApi.getPosition("plastic");
            const newPlasticPos = [plasticPos[0], plasticPos[1], plasticPos[2] + 600];

            const elem1Pos = await vctrApi.getPosition("w-lean_1");
            const elem2Pos = await vctrApi.getPosition("w-lean_2");
            const elem3Pos = await vctrApi.getPosition("w-tray_1");
            const elem4Pos = await vctrApi.getPosition("w-tray_2");
            const elem5Pos = await vctrApi.getPosition("w-base");
            const newElem1Pos = [elem1Pos[0], elem1Pos[1] + 560, elem1Pos[2]];
            const newElem2Pos = [elem2Pos[0], elem2Pos[1] - 583, elem2Pos[2]];
            const newElem3Pos = [elem3Pos[0], elem3Pos[1] + 545, elem3Pos[2]];
            const newElem4Pos = [elem4Pos[0], elem4Pos[1] - 560, elem4Pos[2]];
            const newElem5Pos = [elem5Pos[0], elem5Pos[1] + 583, elem5Pos[2]];

            const rod1Pos = await vctrApi.getPosition("rod_1");
            const rod2Pos = await vctrApi.getPosition("rod_2");
            const newRod1Pos = [rod1Pos[0], rod1Pos[1], rod1Pos[2] + 600];
            const newRod2Pos = [rod2Pos[0], rod2Pos[1], rod2Pos[2] - 600];

            const hexKeyPos1 = await vctrApi.getPosition("HexKey2");
            const hexKeyPos2 = await vctrApi.getPosition("HexKey1");
            const newHexKeyPos1 = [hexKeyPos1[0] + 0.09, hexKeyPos1[1], hexKeyPos1[2]];
            const newHexKeyPos2 = [hexKeyPos2[0] - 0.06, hexKeyPos2[1], hexKeyPos2[2]];

            const hexKeyRot1 = await vctrApi.getRotation("HexKey2");
            const hexKeyRot2 = await vctrApi.getRotation("HexKey1");
            const newHexKeyRot1 = [hexKeyRot1[0] - 560, hexKeyRot1[1], hexKeyRot1[2]];
            const newHexKeyRot2 = [hexKeyRot2[0] - 560, hexKeyRot2[1], hexKeyRot2[2]];

            const screwRightPos = await vctrApi.getPosition("screwRight");
            const screwLeftPos = await vctrApi.getPosition("screwLeft");
            const newScrewRightPos = [screwRightPos[0] + 4, screwRightPos[1], screwRightPos[2]];
            const newScrewLeftPos = [screwLeftPos[0] - 4, screwLeftPos[1], screwLeftPos[2]];

            const trayPos = await vctrApi.getPosition("w-tray_2");
            const newTrayPos = [trayPos[0], trayPos[1] - 200, trayPos[2]];

            const keyFrames = [1000, 2000, 5000, 6000, 8000, 10000];

            document.getElementById("animateButton").addEventListener("click", async () => {
                if (!animationPlaying) {
                    animationPlaying = true;
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
                            const position = lerp(newTrayPos, [newTrayPos[0], newTrayPos[1], newTrayPos[2] - 72], timeFraction);
                            vctrApi.setPositionAbsolute("w-tray_2", position);
                        });
                    }, keyFrames[2]);
                    setTimeout(() => {
                        animate(2000, timeFraction => {
                            return Math.pow(timeFraction, 2);
                        }, (timeFraction) => {
                            const position = lerp([newTrayPos[0], newTrayPos[1], newTrayPos[2] - 72], [newTrayPos[0], trayPos[1], newTrayPos[2] - 72], timeFraction);
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
                        animationPlaying = false;
                    }, keyFrames[5]);
                }
            });

            document.getElementById("constructButton").addEventListener("click", async () => {
                if (!animationPlaying) {
                    animationPlaying = true;

                    vctrApi.setVisibility("Shadow_Plane_1", false, false);

                    vctrApi.switchView("ZoomOutView");
                    setTimeout(() => {
                        animate(1000, timeFraction => {
                            return timeFraction*(2-timeFraction);
                        }, (timeFraction) => {
                            const position1 = lerp(screwsLeftPos, newScrewsLeftPos, timeFraction);
                            const position2 = lerp(screwsRightPos, newScrewsRightPos, timeFraction);
                            vctrApi.setPositionAbsolute("screws_left", position1);
                            vctrApi.setPositionAbsolute("screws_right", position2);

                            const position3 = lerp(leftLegPos, newLeftLegPos, timeFraction);
                            const position4 = lerp(rightLegPos, newRightLegPos, timeFraction);
                            vctrApi.setPositionAbsolute("Left", position3);
                            vctrApi.setPositionAbsolute("Right", position4);

                            const position5 = lerp(plasticPos, newPlasticPos, timeFraction);
                            vctrApi.setPositionAbsolute("plastic", position5);

                            const position6 = lerp(elem1Pos, newElem1Pos, timeFraction);
                            const position7 = lerp(elem2Pos, newElem2Pos, timeFraction);
                            const position8 = lerp(elem3Pos, newElem3Pos, timeFraction);
                            const position9 = lerp(elem4Pos, newElem4Pos, timeFraction);
                            const position10 = lerp(elem5Pos, newElem5Pos, timeFraction);
                            vctrApi.setPositionAbsolute("w-lean_1", position6);
                            vctrApi.setPositionAbsolute("w-lean_2", position7);
                            vctrApi.setPositionAbsolute("w-tray_1", position8);
                            vctrApi.setPositionAbsolute("w-tray_2", position9);
                            vctrApi.setPositionAbsolute("w-base_2", position10);

                            const position11 = lerp(rod1Pos, newRod1Pos, timeFraction);
                            const position12 = lerp(rod2Pos, newRod2Pos, timeFraction);
                            vctrApi.setPositionAbsolute("rod_1", position11);
                            vctrApi.setPositionAbsolute("rod_2", position12);
                        });
                    }, keyFrames[0]);

                    setTimeout(() => {
                        animate(1000, timeFraction => {
                            return Math.pow(timeFraction, 2);
                        }, (timeFraction) => {
                            const position1 = lerp(newLeftLegPos, leftLegPos, timeFraction);
                            const position2 = lerp(newRightLegPos, rightLegPos, timeFraction);
                            vctrApi.setPositionAbsolute("Left", position1);
                            vctrApi.setPositionAbsolute("Right", position2);

                            const position3 = lerp(newElem5Pos, elem5Pos, timeFraction);
                            vctrApi.setPositionAbsolute("w-base_2", position3);
                        });
                    }, keyFrames[1]);
                    
                    setTimeout(() => {
                        animate(1000, timeFraction => {
                            return Math.pow(timeFraction, 2);
                        }, (timeFraction) => {
                            const position1 = lerp(newRod1Pos, rod1Pos, timeFraction);
                            const position2 = lerp(newRod2Pos, rod2Pos, timeFraction);
                            vctrApi.setPositionAbsolute("rod_1", position1);
                            vctrApi.setPositionAbsolute("rod_2", position2);
                        });
                    }, keyFrames[2]);

                    setTimeout(() => {
                        animate(1000, timeFraction => {
                            return Math.pow(timeFraction, 2);
                        }, (timeFraction) => {
                            const position1 = lerp(newElem1Pos, elem1Pos, timeFraction);
                            const position2 = lerp(newElem2Pos, elem2Pos, timeFraction);
                            vctrApi.setPositionAbsolute("w-lean_1", position1);
                            vctrApi.setPositionAbsolute("w-lean_2", position2);
                        });
                    }, keyFrames[3]);

                    setTimeout(() => {
                        animate(2000, timeFraction => {
                            return Math.pow(timeFraction, 2);
                        }, (timeFraction) => {
                            const position1 = lerp(newElem3Pos, elem3Pos, timeFraction);
                            const position2 = lerp(newElem4Pos, elem4Pos, timeFraction);
                            const position3 = lerp(newPlasticPos, plasticPos, timeFraction);
                            vctrApi.setPositionAbsolute("w-tray_1", position1);
                            vctrApi.setPositionAbsolute("w-tray_2", position2);
                            vctrApi.setPositionAbsolute("plastic", position3);
                        });
                    }, keyFrames[4]);

                    setTimeout(() => {
                        animate(1000, timeFraction => {
                            return Math.pow(timeFraction, 2);
                        }, (timeFraction) => {
                            const position1 = lerp(newScrewsLeftPos, screwsLeftPos, timeFraction);
                            const position2 = lerp(newScrewsRightPos, screwsRightPos, timeFraction);
                            vctrApi.setPositionAbsolute("screws_left", position1);
                            vctrApi.setPositionAbsolute("screws_right", position2);

                            vctrApi.setVisibility("Shadow_Plane_1", true, false);

                            animationPlaying = false;
                        });
                    }, keyFrames[5]);
                }
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