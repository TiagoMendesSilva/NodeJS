import { Readable, Writable } from 'node:stream'

class OneToHundredStream extends Readable {

    index = 1

   
    _read(){
        const i = this.index ++

        setTimeout(() => {

            if(i>100){
                this.push(null)
            }else{
                const buffer = Buffer.from(String(i))
                this.push(buffer)
            }
        },300)

        
    }
    
}

class MultiplyByTenStream extends Writable {
    _write(chunk, enconding, callback) {
        console.log(Number(chunk.toString())*10)
        callback()
    }
}

new OneToHundredStream().pipe(new MultiplyByTenStream())