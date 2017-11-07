import * as waapi from 'waapi-client';
import { ak } from 'waapi';
import * as words from './words';

const types = ['WorkUnit', 'ActorMixer','RandomSequenceContainer','Sound'];

async function main() {

    try {
        // Connect to WAAPI
        // Ensure you enabled WAAPI in Wwise's User Preferences
        var session = await waapi.connect('ws://localhost:8080/waapi');

        // Obtain information about Wwise
        var wwiseInfo = await session.call(ak.wwise.core.getInfo, {});
        console.log(`Hello ${wwiseInfo.displayName} ${wwiseInfo.version.displayName}!`);

        
        async function populate(parent:string, parentType:string){
            const objTypeFrom = Math.max(1,types.indexOf(parentType));
            const childCount = Math.floor(Math.random()*10)+8;
            for (var index = 0; index < childCount; index++) {
                const type = types[objTypeFrom+Math.floor(Math.random()*(types.length-objTypeFrom))];
                const path = await create(parent, type);

                if(type != 'Sound'){
                    await populate(path, type);
                }                
            }
        }
        async function create(parent:string, type:string):Promise<string>{
            const name = words.createName(Math.floor(Math.random()*4)+1);

            // Create a new Wwise Sound object in the default work unit
            await session.call(ak.wwise.core.object.create, {
                parent, type, name,
                onNameConflict:"rename" }, {});

            return parent + '\\' + name;
        }        
        await populate("\\Actor-Mixer Hierarchy\\Default Work Unit", 'WorkUnit');

        // Disconnect everything
        await session.disconnect();
    }
    catch (e) {
        console.log(JSON.stringify(e,null,4));
    }

    process.exit();
}

main();


