
export const SearchFunction=(param,arr)=>{
    const result= arr.filter((ele)=>{
        return ele.name.toLowerCase().includes(param.toLowerCase())
    })
   return result
}