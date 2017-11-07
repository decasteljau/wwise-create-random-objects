import * as waapi from 'waapi-client';
import { ak } from 'waapi';
import * as words from './words';

const types = ['ActorMixer','RandomSequenceContainer','Sound'];

interface IObject{
    name: string;
    type: string;
    children: IObject[]
}

async function main() {

    try {
        // Connect to WAAPI
        // Ensure you enabled WAAPI in Wwise's User Preferences
        var session = await waapi.connect('ws://localhost:8080/waapi');

        // Obtain information about Wwise
        var wwiseInfo = await session.call(ak.wwise.core.getInfo, {});
        console.log(`Hello ${wwiseInfo.displayName} ${wwiseInfo.version.displayName}!`);

        var count = 1;
       
        function populate(parent:IObject, parentType:string, depth:number){
            const objTypeFrom = types.indexOf(parentType);
            const childCount = Math.floor(Math.random()*10)+3;
            for (var index = 0; index < childCount; index++) {
                var type = 'Sound';
                if(depth < 4)
                    type = types[objTypeFrom+Math.floor(Math.random()*(types.length-objTypeFrom))];

                const object:IObject = create(parent, type);
                parent.children.push(object);
                if(type != 'Sound'){
                    populate(object, type, depth+1);
                }                
            }
        }
        function create(parent:IObject, type:string):IObject{
            count++;
            return {
                name: words.createName(Math.floor(Math.random()*3)+2),
                type,
                children:[]};
        }        

        var args = {
            parent:'\\Actor-Mixer Hierarchy\\Default Work Unit', 
            type:'ActorMixer', 
            name:'root',
            children:[],
            onNameConflict:'rename' };
        console.log(`building structure...`);
        populate(args, 'ActorMixer', 0);

        console.log(`sending ${count} objects to Wwise...`);
        await session.call(ak.wwise.core.object.create, args, {});        

        // Disconnect everything
        await session.disconnect();

        await console.log(`done!`);
    }
    catch (e) {
        await console.log(e.message);
    }

    process.exit();
}

main();


