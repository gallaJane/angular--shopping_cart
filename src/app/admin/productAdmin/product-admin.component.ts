import { Component, OnInit } from '@angular/core';
import { UserService} from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';


@Component({
    templateUrl: './product-admin.component.html',
    styleUrls: ['./product-admin.component.css']
})

export class ProductAdminComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    theProducts: Product[];
    formDisplay: boolean = true; // will be used to display the listing of blogs or post for editing
    singleProduct: Product; // this variable will hold the data that we will use when we edit the post

    constructor(
        private userSVC: UserService,
        private router: Router,
        private prodAdminSVC: ProductAdminService
    ){}


    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }


    chooseMode(mode: string) {
        this.menuChoice = mode;
    }

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getProducts();
    }

   getProducts(){
       let dbRef = firebase.database().ref('products/');
       dbRef.once('value') // then we use the once method to grab the data. Once is a listener and it responses to the value, which in our case is blogPosts. Once is recommended way of returning  a list of data  even if its just one item.
       .then((snapshot)=> {
            let tmp: string[] = snapshot.val(); // then we capture a  snapshot in a temp array. We are doing this is that the data we return is json, which angular can't directly parse
            this.theProducts = Object.keys(tmp).map(key => tmp[key]) // then we use the keys method to extract the keys of our data and then we use map method to extract the data as in array
       });
   }

   editProduct(theProduct: Product){
       this.singleProduct = theProduct;
       this.formDisplay = false;
   }

   cancelEdit(){
       this.formDisplay = true;
   }
   updateProduct(singleProd: Product){
    this.prodAdminSVC.editProduct(singleProd);
    this.formDisplay = true;
}

   deleteProduct(oneProduct: Product){
       let verify = confirm(`Are you sure you want to delete this product?`)
       if(verify == true) {
           this.prodAdminSVC.removeProduct(oneProduct);
           this.router.navigate(['/admin/']);
       } else {
           alert('Nothing deleted!');
       }
   }
}