
export function sleep(callback,time) {
    new Promise((resolve,reject)=>{
       resolve()
    }).then(()=>{
      setTimeout(()=>{
        callback()
      },time)
    })
}
function getType(obj){
  let map=new Map([
    ["[object Object]","object"],
    ["[object Array]","array"]
  ])
  let type=map.get(Object.prototype.toString.call(obj))
  return type
}
export function deepClone(object){
   let type=getType(object)
   let o
   if(type=="object"){
     o={}
      Object.keys(object).forEach(key=>{
        o[key]=deepClone(object[key])
      })
   }else if(type=="array"){
     o=[]
     object.forEach(it=>{
       o.push(deepClone(it))
     })
   }else{
     o=object
   }
   return o
}
export function flatArray(array){
  let arrData=[]
  if(Array.isArray(array)){
     arrData=array.reduce((pre,cur)=>{
        pre=[...pre,...flatArray(cur)] 
        return pre
     },[])
  }else{
    arrData.push(array)
  }
  return arrData
}