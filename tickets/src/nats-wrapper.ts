import nats, {Stan} from 'node-nats-streaming';

class NatsWrapper {
    
     private _client? : Stan;

     get client(){

          if(!this._client)throw new Error('cannot use NATS client before connecting...');
          else return this._client;
     }
     
     connect(clusterId:string, clientId: string, url: string){

          this._client=nats.connect(clusterId,clientId,{url});

          // returning the promises.
          return new Promise((resolve:any,reject)  =>{

                   this.client.on('connect',()=>{
                   console.log('Connected to NATS...');
                   resolve();});

                   this.client!.on('error',(err)=>{
                   reject(err); });
         });
     }

}

export let natsWrapper = new NatsWrapper();