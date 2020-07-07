# Sales Engine

commit message
jsdoc
all-contributors (bot)

## TODO

1. Lib / Typings
    1.1. how to create a nx library? [X]

2. Frontend
    -> Redux
    -> Redux-Saga
    -> Redux Toolkit
    -> Grommet

3. Backend

4. Data sources
  4.1. JSON files containing the mapping from the stores [-]
  
5. Sequences Lib
    5.1. Lib refactor [X]
        5.1.1 async expressions [X]
        5.1.2 lists -> own sequence (map) [X]
        5.1.3 conditions -> conditional sequence [X]
    5.2. Nest Integration -> SequenceModule [X]
    5.3. New SE's functions [X]
        -> fetch [X]
        -> interpolate [X]
        -> fields  [X]
    5.4. Adapt the old drivers to the new schema. [X]
    5.5. Change Drivers' typings to Sequences (Update Typing Lib) [-]

6. Firebase Integration (FE) [-]

## Flow

{  
    lodash,
    rambax,
    salesEngineFunctions
}                                { sequence: KemikSequence }          { keyword: 'razer' }
       lib/sequences       =>            sequencer              =>       transformer         =>     [{ name: 'Ornata ' }, { name: 'Hunstman' }]
____
## Commands

1. Create a library: `nx g @nrwl/web library-name`

## SalesSources

[X] Kemik 
[X] Rech
[X] Spirit
[X] Guatique
[X] Pacifiko
[X] Click
[X] Intelaf
[X] Macrosistemas
[] Office Depot

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
- Will return the results provided by the stores in a unified view
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
  
  
## Exceptions
 
For stores providing ambiguous results.

Example:

> Kemik store doesn't have products that match with the search terms and shows product that may interest you.

In the above case we should create a double-check for the results obtained from the store to ensure they match the user search.


### Conditional System

A sequence, by itself, is a composed function, therefore, based on the FP concepts, it could be used into another compositions.
Based on that, a condition, no matter what happen inside of it, should return a sequence on its function/composed version; so it's gonna be used into
the main sequence composition like a 'normal' function. Long story short, a condition returns a sequence and, at runtime, that sequence is a function.

Some properties described below could have more than one value, that was made like in an intent to have more semantic meaning and easiness to read.

-> *type*: 'condition'
    -> this indicates to the sequence that it needs to break into a decision tree
-> *cases*
    -> this property holds the condition cases array
    -> *when*
        -> this property has the case's conditions, this set of conditions should resolve to a truthy value in order to use its sequence.
            Next you can see the when's properties:
            -> *boolean relation **NAME***
                -> this property, defined by its very own name, creates a relationship between the conditions
                -> valid name values:
                    -> normal names (it uses the raw boolean value from the condition)
                        -> *is / it /*
                        -> AND relation
                            -> *andIt / andIs*
                        -> OR Relation
                            -> *orIt / orIs*
                    -> negated names (it flips the boolean value from the condition)
                        -> *isNot / itDoesnt*
                        -> AND relation
                            -> *andIsNot / andItDoesnt*
                        -> OR relation
                            -> *orIsNot / orItDoesnt*
            -> *boolean relation **VALUE***
                -> this is a function predicate which exists on any of the sources provided to the sequencer library, or it could a predicate function supported by the sequencer library.
            -> *to / this*
                -> this double-named property has the params that will be sent ir order to preload the function predicate defined previously
                        
                
-> default
    -> default sequence in case neither of the cases resolve to a next sequence


    











