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

            const constructMovables = (objects, positions) => {
                return new Promise((resolve, reject) => {
                    const movables = new Map();
                    objects.forEach((obj, i) => {
                        movables.set(obj, positions[i]);
                    });
                    resolve(movables);
                });
            }
            
            const interpolatePosition = (movables, timeFraction) => {
                movables.forEach(async (newPos, object) => {
                    const currentPos = await vctrApi.getPosition(object);
                    vctrApi.setPositionAbsolute(object, lerp(currentPos, newPos, timeFraction));        
                });
            }

            const interpolateRotation = (movables, timeFraction) => {
                movables.forEach(async (newRot, object) => {
                    const currentRot = await vctrApi.getRotation(object);
                    vctrApi.setRotationAbsolute(object, lerp(currentRot, newRot, timeFraction));        
                });
            }

            const sequenceAnimate = (duration, keyFrame, movables) => {
                setTimeout(() => {
                    animate(duration, timeFraction => {
                        return timeFraction*(2-timeFraction);
                    }, (timeFraction) => {
                        interpolatePosition(movables, timeFraction);
                    });
                }, keyFrame);
            }

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

                    const sequence1Objects = [
                        "screwRight",
                        "screwLeft"
                    ];

                    const sequence1NewPositions = [
                        newScrewRightPos,
                        newScrewLeftPos
                    ];

                    const sequence1Movables = await constructMovables(sequence1Objects, sequence1NewPositions);

                    const sequence1RotObjects = [
                        "HexKey2",
                        "HexKey1"
                    ];

                    const sequence1NewRotations = [
                        newHexKeyRot1,
                        newHexKeyRot2
                    ];

                    const sequence1RotationMovables = await constructMovables(sequence1RotObjects, sequence1NewRotations);

                    setTimeout(() => {
                        animate(1000, timeFraction => {
                            return Math.pow(timeFraction, 2);
                        }, (timeFraction) => {
                            interpolateRotation(sequence1RotationMovables, timeFraction);

                            interpolatePosition(sequence1Movables, timeFraction);
                        });
                    }, keyFrames[0]);

                    const sequence2Objects = [
                        "w-tray_2"
                    ];

                    const sequence2NewPositions = [
                        newTrayPos
                    ];

                    const sequence2Movables = await constructMovables(sequence2Objects, sequence2NewPositions);

                    sequenceAnimate(2000, keyFrames[1], sequence2Movables);

                    const sequence3Objects = [
                        "w-tray_2"
                    ];

                    const sequence3NewPositions = [
                        [newTrayPos[0], newTrayPos[1], newTrayPos[2] - 72]
                    ];

                    const sequence3Movables = await constructMovables(sequence3Objects, sequence3NewPositions);

                    sequenceAnimate(1000, keyFrames[2], sequence3Movables);

                    const sequence4Objects = [
                        "w-tray_2"
                    ];

                    const sequence4NewPositions = [
                        [newTrayPos[0], trayPos[1], newTrayPos[2] - 72]
                    ];

                    const sequence4Movables = await constructMovables(sequence4Objects, sequence4NewPositions);

                    sequenceAnimate(2000, keyFrames[3], sequence4Movables);

                    const sequence5Objects = [
                        "screwRight",
                        "screwLeft"
                    ];

                    const sequence5NewPositions = [
                        screwRightPos,
                        screwLeftPos
                    ];

                    const sequence5Movables = await constructMovables(sequence5Objects, sequence5NewPositions);

                    const sequence5RotObjects = [
                        "HexKey2",
                        "HexKey1"
                    ];

                    const sequence5NewRotations = [
                        hexKeyRot1,
                        hexKeyRot2
                    ];

                    const sequence5RotationMovables = await constructMovables(sequence5RotObjects, sequence5NewRotations);

                    setTimeout(() => {
                        animate(2000, timeFraction => {
                            return Math.pow(timeFraction, 2);
                        }, (timeFraction) => {
                            interpolateRotation(sequence5RotationMovables, timeFraction);

                            interpolatePosition(sequence5Movables, timeFraction);
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

                    const sequence1Objects = [
                        "screws_left",
                        "screws_right",
                        "Left",
                        "Right",
                        "plastic",
                        "w-lean_1",
                        "w-lean_2",
                        "w-tray_1",
                        "w-tray_2",
                        "w-base_2",
                        "rod_1",
                        "rod_2"
                    ];

                    const sequence1NewPositions = [
                        newScrewsLeftPos,
                        newScrewsRightPos,
                        newLeftLegPos,
                        newRightLegPos,
                        newPlasticPos,
                        newElem1Pos,
                        newElem2Pos,
                        newElem3Pos,
                        newElem4Pos,
                        newElem5Pos,
                        newRod1Pos,
                        newRod2Pos
                    ];

                    const sequence1Movables = await constructMovables(sequence1Objects, sequence1NewPositions);

                    sequenceAnimate(1000, keyFrames[0], sequence1Movables);

                    const sequence2Objects = [
                        "Left",
                        "Right",
                        "w-base_2",
                    ];

                    const sequence2NewPositions = [
                        leftLegPos,
                        rightLegPos,
                        elem5Pos
                    ];

                    const sequence2Movables = await constructMovables(sequence2Objects, sequence2NewPositions);

                    sequenceAnimate(1000, keyFrames[1], sequence2Movables);

                    const sequence3Objects = [
                        "rod_1",
                        "rod_2",
                    ];

                    const sequence3NewPositions = [
                        rod1Pos,
                        rod2Pos,
                    ];

                    const sequence3Movables = await constructMovables(sequence3Objects, sequence3NewPositions);

                    sequenceAnimate(1000, keyFrames[2], sequence3Movables);

                    const sequence4Objects = [
                        "w-lean_1",
                        "w-lean_2",
                    ];

                    const sequence4NewPositions = [
                        elem1Pos,
                        elem2Pos,
                    ];

                    const sequence4Movables = await constructMovables(sequence4Objects, sequence4NewPositions);

                    sequenceAnimate(1000, keyFrames[3], sequence4Movables);

                    const sequence5Objects = [
                        "w-tray_1",
                        "w-tray_2",
                        "plastic"
                    ];

                    const sequence5NewPositions = [
                        elem3Pos,
                        elem4Pos,
                        plasticPos
                    ];

                    const sequence5Movables = await constructMovables(sequence5Objects, sequence5NewPositions);

                    sequenceAnimate(2000, keyFrames[4], sequence5Movables);

                    const sequence6Objects = [
                        "screws_left",
                        "screws_right"
                    ];

                    const sequence6NewPositions = [
                        screwsLeftPos,
                        screwsRightPos
                    ];

                    const sequence6Movables = await constructMovables(sequence6Objects, sequence6NewPositions);

                    sequenceAnimate(2000, keyFrames[5], sequence6Movables);

                    setTimeout(() => {
                        animationPlaying = false;
                    }, keyFrames[4] + 1000);
       
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