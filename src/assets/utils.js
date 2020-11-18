/**
 * 判断是否在数组内
 * @param {arry}  
 */
 
const ishas=function(arr,val){
	var i = arr.length;
	while (i--) {
		if (arr[i].songId == val.songId) {
			return true;
		}
	}
	return false;
}
export default{
  ishas
}