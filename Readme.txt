# clone the repostory from below URL
---Github link:

# In terminal we should go to the project directory, you can run:
### `npm install`
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

############ Folder Strcuture ############

Folder Structure:
root -- assest-list
        |___src
            |___assest -- which has the symbol images
            |___ components
                |__button ###  reusable component for button
                   |__ Button.js and css file
                |__charts ###  reusable component for charts
                   |__ charts.js and css file
                |__LoadingSpinner ###  reusable component for Loaidngspinner
                   |__ LoadingSpinner.js and css file
                |__tabs ###  reusable component for tabs , used props to gnerate the data on UI
                   |__ TabComponent.js and css file
                |__secondLeveltabs ###  reusable component for tabs , used props to gnerate the data on UI
                   |__ SecondLevelTabComponent.js and css file
                |__table ###  reusable component for table , used props to gnerate the data on UI
                   |__ TableComponent.js and css file
            |__MainComponent -- import tabs, secondLeveltabs and table

############ Code Logic ############

App.js
useEffect --  api call for active symbols, tick history
              |__ beofre api call is success - display LoadingSpinner
              |__ after api call is success - Loads MainComponent

charts.js -- import LineChart from recharts
             | -- data is send from TableComponent using props
             | -- converting array data into object since we need to pass sepcifc key in YAXIS
             | -- in LineChart we need to pass the data , pass the new key to generate line 

TabComponent.js -- generate the li tabs based on data length
                   | -- data is send as props into TabComponent
                   | -- iterated the data in ul tag and gets the individual tabs in the container
                   | -- onClick is also handled in MainComponent

SecondLevelTabComponent.js -- generate the second level tab button based on data length
                   | -- data is send as props into SecondLevelTabComponent
                   | -- iterated the data in ul tag and gets the individual tabs in the container
                   | -- onClick is also handled in MainComponent

ButtonComponent.js -- generate the reusable button
                   | --  button title is send as props to component

tableComponent.js -- generate the table using the props data
                  | --  updating the sort icon on table head click
                  | -- on click on table head the table gets sorted based on column header click

MainComponent.js -- Loads all the required components like TabComponent, SecondLevelTabComponent , tableComponent
                  | --  api response is sent into this component via props
                  | -- create a static array with tab name and it status
                  | --  on click on tab , updating the tab state as active and render the TabComponent, SecondLevelTabComponent
                  | --  on click on tab, filtering the api response and send the filtered data into tableComponent
                  | -- hanlded two level filters

