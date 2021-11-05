 export const SearchFunction=(arr,param)=>{

    const result=arr.filter((ele)=>{
        return ele.name.toLowerCase().includes(param.toLowerCase())
    })
    return result
 }