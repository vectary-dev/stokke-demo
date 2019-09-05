import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

async function run() {
    console.log("Example script running..");

    function errHandler(err) {
        console.log("API error", err);
    }

    async function onReady() {
        console.log("API ready..");

        try {            
            const changeColor = async (color) => {
                const chair = await vctrApi.getObjectByName("chair_original");
                for(let i = 0; i < chair.childrenNames.length; i++) {
                    const childName = chair.childrenNames[i];
                    const child = await vctrApi.getObjectByName(childName);
                    await vctrApi.updateMaterial(child.material, color);
                }
            }

            console.log(await vctrApi.getObjects());
            document.getElementById("red").addEventListener("click", () => {
                const color = { "color": "#7a0a02"};
                changeColor(color);
            });

            document.getElementById("black").addEventListener("click", () => {
                const color = { "color": "#000000"};
                changeColor(color);
            });

        } catch (e) {
            errHandler(e);
        }

    }
    const vctrApi = new VctrApi("d9546c47-cc37-43c7-a335-b69ea054de90", errHandler);
    try {
        await vctrApi.init();
        onReady();
    } catch (e) {
        errHandler(e);
    }
}

run();