import { Injectable } from '@angular/core';

@Injectable()

export class ShoppingCartService {
    myCart:any[]=[]; //variable to hold our Cart, we  add an empty array to avoid the undefined error

    getCart(){
        return Promise.resolve(this.myCart);// this is the method to grab the content of the cart
    }

    addProduct(id: string, name: string, price: number) { 
        this.myCart.push({'id': id, 'name': name, 'price': Number(price)}) // without this Number method(price). Without this our Cart will not properly calculate the amount of the cart
        alert(`${name} added to cart`);
    }

    removeCart(searchId: string){
        // first we will find the indexOf the Id with the map mathod.l This will search by the ID and return the indexOf the array of the item
        let tmp = this.myCart.map(x => x.id).indexOf(searchId);

        if( tmp > -1){
            this.myCart.splice(tmp, 1); // then we add an if statement to make sure that we have an index, since the index of method will return a -1 if it doesnt find a match. Then we use splice method to remove the item from the array
        }

    }
}