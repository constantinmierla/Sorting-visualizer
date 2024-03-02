class Sorting{
    
    static bubbleSort(array){
        const moves = [];
        do{
            var swapped = false;
            for(let i = 1; i < array.length; i++){
                moves.push({
                    indices: [i-1, i],
                    type:"comparison"
                });
                if(array[i-1] > array[i]){
                    swapped = true;
                    [array[i-1], array[i]] = [array[i], array[i-1]];
                    moves.push({
                        indices: [i-1, i],
                        type:"swap"
                    });
                }
            }

        }while(swapped);
        return moves;
    }
    static SelectionSort(array)
    {
        const moves = [];
        for (let i = 0; i < array.length-1; i++){
            let minIndex = i;
            for (let j = i+1; j < array.length; j++){
                moves.push({
                    indices: [minIndex, j],
                    type:"comparison"
                });
                if(array[j] < array[minIndex]){
                    minIndex = j;
                }
            }
            if(minIndex !== i){
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                moves.push({
                    indices: [i, minIndex],
                    type:"swap"
                });
            }
        }
        return moves;
    }
    static InsertionSort(array)
    {
        const moves = [];
        for (let i = 1; i < array.length; i++){
            let j = i;
            while(j > 0 && array[j-1] > array[j]){
                moves.push({
                    indices: [j-1, j],
                    type:"comparison"
                });
                [array[j-1], array[j]] = [array[j], array[j-1]];
                moves.push({
                    indices: [j-1, j],
                    type:"swap"
                });
                j--;
            }
        }
        return moves;
    }
    static QuickSort(array){
        const moves = [];
        function quickSort(array, left, right){
            if(left < right){
                const pivot = Sorting.partition(array, left, right, moves);
                quickSort(array, left, pivot-1);
                quickSort(array, pivot+1, right);
            }
        }
        quickSort(array, 0, array.length-1);
        return moves;
    }
}

export default Sorting;