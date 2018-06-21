function getCheck(arr, num){
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == num){
            console.log('this function runs')
            check = true 
            console.log(check)
            return check
        }
}}
module.exports = getCheck