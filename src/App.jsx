import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import Header from "./components/Header/Header"
import Instructions from "./components/Instructions/Instructions"
import Chip from "./components/Chip/Chip"
import { useState } from "react"
import { nutritionFacts } from "./constants"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

let categorySelected = false;
let restaurantSelected = false;
let menuItemSelected = false;

export function App() {

  let instructionContent = appInfo.instructions.start;


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  function categorySelectHandler(parameter) {
    categorySelected = true;
    setSelectedMenuItem(null);
    menuItemSelected = false;

    return setSelectedCategory(parameter);
  }

  function restaurantSelectHandler(parameter) {
    restaurantSelected = true;
    setSelectedMenuItem(null);
    menuItemSelected = false;

    return setSelectedRestaurant(parameter);
  }

  function menuItemSelectHandler(parameter) {
    menuItemSelected = true;
    return setSelectedMenuItem(parameter);
  }

  function categoryCloseHandler() {
    setSelectedCategory(null);
    //categorySelected = false;
  }

  function restaurantCloseHandler() {
    setSelectedRestaurant(null);
    //restaurantSelected = false;
  }

  function menuItemCloseHandler() {
    setSelectedMenuItem(null);
    //menuItemSelected = false;
  }


/*
  if (!categorySelected && !restaurantSelected) {
    instructionContent = appInfo.instructions.start;
    console.log(instructionContent)
  }
  else if (categorySelected && !restaurantSelected) {
    instructionContent = appInfo.instructions.onlyCategory;
    console.log(instructionContent)
  }
  else if (!categorySelected && restaurantSelected) {
    instructionContent = appInfo.instructions.onlyRestaurant;
    console.log(instructionContent)
  }
  else if (!menuItemSelected) {
    instructionContent = appInfo.instructions.noSelectedItem;
    console.log(instructionContent)
  }
  else {
    instructionContent = appInfo.instructions.allSelected;
    console.log(instructionContent)
  }
*/
  
let currentMenuItems = data.filter((menuItem) => {
  return menuItem.food_category == selectedCategory && menuItem.restaurant == selectedRestaurant;
})

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {/* YOUR CODE HERE */}
          
            {categories.map((item, index) => (
              <Chip key={index} label={item} isActive={selectedCategory === item} onClick = { () => categorySelectHandler(item) } onClose={() => categoryCloseHandler()} ></Chip>
            ))}
         
          
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description}/>

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {/* YOUR CODE HERE */}
            {restaurants.map((rest, index) => (
              <Chip key={index} label={rest} isActive={selectedRestaurant === rest} onClick = { () => restaurantSelectHandler(rest)} onClose={() => restaurantCloseHandler()} ></Chip>
            ))}
            
            </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        {/*
          <Instructions instructions={appInfo.instructions.start}/>
          
            */}


          {(
            (!selectedCategory && !selectedRestaurant && !selectedMenuItem && <Instructions instructions={appInfo.instructions.start}/>)
            ||
            (selectedCategory && !selectedRestaurant && !selectedMenuItem && <Instructions instructions={appInfo.instructions.onlyCategory}/>)
            ||
            (!selectedCategory && selectedRestaurant && !selectedMenuItem && <Instructions instructions={appInfo.instructions.onlyRestaurant}/>)
            ||
            (selectedCategory && selectedRestaurant && !selectedMenuItem && <Instructions instructions={appInfo.instructions.noSelectedItem}/>)
            ||
            (selectedCategory && selectedRestaurant && selectedMenuItem && <Instructions instructions={appInfo.instructions.allSelected}/>)
          )}

           {/*(
            (!categorySelected && !restaurantSelected && !menuItemSelected && <Instructions instructions={appInfo.instructions.start}/>)
            ||
            (categorySelected && !restaurantSelected && !menuItemSelected && <Instructions instructions={appInfo.instructions.onlyCategory}/>)
            ||
            (!categorySelected && restaurantSelected && !menuItemSelected && <Instructions instructions={appInfo.instructions.onlyRestaurant}/>)
            ||
            (categorySelected && restaurantSelected && !menuItemSelected && <Instructions instructions={appInfo.instructions.noSelectedItem}/>)
            ||
            (categorySelected && restaurantSelected && menuItemSelected && <Instructions instructions={appInfo.instructions.allSelected}/>)
           )*/}
  

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {/* YOUR CODE HERE */}
            {
            currentMenuItems.map((menuItem, index) => {
              return (<Chip key={index} label={menuItem.item_name} isActive={selectedMenuItem == menuItem} onClick = { () => menuItemSelectHandler(menuItem)} onClose={() => menuItemCloseHandler()} />)
          })}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {/* YOUR CODE HERE */}
            {selectedMenuItem ? <NutritionalLabel item={selectedMenuItem}/> : <></> }
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
