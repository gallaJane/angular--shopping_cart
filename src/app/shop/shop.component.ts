import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../admin/adminShared/user.service';
import { Product } from '../admin/adminShared/product';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']    
})
export class ShopComponent implements OnInit{
    products: Product[];

    constructor( private userSVC: UserService, private router: Router ){ }

    ngOnInit(){   //this will execute getPosts method
        this.getProducts();
    }


    getProducts(){ //this is the same getPosts method like in blog-admin.component.ts
        let dbRef = firebase.database().ref('products/')
        dbRef.once('value')
            .then((snapshot) => {
                let tmp: string[] = snapshot.val();
                this.products = Object.keys(tmp).map(key => tmp[key])
            });
    }

    chooseProduct(prod: Product) { //this takes the blog Object and extract the post id
        this.router.navigate(['/product', prod.id]);
    }
}

