export const initialstate = {
  basket: [], // Initialize basket as an array
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      const existingItem = state.basket.find((item) => item.id === action.item.id);

      if (!existingItem) {
        // Add new item to the basket
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // Update the amount of the existing item
        const updatedItems = state.basket.map((item) => 
          item.id === action.item.id 
            ? { ...item, amount: item.amount + 1 } 
            : item
        );
        return {
          ...state,
          basket: updatedItems,
        };
      }
      case 'REMOVE_FROM_BASKET':
        const index =state.basket.findIndex(item=>item.id===action.id)
        let newBasket=[...state.basket]
          // if the element dont exist the index will be negative that's why we say if index is greater than zero 
        if(index>=0){
            if(newBasket[index].amount>1){
              newBasket[index]={...newBasket[index],amount:newBasket[index].amount-1}
              // if the amonut id greater than one reduce the amount of that index element by one 
            }
            else(newBasket.splice(index,1)) 
            // if the amount is one remove the elemnt on this index from the basket 
        }
        return {
          ...state,
          basket: newBasket,
        };

    default:
      return state;
  }
};
