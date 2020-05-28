# Sales Engine

## SalesSources

- (X) Kemik
- Macrosistemas
- (X) Rech
- (X) Spirit
- (X) Guatique
- (X) Pacifiko
- Intelaf
- Click
- Office Depot
- Imeqmo
- Intcomex

### Mapping

The mapping to be made from each store is: 

General: 
- Input Search
- Store Name
- Store Logo
- Store link

Results:

- Name 
- Image
- Price ( #price .price )
- Link

## Statements

- Search the keyword entered by the user in the main local stores
- Will return the results provided by the stores in an unified view
- Will allow the user to add the results to a "Selection List" for further comparison
- Provides a direct link to the product in the store
- Allows the user select the stores in which search for it's product

## Components

### Card

Contains the following info: 

- Store Logo
- Link to store
- Price
- Description
- Product Image
  
  
# Exceptions
 
For stores providing ambiguous results.

Example:

> Kemik store doesn't have products that match with the search terms and shows product that may interest you.

In the above case we should create a double-check for the results obtained from the store to ensure they match the user search.


## TODO

1. Lib / Typings
    1.1. how to create a nx library?
    1.2. Create the data  interfaces
2. Frontend
    -> Redux
    -> Redux-Saga
    -> Redux Toolkit
    -> Grommet
3. Backend
4. Data sources
  4.1. JSON files containing the mapping from the stores
