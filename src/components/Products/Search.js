export const sortByName=(arr,param)=>{
    const result=arr.sort((a,b)=>{
        const obj1=a["name"].toLowerCase()
        const obj2=b["name"].toLowerCase()
        if(param==="asc"){
          if(obj1 < obj2) {return -1 }
          if (obj1 > obj2) { return 1 }
        }
        return 0
    })
    return result
}
export const sortByDescName=(arr,param)=>{
    const result=arr.sort((a,b)=>{
        const obj1=a["name"].toLowerCase()
        const obj2=b["name"].toLowerCase()
        if(param==="dscn"){
          if(obj1 > obj2) {return -1 }
          if (obj1 < obj2) { return 1 }
        }
        return 0
    })
   return result
}

export const sortByPrice=(arr,param)=>{
    const result=arr.sort((a,b)=>{
        return param==="priceasc" && a.price-b.price     
    }) 
   return result
}
export const sortByPriceDenc=(arr,param)=>{
    const result=arr.sort((a,b)=>{
        return param==="pricedscn" && b.price-a.price
    })
    return result
 }
 export const SearchFunction=(arr,param)=>{

    const result=arr.filter((ele)=>{
        return ele.name.toLowerCase().includes(param.toLowerCase())
    })
    return result
 }