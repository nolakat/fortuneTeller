

function makePyramid(){
let counter = 20;
let row = '';
let container = document.getElementById("test-container");

    console.log('making pyramid...');
   
        for( let i = 0; i < counter; i++){
            row += '#';

            if (i%2 == 0){
                printRow(1);
            } else{
                printRow(0);
            }
        }

        function printRow(num){
            let colorArray = ['pink', 'lightblue'];
            let css = "color:" + colorArray[num];

            console.log("%c" + row, css);
        }
    }

makePyramid();