
var lineSize=4; // IMPORTANT !!! this times 16 is the width of the map 

var levelCode;
var levelMap;


function createLevelCode(lineSize){
 var i,j,x,added=0;
 var levelcode=[];
 var rvalue=0;

 var top,left;

 console.log("createLevelCode(x) started");

 for(i=0;i<lineSize*lineSize*8;++i){levelcode[i]=0;}

 for(i=0;i<lineSize;++i){levelcode[i]=0;++added;}

 for(j=1;j<lineSize*8;++j)
  {
   for(i=0;i<lineSize;++i)   
    {x=Math.floor(Math.random()*4);

     top=levelcode[added-lineSize]; // upper neighbor 
     //console.log("top : "+top); 

     // setting left neighbour  
     if(i==0)
      {left=0;}
     else
      {left=levelcode[added-1];}   
    
     switch(x)
       { case 0: if(top==0){levelcode[added]=3;}
                 if(top>0 && top <=3 ){levelcode[added]=5;}
                 if( i == (lineSize-1) ){levelcode[added]=1;} 
                 if(top==4){levelcode[added]=3;}
                 if(top==9){levelcode[added]=3;} 
                 if(top==5){levelcode[added]=4;}    
                 /*
                 if(left==5 && top==0){levelcode[added]=8;}
                 if(left==5 && top==1){levelcode[added]=6;}
                 if(left==5 && top==2){levelcode[added]=7;}
                 if(left==5 && top==3){levelcode[added]=8;}
                 if(left==5 && top==4){levelcode[added]=6;} 
                 */
                 if(left==5){levelcode[added]=9;}   
                 ++added;
                 break;

         case 1: if(top==0){levelcode[added]=1;}
                 if(top>0 && top <=3){levelcode[added]=top;}
                 if(top==4){levelcode[added]=3;}
                 if(top==9){levelcode[added]=3;} 
                 if(top==5){levelcode[added]=4;}
                 /*
                 if(left==5 && top==0){levelcode[added]=8;}
                 if(left==5 && top==1){levelcode[added]=6;}
                 if(left==5 && top==2){levelcode[added]=7;}
                 if(left==5 && top==3){levelcode[added]=8;} 
                 if(left==5 && top==4){levelcode[added]=6;}  
                 */
                 if(left==5){levelcode[added]=9;}   
                 ++added;
                 break;

         case 2: if(top==0){levelcode[added]=2;}
                 if(top>0 && top <=3){levelcode[added]=top;}
                 if(top==4){levelcode[added]=3;}
                 if(top==9){levelcode[added]=3;} 
                 if(top==5){levelcode[added]=4;}
                 /*
                 if(left==5 && top==0){levelcode[added]=8;}
                 if(left==5 && top==1){levelcode[added]=6;}
                 if(left==5 && top==2){levelcode[added]=7;}
                 if(left==5 && top==3){levelcode[added]=8;}
                 if(left==5 && top==4){levelcode[added]=6;} 
                 */
                 if(left==5){levelcode[added]=9;}    
                 ++added;  
                 break;

         case 3: if(top==0){levelcode[added]=3;}
                 if(top>0 && top <=3){levelcode[added]=4;}
                 if(top==4){levelcode[added]=3;}
                 if(top==9){levelcode[added]=3;}
                 if(top==5){levelcode[added]=4;}  
                 /*
                 if(left==5 && top==0){levelcode[added]=8;}
                 if(left==5 && top==1){levelcode[added]=6;}
                 if(left==5 && top==2){levelcode[added]=7;}
                 if(left==5 && top==3){levelcode[added]=8;}  
                 if(left==5 && top==4){levelcode[added]=6;}                    
                 */
                 if(left==5){levelcode[added]=9;}   
                 ++added;  
                 break;

         
       }
    }
   
  }

 /* 
 for(i=0;i<added;++i) 
  {rvalue=rvalue*10;
   rvalue+=levelcode[i];
  }
 */
 rvalue=levelcode.join('');

 console.log("createLevelCode() executed");
 console.log("rvalue : "+rvalue);
 return rvalue;
}

function printLevelCode(x){
 var e=document.getElementById('levelcode');
 

 console.log("printLevelCode(x) executed");
 e.innerHTML="<p>"+x+"</p>";

 
}

function printMap(x){
 var e=document.getElementById('level');
 var x;

 console.log("printMap(x) executed");
 e.innerHTML="<pre>"+x+"</pre>";

 
}

function createMap(lcode){
 var i,x,r,v;
 var cmap=[];
 var mType=[];
 
 console.log("createMap(x) executed");

 mType[0]="xxxxxxxxxxxxxxxx"; // code 0 , all wall 
 mType[1]="xxxx........xxxx"; // code 1 , large room 
 mType[2]="xxxx......xxxxxx"; // code 2 , medium sized room 
 mType[3]="xxxx....xxxxxxxx"; // code 3 , small room 

 mType[4]="xxxxx.xxxxxxxxxx"; // code 4 , path down 
 mType[5]="xxxx............"; // code 5 , right escape
 mType[6]="............xxxx"; // code 6 , large room left join 
 mType[7]="..........xxxxxx"; // code 7 , medium room left join 
 mType[8]="........xxxxxxxx"; // code 8 , small room left join 
 mType[9]="................"; // code 9 , walk through

 for(i=0;i<lineSize*8*lineSize;++i)
  {v=lcode.charAt(i);
   x=parseInt(v);
   //console.log(v+" "+mType[x]);
   if( !isNaN(x) )
    { //if( ((i+1)%lineSize==0) ){cmap[i]=mType[x]+'\n';}  carriage return is no more required
      cmap[i]=mType[x];
      
    }
   else
    {console.log("error! x = NaN ");}
  }

 
 return cmap.join('');

}

function showAll(){
 var x,r;

 x=createLevelCode(lineSize);
 printLevelCode(x);
 r=createMap(x);
 printMap(r);

}