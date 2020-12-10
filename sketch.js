//Create variables here
var dog ,dogimg,happydg ,database ;
var foodS,foodStock;
var fedTime,lastFed;
var feed , addFood;
var foodObj;


function preload()
{
  //load images here
  dogimg = loadImage("virtual pet images/Dog.png")
  happydg = loadImage("virtual pet images/happy dog.png")
}

function setup() {

  database= firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  dog = createSprite(800,200,150,150)
  dog.addImage(dogimg);
  dog.scale=0.15

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  feed=createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
  
}


function draw() {  
background(46,139,87)

  
  
  //add styles here

 /* if(keyDown(UP_ARROW)){
    writeStock(foodS);
   
    dog.addImage(happydg)
    }
    else(
    
      dog.addImage(dogimg)

    )

  strokeWeight(4)
  fill("yellow")
  textSize(20)
  text("Note: Press UP_ARROW Key To feed Drago Milk!",300,200)
text("Food Remaining :"+foodS,350,250)*/

  fedTime=database.ref("Feedtime")
fedTime.on("value",function(data){
  lastFed = data.val()
})


fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+ lastFed%12 + "PM", 350,30);
}else if (lastFed==0){
text("Last Feed : 12 AM ",350, 30)

}else{
text("Last Feed : "+ lastFed + "AM",350,30);

}

drawSprites();


}

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}





function feedDog(){
dog .addImage(happydg);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()


})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}






