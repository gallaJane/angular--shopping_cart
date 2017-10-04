import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
 })

export class CartComponent implements OnInit { 
    myCart: any[];
    cartTotal: any;

    constructor( private cartSVC: ShoppingCartService, private router: Router ){}


    //here we grab the content of our Cart
    //getCart is a promise based method
    ngOnInit(){
        this.cartSVC.getCart()
            .then(theCart => this.myCart = theCart)
            .then(cart => this.sumCart(cart))
            .then(sum => this.cartTotal = sum);
    }

    sumCart(cart: any){
        return Promise.resolve(cart.reduce((total: number, item: any) => total + item.price, 0));
    }

    removeCart(id:string){
        this.cartSVC.removeCart(id);
        this.sumCart(this.myCart).then(sum => this.cartTotal = sum);  //this sumCart is again here to update the sum
    }

    purchase(){
        alert(`Your Order Totaled ${this.cartTotal}`);
        this.router.navigate(['/shop']);
    }

    cancel(){
        this.router.navigate(['/shop']);
    }


}
